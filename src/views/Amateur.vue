<script>
import Trainers from "../components/Trainers.vue";
import Groups from "../components/Groups.vue";

export default {
    components: { Trainers, Groups },
    setup() {},
};
</script>

<template>
    <section>
        <Trainers />
        <Groups />
    </section>
</template>

<style lang="scss" scoped>
section {
    // background: red;
}
</style>
