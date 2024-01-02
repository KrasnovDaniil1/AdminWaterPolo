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
        {
            path: "/student",
            name: "student",
            component: () => import("../views/Student.vue"),
        },
        {
            path: "/federation",
            name: "federation",
            component: () => import("../views/Federation.vue"),
        },
        {
            path: "/medio",
            name: "medio",
            component: () => import("../views/Medio.vue"),
        },
        {
            path: "/news",
            name: "news",
            component: () => import("../views/News.vue"),
        },
    ],
});

export default router;
