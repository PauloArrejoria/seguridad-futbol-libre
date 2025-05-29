<template>
  <h1>Users List</h1>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Id</th>
        <th class="text-left">Email</th>
        <th class="text-left">Resumme</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in users" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.email }}</td>
        <td>
          <v-btn
            color="primary"
            @click="showEditResumme(item)"
          >
            Edit
          </v-btn>
          <v-btn
            color="success"
            @click="setAndShowResumme(item.resumme)"
          >
            View
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>

  <v-dialog max-width="800" persistent :model-value="showResumme">
    <v-card>
      <v-card-title>View Resume</v-card-title>
      <v-card-text>
        <div v-if="resumme" style="width: 100%; height: 600px;">
          <iframe
            :src="resumme"
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
        </div>
        <div v-else>
          No resume available.
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Close" color="error" @click="showResumme = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog max-width="800" persistent :model-value="showEditableResumme">
    <v-card title="Update Resume">
      <v-card-text>
        <v-file-input
          v-model="newResummeFile"
          label="Upload New Resume (PDF)"
          accept="application/pdf"
          prepend-icon="mdi-paperclip"
          show-size
          counter
          :rules="resummeFileRules"
        ></v-file-input>

        <h4 v-if="editableItem.resumme" class="mt-4">Current Resume:</h4>
        <div v-if="editableItem.resumme" style="width: 100%; height: 400px; border: 1px solid #ccc;">
          <iframe
            :src="editableItem.resumme"
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
        </div>
        <div v-else class="mt-4">
          No current resume.
        </div>

      </v-card-text>

      <v-card-actions>
        <v-btn
          color="primary"
          @click="updateEditableItem"
        >
          Save
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          @click="closeEditDialog"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
// Ya no necesitas TextEditor
// import TextEditor from '@/components/TextEditor.vue';
import { getUserList, GetUserListResponse } from '@/services/user-api/get-list';
import { updateUserResumme, UpdateUserResummeRequest } from '@/services/user-api/update-resumme';

// --- Variables existentes ---
let usersList: Array<GetUserListResponse> = [];
let users = ref(usersList);
let resumme = ref(""); // Este contendrá el Base64 para el iframe de visualización
let editableItem = ref(new GetUserListResponse()); // El item que estamos editando
let showResumme = ref(false);
let showEditableResumme = ref(false);

// --- Nuevas variables para la edición del PDF ---
const newResummeFile = ref<File[] | null>(null); // Para el v-file-input en el diálogo de edición

// Reglas de validación para el archivo PDF en el diálogo de edición
const resummeFileRules = [
    (value: File[]) => {
        if (!value || value.length === 0) return true; // Si es opcional, permite no seleccionar
        const file = value[0];
        if (file.type !== 'application/pdf') {
            return 'Only PDF files are allowed.';
        }
        if (file.size > 2 * 1024 * 1024) { // Límite de 2MB (ajusta según tus necesidades)
            return 'File size should not exceed 2 MB.';
        }
        return true;
    },
];

// Función auxiliar para convertir File a Base64 (la misma que en la creación)
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const setAndShowResumme = (userResumme: string | null) => {
    // Si userResumme es el Base64, el iframe puede usarlo directamente como src
    // El formato esperado por el iframe es 'data:application/pdf;base64,...'
    // Tu backend debe devolverlo ya en ese formato, o agregarlo aquí si solo guarda el Base64 puro.
    resumme.value = userResumme ? `data:application/pdf;base64,${userResumme}` : "";
    showResumme.value = true;
};

const showEditResumme = (item: GetUserListResponse) => {
    editableItem.value = { ...item }; // Copia el objeto para evitar modificar el original directamente
    newResummeFile.value = null; // Limpiar el input de archivo al abrir el diálogo
    showEditableResumme.value = true;
};

const updateEditableItem = async () => {
    // Validar que se haya seleccionado un archivo si es obligatorio, o si se seleccionó
    // Asegúrate de que las reglas de validación del v-file-input hayan pasado.
    // Esto es una simplificación; en un formulario grande, querrías una v-form para validar todo.

    let base64Resumme: string | null = null;

    if (newResummeFile.value && newResummeFile.value.length > 0) {
        const file = newResummeFile.value[0];
        // Aquí podrías añadir una validación de tipo/tamaño más estricta si no se hizo en las rules o si las rules son solo visuales
        if (file.type === 'application/pdf' && file.size <= 2 * 1024 * 1024) {
            try {
                base64Resumme = await fileToBase64(file);
            } catch (error) {
                console.error("Error converting new resume to Base64:", error);
                // Aquí podrías mostrar un snackbar de error
                return; // No proceder con la actualización
            }
        } else {
             // Archivo no válido, podrías mostrar un error
             console.error("Invalid file selected for resume.");
             return; // No proceder
        }
    } else {
        // Si no se selecciona un nuevo archivo, ¿qué hacemos?
        // 1. Mantener el Base64 existente:
        base64Resumme = editableItem.value.resumme;
        // 2. Opcional: Si quieres permitir borrar el currículum, podrías enviar null/vacío
        // base64Resumme = null;
    }

    const request = new UpdateUserResummeRequest(
        editableItem.value.id,
        base64Resumme, // Aquí enviamos el nuevo Base64 (o el existente si no se subió uno nuevo)
    );

    await updateUserResumme(request);
    await fetchUserList(); // Refrescar la lista para ver los cambios
    closeEditDialog();
};

const closeEditDialog = () => {
    showEditableResumme.value = false;
    newResummeFile.value = null; // Limpiar el archivo seleccionado al cerrar
    // editableItem.value = new GetUserListResponse(); // Opcional: resetear el item editado
};

const fetchUserList = async () => {
    const getUserListResponse = await getUserList();
    users.value = getUserListResponse.data;
};

onMounted(async () => {
    await fetchUserList();
});
</script>