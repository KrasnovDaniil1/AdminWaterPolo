<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

import Trainers from "../components/Trainers.vue";
// import Groups from "../components/Groups.vue";

export default {
    components: { Trainers },
    setup() {
        const store = useStore();
        onMounted(async () => {
            await store.dispatch("actPageAmateur");
        });
        let deleteTreners = (id) => {
            console.log("Удаление тренера", {
                page: "Amateur",
                id: id,
            });
        };
        let addTreners = (info) => {
            console.log("Добавление тренера", info);
        };

        return {
            deleteTreners,
            addTreners,
            store,
            pageAmateur: computed(() => store.getters.getPageAmateur),
        };
    },
};
</script>

<template>
    <section>
        <Trainers
            :trainers="pageAmateur.trainers"
            @parentsDeleteTreners="deleteTreners"
            @parentAddTreners="addTreners"
        />
        <!-- <Groups /> -->
    </section>
</template>

<style lang="scss" scoped>
section {
    // background: red;
}
</style>
