<template>
  <div class="component">
    <h1 class="title">Edit Component</h1>
    <form v-on:submit.prevent="saveComponent">
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
                        <option v-for="group in componentGroups" v-bind:value="group.id" v-bind:key="group.id" :selected="component.group_id === group.id">
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
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from 'vue-router';
import { OpenNetworkStatus } from '@/api';

export default {
    name: 'ComponentEdit',
    setup () {
        const store = useStore();
        const route = useRoute();
        const toast = useToast();
        const router = useRouter();

        const component = ref({});
        const componentGroups = ref([])
        const componentApi = new OpenNetworkStatus("components", store.state.auth.jwt.token);
        const componentGroupApi = new OpenNetworkStatus("component-groups", store.state.auth.jwt.token);

        componentApi.getById(route.params.id).then((data) => {
            component.value = data;
        }, () => {
            toast.error("Unable to retrieve component information from API!");
        });

        componentGroupApi.getAll().then((data) => {
            componentGroups.value = data;
        }, () => {
            toast.error("Unable to retrieve component group information from API!");
        });

        const saveComponent = () => {
            if(component.value.group_id === "null") {
                component.value.group_id = null;
            }

            if(Boolean(component.value.display) == true) {
                component.value.display = true;
            } else {
                component.value.display = false;
            }

            componentApi.update(component.value).then(() => {
                toast.success(`Component '${component.value.title}' updated!`);
                router.push({ name: 'components' })
            }, error => {
                toast.error(`Unable to update component '${component.value.title}'`);
                console.log(error);
            });
        }

        return {
            component,
            componentGroups,
            saveComponent
        }
    }
}
</script>
