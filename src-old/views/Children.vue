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
        const page = "pageChildren";

        onMounted(async () => {
            await store.dispatch("actPage", "pageChildren");
        });

        let deleteTrainer = (id) => {
            store.dispatch("actDeleteTrainer", {
                page: page,
                id: id,
            });
        };
        let changeTrainer = (id, item) => {
            store.dispatch("actChangeTrainer", {
                page: page,
                id,
                item,
            });
        };
        let addTrainer = (item) => {
            store.dispatch("actAddTrainer", {
                page: page,
                item,
            });
        };

        let deleteGroup = (id) => {
            store.dispatch("actDeleteGroup", {
                page: page,
                id: id,
            });
        };
        let changeGroup = (id, item) => {
            store.dispatch("actChangeGroup", {
                page: page,
                id,
                item,
            });
        };
        let addGroup = (item) => {
            store.dispatch("actAddGroup", {
                page: page,
                item,
            });
        };

        let deletePrice = (id) => {
            store.dispatch("actDeletePrice", {
                page: page,
                id: id,
            });
        };
        let changePrice = (id, item) => {
            store.dispatch("actChangePrice", {
                page: page,
                id,
                item,
            });
        };
        let addPrice = (item) => {
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
            pageChildren: computed(() => store.getters.getPageChildren),
        };
    },
};
</script>

<template>
    <section>
        <h2 class="text-center">Дети</h2>
        <Trainers
            :trainers="pageChildren.trainers"
            @parentDeleteTrainer="deleteTrainer"
            @parentChangeTrainer="changeTrainer"
            @parentAddTrainer="addTrainer"
        />
        <Groups
            :groups="pageChildren.groups"
            @parentDeleteGroup="deleteGroup"
            @parentChangeGroup="changeGroup"
            @parentAddGroup="addGroup"
        />
        <Price
            :price="pageChildren.price"
            @parentDeletePrice="deletePrice"
            @parentChangePrice="changePrice"
            @parentAddPrice="addPrice"
        />
    </section>
</template>
