import config from "@/config"
import { AuthService } from '@/api'

export const auth = {
    namespaced: true,
    state: {
        username: "",
        jwt: JSON.parse(localStorage.getItem('auth-jwt')) || null
    },
    getters: {
        isAuthenticated (state) {
            if (state.jwt === null)
            {
                return false;
            }

            const exp = new Date(state.jwt.expires)
            const now = new Date()
        
            return now < exp;
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.jwt = user.jwt
            state.username = user.username;
        },
        loginFailure(state) {
            state.jwt = null;
            state.username = "";
        }
    },
    actions: {
        login({ commit }, user) {
            return new AuthService(config.apiUrl).login(user.username, user.password).then(
                jwt => {
                    localStorage.setItem('auth-jwt', JSON.stringify(jwt));
                    commit('loginSuccess', { jwt: jwt, username: user.username });
                    return Promise.resolve(user.username);
                },
                error => {
                    localStorage.removeItem('auth-jwt');
                    commit('loginFailure');
                    return Promise.reject(error);
                }
          );
        }
    }
};