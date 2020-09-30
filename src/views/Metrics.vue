<template>
    <div>
        <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
            <tr>
                <th>Title</th>
                <th style="width: 5em">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="metric in metrics" :key="metric.id">
                <td>{{ metric.title }}</td>
                <td>
                    <div class="field is-grouped">
                        <p class="control">
                            <router-link class="button is-small" v-bind:to="{ name: 'metric-edit', params: { id: metric.id }}">Edit</router-link>
                        </p>
                        <p class="control">
                            <a class="button is-danger is-small" v-on:click="showDeleteDialog(metric)">Delete</a>
                        </p>
                    </div>
                </td>
            </tr>
        </tbody>
        </table>

        <router-link class="button" v-bind:to="{ name: 'metric-new' }">New Metric</router-link>
    </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex';
import { useToast } from "vue-toastification";
import ConfirmDialog from "@/components/ConfirmDialog"
import { OpenNetworkStatus } from '@/api';

export default {
    name: 'Metrics',
    setup () {
        const store = useStore();
        const toast = useToast();

        const metrics = ref([]);
        const api = new OpenNetworkStatus("metrics", store.state.auth.jwt.token);
        
        api.getAll().then((data) => {
            metrics.value = data;
        }, () => {
            toast.error("Unable to retrieve metrics from API!");
        });

        const showDeleteDialog = (metric) => {
            ConfirmDialog.show({
                data: metric,
                title: "Delete Metric",
                message: "Are you sure you want to delete this metric?",
                type: "is-danger",
                onConfirm: deleteConfirmed
            });
        }

        const deleteConfirmed = (metric) => {
            api.delete(metric.id).then(() => {
                metrics.value.splice(metrics.value.findIndex(item => item.id === metric.id), 1);
                toast.success(`Metric '${metric.title}' deleted!`);
            }, error => {
                toast.error(`Unable to delete metric '${metric.title}'`);
                console.log(error);
            });
        }

        return {
            metrics,
            showDeleteDialog,
            deleteConfirmed
        }
    }
}
</script>
