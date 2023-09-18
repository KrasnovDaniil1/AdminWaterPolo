<script>
import AllImages from "../components/AllImages.vue";

import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
// import { QuillEditor } from "@vueup/vue-quill";
// import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
    components: {
        AllImages,
        // QuillEditor,
    },
    setup() {
        const store = useStore();
        const page = "pageAmateur";
        const saveActive = ref("none");
        const modelActive = ref(false);

        const newMedio = ref({
            title: "",
            time: "",
            place: "",
            msg: "",
            images: [],
        });
        const oldImage = ref([]);
        const newImage = ref([]);

        const changeNewImage = (items) => {
            newImage.value = items;
            console.log("Новые картинки", newImage.value);
        };
        const changeOldImage = (items) => {
            oldImage.value = items;
            console.log("Старые картинки", oldImage.value);
        };

        const changeMedio = () => {
            console.log(newImage.value, oldImage, value);
        };

        onMounted(async () => {
            await store.dispatch("actPage", "pageMedio");
        });
        return {
            newMedio,
            store,
            saveActive,
            modelActive,
            oldImage,
            newImage,
            changeNewImage,
            changeOldImage,
            changeMedio,
            pageMedio: computed(() => store.getters.getPageMedio),
        };
    },
};
</script>

<template>
    <section>
        <div class="d-flex justify-content-between align-items-start">
            <h4>Медио:</h4>
            <button
                type="button"
                class="btn btn-outline-primary"
                @click="modelActive = true"
            >
                + Добавить
            </button>
        </div>
        <div class="model"></div>
        <div
            v-for="(item, index) in pageMedio.medio"
            :key="index"
            class="bg-main p-1 my-3 br-10"
        >
            <nav
                class="d-flex justify-content-evenly col-12 my-3"
                v-if="saveActive == index"
            >
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="changeMedio"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="saveActive = 'none'"
                >
                    Отменить
                </button>
            </nav>
            <nav class="d-flex justify-content-evenly col-12 my-3" v-else>
                <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="saveActive = index"
                >
                    Редактировать
                </button>
                <button type="button" class="btn btn-outline-danger">
                    Удалить
                </button>
            </nav>

            <AllImages
                :activeChange="saveActive == index"
                :images="item.images"
                @parentNewImage="changeNewImage"
                @parentOldImage="changeOldImage"
            />
        </div>
        <!-- <nav class="d-flex my-3">
            <label class="d-flex col-4">
                <span class="input-group-text">Заголовок:</span>
                <input type="text" class="form-control" />
            </label>
            <label class="d-flex col-4 px-3">
                <span class="input-group-text">Дата:</span>
                <input type="text" class="form-control" />
            </label>
            <label class="d-flex col-4">
                <span class="input-group-text">Место:</span>
                <input type="text" class="form-control" />
            </label>
        </nav>
        <QuillEditor
            theme="snow"
            toolbar="essential"
            style="height: 500px"
            :readOnly="false"
            v-model:content="newMedio.images"
        /> -->
    </section>
</template>
