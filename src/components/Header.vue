<script>
export default {
    setup() {
        const rout = [
            {
                title: "Любителям",
                name: "amateur",
            },
            {
                title: "Детям",
                name: "children",
            },
            {
                title: "Студентам",
                name: "student",
            },
            {
                title: "Федерация",
                name: "federation",
            },
        ];
        return {
            rout,
        };
    },
};
</script>

<template>
    <header>
        <nav>
            <router-link v-for="(r, i) in rout" :key="i" :to="{ name: r.name }">
                {{ r.title }}
            </router-link>
        </nav>
        <div class="decor_bg"></div>
    </header>
</template>

<style lang="scss" scoped>
header {
    position: relative;
    background: var(--bg-primary);
    color: var(--color-secondary);
    width: 300px;
    nav {
        position: sticky;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100vh;
        a {
            font-size: var(--size-title);
            text-decoration: none;
            padding: 0.5rem 0;
            text-transform: uppercase;
        }
        .router-link-active {
            color: rgb(251, 255, 0);
        }
    }
    .decor_bg {
        width: 100%;
    }
}
</style>
