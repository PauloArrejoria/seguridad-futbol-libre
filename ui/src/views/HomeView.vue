<template>
  <h1>Users List</h1>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Id
        </th>
        <th class="text-left">
          Email
        </th>
        <th class="text-left">
          Resumme
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in users"
        :key="item.id"
      >
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
  <v-dialog
    max-width="800"
    persistent
    :model-value="showResumme"
  >
    <v-card>
      <v-card-text>
        <div v-html="resumme"></div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="Close"
          color="error"
          @click="showResumme = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog
    max-width="800"
    persistent
    :model-value="showEditableResumme"
  >
    <v-card title="Update Resumme">
      <v-card-text>
        <TextEditor
          v-model:model-value="editableResumme"
        />
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
          @click="showEditableResumme = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import TextEditor from '@/components/TextEditor.vue';
import { getUserList, GetUserListResponse } from '@/services/user-api/get-list';
import { updateUserResumme, UpdateUserResummeRequest } from '@/services/user-api/update-resumme';

let usersList: Array<GetUserListResponse> = [];
let users = ref(usersList);
let resumme = ref("");
let editableResumme = ref("");
let showResumme = ref(false);
let editableItem = ref(new GetUserListResponse());
let showEditableResumme = ref(false);

const setAndShowResumme = (userResumme: string|null) => {
  resumme.value = userResumme ?? "";
  showResumme.value = true;
};

const showEditResumme = (item:GetUserListResponse) => {
  editableItem.value = item;
  editableResumme.value = editableItem.value.resumme;
  showEditableResumme.value = true;
};

const updateEditableItem = async () => {
  const request = new UpdateUserResummeRequest(
    editableItem.value.id,
    editableResumme.value,
  )
  await updateUserResumme(request)
  await fetchUserList();
  showEditableResumme.value = false;
};

const fetchUserList = async () => {
  const getUserListResponse = await getUserList();
  users.value = getUserListResponse.data;
};

onMounted(async () => {
  await fetchUserList();
});
</script>
