<template>
    <h1>User Creation</h1>
    <div class="create-user__container">
      <v-form
        max-with
        v-model="isValid"
        validate-on="submit"
        @submit.prevent="createUserHandler"
      >
        <v-text-field
          v-model="user.name"
          :rules="userRules.name"
          :counter="10"
          label="User Name"
          required
        >
        </v-text-field>
    
        <v-text-field
          v-model="user.password"
          :rules="userRules.password"
          :counter="10"
          type="password"
          label="Password"
          required
        >
        </v-text-field>
        
        <v-text-field
          v-model="repeatPassword"
          :rules="userRules.repeatPassword"
          :counter="10"
          type="password"
          label="Repeat password"
          required
        >
        </v-text-field>

        <!-- <TextEditor
          v-model:model-value="user.resumme"
        /> -->

        <v-file-input
          v-model="selectedResummeFile" label="Upload Resume (PDF)"
          accept="application/pdf"
          prepend-icon="mdi-paperclip"
          show-size
          counter
          :rules="userRules.resummeFile"
        ></v-file-input>
    
        <v-btn
          block
          color="primary"
          type="submit"
          class="mt-2"
        >
          CREAR
        </v-btn>
      </v-form>
      <v-snackbar
        v-model="showError"
        location="top right"
        multi-line
        >
        {{ errorMessage }}
  
        <template v-slot:actions>
          <v-btn
            color="red"
            variant="text"
            @click="showError = false"
          >
            <b>Close</b>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
</template>
  
  
<script lang="ts" setup>
import { ref } from 'vue';
// No necesitas TextEditor si lo vas a reemplazar
// import TextEditor from '@/components/TextEditor.vue';
import { SubmitEventPromise } from 'vuetify/lib/framework.mjs';
import { createUser, CreateUserRequest } from '@/services/user-api/create';
import router from '@/router';

const repeatPassword = ref('');
const showError = ref(false);
const errorMessage = ref(false);
const isValid = ref(false);

// La propiedad 'resumme' de user será donde guardaremos el Base64
const user = ref(new CreateUserRequest());

// Nueva ref para el archivo seleccionado por el v-file-input
// v-file-input devuelve un array de File, incluso si solo se selecciona uno
const selectedResummeFile = ref<File[] | null>(null);

const userRules = ref({
    name: [
        (value: string) => value ? true : 'Name is required.',
    ],
    password: [
        (value: string) => value ? true : 'Password is required.',
    ],
    repeatPassword: [
        (value: string) => value === user.value.password ? true : 'Password must match.',
    ],
    // Nuevas reglas para el archivo PDF
    resummeFile: [
        (value: File[]) => {
            if (!value || value.length === 0) return true; // Si el archivo es opcional
            const file = value[0];
            if (file.type !== 'application/pdf') {
                return 'Only PDF files are allowed.';
            }
            if (file.size > 5 * 1024 * 1024) { // Ejemplo: límite de 5MB (ajusta según tus necesidades)
                return 'File size should not exceed 5 MB.';
            }
            return true;
        },
    ],
});

const createUserHandler = async (event: SubmitEventPromise) => {
    try {
        await event;
        if (!isValid.value) return;

        // --- Lógica para convertir el PDF a Base64 y asignarlo a user.resumme ---
        if (selectedResummeFile.value && selectedResummeFile.value.length > 0) {
            const file = selectedResummeFile.value[0];

            // Crear un FileReader para leer el archivo
            const reader = new FileReader();

            // Esto es una promesa para esperar a que el FileReader termine de leer
            await new Promise<void>((resolve, reject) => {
                reader.onload = () => {
                    // El resultado es una cadena Base64 (data URL)
                    user.value.resumme = reader.result as string;
                    resolve();
                };
                reader.onerror = error => reject(error);

                // Lee el archivo como una URL de datos (Base64)
                reader.readAsDataURL(file);
            });
        } else {
            // Si no se seleccionó ningún archivo, asegúrate de que resumme esté vacío
            user.value.resumme = '';
        }
        // ---------------------------------------------------------------------

        // El DTO (CreateUserRequest) ahora debería tener resumme con el Base64 (si se subió un archivo)
        
        // Armo el DTO que espera la función 'createUser'
        const dataToSend = {
          name: user.value.name, // Asegúrate de que esta es la propiedad correcta para el email
          password: user.value.password,
          resumme: user.value.resumme // Aquí va el Base64 o cadena vacía
        };

        const response = await createUser(dataToSend);
        router.push('/');
    } catch(error: any) {
        showError.value = true;
        errorMessage.value = error?.response?.data ?? 'Unexpected Error. Contact your admin!';
    }
};
</script>

<style scoped>
.create-user__container {
    max-width: 500px;
    margin: 30px auto;
}
</style>
  