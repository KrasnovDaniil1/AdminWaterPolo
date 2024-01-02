<script>
import Header from "./components/Header.vue";
import Loader from "./components/Loader.vue";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

export default {
    components: {
        Header,
        Loader,
    },
    setup() {
        const store = useStore();
        return {
            store,
            loader: computed(() => store.getters.getLoader),
        };
    },
};
</script>

<template>
    <div class="app">
        <Header />
        <RouterView class="router_view" />
        <Loader :loader="loader" />
    </div>
</template>

<style lang="scss">
html {
    font-size: 16px;
}
:root {
    --size-title: 20px;
    --size-elem: 24px;
    --size-text: 20px;

    --color-primary: #242e42;
    --color-secondary: #fff;
    --color-decor: #e8ec2a;

    --bg-primary: #242e42;
    --bg-secondary: #fff;
    --bg-decor: #e8ec2a;
}
.app {
    display: flex;
    .router_view {
        width: 100%;
        padding: 1rem;
    }
}
</style>
