<script>
import { ref } from "vue";

export default {
    props: {
        groups: {},
    },
    setup(props, context) {
        const modelActive = ref(false);
        const newGroup = ref({
            title: "",
            data: [],
        });
        const tableDay = [
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
            "Воскресенье",
        ];

        const parentAddGroup = () => {
            context.emit("parentAddGroup", newGroup.value);
            modelActive.value = false;
        };

        return {
            tableDay,
            newGroup,
            modelActive,
            parentAddGroup,
        };
    },
};
</script>

<template>
    <div class="group">
        <div class="title">
            <h1>Группы:</h1>
            <button @click="modelActive = true">+ Добавить</button>
        </div>
        <nav v-for="item in groups" :key="item.id">
            <table class="date_table">
                <h1>{{ item.title }}</h1>
                <div class="table_block">
                    <tr v-for="(item, i) in item.data" :key="i">
                        <th>
                            {{ tableDay[i] }}
                        </th>
                        <td>
                            {{ item }}
                        </td>
                    </tr>
                </div>
            </table>
            <button @click="$emit('parentsDeleteGroup', item.id)">
                - Удалить
            </button>
        </nav>
        <div class="model" v-if="modelActive">
            <button class="model_btn" @click="modelActive = false">+</button>
            <nav class="model_block">
                <label>
                    <h1>Название группы</h1>
                    <input v-model="newGroup.title" placeholder="Группа 1" />
                </label>
                <label v-for="(item, i) in tableDay" :key="i">
                    <h1>{{ item }}</h1>
                    <input
                        v-model="newGroup.data[i]"
                        placeholder="12.00-13.00"
                    />
                </label>
                <button @click="parentAddGroup">Сохранить</button>
            </nav>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.group {
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1 {
            font-size: var(--size-title);
            text-transform: uppercase;
        }
        button {
            background: rgb(72, 0, 255);
        }
    }
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .date_table {
            padding: 1rem 0;
            display: grid;
            grid-template-columns: 1fr;
            h1 {
                padding: 0.5rem 0;
                text-align: center;
                background: var(--bg-primary);
                font-size: var(--size-title);
                color: var(--color-secondary);
                font-weight: bold;
            }
            .table_block {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                font-size: var(--size-elem);
                tr {
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    th,
                    td {
                        border: 1px solid var(--bg-primary);
                        padding: 0.5rem;
                    }
                }
            }
        }
    }
    .model {
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(1, 1, 1, 0.5);
        width: 100%;
        height: 100vh;
        .model_btn {
            position: absolute;
            width: 4rem;
            height: 4rem;
            top: 1rem;
            right: 1rem;
            font-size: 50px;
            background: var(--bg-primary);
            transform: rotate(45deg);
        }
        .model_block {
            position: relative;
            width: fit-content;
            top: 50%;
            left: 50%;
            display: flex;
            flex-direction: column;

            transform: translate(-50%, -50%);
            background: var(--bg-primary);
            border-radius: 10px;
            padding: 1rem;
            h1 {
                color: var(--color-secondary);
            }
            input {
                background: var(--bg-secondary);
            }
            label {
                margin-bottom: 0.5rem;
            }
            button {
                background: rgb(25, 0, 255);
            }
        }
    }
}
</style>
