<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

import Trainers from "../components/Trainers.vue";
// import Groups from "../components/Groups.vue";
// import Price from "../components/Price.vue";

export default {
    components: { Trainers },
    setup() {
        const store = useStore();

        onMounted(async () => {
            await store.dispatch("actPageAmateur");
        });

        let deleteTrener = (id) => {
            console.log("Удаление тренера в Amateur", id);
            store.commit("mutDeleteTrainer", {
                page: "pageAmateur",
                id: id,
            });
        };
        let changeTrener = (id, item) => {
            console.log("Редактирование тренера в Amateur", id, item);
            store.commit("mutChangeTrainer", {
                page: "pageAmateur",
                id,
                item,
            });
            // store.commit("mutDeleteTrainer", {
            //     page: "Amateur",
            //     id: id,
            // });
        };
        // let deleteTreners = (id) => {
        //     console.log("Удаление тренера", {
        //         page: "Amateur",
        //         id: id,
        //     });
        // };
        // let addTreners = (info) => {
        //     console.log("Добавление тренера", {
        //         page: "Amateur",
        //         info: info,
        //     });
        // };

        // let deleteGroup = (id) => {
        //     console.log("Удаление группы", {
        //         page: "Amateur",
        //         id: id,
        //     });
        // };
        // let addGroup = (info) => {
        //     console.log("Добавление группы", {
        //         page: "Amateur",
        //         info: info,
        //     });
        // };

        // let deletePrice = (id) => {
        //     console.log("Удаление цен:", {
        //         page: "Amateur",
        //         id: id,
        //     });
        // };
        // let addPrice = (info) => {
        //     console.log("Добавление цен:", {
        //         page: "Amateur",
        //         info: info,
        //     });
        // };

        return {
            deleteTrener,
            changeTrener,
            // deleteGroup,
            // addGroup,
            // addPrice,
            // deletePrice,
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
            @parentDeleteTrener="deleteTrener"
            @parentChangeTrener="changeTrener"
        />
        <!-- <Groups
            :groups="pageAmateur.groups"
            @parentsDeleteGroup="deleteGroup"
            @parentAddGroup="addGroup"
        />
        <Price
            :price="pageAmateur.price"
            @parentsDeletePrice="deletePrice"
            @parentAddPrice="addPrice"
        /> -->
    </section>
</template>

<style lang="scss" scoped>
section {
    // background: red;
}
</style>
