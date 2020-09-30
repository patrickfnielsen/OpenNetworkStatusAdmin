<template>
    <div class="columns is-mobile">
        <navigation></navigation>
        <div class="column">
            <div class="box">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
    name: 'BaseLayout',
    components: { Navigation }
}
</script>