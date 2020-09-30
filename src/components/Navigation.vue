<template>
    <div class="column is-menu">
        <aside class="menu box">
            <p class="menu-label">
                General
            </p>
            <ul class="menu-list">
                <li>
                    <router-link v-bind:to="{ name: 'dashboard' }">
                        Dashboard
                    </router-link>
                </li>
                <li>
                    <router-link v-bind:to="{ name: 'incidents' }">
                        Incidents
                    </router-link>
                </li>
                <li>
                    <router-link v-bind:to="{ name: 'components' }">
                        Components
                    </router-link>
                </li>
                <li>
                    <router-link v-bind:to="{ name: 'component-groups' }">
                        Component Groups
                    </router-link>
                </li>
                <li>
                    <router-link v-bind:to="{ name: 'metrics' }">
                        Metrics
                    </router-link>
                </li>
            </ul>

            <p class="menu-label">
                System
            </p>
            <ul class="menu-list">
                <li>
                    <router-link v-bind:to="{ name: 'users' }">
                        Users
                    </router-link>
                </li>
                <li>
                    <a :href="siteUrl">
                        Go to Status Page
                    </a>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
import config from "@/config";

export default {
    name: 'Navigation',
    setup() {
        const siteUrl = config.apiUrl;

        return {
            siteUrl
        }
    }
}
</script>

<style scoped>
.columns.is-mobile>.column.is-menu {
    flex: none;
    width: 20%;
}

.shadow-box .menu-label:first-child {
    padding: 12px 0 0 12px;
}

.shadow-box .menu-label:not(:first-child) {
    padding: 0 0 0 12px;
}

.shadow-box .menu-list li {
    margin: 0 10px 0 10px;
}

.shadow-box .menu-list li:last-child {
    padding-bottom: 10px;
}

.menu-list a.is-active {
    background-color: #f1f1f1;
    color: #383e4b;
}
</style>
