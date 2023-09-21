<script>
import AllImages from "../components/AllImages.vue";
import AllVideos from "../components/AllVideos.vue";

import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { QuillEditor } from "@vueup/vue-quill";

import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
    components: {
        AllImages,
        AllVideos,
        QuillEditor,
    },
    setup() {
        const store = useStore();
        const page = "pageNews";
        const saveActive = ref("none");
        const modelActive = ref(false);

        const newNews = ref({
            title: "",
            time: "",
            msg: "",
            oldImages: [],
            newImages: [],
            oldVideos: [],
            newVideos: [],
        });

        const changeNewImage = (items) => {
            newNews.value.newImages = items;
        };
        const changeOldImage = (items) => {
            newNews.value.oldImages = items;
        };
        const changeNewVideo = (items) => {
            newNews.value.newVideos = items;
        };
        const changeOldVideo = (items) => {
            newNews.value.oldVideos = items;
        };

        const changeNews = (id) => {
            store.dispatch("actChangeNews", {
                id,
                page,
                item: newNews.value,
            });
            saveActive.value = "none";
            clearNewNews();
        };
        const deleteNews = (id) => {
            store.dispatch("actDeleteNews", {
                id,
                page,
            });
            saveActive.value = "none";
            clearNewNews();
        };
        const addNews = () => {
            store.dispatch("actAddNews", {
                page,
                item: newNews.value,
            });
            modelActive.value = false;
            clearNewNews();
        };
        const clearNewNews = () => {
            newNews.value = {
                title: "",
                time: "",
                msg: "",
                oldImages: [],
                newImages: [],
                oldVideos: [],
                newVideos: [],
            };
        };
        const cancelNewNews = () => {
            window.location.reload();
        };
        onMounted(async () => {
            await store.dispatch("actPage", "pageNews");
        });
        return {
            newNews,
            store,
            saveActive,
            modelActive,
            page,
            cancelNewNews,
            changeNews,
            deleteNews,
            addNews,
            clearNewNews,
            changeNewImage,
            changeOldImage,
            changeNewVideo,
            changeOldVideo,
            pageNews: computed(() => store.getters.getPageNews),
        };
    },
};
</script>

<template>
    <section>
        <div class="d-flex justify-content-between align-items-start">
            <h4>Новости:</h4>
            <button
                type="button"
                class="btn btn-outline-primary"
                @click="modelActive = true"
            >
                + Добавить
            </button>
        </div>
        <div class="model bg-main p-1 my-5 br-10" v-if="modelActive">
            <nav class="d-flex justify-content-evenly col-12 my-2">
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addNews()"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="cancelNewNews()"
                >
                    Отменить
                </button>
            </nav>
            <div class="d-flex p-3">
                <label class="d-flex col-6">
                    <span class="input-group-text">Заголовок:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newNews.title"
                    />
                </label>
                <label class="d-flex col-6 px-3">
                    <span class="input-group-text">Дата:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newNews.time"
                    />
                </label>
            </div>
            <QuillEditor
                theme="snow"
                toolbar="essential"
                style="height: 300px"
                class="bg-light fs-5"
                contentType="html"
                v-model:content="newNews.msg"
            />
            <AllImages
                :activeChange="true"
                @parentNewImage="changeNewImage"
                @parentOldImage="changeOldImage"
            />
            <AllVideos
                :activeChange="true"
                @parentNewVideos="changeNewVideo"
                @parentOldVideos="changeOldVideo"
            />
        </div>
        <div
            v-for="(item, index) in pageNews.news"
            :key="index"
            class="bg-main p-1 my-5 br-10"
        >
            <nav
                class="d-flex justify-content-evenly col-12 my-2"
                v-if="saveActive == index"
            >
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="changeNews(index)"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="cancelNewNews()"
                >
                    Отменить
                    <!-- @click="saveActive = 'none'" -->
                </button>
            </nav>
            <nav class="d-flex justify-content-evenly col-12 my-2" v-else>
                <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="saveActive = index"
                >
                    Редактировать
                </button>
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="deleteNews(index)"
                >
                    Удалить
                </button>
            </nav>
            <div class="d-flex p-3">
                <label class="d-flex col-6">
                    <span class="input-group-text">Заголовок:</span>
                    <input
                        type="text"
                        class="form-control"
                        :disabled="saveActive != index"
                        :value="item.title"
                        @change="newNews.title = $event.target.value"
                    />
                </label>
                <label class="d-flex col-6 px-3">
                    <span class="input-group-text">Дата:</span>
                    <input
                        type="text"
                        class="form-control"
                        :disabled="saveActive != index"
                        :value="item.time"
                        @change="newNews.time = $event.target.value"
                    />
                </label>
            </div>
            <div
                class="bg-light mx-3 p-2 br-10"
                v-html="item.msg"
                v-if="saveActive != index"
            ></div>

            <QuillEditor
                v-if="saveActive == index"
                theme="snow"
                toolbar="essential"
                style="height: 300px"
                class="bg-light fs-5"
                contentType="html"
                :content="item.msg"
                v-model:content="newNews.msg"
            />
            <AllImages
                :activeChange="saveActive == index"
                :images="item.images"
                @parentNewImage="changeNewImage"
                @parentOldImage="changeOldImage"
            />
            <AllVideos
                :activeChange="saveActive == index"
                :videos="item.videos"
                @parentNewVideos="changeNewVideo"
                @parentOldVideos="changeOldVideo"
            />
        </div>
    </section>
</template>
