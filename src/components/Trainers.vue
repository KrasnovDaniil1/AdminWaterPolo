<script>
import { ref } from "vue";
export default {
    props: {
        trainers: {
            type: Array,
        },
    },
    setup(props, context) {
        const newTrainer = ref({
            src: "",
            name: "",
            phone_number: "",
            rank: "",
        });

        const saveActive = ref("none");
        const modelActive = ref(false);

        const changeTrainer = (id) => {
            context.emit("parentChangeTrener", id, newTrainer.value);
            saveActive.value = "none";
        };

        // const deleteTrainer = (id) => {
        //     context.emit("parentAddTreners", newTrainers.value);
        // };

        // const parentAddTreners = () => {
        //     context.emit("parentAddTreners", newTrainers.value);
        //     modelActive.value = false;
        // };
        return {
            modelActive,
            newTrainer,
            saveActive,
            changeTrainer,
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
            v-for="(item, index) in trainers"
            :key="index"
        >
            <img :src="item.src" class="col-2" style="aspect-ratio: 35/45" />
            <nav class="d-flex flex-column justify-content-between col-8">
                <input
                    type="file"
                    class="form-control"
                    @change="newTrainer.src = $event.target.files[0]"
                    :disabled="saveActive != index"
                />
                <label class="d-flex">
                    <span class="input-group-text">И.Ф.О:</span>
                    <input
                        type="text"
                        class="form-control"
                        @change="newTrainer.name = $event.target.value"
                        :value="item.name"
                        :disabled="saveActive != index"
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Телефон:</span>
                    <input
                        type="text"
                        class="form-control"
                        @change="newTrainer.phone_number = $event.target.value"
                        :value="item.phone_number"
                        :disabled="saveActive != index"
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Должность:</span>
                    <input
                        type="text"
                        class="form-control"
                        @change="item.rank = $event.target.value"
                        :value="item.rank"
                        :disabled="saveActive != index"
                    />
                </label>
            </nav>
            <div
                class="d-flex flex-column justify-content-between col-2"
                v-if="saveActive == index"
            >
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="changeTrainer(index)"
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
            <div
                class="d-flex flex-column justify-content-between col-2"
                v-else
            >
                <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="saveActive = index"
                >
                    Редактировать
                </button>
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="$emit('parentDeleteTrener', index)"
                >
                    Удалить
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.treners {
}
</style>
