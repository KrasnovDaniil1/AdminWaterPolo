<script>
import { ref } from "vue";
export default {
    props: {
        videos: Array,
        activeChange: Boolean,
    },
    setup(props, context) {
        const newVideos = ref([]);
        const oldVideos = ref(props.videos);
        const video = ref();

        const showPreview = () => {
            newVideos.value.push(video.value);
            context.emit("parentNewVideos", newVideos.value);
        };
        const deleteOldVideos = (id) => {
            oldVideos.value.splice(id, 1);
            context.emit("parentOldVideos", oldVideos.value);
        };
        const deleteNewVideos = (id) => {
            newVideos.value.splice(id, 1);
            context.emit("parentNewVideos", newVideos.value);
        };
        return {
            video,
            newVideos,
            oldVideos,
            showPreview,
            deleteOldVideos,
            deleteNewVideos,
        };
    },
};
</script>

<template>
    <div class="d-flex flex-wrap m-3">
        <label class="d-flex col-12">
            <span class="input-group-text">Ссылка на видео:</span>
            <input
                type="text"
                class="form-control"
                v-model="video"
                :disabled="!activeChange"
            />
            <button
                type="button"
                class="btn btn-outline-primary"
                @click="showPreview()"
                v-if="activeChange"
            >
                Добавить
            </button>
        </label>
        <div
            class="video_block col-3 p-2 d-flex justify-content-center align-items-center position-relative"
            v-for="(item, index) in newVideos"
            :key="index"
        >
            <div class="video w-100" style="aspect-ratio: 16/9" v-html="item" />
            <div
                class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
                style="background: rgba(0, 0, 0, 0.5)"
                v-if="activeChange"
            >
                <button
                    type="button"
                    class="btn btn-danger"
                    @click="deleteNewVideos(index)"
                >
                    Удалить
                </button>
            </div>
        </div>
        <div
            class="video_block col-3 p-2 d-flex justify-content-center align-items-center position-relative"
            v-for="(item, index) in oldVideos"
            :key="index"
        >
            <div class="video w-100" style="aspect-ratio: 16/9" v-html="item" />
            <div
                class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
                style="background: rgba(0, 0, 0, 0.5)"
                v-if="activeChange"
            >
                <button
                    type="button"
                    class="btn btn-danger"
                    @click="deleteOldVideos(index)"
                >
                    Удалить
                </button>
            </div>
        </div>
    </div>
</template>
