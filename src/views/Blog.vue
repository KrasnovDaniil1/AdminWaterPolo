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
        const changeBlog = (id) => {
            store.dispatch("actChangeBlog", {
                id: id,
                item: oldBlog.value,
            });
            cancelChangeBlog();
        };
        const deleteBlog = (id) => {
            store.dispatch("actDeleteBlog", id);
            cancelChangeBlog();
        };
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
            changeBlog,
            deleteBlog,
            clearnewBlog,
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
                        <option value="student">Студенты</option>
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
        <div
            class="d-flex justify-content-between bg-main p-3 br-10 my-2"
            v-for="(item, index) in blog"
            :key="index"
        >
            <SaveImage
                class="col-2"
                :image="item.src"
                :dis="changeActive != index"
                @parentNewImage="(e) => (oldBlog.src = e)"
            />
            <nav class="col-7 d-flex flex-column justify-content-between">
                <label class="d-flex">
                    <span class="input-group-text">Название:</span>
                    <input
                        type="text"
                        class="form-control"
                        :value="item.title"
                        :disabled="changeActive != index"
                        @change="oldBlog.title = $event.target.value"
                    />
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">Время:</span>
                    <input
                        type="text"
                        class="form-control"
                        :value="item.time"
                        :disabled="changeActive != index"
                        @change="oldBlog.time = $event.target.value"
                    />
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">Категория:</span>
                    <select
                        class="form-select"
                        :disabled="changeActive != index"
                        @change="oldBlog.category = $event.target.value"
                    >
                        <option
                            :selected="item.category == 'children'"
                            value="children"
                        >
                            Дети
                        </option>
                        <option
                            :selected="item.category == 'amateur'"
                            value="amateur"
                        >
                            Любители
                        </option>
                        <option
                            :selected="item.category == 'federation'"
                            value="federation"
                        >
                            Федерация
                        </option>
                        <option
                            :selected="item.category == 'student'"
                            value="student"
                        >
                            Студенты
                        </option>
                    </select>
                </label>
                <label
                    class="d-flex flex-column mt-3"
                    v-if="changeActive == index"
                >
                    <QuillEditor
                        theme="snow"
                        toolbar="essential"
                        style="height: 300px"
                        class="bg-light fs-5"
                        contentType="html"
                        :content="item.msg"
                        v-model:content="oldBlog.msg"
                    />
                </label>
                <div
                    class="bg-light mt-3 p-2 br-10"
                    v-html="item.msg"
                    v-else
                ></div>
            </nav>
            <div class="d-flex flex-column justify-content-between col-2">
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="deleteBlog(item.id)"
                    v-if="changeActive == index"
                >
                    Удалить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="changeActive = index"
                    v-else
                >
                    Редактировать
                </button>
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="changeBlog(item.id)"
                    v-if="changeActive == index"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-warning"
                    @click="cancelChangeBlog()"
                    v-if="changeActive == index"
                >
                    Отменить
                </button>
            </div>
        </div>
    </div>
</template>
