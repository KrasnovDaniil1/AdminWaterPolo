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
        const changeActive = ref();
        const oldTrainer = ref({
            src: "",
            name: "",
            phone_number: "",
            info: "",
            vk: "",
            telegram: "",
            delTrain: [],
            addTrain: [],
        });
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
            store.dispatch("actAddTrainer", newTrainer.value);
            modelActive.value = false;
            clearNewTrainer();
        };
        const changeTrainer = (id, item) => {
            store.dispatch("actChangeTrainer", {
                id: id,
                item: oldTrainer.value,
            });
            cancelChangeTrainer();
        };
        const deleteTrainer = (id) => {
            store.dispatch("actDeleteTrainer", id);
            cancelChangeTrainer();
        };
        const cancelChangeTrainer = () => {
            oldTrainer.value = {
                src: "",
                name: "",
                phone_number: "",
                info: "",
                vk: "",
                telegram: "",
                train: [],
            };
            changeActive.value = -1;
        };

        const lookCheckbox = (e) => {
            if (e.checked) {
                oldTrainer.value.addTrain.push(e.value);
                let index = oldTrainer.value.delTrain.indexOf(e.value);
                if (index != -1) {
                    oldTrainer.value.delTrain.splice(index, 1);
                }
            } else {
                oldTrainer.value.delTrain.push(e.value);
                let index = oldTrainer.value.addTrain.indexOf(e.value);
                if (index != -1) {
                    oldTrainer.value.addTrain.splice(index, 1);
                }
            }
        };
        return {
            changeActive,
            store,
            newTrainer,
            oldTrainer,
            modelActive,
            trainers: computed(() => store.getters.getData.trainers),
            lookCheckbox,
            cancelChangeTrainer,
            changeTrainer,
            clearNewTrainer,
            addTrainer,
            deleteTrainer,
        };
    },
};
</script>
<template>
    <div class="trainers">
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
                :dis="false"
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
            <SaveImage
                class="col-2"
                :image="item.src"
                :dis="changeActive != index"
                @parentNewImage="(e) => (oldTrainer.src = e)"
            />
            <nav class="col-7 d-flex flex-column justify-content-between">
                <label class="d-flex">
                    <span class="input-group-text">И.Ф.О:</span>
                    <input
                        type="text"
                        class="form-control"
                        :value="item.name"
                        :disabled="changeActive != index"
                        @change="oldTrainer.name = $event.target.value"
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Телефон:</span>
                    <input
                        type="text"
                        class="form-control"
                        :value="item.phone_number"
                        :disabled="changeActive != index"
                        @change="oldTrainer.phone_number = $event.target.value"
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">ВК:</span>
                    <input
                        type="text"
                        class="form-control"
                        :value="item.vk"
                        :disabled="changeActive != index"
                        @change="oldTrainer.vk = $event.target.value"
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Телеграм:</span>
                    <input
                        type="text"
                        class="form-control"
                        :value="item.telegram"
                        :disabled="changeActive != index"
                        @change="oldTrainer.telegram = $event.target.value"
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Описание:</span>
                    <textarea
                        type="text"
                        class="form-control"
                        :disabled="changeActive != index"
                        @change="oldTrainer.info = $event.target.value"
                        v-model="item.info"
                    >
                    </textarea>
                </label>
                <div class="d-flex justify-content-between">
                    <label class="d-flex align-items-center">
                        <span class="input-group-text">Дети:</span>
                        <input
                            type="checkbox"
                            class="form-check-input mx-2"
                            value="children"
                            :checked="item.train.includes('children')"
                            :disabled="changeActive != index"
                            @change="lookCheckbox($event.target)"
                        />
                    </label>
                    <label class="d-flex align-items-center">
                        <span class="input-group-text">Любители:</span>
                        <input
                            type="checkbox"
                            class="form-check-input mx-2"
                            value="amateur"
                            :checked="item.train.includes('amateur')"
                            :disabled="changeActive != index"
                            @change="lookCheckbox($event.target)"
                        />
                    </label>
                    <label class="d-flex align-items-center">
                        <span class="input-group-text">Студенты:</span>
                        <input
                            type="checkbox"
                            class="form-check-input mx-2"
                            value="student"
                            :checked="item.train.includes('student')"
                            :disabled="changeActive != index"
                            @change="lookCheckbox($event.target)"
                        />
                    </label>
                </div>
            </nav>
            <div class="d-flex flex-column justify-content-between col-2">
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="deleteTrainer(index)"
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
                    @click="changeTrainer(index, item)"
                    v-if="changeActive == index"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-warning"
                    @click="cancelChangeTrainer()"
                    v-if="changeActive == index"
                >
                    Отменить
                </button>
            </div>
        </div>
    </div>
</template>
