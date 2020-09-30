<template>
  <div class="incident-update">
    <h1 class="title">Add Update</h1>
    <form v-on:submit.prevent="addUpdate">
        <div class="field">
            <label for="" class="label">Status</label>
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                    <select v-model="update.status">
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
                <textarea rows="5" v-model="update.message" class="textarea"></textarea>
            </div>
        </div>
        <div class="field is-grouped">
            <p class="control">
                <button class="button is-success">
                    Save
                </button>
            </p>

            <p class="control">
                <a class="button" v-on:click="router.go(-1)">Cancel</a>
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
import config from "@/config";

export default {
    name: 'IncidentUpdateNew',
    setup () {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const toast = useToast();

        const update = ref({
            status: "Investigating"
        });
        const api = new OpenNetworkStatus(`incidents/${route.params.id}/updates`, config.apiUrl, store.state.auth.jwt.token);

        const addUpdate = () => {
            api.add(update.value).then(() => {
                toast.success("Incident update created!");
                router.go(-1)
            }, error => {
                toast.error("Unable to create incident update!");
                console.log(error);
            });
        }

        return {
            router,
            update,
            addUpdate
        }
    }
}
</script>
