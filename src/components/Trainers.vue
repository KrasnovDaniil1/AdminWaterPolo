<script>
import { ref } from "vue";
export default {
    props: {
        trainers: {
            type: Object,
        },
    },
    setup(props, context) {
        const newTrainers = ref({
            img: "",
            name: "",
            phone: "",
            rank: "",
        });
        const modelActive = ref(false);

        const parentAddTreners = () => {
            context.emit("parentAddTreners", newTrainers.value);
            modelActive.value = false;
        };
        return {
            modelActive,
            newTrainers,
            parentAddTreners,
        };
    },
};
</script>
<template>
    <div class="trainers">
        <div class="title">
            <h1>Тренеры:</h1>
            <button @click="modelActive = true">+ Добавить</button>
        </div>
        <nav class="trainer_block" v-for="item in trainers" :key="item.id">
            <div class="decor_line"></div>
            <div class="img_block">
                <img :src="item.src" />
            </div>
            <div class="inp_block">
                <label>
                    <h1>Имя Фамилия Отчество:</h1>
                    <input :placeholder="item.name" disabled />
                </label>
                <label>
                    <h1>Номер телефона:</h1>
                    <input :placeholder="item.phone_number" disabled />
                </label>
                <label>
                    <h1>Должность:</h1>
                    <input :placeholder="item.rank" disabled />
                </label>
            </div>
            <div>
                <button @click="$emit('parentsDeleteTreners', item.id)">
                    - Удалить
                </button>
            </div>
        </nav>
        <div class="model" v-if="modelActive">
            <button class="model_btn" @click="modelActive = false">+</button>
            <nav class="model_block">
                <input
                    type="file"
                    @change="newTrainers.img = $event.target.files[0]"
                    accept="image/png, image/jpeg"
                />
                <label>
                    <h1>Имя Фамилия Отчество:</h1>
                    <input
                        v-model="newTrainers.name"
                        placeholder="Иван Иванович Иванов"
                    />
                </label>
                <label>
                    <h1>Номер телефона:</h1>
                    <input
                        type="number"
                        v-model="newTrainers.phone"
                        placeholder="+79097955530"
                    />
                </label>
                <label>
                    <h1>Должность:</h1>
                    <input
                        v-model="newTrainers.rank"
                        placeholder="Заместитель тренера"
                    />
                </label>
                <button @click="parentAddTreners">Сохранить</button>
            </nav>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.trainers {
    position: relative;
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
    .trainer_block {
        position: relative;
        display: grid;
        grid-template-columns: 200px auto fit-content(300px);
        grid-gap: 3rem;
        margin: 2rem 0;
        .img_block {
            width: 100%;
            aspect-ratio: 35/45;
            img {
                border-radius: 10px;
            }
        }
        .inp_block {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
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
            width: 50%;
            top: 50%;
            left: 50%;

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
                margin: 1rem 0;
            }
            button {
                background: rgb(25, 0, 255);
            }
        }
    }
}
</style>
