<template>
  <div class="component-group">
    <h1 class="title">Edit Component Group</h1>
    <form v-on:submit.prevent="newComponentGroup">
        <div class="field">
            <label for="" class="label">Group Visibility Option</label>
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                    <select v-model="group.expand_option">
                        <option value="ExpandOnIssue">Collapse the group, but expand if there are issues</option>
                        <option value="AlwaysCollapse">Collapse the group</option>
                        <option value="AlwaysExpand">Always expand</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="field">
            <label for="" class="label">Display</label>
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                    <select v-model="group.display">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="field">
            <label for="" class="label">Title</label>
            <div class="control">
                <input v-model="group.title" placeholder="Title" class="input" required>
            </div>
        </div>
        <div class="field is-grouped">
            <p class="control">
                <button class="button is-success">
                    Save
                </button>
            </p>

            <p class="control">
                <router-link class="button" :to="{ name: 'component-groups' }">Cancel</router-link>
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
    name: 'ComponentGroupNew',
    setup () {
        const group = ref({
            expand_option: "ExpandOnIssue"
        });
        const store = useStore();
        const router = useRouter();
        const toast = useToast();
        const api = new OpenNetworkStatus("component-groups", config.apiUrl, store.state.auth.jwt.token);

        const newComponentGroup = () => {
            if(group.value.display === "true") {
                group.value.display = true;
            } else {
                group.value.display = false;
            }

            api.add(group.value).then(() => {
                toast.success(`Component group '${group.value.title}' created!`);
                router.push({ name: 'component-groups' })
            }, error => {
                toast.error(`Unable to create component group '${group.value.title}'`);
                console.log(error);
            });
        }

        return {
            group,
            newComponentGroup
        }
    }
}
</script>
