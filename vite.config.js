import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [vue()],
//     resolve: {
//         alias: {
//             "@": fileURLToPath(new URL("./src", import.meta.url)),
//         },
//     },
//     base: "",
// });
export default defineConfig({
    plugins: [vue()],
    build: {
        //cssCodeSplit: false, --- если нужно
        //jsCodeSplit: false,  --- если нужно
        // copyPublicDir: true,
        rollupOptions: {
            output: {
                dir: "./admin", //---- определяем КУДА нужно
                assetFileNames: "admin.css",
                entryFileNames: "admin.js",
            },
        },
        emptyDir: true,
    },

    // resolve: {
    //     alias: {
    //         "@": fileURLToPath(new URL("./src", import.meta.url)),
    //     },
    // },
});
