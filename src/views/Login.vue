<template>
    <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-4-widescreen">
            <div v-if="message" class="notification is-danger">
                {{ message }}
            </div>
            
            <form action="" class="box" v-on:submit.prevent="login">
                <div class="field">
                    <label for="" class="label">Username</label>
                    <div class="control">
                        <input type="username" v-model="username" placeholder="Username" class="input" required>
                    </div>
                </div>
                <div class="field">
                    <label for="" class="label">Password</label>
                    <div class="control">
                        <input type="password" v-model="password" placeholder="Password" class="input" required>
                    </div>
                </div>
                <div class="field">
                    <button class="button is-success" :disabled="loading">
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref  } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'Login',
    setup () {
        const store = useStore();
        const router = useRouter();

        const username = ref("");
        const password = ref("");
        const message = ref("");
        const loading = ref(false);

        const login = () => {
            loading.value = true;

            if (username.value && password.value) {
                store.dispatch('auth/login', { username: username.value, password: password.value })
                    .then(() => {
                        router.push({ name: 'dashboard' });
                    },
                    error => {
                        loading.value = false;
                        message.value = getErrorMessageFromError(error);
                    });
            } else {
                loading.value = false;
                message.value = "Please enter a username and password";
            }
        };

        const getErrorMessageFromError = (error) => {
            if (!error.response && error.code === 'ECONNABORTED')
            {
                return "Failed to connect to backend";
            }

            switch(error.response.status)
            {
                case 403:
                    return "Invalid credentials!";
                default:
                    return error.message || "An unknown error occurred";
            }
        }

        return {
            username,
            password,
            loading,
            message,
            login
        }
    }
}
</script>
