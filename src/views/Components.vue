<template>
    <div>
        <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
            <tr>
                <th>Title</th>
                <th>Status</th>
                <th style="width: 5em">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="component in components" :key="component.id">
                <td>{{ component.title }}</td>
                <td>{{ component.status }}</td>
                <td>
                    <div class="field is-grouped">
                        <p class="control">
                            <router-link class="button is-small" v-bind:to="{ name: 'component-edit', params: { id: component.id }}">Edit</router-link>
                        </p>
                        <p class="control">
                            <a class="button is-danger is-small" v-on:click="showDeleteDialog(component)">Delete</a>
                        </p>
                    </div>
                </td>
            </tr>
        </tbody>
        </table>

        <router-link class="button" v-bind:to="{ name: 'component-new' }">New Component</router-link>
    </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex';
import { useToast } from "vue-toastification";
import ConfirmDialog from "@/components/ConfirmDialog"
import { OpenNetworkStatus } from '@/api';

export default {
    name: 'Components',
    setup () {
        const store = useStore();
        const toast = useToast();

        const components = ref([]);
        const api = new OpenNetworkStatus("components", store.state.auth.jwt.token);
        
        api.getAll().then((data) => {
            components.value = data;
        }, () => {
            toast.error("Unable to retrieve components from API!");
        });

        const showDeleteDialog = (component) => {
            ConfirmDialog.show({
                data: component,
                title: "Delete Component",
                message: "Are you sure you want to delete this component?",
                type: "is-danger",
                onConfirm: deleteConfirmed
            });
        }

        const deleteConfirmed = (component) => {
            api.delete(component.id).then(() => {
                components.value.splice(components.value.findIndex(item => item.id === component.id), 1);
                toast.success(`Component '${component.title}' deleted!`);
            }, error => {
                toast.error(`Unable to delete component '${component.title}'`);
                console.log(error);
            });
        }

        return {
            components,
            showDeleteDialog,
            deleteConfirmed
        }
    }
}
</script>
