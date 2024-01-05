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
        const oldMember = ref({
            src: "",
            name: "",
            post: "",
            info: "",
        });
        const modelActive = ref(false);
        const newMember = ref({
            src: "",
            name: "",
            post: "",
            info: "",
        });
        const clearNewMember = () => {
            modelActive.value = false;
            newMember.value = {
                src: "",
                name: "",
                post: "",
                info: "",
            };
        };
        const addMember = () => {
            store.dispatch("actAddMember", newMember.value);
            modelActive.value = false;
            clearNewMember();
        };
        const changeMember = (id) => {
            store.dispatch("actChangeMember", {
                id: id,
                item: oldMember.value,
            });
            cancelChangeMember();
        };
        const deleteMember = (id) => {
            store.dispatch("actDeleteMember", id);
            cancelChangeMember();
        };
        const cancelChangeMember = () => {
            oldMember.value = {
                src: "",
                name: "",
                post: "",
                info: "",
            };
            changeActive.value = -1;
        };

        return {
            changeActive,
            store,
            newMember,
            oldMember,
            modelActive,
            member: computed(() => store.getters.getData.federationMembers),
            cancelChangeMember,
            changeMember,
            clearNewMember,
            addMember,
            deleteMember,
        };
    },
};
</script>
<template>
    <div class="member">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Члены Федерации:</h4>
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
                @parentNewImage="(e) => (newMember.src = e)"
                :dis="false"
            />
            <nav class="d-flex flex-column justify-content-between col-7">
                <label class="d-flex">
                    <span class="input-group-text">И.Ф.О:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newMember.name"
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Должность:</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="newMember.post"
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Описание:</span>
                    <textarea
                        type="text"
                        class="form-control"
                        v-model="newMember.info"
                    />
                </label>
            </nav>
            <div class="d-flex flex-column justify-content-between col-2 my-2">
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addMember"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-info"
                    @click="clearNewMember"
                >
                    Отменить
                </button>
            </div>
        </div>
        <div
            class="d-flex justify-content-between bg-main p-3 br-10 my-2"
            v-for="(item, index) in member"
            :key="index"
        >
            <SaveImage
                class="col-2"
                :image="item.src"
                :dis="changeActive != index"
                @parentNewImage="(e) => (oldMember.src = e)"
            />
            <nav class="col-7 d-flex flex-column justify-content-between">
                <label class="d-flex">
                    <span class="input-group-text">И.Ф.О:</span>
                    <input
                        type="text"
                        class="form-control"
                        :value="item.name"
                        :disabled="changeActive != index"
                        @change="oldMember.name = $event.target.value"
                    />
                </label>
                <label class="d-flex">
                    <span class="input-group-text">Телефон:</span>
                    <input
                        type="text"
                        class="form-control"
                        :value="item.post"
                        :disabled="changeActive != index"
                        @change="oldMember.post = $event.target.value"
                    />
                </label>

                <label class="d-flex">
                    <span class="input-group-text">Описание:</span>
                    <textarea
                        type="text"
                        class="form-control"
                        :disabled="changeActive != index"
                        @change="oldMember.info = $event.target.value"
                        v-model="item.info"
                    >
                    </textarea>
                </label>
            </nav>
            <div class="d-flex flex-column justify-content-between col-2">
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="deleteMember(index)"
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
                    @click="changeMember(index)"
                    v-if="changeActive == index"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="btn btn-outline-warning"
                    @click="cancelChangeMember()"
                    v-if="changeActive == index"
                >
                    Отменить
                </button>
            </div>
        </div>
    </div>
</template>
