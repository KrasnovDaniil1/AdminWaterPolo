<script>
import AllImages from "../components/AllImages.vue";

import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { QuillEditor } from "@vueup/vue-quill";

import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
    components: {
        AllImages,
        QuillEditor,
    },
    setup() {
        const store = useStore();
        const page = "pageMedio";
        const saveActive = ref("none");
        const modelActive = ref(false);

        const newMedio = ref({
            title: "",
            time: "",
            place: "",
            msg: "",
            oldImages: [],
            newImages: [],
        });

        const changeNewImage = (items) => {
            newMedio.value.newImages = items;
        };
        const changeOldImage = (items) => {
            newMedio.value.oldImages = items;
        };

        const changeMedio = (id) => {
            store.dispatch("actChangeMedio", {
                id,
                page,
                item: newMedio.value,
            });
            saveActive.value = "none";
            clearNewMedio();
        };

        const deleteMedio = (id) => {
            store.dispatch("actDeleteMedio", {
                id,
                page,
            });
            saveActive.value = "none";
            clearNewMedio();
        };

        const addMedio = () => {
            store.dispatch("actAddMedio", {
                page,
                item: newMedio.value,
            });
            modelActive.value = false;
            clearNewMedio();
        };
        const clearNewMedio = () => {
            newMedio.value = {
                title: "",
                time: "",
                place: "",
                msg: "",
                oldImages: [],
                newImages: [],
            };
        };

        onMounted(async () => {
            await store.dispatch("actPage", "pageMedio");
        });
        return {
            newMedio,
            store,
            saveActive,
            modelActive,
            page,
            clearNewMedio,
            changeNewImage,
            changeOldImage,
            changeMedio,
            deleteMedio,
            addMedio,
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
        <div class="model bg-main p-1 my-5 br-10" v-if="modelActive">
            <nav class="d-flex justify-content-evenly col-12 my-2">
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addMedio()"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="modelActive = false"
                >
                    Отменить
                </button>
            </nav>
            <div class="d-flex p-3">
                <label class="d-flex col-5">
                    <span class="input-group-text">Заголовок:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newMedio.title"
                    />
                </label>
                <label class="d-flex col-3 px-3">
                    <span class="input-group-text">Дата:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newMedio.time"
                    />
                </label>
                <label class="d-flex col-4">
                    <span class="input-group-text">Место:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newMedio.place"
                    />
                </label>
            </div>
            <QuillEditor
                theme="snow"
                toolbar="essential"
                style="height: 300px"
                class="bg-light fs-5"
                contentType="html"
                v-model:content="newMedio.msg"
            />
            <AllImages
                :activeChange="true"
                @parentNewImage="changeNewImage"
                @parentOldImage="changeOldImage"
            />
        </div>
        <div
            v-for="(item, index) in pageMedio.medio"
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
                    @click="changeMedio(index)"
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
                    @click="deleteMedio(index)"
                >
                    Удалить
                </button>
            </nav>
            <div class="d-flex p-3">
                <label class="d-flex col-5">
                    <span class="input-group-text">Заголовок:</span>
                    <input
                        type="text"
                        class="form-control"
                        :disabled="saveActive != index"
                        :value="item.title"
                        @change="newMedio.title = $event.target.value"
                    />
                </label>
                <label class="d-flex col-3 px-3">
                    <span class="input-group-text">Дата:</span>
                    <input
                        type="text"
                        class="form-control"
                        :disabled="saveActive != index"
                        :value="item.time"
                        @change="newMedio.time = $event.target.value"
                    />
                </label>
                <label class="d-flex col-4">
                    <span class="input-group-text">Место:</span>
                    <input
                        type="text"
                        class="form-control"
                        :disabled="saveActive != index"
                        :value="item.place"
                        @change="newMedio.place = $event.target.value"
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
                v-model:content="newMedio.msg"
            />
            <AllImages
                :activeChange="saveActive == index"
                :images="item.images"
                @parentNewImage="changeNewImage"
                @parentOldImage="changeOldImage"
            />
        </div>
    </section>
</template>
