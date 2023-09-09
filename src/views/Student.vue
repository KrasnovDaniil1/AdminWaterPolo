<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

import Trainers from "../components/Trainers.vue";
import Groups from "../components/Groups.vue";

export default {
    components: { Trainers, Groups },
    setup() {
        const store = useStore();
        onMounted(async () => {
            await store.dispatch("actPageStudent");
        });
        let deleteTreners = (id) => {
            console.log("Удаление тренера", {
                page: "Student",
                id: id,
            });
        };
        let addTreners = (info) => {
            console.log("Добавление тренера", {
                page: "Student",
                info: info,
            });
        };

        let deleteGroup = (id) => {
            console.log("Удаление группы", {
                page: "Student",
                id: id,
            });
        };
        let addGroup = (info) => {
            console.log("Добавление группы", {
                page: "Student",
                info: info,
            });
        };

        return {
            deleteTreners,
            addTreners,
            deleteGroup,
            addGroup,
            store,
            pageAmateur: computed(() => store.getters.getPageStudent),
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
        <Groups
            :groups="pageAmateur.groups"
            @parentsDeleteGroup="deleteGroup"
            @parentAddGroup="addGroup"
        />
    </section>
</template>

<style lang="scss" scoped>
section {
    // background: red;
}
</style>
