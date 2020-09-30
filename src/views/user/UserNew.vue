<template>
  <div class="user">
    <h1 class="title">New User</h1>
    <form v-on:submit.prevent="newUser">
        <div class="field">
            <label for="" class="label">Username</label>
            <div class="control">
                <input v-model="user.username" placeholder="Username" class="input" required>
            </div>
        </div>
        <div class="field">
            <label for="" class="label">Password</label>
            <div class="control">
                <input type="password" v-model="user.password" placeholder="Password" class="input">
            </div>
        </div>
        <div class="field is-grouped">
            <p class="control">
                <button class="button is-success">
                    Save
                </button>
            </p>

            <p class="control">
                <router-link class="button" :to="{ name: 'users' }">Cancel</router-link>
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
    name: 'UserNew',
    setup () {
        const store = useStore();
        const router = useRouter();
        const toast = useToast();

        const user = ref({});
        const api = new OpenNetworkStatus("users", config.apiUrl, store.state.auth.jwt.token);

        const newUser = () => {
            api.add(user.value).then(() => {
                toast.success(`User '${user.value.username}' created!`);
                router.push({ name: 'users' })
            }, error => {
                toast.error(`Unable to create user '${user.value.username}'`);
                console.log(error);
            });
        }

        return {
            user,
            newUser
        }
    }
}
</script>
