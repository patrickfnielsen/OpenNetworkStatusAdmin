<template>
    <div ref="root" class="dialog modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card animation-content">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ title }}</p>
            </header>
            <section class="modal-card-body is-flex">
                <p>
                    {{ message }}
                </p>
            </section>
            <footer class="modal-card-foot">
                <button class="button" v-on:click="hide">{{ cancelText }}</button>
                <button class="button" :class="type" v-on:click="confirm">{{ confirmText }}</button>
            </footer>
        </div>
    </div>
</template>

<script>
import { ref, createVNode, render } from 'vue';

export default {
    name: 'Confirm-Dialog',
    props: {
        title: String,
        message: String,
        data: Object,
        cancelText: {
            type: String,
            default: "Cancel"
        },
        confirmText: {
            type: String,
            default: "Confirm"
        },
        type: {
            type: String,
            default: "is-success"
        },
        onConfirm: {
            type: Function,
            default: () => {}
        },
    },
    setup(props) {
        const root = ref(null);
        const confirm = () => {
            props.onConfirm(props.data);
            hide();
        }

        const hide = () => {
            root.value.parentNode.remove()
        }

        return {
            root,
            confirm,
            hide
        }
    },
    show(props) {
        let elem = document.createElement('div');
        let component = createVNode(this, props);
        
        render(component, elem);

        document.body.appendChild(elem);
    }
}
</script>