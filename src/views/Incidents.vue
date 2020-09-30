<template>
    <div>
        <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
            <tr>
                <th>Title</th>
                <th>Impact</th>
                <th>Resolved</th>
                <th>Created At</th>
                <th style="width: 5em">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="incident in incidents" :key="incident.id">
                <td>{{ incident.title }}</td>
                <td>{{ incident.impact }}</td>
                <td>{{ helpers.formatDate(incident.created_at) }}</td>
                <td>{{ helpers.formatDate(incident.resolved_at) }}</td>
                <td>
                    <div class="field is-grouped">
                        <p class="control">
                            <router-link class="button is-small" v-bind:to="{ name: 'incident-edit', params: { id: incident.id }}">Edit</router-link>
                        </p>
                        <p class="control">
                            <a class="button is-danger is-small" v-on:click="showDeleteDialog(incident)">Delete</a>
                        </p>
                    </div>
                </td>
            </tr>
        </tbody>
        </table>

        <router-link class="button" v-bind:to="{ name: 'incident-new' }">New Incident</router-link>
    </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex';
import { useToast } from "vue-toastification";

import ConfirmDialog from "@/components/ConfirmDialog"
import { OpenNetworkStatus } from '@/api';
import config from "@/config";
import helpers from '@/helpers';

export default {
    name: 'Incidents',
    setup () {
        const store = useStore();
        const toast = useToast();

        const incidents = ref([]);
        const api = new OpenNetworkStatus("incidents", config.apiUrl, store.state.auth.jwt.token);
        
        api.getAll().then((data) => {
            incidents.value = data;
        }, () => {
            toast.error("Unable to retrieve incidents from API!");
        });

        const showDeleteDialog = (incident) => {
            ConfirmDialog.show({
                data: incident,
                title: "Delete Incident",
                message: "Are you sure you want to delete this incident?",
                type: "is-danger",
                onConfirm: deleteConfirmed
            });
        }

        const deleteConfirmed = (incident) => {
            api.delete(incident.id).then(() => {
                incidents.value.splice(incidents.value.findIndex(item => item.id === incident.id), 1);
                toast.success(`Incident '${incident.title}' deleted!`);
            }, error => {
                toast.error(`Unable to delete incident '${incident.title}'`);
                console.log(error);
            });
        }

        return {
            incidents,
            showDeleteDialog,
            deleteConfirmed,
            helpers
        }
    }
}
</script>
