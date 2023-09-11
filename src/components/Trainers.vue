<script>
import { ref } from "vue";
export default {
    props: {
        trainers: {
            type: Object,
        },
    },
    setup(props, context) {
        const newTrainers = ref({
            img: "",
            name: "",
            phone: "",
            rank: "",
        });
        const saveActive = ref();
        const modelActive = ref(false);

        // const parentAddTreners = () => {
        //     context.emit("parentAddTreners", newTrainers.value);
        //     modelActive.value = false;
        // };
        return {
            modelActive,
            newTrainers,
            saveActive,
            // parentAddTreners,
        };
    },
};
</script>
<template>
    <div class="trainers">
        <div class="d-flex justify-content-between align-items-start">
            <h4>Тренеры:</h4>
            <button type="button" class="btn btn-outline-primary">
                + Добавить
            </button>
        </div>
        <div
            class="row bg-main my-3 py-3"
            style="border-radius: 10px"
            v-for="item in trainers"
            :key="item.id"
        >
            <img
                src="https://bipbap.ru/wp-content/uploads/2017/04/0_7c779_5df17311_orig.jpg"
                class="col-2"
                style="aspect-ratio: 35/45"
            />
            <nav class="d-flex flex-column justify-content-between col-8">
                <input type="file" class="form-control" />
                <label class="d-flex">
                    <span class="input-group-text">И.Ф.О:</span>
                    <input
                        type="text"
                        class="form-control"
                        :placeholder="item.name"
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Телефон:</span>
                    <input
                        type="text"
                        class="form-control"
                        :placeholder="item.phone_number"
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Должность:</span>
                    <input
                        type="text"
                        class="form-control"
                        :placeholder="item.rank"
                    />
                </label>
            </nav>
            <div
                class="d-flex flex-column justify-content-between col-2"
                v-if="saveActive != item.id"
            >
                <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="saveActive = item.id"
                >
                    Редактировать
                </button>
                <button type="button" class="btn btn-outline-danger">
                    Удалить
                </button>
            </div>
            <div
                class="d-flex flex-column justify-content-between col-2"
                v-if="saveActive == item.id"
            >
                <button type="button" class="btn btn-outline-primary">
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="saveActive = ''"
                >
                    Отменить
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.treners {
}
</style>
