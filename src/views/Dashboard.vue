<template>
<div>
    <h1 class="page-title">COMPONENT STATUSES</h1>
    <div class="status-container">
        <div class="tile status-container status-border status-group" v-for="component in standaloneComponents" :key="component.id">
            <div class="inner-container is-clearfix">
                <span class="status-name">
                    <span>{{ component.title }}</span>
                </span>
                <div class="status-options">
                    <label class="radio-inline">
                    <input type="radio" :name="component.id" v-on:change="changeComponentStatus(component.id, 1)" :checked="component.status === 'Operational'">
                    Operational
                    </label>
                    <label class="radio-inline">
                    <input type="radio" :name="component.id" v-on:change="changeComponentStatus(component.id, 2)" :checked="component.status === 'PerformanceIssues'">
                    Performance Issues
                    </label>
                    <label class="radio-inline">
                    <input type="radio" :name="component.id" v-on:change="changeComponentStatus(component.id, 3)" :checked="component.status === 'PartialOutage'">
                    Partial Outage
                    </label>
                    <label class="radio-inline">
                    <input type="radio" :name="component.id" v-on:change="changeComponentStatus(component.id, 4)" :checked="component.status === 'MajorOutage'">
                    Major Outage
                    </label>
                </div>
            </div>
        </div>

        <div class="tile status-container status-border status-group" v-for="group in componentGroups" :key="group.id">
            <div class="inner-container is-clearfix" v-on:click="toogleGroupVisibility(group.id)">
                <span class="status-name">
                    <span class="icon is-small">
                        <span class="collapsible" :class="{active: group.open}" />
                    </span>
                    <span>{{ group.title }}</span>
                </span>
            </div>

            <div class="status-children" v-if="group.open">          
                <div class="inner-container is-clearfix" v-for="component in group.components" :key="component.id">
                    <span class="status-name">{{ component.title }}</span>
                    <div class="status-options">
                        <label class="radio-inline">
                        <input type="radio" :name="component.id" v-on:change="changeComponentStatus(component.id, 1)" :checked="component.status === 'Operational'">
                        Operational
                        </label>
                        <label class="radio-inline">
                        <input type="radio" :name="component.id" v-on:change="changeComponentStatus(component.id, 2)" :checked="component.status === 'PerformanceIssues'">
                        Performance Issues
                        </label>
                        <label class="radio-inline">
                        <input type="radio" :name="component.id" v-on:change="changeComponentStatus(component.id, 3)" :checked="component.status === 'PartialOutage'">
                        Partial Outage
                        </label>
                        <label class="radio-inline">
                        <input type="radio" :name="component.id" v-on:change="changeComponentStatus(component.id, 4)" :checked="component.status === 'MajorOutage'">
                        Major Outage
                        </label>
                    </div>
                </div>    
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex';
import { useToast } from "vue-toastification";
import { OpenNetworkStatus } from '@/api';

export default {
    name: 'Dashboard',
    setup() {
        const toast = useToast();
        const store = useStore();

        const componentGroups = ref([]);
        const standaloneComponents = ref([]);
        const componentApi = new OpenNetworkStatus("components", store.state.auth.jwt.token);
        const componentGroupApi = new OpenNetworkStatus("component-groups", store.state.auth.jwt.token);     

        componentGroupApi.getAll().then((data) => {
            data.forEach(function(group) {
                group.open = true;
            });

            componentGroups.value = data;
        }, () => {
            toast.error("Unable to retrive component groups from API!");
        });

        componentApi.getAll().then((data) => {
            standaloneComponents.value = data.filter(component => component.group_id === null);
        }, () => {
            toast.error("Unable to retrive components from API!");
        });

        const toogleGroupVisibility = (groupId) => {
            let group = componentGroups.value.filter(group => group.id === groupId)[0];
            group.open = !group.open;
        }

        const changeComponentStatus = (componentId, newStatus) => {
            componentApi.updateComponentStatus(componentId, newStatus).then(() => {
                toast.success("Updated component status");
            }, () => {
                toast.error("Unable to update component status");
            });
        }

        return {
            standaloneComponents,
            componentGroups,
            toogleGroupVisibility,
            changeComponentStatus
        }
  }
}
</script>


<style scoped>
.page-title {
    margin-bottom: 15px;
}

.collapsible:after {
  content: '\02795'; /* Unicode character for "plus" sign (+) */
  font-size: 12px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.collapsible, .active:after {
  content: "\2796"; /* Unicode character for "minus" sign (-) */
}

.status-container {
    width: 100%;
    float: none;
    display: block !important;
}

.status-container .status-children {
    padding-left: 21px;
}

.status-container .status-children .inner-container {
    margin-top: 1.3rem;
}

.status-container .status-children .inner-container .status-name {
    font-weight: 400;
    line-height: 1.4;
}

.status-container.status-group > .inner-container {
    cursor: pointer;
}

.inner-container .status-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 500;
    max-width: 75%;
    float: left;
}

.inner-container .status-options {
    float: right;
    font-size: 0.875rem;
}

.inner-container .status-options .radio-inline {
    position: relative;
    display: inline-block;
    padding-left: 20px;
    margin-bottom: 0;
    font-weight: 400;
    cursor: pointer;
}

.status-container .status-border {
    border-bottom-width: 1px;
    border-left-width: 1px !important;
    border-right-width: 1px;
    border-top-width: 0px;
    border-color: #e0e0e0;
    padding: 1.1rem 1.25rem 1rem;
    border-style: solid;
}

.status-container:last-child {
    border-radius: 0 0 4px 4px !important;
    -moz-border-radius: 0 0 4px 4px !important;
    -webkit-border-radius: 0 0 4px 4px !important;
    -o-border-radius: 0 0 4px 4px !important;
    -ms-border-radius: 0 0 4px 4px !important;
}

.status-container:first-child {
    border-top-width: 1px;
    border-radius: 4px 4px 0 0 !important;
    -moz-border-radius: 4px 4px 0 0 !important;
    -webkit-border-radius: 4px 4px 0 0 !important;
    -o-border-radius: 4px 4px 0 0 !important;
    -ms-border-radius: 4px 4px 0 0 !important;
}

.status-container:only-child {
    border-radius: 4px 4px 4px 4px !important;
    -moz-border-radius: 4px 4px 4px 4px !important;
    -webkit-border-radius: 4px 4px 4px 4px !important;
    -o-border-radius: 4px 4px 4px 4px !important;
    -ms-border-radius: 4px 4px 4px 4px !important;
}
</style>
