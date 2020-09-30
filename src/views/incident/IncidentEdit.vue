<template>
  <div class="incident">
    <h1 class="title">Edit Incident</h1>
    <form v-on:submit.prevent="saveIncident">
        <div class="field">
            <label for="" class="label">Impact</label>
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                    <select v-model="incident.impact">
                        <option value="None">None</option>
                        <option value="Minor">Minor</option>
                        <option value="Major">Major</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="field">
            <label for="" class="label">Title</label>
            <div class="control">
                <input v-model="incident.title" placeholder="Title" class="input" required>
            </div>
        </div>

        <div class="level" style="margin-top: 3.5rem; margin-bottom: 1.5rem;">
            <div class="level-left">
                <h4 class="subtitle is-4">Incident Updates</h4>
            </div>
            <div class="level-right">
                <router-link class="button" :to="{ name: 'update-new' }">Add Update</router-link>
            </div>
        </div>


        <table class="table is-striped is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Message</th>
                    <th style="width: 5em">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="update in incident.updates" :key="update.id">
                    <td>{{ update.status }}</td>
                    <td>{{ update.message }}</td>
                    <td>
                        <div class="field is-grouped">
                            <p class="control">
                                <router-link class="button is-small" v-bind:to="{ name: 'update-edit', params: { id: update.id }}">Edit</router-link>
                            </p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="field is-grouped">
            <p class="control">
                <button class="button is-success">
                    Save
                </button>
            </p>

            <p class="control">
                <router-link class="button" :to="{ name: 'incidents' }">Cancel</router-link>
            </p>
        </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { OpenNetworkStatus } from '@/api';

export default {
    name: 'IncidentEdit',
    setup () {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const toast = useToast();

        const incident = ref({});
        const api = new OpenNetworkStatus("incidents", store.state.auth.jwt.token);

        api.getById(route.params.id).then((data) => {
            data.updates = data.updates.reverse();
            incident.value = data;
        }, () => {
            toast.error("Unable to retrieve incident information from API!");
        });

        const saveIncident = () => {
            api.update(incident.value).then(() => {
                toast.success(`Incident '${incident.value.title}' updated!`);
                router.push({ name: 'incidents' })
            }, error => {
                toast.error(`Unable to update incident '${incident.value.title}'`);
                console.log(error);
            });
        }

        return {
            incident,
            saveIncident
        }
    }
}
</script>
