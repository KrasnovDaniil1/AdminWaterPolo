import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "amateur",
            component: () => import("../views/Amateur.vue"),
        },
        {
            path: "/children",
            name: "children",
            component: () => import("../views/Children.vue"),
        },
    ],
});

export default router;
