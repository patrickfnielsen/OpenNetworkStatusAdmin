<template>
  <div class="incident-update">
    <h1 class="title">Edit Update</h1>
    <form v-on:submit.prevent="saveUpdate">
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
    name: 'IncidentUpdateEdit',
    setup () {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const toast = useToast();

        const update = ref({});
        const api = new OpenNetworkStatus("incidents/updates", config.apiUrl, store.state.auth.jwt.token);

        api.getById(route.params.id).then((data) => {
            update.value = data;
        }, () => {
            toast.error("Unable to retrieve incident update information from API!");
        });

        const saveUpdate = () => {
            api.update(update.value).then(() => {
                toast.success("Incident update updated!");
                router.go(-1)
            }, error => {
                toast.error("Unable to update incident update");
                console.log(error);
            });
        }

        return {
            router,
            update,
            saveUpdate
        }
    }
}
</script>
