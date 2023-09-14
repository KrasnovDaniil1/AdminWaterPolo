<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

import Trainers from "../components/Trainers.vue";
import Groups from "../components/Groups.vue";
// import Price from "../components/Price.vue";

export default {
    components: { Trainers, Groups },
    setup() {
        const store = useStore();

        onMounted(async () => {
            await store.dispatch("actPageAmateur");
        });

        let deleteTrainer = (id) => {
            console.log("Удаление тренера в Amateur", id);
            store.dispatch("actDeleteTrainer", {
                page: "pageAmateur",
                id: id,
            });
        };
        let changeTrainer = (id, item) => {
            console.log("Редактирование тренера в Amateur", id, item);
            store.commit("mutChangeTrainer", {
                page: "pageAmateur",
                id,
                item,
            });
        };
        let addTrainer = (item) => {
            console.log("Добавление тренера в Amateur", item);
            store.commit("mutAddTrainer", {
                page: "pageAmateur",
                item,
            });
        };

        let deleteGroup = (id) => {
            console.log("Удаление группы в Amateur", id);
            store.commit("mutDeleteGroup", {
                page: "pageAmateur",
                id: id,
            });
        };
        let changeGroup = (id, item) => {
            console.log("Редактирование группы в Amateur", id, item);
            store.commit("mutChangeGroup", {
                page: "pageAmateur",
                id,
                item,
            });
        };
        let addGroup = (item) => {
            console.log("Добавление группы в Amateur", item);
            store.commit("mutAddGroup", {
                page: "pageAmateur",
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
        <!-- <Price
            :price="pageAmateur.price"
            @parentsDeletePrice="deletePrice"
            @parentAddPrice="addPrice"
        /> -->
    </section>
</template>
