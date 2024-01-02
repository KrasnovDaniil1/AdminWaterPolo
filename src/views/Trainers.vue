<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import SaveImage from "../components/SaveImage.vue";
export default {
    components: {
        SaveImage,
    },
    setup() {
        const store = useStore();

        const modelActive = ref(false);
        const newTrainer = ref({
            src: "",
            name: "",
            phone_number: "",
            info: "",
            vk: "",
            telegram: "",
            train: [],
        });
        const clearNewTrainer = () => {
            modelActive.value = false;
            newTrainer.value = {
                src: "",
                name: "",
                phone_number: "",
                info: "",
                vk: "",
                telegram: "",
                train: [],
            };
        };
        const addTrainer = () => {
            modelActive.value = false;
            clearNewTrainer();
        };
        return {
            store,

            newTrainer,
            modelActive,
            trainers: computed(() => store.getters.getData.trainers),
            clearNewTrainer,
            addTrainer,
        };
    },
};
</script>
<template>
    <div class="trainers">
        {{ newTrainer }}
        <div class="d-flex justify-content-between align-items-center">
            <h4>Тренеры:</h4>
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
                @parentNewImage="(e) => (newTrainer.src = e)"
            />
            <nav class="d-flex flex-column justify-content-between col-7">
                <label class="d-flex">
                    <span class="input-group-text">И.Ф.О:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newTrainer.name"
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Телефон:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newTrainer.phone_number"
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">ВК:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newTrainer.vk"
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Телеграм:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newTrainer.telegram"
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Описание:</span>
                    <textarea
                        type="text"
                        class="form-control"
                        v-model="newTrainer.info"
                    />
                </label>
                <div class="d-flex justify-content-between">
                    <label class="d-flex align-items-center">
                        <span class="input-group-text">Дети:</span>
                        <input
                            type="checkbox"
                            class="form-check-input mx-2"
                            value="children"
                            v-model="newTrainer.train"
                        />
                    </label>
                    <label class="d-flex align-items-center">
                        <span class="input-group-text">Любители:</span>
                        <input
                            type="checkbox"
                            class="form-check-input mx-2"
                            value="amateur"
                            v-model="newTrainer.train"
                        />
                    </label>
                    <label class="d-flex align-items-center">
                        <span class="input-group-text">Студенты:</span>
                        <input
                            type="checkbox"
                            class="form-check-input mx-2"
                            value="student"
                            v-model="newTrainer.train"
                        />
                    </label>
                </div>
            </nav>
            <div class="d-flex flex-column justify-content-between col-2 my-2">
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addTrainer"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-info"
                    @click="clearNewTrainer"
                >
                    Отменить
                </button>
            </div>
        </div>
        <div
            class="d-flex justify-content-between bg-main p-3 br-10 my-2"
            v-for="(item, index) in trainers"
            :key="index"
        >
            <img
                :src="item.src"
                class="col-2 br-10"
                style="aspect-ratio: 520/720"
            />
            <nav class="col-7 d-flex flex-column justify-content-between">
                <label class="d-flex">
                    <span class="input-group-text">И.Ф.О:</span>
                    <input
                        type="text"
                        class="form-control"
                        :value="item.name"
                        disabled
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Телефон:</span>
                    <input
                        type="text"
                        class="form-control"
                        :value="item.phone_number"
                        disabled
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">ВК:</span>
                    <input
                        type="text"
                        class="form-control"
                        :value="item.vk"
                        disabled
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Телеграм:</span>
                    <input
                        type="text"
                        class="form-control"
                        :value="item.telegram"
                        disabled
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Описание:</span>
                    <textarea
                        type="text"
                        class="form-control"
                        :placeholder="item.info"
                        disabled
                    />
                </label>
                <div class="d-flex justify-content-between">
                    <label class="d-flex align-items-center">
                        <span class="input-group-text">Дети:</span>
                        <input
                            type="checkbox"
                            class="form-check-input mx-2"
                            :checked="item.train.includes('children')"
                            disabled
                        />
                    </label>
                    <label class="d-flex align-items-center">
                        <span class="input-group-text">Любители:</span>
                        <input
                            type="checkbox"
                            class="form-check-input mx-2"
                            :checked="item.train.includes('amateur')"
                            disabled
                        />
                    </label>
                    <label class="d-flex align-items-center">
                        <span class="input-group-text">Студенты:</span>
                        <input
                            type="checkbox"
                            class="form-check-input mx-2"
                            :checked="item.train.includes('student')"
                            disabled
                        />
                    </label>
                </div>
            </nav>
            <div class="d-flex flex-column justify-content-between col-2">
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="deleteTrainer(1)"
                >
                    Удалить
                </button>
            </div>
        </div>
    </div>
</template>
