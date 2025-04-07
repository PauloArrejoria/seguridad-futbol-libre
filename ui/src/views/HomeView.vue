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
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in users"
        :key="item.id"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.email }}</td>
      </tr>
    </tbody>
  </v-table>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getUserList, GetUserListResponse } from '@/services/user-api/get-list';

let usersList: Array<GetUserListResponse> = [];
let users = ref(usersList);

const fetchUserList = async () => {
  const getUserListResponse = await getUserList();
  users.value = getUserListResponse.data;
};

onMounted(async () => {
  await fetchUserList();
});
</script>
