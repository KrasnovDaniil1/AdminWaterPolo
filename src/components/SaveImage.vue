<script>
import { ref } from "vue";

export default {
    props: {
        image: {
            type: String,
            default:
                "https://w7.pngwing.com/pngs/259/411/png-transparent-computer-icons-text-information-link-blue-angle-text-thumbnail.png",
        },
        dis: {
            type: Boolean,
            default: true,
        },
    },
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
            :disabled="dis"
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
            :src="image"
            v-else
        />
        <button
            type="button"
            class="btn btn-danger"
            @click="deleteImage()"
            :disabled="dis"
        >
            Удалить картинку
        </button>
    </label>
</template>
