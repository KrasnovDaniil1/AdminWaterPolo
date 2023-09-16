<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref } from "vue";
export default {
    name: "UploadAllImage",
    components: {
        QuillEditor,
    },

    setup() {
        const previewImage = ref([]);
        const activeChange = ref(false);

        const showPreview = (e) => {
            if (e.target.files.length > 0) {
                for (const key in e.target.files) {
                    previewImage.value.push(
                        URL.createObjectURL(e.target.files[key])
                    );
                }
            }
        };
        return {
            previewImage,
            activeChange,
            showPreview,
        };
    },
};
</script>

<template>
    <div class="bg-main p-3">
        <div class="d-flex flex-wrap br-10">
            <nav class="d-flex col-12">
                <input
                    type="file"
                    class="form-control"
                    :disabled="!activeChange"
                    @change="showPreview"
                    multiple
                />
                <div v-if="activeChange" class="d-flex">
                    <button type="button" class="btn btn-outline-primary mx-3">
                        Сохранить
                    </button>
                    <button
                        type="button"
                        class="btn btn-outline-danger"
                        @click="activeChange = false"
                    >
                        Отменить
                    </button>
                </div>
                <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="activeChange = true"
                    v-else
                >
                    Редактировать
                </button>
            </nav>
            <div
                class="col-3 p-2 d-flex justify-content-center align-items-center position-relative"
                style="aspect-ratio: 16/9"
                v-for="(item, index) in previewImage"
                :key="index"
            >
                <img :src="item" />
                <div
                    class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
                    style="background: rgba(0, 0, 0, 0.5)"
                    v-if="activeChange"
                >
                    <button type="button" class="btn btn-danger">
                        Удалить
                    </button>
                </div>
            </div>
        </div>
        <nav class="d-flex my-3">
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
    </div>
    <QuillEditor
        theme="snow"
        toolbar="essential"
        style="height: 500px"
        :readOnly="false"
        v-model:content=""
    />
</template>
