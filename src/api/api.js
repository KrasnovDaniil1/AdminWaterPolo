// import axios from "axios";
// const api = "http://localhost:8080/api/v1";

export const PageAmateur = () => {
    return {
        trainers: [
            {
                id: "0",
                src: " https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Bianchi_velez.jpg/170px-Bianchi_velez.jpg",
                name: "Иван Иванович Иванов",
                rank: "Помошник тренера",
                phone_number: "+79990001122",
            },
            {
                id: "1",
                src: "https://img.championat.com/s/735x490/news/big/i/n/sekrety-fitnesa-kak-vybrat-trenera-i-sostavit-trenirovochnyj-plan-samomu_156196697645614984.jpg",
                name: "Пётр Петрович Петров",
                rank: "Шлавный тренер",
                phone_number: "+79991110022",
            },
            {
                id: "2",
                src: "https://hb.bizmrg.com/st.mosmff.ru/news/60/6008265009926_606x451.jpg",
                name: "Глеб Глебыч Глебов",
                rank: "Тренер",
                phone_number: "+79992221100",
            },
        ],
        groups: [
            {
                id: "0",
                title: "Группа 1",
                data: [
                    "12.00-13.00",
                    "12.00-13.00",
                    "12.00-13.00",
                    "12.00-13.00",
                    "12.00-13.00",
                    "12.00-13.00",
                    "12.00-13.00",
                ],
            },
            {
                id: "0",
                title: "Группа 1",
                data: [
                    "12.00-13.00",
                    "12.00-13.00",
                    "12.00-13.00",
                    "12.00-13.00",
                    "12.00-13.00",
                    "12.00-13.00",
                    "12.00-13.00",
                ],
            },
        ],
        price: [
            {
                id: "0",
                title: "Разовое занятие в будни",
                price: "700",
            },
        ],
    };
};
