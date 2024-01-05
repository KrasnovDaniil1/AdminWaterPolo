import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/admin/",
            name: "trainers",
            component: () => import("../views/Trainers.vue"),
        },
        {
            path: "/admin/members",
            name: "members",
            component: () => import("../views/Members.vue"),
        },
        {
            path: "/admin/reviews",
            name: "reviews",
            component: () => import("../views/Reviews.vue"),
        },
        {
            path: "/admin/price",
            name: "price",
            component: () => import("../views/Price.vue"),
        },
        // {
        //     path: "admin/",
        //     name: "amateur",
        //     component: () => import("../views/Amateur.vue"),
        // },
        // {
        //     path: "admin/children",
        //     name: "children",
        //     component: () => import("../views/Children.vue"),
        // },
        // {
        //     path: "admin/student",
        //     name: "student",
        //     component: () => import("../views/Student.vue"),
        // },
        // {
        //     path: "admin/federation",
        //     name: "federation",
        //     component: () => import("../views/Federation.vue"),
        // },
        // {
        //     path: "admin/news",
        //     name: "news",
        //     component: () => import("../views/News.vue"),
        // },
    ],
});

export default router;
