<script>
import { ref } from "vue";

export default {
    setup(props, context) {
        const previewImage = ref();
        const newImage = ref();

        const showPreview = (e) => {
            if (e.target.files.length > 0) {
                newImage.value = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = function (i) {
                    previewImage.value = i.target.result;
                };
            }
            context.emit("parentNewImage", newImage.value);
        };

        const deleteImage = () => {
            newImage.value = "";
            previewImage.value = "";
            context.emit("parentNewImage", newImage.value);
        };
        return {
            newImage,
            previewImage,
            showPreview,
            deleteImage,
        };
    },
};
</script>

<template>
    <label class="d-flex flex-column">
        <input
            type="file"
            class="form-control"
            accept="image/*"
            @change="showPreview"
        />
        <img
            class="br-10 my-3"
            style="width: 100%; aspect-ratio: 520/720"
            :src="previewImage"
            v-if="previewImage"
        />
        <img
            class="br-10 my-3"
            style="width: 100%; aspect-ratio: 520/720"
            src="https://w7.pngwing.com/pngs/259/411/png-transparent-computer-icons-text-information-link-blue-angle-text-thumbnail.png"
            v-else
        />
        <button type="button" class="btn btn-danger" @click="deleteImage()">
            Удалить картинку
        </button>
    </label>
</template>
