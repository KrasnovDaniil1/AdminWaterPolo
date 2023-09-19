<script>
import { ref } from "vue";
export default {
    props: {
        images: Array,
        activeChange: Boolean,
    },
    setup(props, context) {
        const previewImage = ref([]);
        const newImage = ref([]);
        const oldImage = ref(props.images);

        const showPreview = (e) => {
            if (e.target.files.length > 0) {
                for (let item of e.target.files) {
                    newImage.value.push(item);
                    const file = item;
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function (i) {
                        previewImage.value.push(i.target.result);
                    };
                }
                context.emit("parentNewImage", newImage.value);
            }
        };
        const deleteOldImage = (id) => {
            oldImage.value.splice(id, 1);
            context.emit("parentOldImage", oldImage.value);
        };
        const deleteNewImage = (id) => {
            newImage.value.splice(id, 1);
            previewImage.value.splice(id, 1);
            context.emit("parentNewImage", newImage.value);
        };
        return {
            previewImage,
            oldImage,
            newImage,
            showPreview,
            deleteOldImage,
            deleteNewImage,
        };
    },
};
</script>

<template>
    <div class="d-flex flex-wrap m-3">
        <input
            type="file"
            class="form-control col-12"
            accept="image/*"
            :disabled="!activeChange"
            @change="showPreview"
            multiple
        />
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
                <button
                    type="button"
                    class="btn btn-danger"
                    @click="deleteNewImage(index)"
                >
                    Удалить
                </button>
            </div>
        </div>
        <div
            class="col-3 p-2 d-flex justify-content-center align-items-center position-relative"
            style="aspect-ratio: 16/9"
            v-for="(item, index) in oldImage"
            :key="index"
        >
            <img :src="item" />
            <div
                class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
                style="background: rgba(0, 0, 0, 0.5)"
                v-if="activeChange"
            >
                <button
                    type="button"
                    class="btn btn-danger"
                    @click="deleteOldImage(index)"
                >
                    Удалить
                </button>
            </div>
        </div>
    </div>
</template>
