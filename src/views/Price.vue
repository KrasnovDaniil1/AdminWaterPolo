<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        const changeActive = ref();
        const oldPrice = ref({
            title: "",
            info: "",
            cost: "",
            category: "",
        });
        const modelActive = ref(false);
        const newPrice = ref({
            title: "",
            info: "",
            cost: "",
            category: "",
        });
        const clearNewPrice = () => {
            modelActive.value = false;
            newPrice.value = {
                title: "",
                info: "",
                cost: "",
                category: "",
            };
        };
        const addPrice = () => {
            store.dispatch("actAddPrice", newPrice.value);
            modelActive.value = false;
            clearNewPrice();
        };
        const changePrice = (id) => {
            store.dispatch("actChangePrice", {
                id: id,
                item: oldPrice.value,
            });
            cancelChangePrice();
        };
        const deletePrice = (id) => {
            store.dispatch("actDeletePrice", id);
            cancelChangePrice();
        };
        const cancelChangePrice = () => {
            oldPrice.value = {
                title: "",
                info: "",
                cost: "",
                category: "",
            };
            changeActive.value = -1;
        };

        return {
            changeActive,
            store,
            newPrice,
            oldPrice,
            modelActive,
            price: computed(() => store.getters.getData.price),
            cancelChangePrice,
            changePrice,
            clearNewPrice,
            addPrice,
            deletePrice,
        };
    },
};
</script>
<template>
    <div class="member">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Цены:</h4>
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
                    <span class="input-group-text">Название:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newPrice.title"
                    />
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">Количество занятий:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newPrice.info"
                    />
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">Стоимость:</span>
                    <input
                        type="number"
                        class="form-control"
                        v-model="newPrice.cost"
                    />
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">Категория:</span>
                    <select class="form-select" v-model="newPrice.category">
                        <option selected value="children">Дети</option>
                        <option value="amateur">Любители</option>
                    </select>
                </label>
            </nav>
            <div class="d-flex flex-column justify-content-between col-2 my-2">
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addPrice"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-info"
                    @click="clearNewPrice"
                >
                    Отменить
                </button>
            </div>
        </div>
        <div
            class="d-flex justify-content-between bg-main p-3 br-10 my-2"
            v-for="(item, index) in price"
            :key="index"
        >
            <nav class="col-7 d-flex flex-column justify-content-between">
                <label class="d-flex">
                    <span class="input-group-text">Название:</span>
                    <input
                        type="text"
                        class="form-control"
                        :value="item.title"
                        :disabled="changeActive != index"
                        @change="oldPrice.title = $event.target.value"
                    />
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">Количество занятий:</span>
                    <input
                        type="text"
                        class="form-control"
                        :value="item.info"
                        :disabled="changeActive != index"
                        @change="oldPrice.info = $event.target.value"
                    />
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">Стоимость:</span>
                    <input
                        type="number"
                        class="form-control"
                        :value="item.cost"
                        :disabled="changeActive != index"
                        @change="oldPrice.cost = $event.target.value"
                    />
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">Категория:</span>
                    <select
                        class="form-select"
                        :disabled="changeActive != index"
                        @change="oldPrice.category = $event.target.value"
                    >
                        <option
                            :selected="item.category == 'children'"
                            value="children"
                        >
                            Дети
                        </option>
                        <option
                            :selected="item.category == 'amateur'"
                            value="amateur"
                        >
                            Любители
                        </option>
                    </select>
                </label>
            </nav>

            <div class="d-flex flex-column justify-content-between col-2">
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="deletePrice(index)"
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
                    @click="changePrice(index)"
                    v-if="changeActive == index"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-warning"
                    @click="cancelChangePrice()"
                    v-if="changeActive == index"
                >
                    Отменить
                </button>
            </div>
        </div>
    </div>
</template>
