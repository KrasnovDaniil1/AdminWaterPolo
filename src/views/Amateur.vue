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
        const page = "pageAmateur";

        onMounted(async () => {
            await store.dispatch("actPage", "pageAmateur");
        });

        let deleteTrainer = (id) => {
            console.log("Удаление тренера в Amateur", id);
            store.dispatch("actDeleteTrainer", {
                page: page,
                id: id,
            });
        };
        let changeTrainer = (id, item) => {
            console.log("Редактирование тренера в Amateur", id, item);
            store.dispatch("actChangeTrainer", {
                page: page,
                id,
                item,
            });
        };
        let addTrainer = (item) => {
            console.log("Добавление тренера в Amateur", item);
            store.dispatch("actAddTrainer", {
                page: page,
                item,
            });
        };

        let deleteGroup = (id) => {
            console.log("Удаление группы в Amateur", id);
            store.dispatch("actDeleteGroup", {
                page: page,
                id: id,
            });
        };
        let changeGroup = (id, item) => {
            console.log("Редактирование группы в Amateur", id, item);
            store.dispatch("actChangeGroup", {
                page: page,
                id,
                item,
            });
        };
        let addGroup = (item) => {
            console.log("Добавление группы в Amateur", item);
            store.dispatch("actAddGroup", {
                page: page,
                item,
            });
        };

        let deletePrice = (id) => {
            console.log("Удаление цен в Amateur", id);
            store.dispatch("actDeletePrice", {
                page: page,
                id: id,
            });
        };
        let changePrice = (id, item) => {
            console.log("Редактирование цен в Amateur", id, item);
            store.dispatch("actChangePrice", {
                page: page,
                id,
                item,
            });
        };
        let addPrice = (item) => {
            console.log("Добавление цен в Amateur", item);
            store.dispatch("actAddPrice", {
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
            deletePrice,
            changePrice,
            addPrice,
            store,
            pageAmateur: computed(() => store.getters.getPageAmateur),
        };
    },
};
</script>

<template>
    <section>
        <h2 class="text-center">Любители</h2>
        <Trainers
            :trainers="pageAmateur.trainers"
            @parentDeleteTrainer="deleteTrainer"
            @parentChangeTrainer="changeTrainer"
            @parentAddTrainer="addTrainer"
        />
        <Groups
            :groups="pageAmateur.groups"
            @parentDeleteGroup="deleteGroup"
            @parentChangeGroup="changeGroup"
            @parentAddGroup="addGroup"
        />
        <Price
            :price="pageAmateur.price"
            @parentDeletePrice="deletePrice"
            @parentChangePrice="changePrice"
            @parentAddPrice="addPrice"
        />
    </section>
</template>
