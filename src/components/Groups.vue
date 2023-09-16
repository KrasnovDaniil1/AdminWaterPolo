<script>
import { ref } from "vue";
export default {
    props: {
        groups: {
            type: Array,
        },
    },
    setup(props, context) {
        const modelActive = ref(false);
        const saveActive = ref("none");

        const newGroup = ref({
            title: "",
            data: ["-", "-", "-", "-", "-", "-", "-"],
        });
        const days = [
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
            "Воскресенье",
        ];

        const clearNewGroup = () => {
            newGroup.value = {
                title: "",
                data: ["-", "-", "-", "-", "-", "-", "-"],
            };
        };
        const changeGroup = (id) => {
            for (let i = 0; i < props.groups[id].data.length; i++) {
                if (newGroup.value.data[i] == "-") {
                    newGroup.value.data[i] = props.groups[id].data[i];
                }
            }
            context.emit("parentChangeGroup", id, newGroup.value);
            saveActive.value = "none";
            clearNewGroup();
        };

        const addGroup = () => {
            context.emit("parentAddGroup", newGroup.value);
            modelActive.value = false;
            clearNewGroup();
        };

        return {
            modelActive,
            newGroup,
            days,
            saveActive,
            changeGroup,
            addGroup,
        };
    },
};
</script>

<template>
    <div class="trainers">
        <div class="d-flex justify-content-between align-items-start">
            <h4>Группы:</h4>
            <button
                type="button"
                class="btn btn-outline-primary"
                @click="modelActive = true"
            >
                + Добавить
            </button>
        </div>
        <div
            class="model bg-main d-flex flex-column align-items-center px-3 py-1 my-2 br-10"
            v-if="modelActive"
        >
            <nav class="row bg-main py-2">
                <label class="d-flex col-6 my-1">
                    <span class="input-group-text">Название группы:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newGroup.title"
                    />
                </label>
                <label
                    class="d-flex col-6 my-1"
                    v-for="(day, i) in days"
                    :key="i"
                >
                    <span class="input-group-text">{{ day }}</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newGroup.data[i]"
                    />
                </label>
            </nav>
            <div class="d-flex justify-content-between col-8">
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addGroup"
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
            v-for="(item, index) in groups"
            :key="index"
        >
            <label class="d-flex col-6 my-1">
                <span class="input-group-text">Название группы:</span>
                <input
                    type="text"
                    class="form-control"
                    :value="item.title"
                    @change="newGroup.title = $event.target.value"
                    :disabled="saveActive != index"
                />
            </label>
            <label class="d-flex col-6 my-1" v-for="(day, i) in days" :key="i">
                <span class="input-group-text">{{ day }}</span>
                <input
                    type="text"
                    class="form-control"
                    :value="item.data[i]"
                    @change="newGroup.data[i] = $event.target.value"
                    :disabled="saveActive != index"
                />
            </label>
            <div
                class="d-flex justify-content-evenly col-12 my-1"
                v-if="saveActive == index"
            >
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="changeGroup(index)"
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
            <div class="d-flex justify-content-evenly col-12 my-1" v-else>
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
                    @click="$emit('parentDeleteGroup', index)"
                >
                    Удалить
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
