<template>
  <div class="metric">
    <h1 class="title">New Metric</h1>
    <form v-on:submit.prevent="newMetric">
        <div class="field">
            <label for="" class="label">Display</label>
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                    <select v-model="metric.display">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="field">
            <label for="" class="label">Decimal Places</label>
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                    <select v-model="metric.decimal_places">
                        <option value=0 selected>0</option>
                        <option value=1>1</option>
                        <option value=2>2</option>
                        <option value=3>3</option>
                        <option value=4>4</option>
                        <option value=5>5</option>
                        <option value=6>6</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="field">
            <label for="" class="label">Title</label>
            <div class="control">
                <input v-model="metric.title" placeholder="Title" class="input" required>
            </div>
        </div>
        <div class="field">
            <label for="" class="label">Suffix</label>
            <div class="control">
                <input v-model="metric.suffix" placeholder="Suffix" class="input">
            </div>
        </div>
        <div class="field">
            <label for="" class="label">Description</label>
            <div class="control">
                <textarea rows="4" v-model="metric.description" placeholder="Description" class="textarea"></textarea>
            </div>
        </div>
        <div class="field is-grouped">
            <p class="control">
                <button class="button is-success">
                    Save
                </button>
            </p>

            <p class="control">
                <router-link class="button" :to="{ name: 'metrics' }">Cancel</router-link>
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

export default {
    name: 'MetricNew',
    setup () {
        const store = useStore();
        const router = useRouter();
        const toast = useToast();
        const metric = ref({});
        const api = new OpenNetworkStatus("metrics", store.state.auth.jwt.token);

        const newMetric = () => {
            if(metric.value.display === "true") {
                metric.value.display = true;
            } else {
                metric.value.display = false;
            }

            metric.value.decimal_places = parseInt(metric.value.decimal_places);

            api.add(metric.value).then(() => {
                toast.success(`Metric '${metric.value.title}' created!`);
                router.push({ name: 'metrics' })
            }, error => {
                toast.error(`Unable to create metric '${metric.value.title}'`);
                console.log(error);
            });
        }

        return {
            metric,
            newMetric
        }
    }
}
</script>
