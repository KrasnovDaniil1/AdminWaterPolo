<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

import Trainers from "../components/Trainers.vue";
import Groups from "../components/Groups.vue";
import Price from "../components/Price.vue";

export default {
    components: { Trainers, Groups, Price },
    setup() {
        const store = useStore();
        const page = "pageStudent";

        onMounted(async () => {
            await store.dispatch("actPage", "pageStudent");
        });

        let deleteTrainer = (id) => {
            console.log("Удаление тренера в Student", id);
            store.dispatch("actDeleteTrainer", {
                page: page,
                id: id,
            });
        };
        let changeTrainer = (id, item) => {
            console.log("Редактирование тренера в Student", id, item);
            store.dispatch("actChangeTrainer", {
                page: page,
                id,
                item,
            });
        };
        let addTrainer = (item) => {
            console.log("Добавление тренера в Student", item);
            store.dispatch("actAddTrainer", {
                page: page,
                item,
            });
        };

        let deleteGroup = (id) => {
            console.log("Удаление группы в Student", id);
            store.dispatch("actDeleteGroup", {
                page: page,
                id: id,
            });
        };
        let changeGroup = (id, item) => {
            console.log("Редактирование группы в Student", id, item);
            store.dispatch("actChangeGroup", {
                page: page,
                id,
                item,
            });
        };
        let addGroup = (item) => {
            console.log("Добавление группы в Student", item);
            store.dispatch("actAddGroup", {
                page: page,
                item,
            });
        };

        return {
            deleteTrainer,
            changeTrainer,
            addTrainer,
            deleteGroup,
            changeGroup,
            addGroup,
            store,
            pageStudent: computed(() => store.getters.getPageStudent),
        };
    },
};
</script>

<template>
    <section>
        <h2 class="text-center">Студенты</h2>
        <Trainers
            :trainers="pageStudent.trainers"
            @parentDeleteTrainer="deleteTrainer"
            @parentChangeTrainer="changeTrainer"
            @parentAddTrainer="addTrainer"
        />
        <Groups
            :groups="pageStudent.groups"
            @parentDeleteGroup="deleteGroup"
            @parentChangeGroup="changeGroup"
            @parentAddGroup="addGroup"
        />
    </section>
</template>
