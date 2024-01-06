<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        const changeActive = ref();
        const oldTime = ref({
            week: "",
            time: "",
            title: "",
            address: "",
            category: "",
            one: "",
            two: "",
        });
        const modelActive = ref(false);
        const newTime = ref({
            week: "",
            time: "",
            title: "",
            address: "",
            category: "",
            one: "",
            two: "",
        });
        const clearnewTime = () => {
            modelActive.value = false;
            newTime.value = {
                week: "",
                time: "",
                title: "",
                address: "",
                category: "",
                one: "",
                two: "",
            };
        };
        const addTime = () => {
            store.dispatch("actAddTime", newTime.value);
            modelActive.value = false;
            clearnewTime();
        };
        const changeTime = (id) => {
            store.dispatch("actChangeTime", {
                id: id,
                item: oldTime.value,
            });
            cancelChangeTime();
        };
        const deleteTime = (id) => {
            store.dispatch("actDeleteTime", id);
            cancelChangeTime();
        };

        const cancelChangeTime = () => {
            oldTime.value = {
                week: "",
                time: "",
                title: "",
                address: "",
                category: "",
                one: "",
                two: "",
            };
            changeActive.value = -1;
        };

        return {
            changeActive,
            store,
            newTime,
            oldTime,
            modelActive,
            time: computed(() => store.getters.getData.time),
            addTime,
            cancelChangeTime,
            clearnewTime,
            changeTime,
            deleteTime,
        };
    },
};
</script>
<template>
    <div class="trainers">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Расписание:</h4>
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
                    <span class="input-group-text">Название категории:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newTime.title"
                    />
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">Время:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newTime.time"
                    />
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">Адрес:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newTime.address"
                    />
                </label>

                <label class="d-flex mt-3">
                    <span class="input-group-text">Категория:</span>
                    <select class="form-select" v-model="newTime.category">
                        <option selected value="children">Дети</option>
                        <option value="amateur">Любители</option>
                        <option value="student">Студенты</option>
                    </select>
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">День недели:</span>
                    <select class="form-select" v-model="newTime.week">
                        <option selected value="monday">Понедельник</option>
                        <option value="tuesday">Вторник</option>
                        <option value="wednesday">Среда</option>
                        <option value="thursday">Четверг</option>
                        <option value="friday">Пятница</option>
                        <option value="saturday">Суббота</option>
                        <option value="sunday">Воскресенье</option>
                    </select>
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">1 неделя:</span>
                    <select class="form-select" v-model="newTime.one">
                        <option selected value="true">Да</option>
                        <option value="false">Нет</option>
                    </select>
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">2 неделя:</span>
                    <select class="form-select" v-model="newTime.two">
                        <option selected value="true">Да</option>
                        <option value="false">Нет</option>
                    </select>
                </label>
            </nav>
            <div class="d-flex flex-column justify-content-between col-2 my-2">
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addTime"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-info"
                    @click="clearnewTime"
                >
                    Отменить
                </button>
            </div>
        </div>
        <div
            class="d-flex justify-content-between bg-main p-3 br-10 my-2"
            v-for="(item, index) in time"
            :key="index"
        >
            <nav class="col-7 d-flex flex-column justify-content-between">
                <label class="d-flex">
                    <span class="input-group-text">Название категории:</span>
                    <input
                        type="text"
                        class="form-control"
                        :placeholder="item.title"
                        :disabled="changeActive != index"
                        @change="oldTime.title = $event.target.value"
                    />
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">Время:</span>
                    <input
                        type="text"
                        class="form-control"
                        :placeholder="item.time"
                        :disabled="changeActive != index"
                        @change="oldTime.time = $event.target.value"
                    />
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">Адрес:</span>
                    <input
                        type="text"
                        class="form-control"
                        :placeholder="item.address"
                        :disabled="changeActive != index"
                        @change="oldTime.address = $event.target.value"
                    />
                </label>

                <label class="d-flex mt-3">
                    <span class="input-group-text">Категория:</span>
                    <select
                        class="form-select"
                        :disabled="changeActive != index"
                        @change="oldTime.category = $event.target.value"
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
                        <option
                            :selected="item.category == 'student'"
                            value="student"
                        >
                            Студенты
                        </option>
                    </select>
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">День недели:</span>
                    <select
                        class="form-select"
                        :disabled="changeActive != index"
                        @change="oldTime.week = $event.target.value"
                    >
                        <option
                            :selected="item.category == 'monday'"
                            value="monday"
                        >
                            Понедельник
                        </option>
                        <option
                            :selected="item.category == 'tuesday'"
                            value="tuesday"
                        >
                            Вторник
                        </option>
                        <option
                            :selected="item.category == 'wednesday'"
                            value="wednesday"
                        >
                            Среда
                        </option>
                        <option
                            :selected="item.category == 'thursday'"
                            value="thursday"
                        >
                            Четверг
                        </option>
                        <option
                            :selected="item.category == 'friday'"
                            value="friday"
                        >
                            Пятница
                        </option>
                        <option
                            :selected="item.category == 'saturday'"
                            value="saturday"
                        >
                            Суббота
                        </option>
                        <option
                            :selected="item.category == 'sunday'"
                            value="sunday"
                        >
                            Воскресенье
                        </option>
                    </select>
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">1 неделя:</span>
                    <select
                        class="form-select"
                        :disabled="changeActive != index"
                        @change="oldTime.one = $event.target.value"
                    >
                        <option
                            :selected="item.category == 'true'"
                            value="true"
                        >
                            Да
                        </option>
                        <option
                            :selected="item.category == 'false'"
                            value="false"
                        >
                            Нет
                        </option>
                    </select>
                </label>
                <label class="d-flex mt-3">
                    <span class="input-group-text">2 неделя:</span>
                    <select
                        class="form-select"
                        :disabled="changeActive != index"
                        @change="oldTime.two = $event.target.value"
                    >
                        <option
                            :selected="item.category == 'true'"
                            value="true"
                        >
                            Да
                        </option>
                        <option
                            :selected="item.category == 'false'"
                            value="false"
                        >
                            Нет
                        </option>
                    </select>
                </label>
            </nav>
            <div class="d-flex flex-column justify-content-between col-2">
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="deleteTime(index)"
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
                    @click="changeTime(index)"
                    v-if="changeActive == index"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-warning"
                    @click="cancelChangeTime()"
                    v-if="changeActive == index"
                >
                    Отменить
                </button>
            </div>
        </div>
    </div>
</template>
