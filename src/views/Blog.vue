<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { QuillEditor } from "@vueup/vue-quill";

import SaveImage from "../components/SaveImage.vue";
export default {
    components: {
        SaveImage,
        QuillEditor,
    },
    setup() {
        const store = useStore();
        const changeActive = ref();
        const oldBlog = ref({
            title: "",
            time: "",
            msg: "",
            src: "",
            category: "",
        });
        const modelActive = ref(false);
        const newBlog = ref({
            title: "",
            time: "",
            msg: "",
            src: "",
            category: "",
        });
        const clearnewBlog = () => {
            modelActive.value = false;
            newBlog.value = {
                title: "",
                time: "",
                msg: "",
                src: "",
                category: "",
            };
        };
        const addBlog = () => {
            store.dispatch("actAddBlog", newBlog.value);
            modelActive.value = false;
            clearnewBlog();
        };
        // const changeTrainer = (id, item) => {
        //     store.dispatch("actChangeTrainer", {
        //         id: id,
        //         item: oldBlog.value,
        //     });
        //     cancelChangeTrainer();
        // };
        // const deleteTrainer = (id) => {
        //     store.dispatch("actDeleteTrainer", id);
        //     cancelChangeTrainer();
        // };
        const cancelChangeBlog = () => {
            oldBlog.value = {
                title: "",
                time: "",
                msg: "",
                src: "",
                category: "",
            };
            changeActive.value = -1;
        };

        return {
            changeActive,
            store,
            newBlog,
            oldBlog,
            modelActive,
            blog: computed(() => store.getters.getData.blog),
            addBlog,
            cancelChangeBlog,
            // changeTrainer,
            clearnewBlog,
            // addTrainer,
            // deleteTrainer,
        };
    },
};
</script>
<template>
    <div class="trainers">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Блог:</h4>
            <button
                type="button"
                class="btn btn-outline-primary"
                @click="modelActive = true"
            >
                + Добавить
            </button>
        </div>
        <div
            class="bg-main d-flex my-3 p-3 br-10 justify-content-between"
            v-if="modelActive"
        >
            <SaveImage
                class="col-2"
                @parentNewImage="(e) => (newBlog.src = e)"
                :dis="false"
            />
            <nav class="d-flex flex-column justify-content-between col-7">
                <label class="d-flex">
                    <span class="input-group-text">Название:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newBlog.title"
                    />
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">Время:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newBlog.time"
                    />
                </label>

                <label class="d-flex mt-3">
                    <span class="input-group-text">Категория:</span>
                    <select class="form-select" v-model="newBlog.category">
                        <option selected value="children">Дети</option>
                        <option value="amateur">Любители</option>
                        <option value="federation">Федерация</option>
                        <option value="stufrnt">Студенты</option>
                    </select>
                </label>
                <label class="d-flex flex-column mt-3">
                    <QuillEditor
                        theme="snow"
                        toolbar="essential"
                        style="height: 300px"
                        class="bg-light fs-5"
                        contentType="html"
                        v-model:content="newBlog.msg"
                    />
                </label>
            </nav>
            <div class="d-flex flex-column justify-content-between col-2 my-2">
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addBlog"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-info"
                    @click="clearnewBlog"
                >
                    Отменить
                </button>
            </div>
        </div>
    </div>
</template>
