<template>
  <div class="user">
    <h1 class="title">Edit User</h1>
    <form v-on:submit.prevent="saveUser">
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
import { useRoute, useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { OpenNetworkStatus } from '@/api';

export default {
    name: 'UserEdit',
    setup () {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const toast = useToast();

        const user = ref({});
        const api = new OpenNetworkStatus("users", store.state.auth.jwt.token);

        api.getById(route.params.id).then((data) => {
            user.value = data;
        }, () => {
            toast.error("Unable to retrieve user information from API!");
        });

        const saveUser = () => {
            api.update(user.value).then(() => {
                toast.success(`User '${user.value.username}' updated!`);
                router.push({ name: 'users' })
            }, error => {
                toast.error(`Unable to update user '${user.value.username}'`);
                console.log(error);
            });
        }

        return {
            user,
            saveUser
        }
    }
}
</script>
