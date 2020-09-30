<template>
    <div>
        <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
            <tr>
                <th>Username</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th style="width: 5em">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.username }}</td>
                <td>{{ helpers.formatDate(user.created_at) }}</td>
                <td>{{ helpers.formatDate(user.updated_at) }}</td>
                <td>
                    <div class="field is-grouped">
                        <p class="control">
                            <router-link class="button is-small" v-bind:to="{ name: 'user-edit', params: { id: user.id }}">Edit</router-link>
                        </p>
                        <p class="control">
                            <a class="button is-danger is-small" v-on:click="showDeleteDialog(user)">Delete</a>
                        </p>
                    </div>
                </td>
            </tr>
        </tbody>
        </table>

        <router-link class="button" v-bind:to="{ name: 'user-new' }">New User</router-link>
    </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex';
import { useToast } from "vue-toastification";
import { OpenNetworkStatus } from '@/api';
import ConfirmDialog from "@/components/ConfirmDialog"
import helpers from '@/helpers';

export default {
    name: 'Users',
    setup () {
        const store = useStore();
        const toast = useToast();
        
        const users = ref([]);
        const api = new OpenNetworkStatus("users", store.state.auth.jwt.token);
        
        api.getAll().then((data) => {
            users.value = data;
        }, () => {
            toast.error("Unable to retrieve users from API!");
        });

        const showDeleteDialog = (user) => {
            ConfirmDialog.show({
                data: user,
                title: "Delete User",
                message: "Are you sure you want to delete this user?",
                type: "is-danger",
                onConfirm: deleteConfirmed
            });
        }

        const deleteConfirmed = (user) => {
            api.delete(user.id).then(() => {
                users.value.splice(users.value.findIndex(item => item.id === user.id), 1);
                toast.success(`User '${user.username}' deleted!`);
            }, error => {
                toast.error(`Unable to delete user '${user.username}'`);
                console.log(error);
            });
        }

        return {
            users,
            showDeleteDialog,
            deleteConfirmed,
            helpers
        }
    }
}
</script>
