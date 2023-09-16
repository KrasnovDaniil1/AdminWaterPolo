<script>
import { ref } from "vue";
export default {
    props: {
        price: {
            type: Array,
        },
    },
    setup(props, context) {
        const modelActive = ref(false);
        const saveActive = ref("none");
        const newPrice = ref({
            title: "",
            price: "",
        });

        const clearNewPrice = () => {
            newPrice.value = {
                title: "",
                price: "",
            };
        };
        const changePrice = (id) => {
            context.emit("parentChangePrice", id, newPrice.value);
            saveActive.value = "none";
            clearNewPrice();
        };

        const addPrice = () => {
            context.emit("parentAddPrice", newPrice.value);
            modelActive.value = false;
            clearNewPrice();
        };
        return {
            modelActive,
            saveActive,
            newPrice,
            clearNewPrice,
            changePrice,
            addPrice,
        };
    },
};
</script>

<template>
    <div class="trainers">
        <div class="d-flex justify-content-between align-items-start">
            <h4>Цены:</h4>
            <button
                type="button"
                class="btn btn-outline-primary"
                @click="modelActive = true"
            >
                + Добавить
            </button>
        </div>
        <div class="model bg-main row py-3 my-2 br-10" v-if="modelActive">
            <label class="d-flex col-5">
                <span class="input-group-text">Предназначение:</span>
                <input
                    type="text"
                    class="form-control"
                    v-model="newPrice.title"
                />
            </label>
            <label class="d-flex col-3">
                <span class="input-group-text">Цена:</span>
                <input
                    type="number"
                    class="form-control"
                    v-model="newPrice.price"
                />
            </label>
            <div class="d-flex justify-content-end col-4">
                <button
                    type="button"
                    class="btn btn-outline-primary mx-2"
                    @click="addPrice"
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
            </div>
        </div>
        <div
            class="row bg-main py-2 my-3 br-10"
            v-for="(item, index) in price"
            :key="index"
        >
            <label class="d-flex col-5">
                <span class="input-group-text">Предназначение:</span>
                <input
                    type="text"
                    class="form-control"
                    :value="item.title"
                    @change="newPrice.title = $event.target.value"
                    :disabled="saveActive != index"
                />
            </label>
            <label class="d-flex col-3">
                <span class="input-group-text">Цена:</span>
                <input
                    type="number"
                    class="form-control"
                    :value="item.price"
                    @change="newPrice.price = $event.target.value"
                    :disabled="saveActive != index"
                />
            </label>
            <div
                class="d-flex justify-content-end col-4"
                v-if="saveActive == index"
            >
                <button
                    type="button"
                    class="btn btn-outline-primary mx-2"
                    @click="changePrice(index)"
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
            </div>
            <div class="d-flex justify-content-end col-4" v-else>
                <button
                    type="button"
                    class="btn btn-outline-success mx-2"
                    @click="saveActive = index"
                >
                    Редактировать
                </button>
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="$emit('parentDeletePrice', index)"
                >
                    Удалить
                </button>
            </div>
        </div>
    </div>
</template>
