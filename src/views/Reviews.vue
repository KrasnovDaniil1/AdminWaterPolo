<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        const changeActive = ref();
        const oldReview = ref({
            text: "",
            name: "",
        });
        const modelActive = ref(false);
        const newReview = ref({
            text: "",
            name: "",
        });
        const clearNewReview = () => {
            modelActive.value = false;
            newReview.value = {
                text: "",
                name: "",
            };
        };
        const addReview = () => {
            store.dispatch("actAddReview", newReview.value);
            modelActive.value = false;
            clearNewReview();
        };
        const changeReview = (id) => {
            store.dispatch("actChangeReview", {
                id: id,
                item: oldReview.value,
            });
            cancelChangeReview();
        };
        const deleteReview = (id) => {
            store.dispatch("actDeleteReview", id);
            cancelChangeReview();
        };
        const cancelChangeReview = () => {
            oldReview.value = {
                text: "",
                name: "",
            };
            changeActive.value = -1;
        };

        return {
            changeActive,
            store,
            newReview,
            oldReview,
            modelActive,
            reviews: computed(() => store.getters.getData.reviews),
            cancelChangeReview,
            changeReview,
            clearNewReview,
            addReview,
            deleteReview,
        };
    },
};
</script>
<template>
    <div class="member">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Отзывы:</h4>
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
            <nav class="d-flex flex-column justify-content-between col-7">
                <label class="d-flex">
                    <span class="input-group-text">И.Ф:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newReview.name"
                    />
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">Отзыв:</span>
                    <textarea
                        type="text"
                        class="form-control"
                        v-model="newReview.text"
                    />
                </label>
            </nav>
            <div class="d-flex flex-column justify-content-between col-2 my-2">
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addReview"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-info"
                    @click="clearnewReview"
                >
                    Отменить
                </button>
            </div>
        </div>
        <div
            class="d-flex justify-content-between bg-main p-3 br-10 my-2"
            v-for="(item, index) in reviews"
            :key="index"
        >
            <nav class="col-7 d-flex flex-column justify-content-between">
                <label class="d-flex">
                    <span class="input-group-text">И.Ф:</span>
                    <input
                        type="text"
                        class="form-control"
                        :value="item.name"
                        :disabled="changeActive != index"
                        @change="oldReview.name = $event.target.value"
                    />
                </label>

                <label class="d-flex mt-3">
                    <span class="input-group-text">Отзыв:</span>
                    <textarea
                        type="text"
                        class="form-control"
                        :disabled="changeActive != index"
                        @change="oldReview.text = $event.target.value"
                        v-model="item.text"
                    >
                    </textarea>
                </label>
            </nav>
            <div class="d-flex flex-column justify-content-between col-2">
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="deleteReview(index)"
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
                    @click="changeReview(index)"
                    v-if="changeActive == index"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-warning"
                    @click="cancelChangeReview()"
                    v-if="changeActive == index"
                >
                    Отменить
                </button>
            </div>
        </div>
    </div>
</template>
