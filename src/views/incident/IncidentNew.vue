<template>
  <div class="incident">
    <h1 class="title">New Incident</h1>
    <form v-on:submit.prevent="newIncident">
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

        <h4 class="subtitle is-4" style="margin-top: 3.5rem;margin-bottom: 1.5rem;">Initial Update</h4>

        <div class="field">
            <label for="" class="label">Status</label>
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                    <select v-model="incident.initial_status">
                        <option value="Investigating">Investigating</option>
                        <option value="Identified">Identified</option>
                        <option value="Monitoring">Monitoring</option>
                        <option value="Update">Update</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="field">
            <label for="" class="label">Message</label>
            <div class="control">
                <textarea rows="5" v-model="incident.initial_update" class="textarea"></textarea>
            </div>
        </div>
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
import { useRouter} from 'vue-router';
import { useToast } from "vue-toastification";

import { OpenNetworkStatus } from '@/api';

export default {
    name: 'IncidentNew',
    setup () {
        const store = useStore();
        const router = useRouter();
        const toast = useToast();

        const incident = ref({
            impact: "None",
            initial_status: "Investigating"
        });
        const incidentApi = new OpenNetworkStatus("incidents", store.state.auth.jwt.token);

        const newIncident = () => {
            let status = incident.value.initial_status;
            let message = incident.value.initial_update;

            //Make sure we don't post them to the incident endpoint
            delete incident.value.initial_status;
            delete incident.value.initial_update;

            incidentApi.add(incident.value).then((data) => {
                addUpdate(data.id, status, message);
            }, error => {
                toast.error(`Unable to create incident '${incident.value.title}'`);
                console.log(error);
            });
        }

        const addUpdate = (incidentId, status, message) => {
            let incidentUpdateApi = new OpenNetworkStatus(`incidents/${incidentId}/updates`, store.state.auth.jwt.token);
            incidentUpdateApi.add({status: status, message: message}).then(() => {
                toast.success(`Incident '${incident.value.title}' created!`);
                router.push({ name: 'incidents' })
            }, error => {
                toast.error(`Unable to create update for incident '${incident.value.title}'`);
                console.log(error);
            });           
        }

        return {
            incident,
            newIncident
        }
    }
}
</script>
