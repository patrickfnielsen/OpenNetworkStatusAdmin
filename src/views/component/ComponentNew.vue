<template>
  <div class="component">
    <h1 class="title">New Component</h1>
    <form v-on:submit.prevent="newComponent">
        <div class="field">
            <label for="" class="label">Status</label>
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                    <select v-model="component.status">
                        <option value="Operational">Operational</option>
                        <option value="PerformanceIssues">Performance Issues</option>
                        <option value="PartialOutage">Partial Outage</option>
                        <option value="MajorOutage">Major Outage</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="field">
            <label for="" class="label">Group</label>
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                    <select v-model="component.group_id">
                        <option value="null">------</option>
                        <option v-for="group in componentGroups" v-bind:value="group.id" v-bind:key="group.id">
                            {{ group.title }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <div class="field">
            <label for="" class="label">Display</label>
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                    <select v-model="component.display">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="field">
            <label for="" class="label">Title</label>
            <div class="control">
                <input v-model="component.title" placeholder="Title" class="input" required>
            </div>
        </div>
        <div class="field">
            <label for="" class="label">Description</label>
            <div class="control">
                <textarea rows="4" v-model="component.description" placeholder="Description" class="textarea"></textarea>
            </div>
        </div>
        <div class="field is-grouped">
            <p class="control">
                <button class="button is-success">
                    Save
                </button>
            </p>

            <p class="control">
                <router-link class="button" :to="{ name: 'components' }">Cancel</router-link>
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
import config from "@/config";

export default {
    name: 'ComponentNew',
    setup () {
        const store = useStore();
        const router = useRouter();
        const toast = useToast();

        const component = ref({
            status: "Operational",
            position: 1,
            group_id: null
        });
        const componentGroups = ref([])
        const componentApi = new OpenNetworkStatus("components", config.apiUrl, store.state.auth.jwt.token);
        const componentGroupApi = new OpenNetworkStatus("component-groups", config.apiUrl, store.state.auth.jwt.token);

        componentGroupApi.getAll().then((data) => {
            componentGroups.value = data;
        }, () => {
            toast.error("Unable to retrieve component group information from API!");
        });

        const newComponent = () => {
            if(component.value.group_id === "null") {
                component.value.group_id = null;
            }

            if(component.value.display === "true") {
                component.value.display = true;
            } else {
                component.value.display = false;
            }

            componentApi.add(component.value).then(() => {
                toast.success(`Component '${component.value.title}' created!`);
                router.push({ name: 'components' })
            }, error => {
                toast.error(`Unable to create component '${component.value.title}'`);
                console.log(error);
            });
        }

        return {
            component,
            componentGroups,
            newComponent
        }
    }
}
</script>
