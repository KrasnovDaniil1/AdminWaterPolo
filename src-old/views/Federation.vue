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
        const page = "pageFederation";

        onMounted(async () => {
            await store.dispatch("actPage", "pageFederation");
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

        return {
            deleteTrainer,
            changeTrainer,
            addTrainer,

            store,
            pageFederation: computed(() => store.getters.getPageFederation),
        };
    },
};
</script>

<template>
    <section>
        <h2 class="text-center">Федерация</h2>
        <Trainers
            :trainers="pageFederation.trainers"
            @parentDeleteTrainer="deleteTrainer"
            @parentChangeTrainer="changeTrainer"
            @parentAddTrainer="addTrainer"
        />
    </section>
</template>
