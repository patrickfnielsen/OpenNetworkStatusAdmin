<template>
    <div>
        <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
            <tr>
                <th>Title</th>
                <th style="width: 5em">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="group in componentGroups" :key="group.id">
                <td>{{ group.title }}</td>
                <td>
                    <div class="field is-grouped">
                        <p class="control">
                            <router-link class="button is-small" v-bind:to="{ name: 'component-group-edit', params: { id: group.id }}">Edit</router-link>
                        </p>
                        <p class="control">
                            <a class="button is-danger is-small" v-on:click="showDeleteDialog(group)">Delete</a>
                        </p>
                    </div>
                </td>
            </tr>
        </tbody>
        </table>

        <router-link class="button" v-bind:to="{ name: 'component-group-new' }">New Component Group</router-link>
    </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex';
import { useToast } from "vue-toastification";
import ConfirmDialog from "@/components/ConfirmDialog"
import { OpenNetworkStatus } from '@/api';

export default {
    name: 'ComponentGroups',
    setup () {
        const store = useStore();
        const toast = useToast();

        const componentGroups = ref([]);
        const api = new OpenNetworkStatus("component-groups", store.state.auth.jwt.token);
        
        api.getAll().then((data) => {
            componentGroups.value = data;
        }, () => {
            toast.error("Unable to retrieve component groups from API!");
        });

        const showDeleteDialog = (group) => {
            ConfirmDialog.show({
                data: group,
                title: "Delete Component Groups",
                message: "Are you sure you want to delete this component group?",
                type: "is-danger",
                onConfirm: deleteConfirmed
            });
        }

        const deleteConfirmed = (group) => {
            api.delete(group.id).then(() => {
                componentGroups.value.splice(componentGroups.value.findIndex(item => item.id === group.id), 1);
                toast.success(`Component Group '${group.title}' deleted!`);
            }, error => {
                toast.error(`Unable to delete component group '${group.title}'`);
                console.log(error);
            });
        }

        return {
            componentGroups,
            showDeleteDialog,
            deleteConfirmed
        }
    }
}
</script>
