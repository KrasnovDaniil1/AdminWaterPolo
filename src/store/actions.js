import * as api from "../api/api";

export const actPage = async (context) => {
    context.commit("mutLoader", true);
    context.commit("mutPage", await api.Page("WaterPolo"));
    context.commit("mutLoader", false);
};
// тренера
export const actAddTrainer = async ({ commit, state }, item) => {
    commit("mutLoader", true);
    let src = "";
    if (item.src != "") {
        src = await api.UploadImg(item.src);
        item.src = src[0];
    }
    state.data.trainers.push(item);
    state.data = await api.UploadPage(state.data);
    commit("mutLoader", false);
};

export const actDeleteTrainer = async ({ commit, state }, id) => {
    commit("mutLoader", true);
    state.data.trainers.splice(id, 1);
    state.data = await api.UploadPage(state.data);
    commit("mutLoader", false);
};

export const actChangeTrainer = async ({ commit, state }, { id, item }) => {
    commit("mutLoader", true);
    let src = "";
    if (item.src != "") {
        src = await api.UploadImg(item.src);
        item.src = src[0];
    }
    for (let key in item) {
        if (item[key] != "" && key != "delTrain") {
            state.data.trainers[id][key] = item[key];
        }
    }
    if (item.delTrain != "") {
        for (let k of state.data.trainers[id].train) {
            if (item.delTrain.includes(k)) {
                let index = state.data.trainers[id].train.indexOf(k);
                state.data.trainers[id].train.splice(index, 1);
            }
        }
    }
    state.data.trainers[id].train.push(...item.addTrain);
    state.data = await api.UploadPage(state.data);
    commit("mutLoader", false);
};

// члены федерации
export const actAddMember = async ({ commit, state }, item) => {
    commit("mutLoader", true);
    let src = "";
    if (item.src != "") {
        src = await api.UploadImg(item.src);
        item.src = src[0];
    }
    state.data.federationMembers.push(item);
    state.data = await api.UploadPage(state.data);
    commit("mutLoader", false);
};

export const actDeleteMember = async ({ commit, state }, id) => {
    commit("mutLoader", true);
    state.data.federationMembers.splice(id, 1);
    state.data = await api.UploadPage(state.data);
    commit("mutLoader", false);
};

export const actChangeMember = async ({ commit, state }, { id, item }) => {
    commit("mutLoader", true);
    let src = "";
    if (item.src != "") {
        src = await api.UploadImg(item.src);
        item.src = src[0];
    }
    for (let key in item) {
        if (item[key] != "") {
            state.data.federationMembers[id][key] = item[key];
        }
    }

    state.data = await api.UploadPage(state.data);
    commit("mutLoader", false);
};

// отзывы
export const actAddReview = async ({ commit, state }, item) => {
    commit("mutLoader", true);

    state.data.reviews.push(item);
    state.data = await api.UploadPage(state.data);
    commit("mutLoader", false);
};

export const actDeleteReview = async ({ commit, state }, id) => {
    commit("mutLoader", true);
    state.data.reviews.splice(id, 1);
    state.data = await api.UploadPage(state.data);
    commit("mutLoader", false);
};

export const actChangeReview = async ({ commit, state }, { id, item }) => {
    commit("mutLoader", true);
    for (let key in item) {
        if (item[key] != "") {
            state.data.reviews[id][key] = item[key];
        }
    }

    state.data = await api.UploadPage(state.data);
    commit("mutLoader", false);
};

// цены
export const actAddPrice = async ({ commit, state }, item) => {
    commit("mutLoader", true);

    state.data.price.push(item);
    state.data = await api.UploadPage(state.data);
    commit("mutLoader", false);
};

export const actDeletePrice = async ({ commit, state }, id) => {
    commit("mutLoader", true);
    state.data.price.splice(id, 1);
    state.data = await api.UploadPage(state.data);
    commit("mutLoader", false);
};

export const actChangePrice = async ({ commit, state }, { id, item }) => {
    commit("mutLoader", true);
    for (let key in item) {
        if (item[key] != "") {
            state.data.price[id][key] = item[key];
        }
    }

    state.data = await api.UploadPage(state.data);
    commit("mutLoader", false);
};

// получение json страницы
// export const actPage = async (context, page) => {
//     context.commit("mutLoader", true);
//     context.commit("mutPage", {
//         page: page,
//         data: await api.Page(page),
//     });
//     context.commit("mutLoader", false);
// };

// // удаление тренера
// export const actDeleteTrainer = async ({ commit, state }, { page, id }) => {
//     commit("mutLoader", true);
//     state[page].trainers.splice(id, 1);
//     state[page] = await api.UploadPage(page, state[page]);
//     commit("mutLoader", false);
// };

// // удаление группы
// export const actDeleteGroup = async ({ commit, state }, { page, id }) => {
//     commit("mutLoader", true);
//     state[page].groups.splice(id, 1);
//     state[page] = await api.UploadPage(page, state[page]);
//     commit("mutLoader", false);
// };

// // удаление цены
// export const actDeletePrice = async ({ commit, state }, { page, id }) => {
//     commit("mutLoader", true);
//     state[page].price.splice(id, 1);
//     state[page] = await api.UploadPage(page, state[page]);
//     commit("mutLoader", false);
// };

// // удаление медио
// export const actDeleteMedio = async ({ commit, state }, { page, id }) => {
//     commit("mutLoader", true);
//     state[page].medio.splice(id, 1);
//     state[page] = await api.UploadPage(page, state[page]);
//     commit("mutLoader", false);
// };

// // удаление новостей
// export const actDeleteNews = async ({ commit, state }, { page, id }) => {
//     commit("mutLoader", true);
//     state[page].news.splice(id, 1);
//     state[page] = await api.UploadPage(page, state[page]);
//     commit("mutLoader", false);
// };

// // редактирование тренера
// export const actChangeTrainer = async (
//     { commit, state },
//     { page, id, item }
// ) => {
//     commit("mutLoader", true);
//     let src = "";
//     if (item.src != "") {
//         src = await api.UploadImg(item.src);
//         item.src = src[0];
//     }
//     for (let key in item) {
//         if (item[key] != "") {
//             state[page].trainers[id][key] = item[key];
//         }
//     }
//     state[page] = await api.UploadPage(page, state[page]);
//     commit("mutLoader", false);
// };

// // редактирование группы
// export const actChangeGroup = async ({ commit, state }, { page, id, item }) => {
//     commit("mutLoader", true);
//     for (let key in item) {
//         if (item[key] != "") {
//             state[page].groups[id][key] = item[key];
//         }
//     }
//     state[page] = await api.UploadPage(page, state[page]);
//     commit("mutLoader", false);
// };

// // редактирование цен
// export const actChangePrice = async ({ commit, state }, { page, id, item }) => {
//     commit("mutLoader", true);
//     for (let key in item) {
//         if (item[key] != "") {
//             state[page].price[id][key] = item[key];
//         }
//     }
//     state[page] = await api.UploadPage(page, state[page]);
//     commit("mutLoader", false);
// };

// // редактирование медио
// export const actChangeMedio = async ({ commit, state }, { id, page, item }) => {
//     commit("mutLoader", true);
//     let src = [];
//     if (item.newImages.length != 0) {
//         src = await api.UploadImg([...item.newImages]);
//         item.images = [...src, ...item.oldImages];
//     } else {
//         item.images = [...item.oldImages];
//     }
//     delete item.newImages;
//     delete item.oldImages;
//     for (let key in item) {
//         if (item[key] != "") {
//             state[page].medio[id][key] = item[key];
//         }
//     }
//     state[page] = await api.UploadPage(page, state[page]);
//     commit("mutLoader", false);
// };

// // редактирование новостей
// export const actChangeNews = async ({ commit, state }, { id, page, item }) => {
//     commit("mutLoader", true);
//     let src = [];
//     if (item.newImages.length != 0) {
//         src = await api.UploadImg([...item.newImages]);
//         item.images = [...src, ...item.oldImages];
//     } else {
//         item.images = [...item.oldImages];
//     }
//     delete item.newImages;
//     delete item.oldImages;

//     item.videos = [...item.newVideos, ...item.oldVideos];
//     delete item.newVideos;
//     delete item.oldVideos;
//     for (let key in item) {
//         if (item[key] != "") {
//             state[page].news[id][key] = item[key];
//         }
//     }
//     state[page] = await api.UploadPage(page, state[page]);
//     commit("mutLoader", false);
// };

// // добавление тренера
// export const actAddTrainer = async ({ commit, state }, { page, item }) => {
//     commit("mutLoader", true);
//     let src = "";
//     if (item.src != "") {
//         src = await api.UploadImg(item.src);
//         item.src = src[0];
//     }
//     state[page].trainers.push(item);
//     state[page] = await api.UploadPage(page, state[page]);
//     commit("mutLoader", false);
// };

// // добавление группы
// export const actAddGroup = async ({ commit, state }, { page, item }) => {
//     commit("mutLoader", true);
//     state[page].groups.push(item);
//     state[page] = await api.UploadPage(page, state[page]);
//     commit("mutLoader", false);
// };

// // добавление цен
// export const actAddPrice = async ({ commit, state }, { page, item }) => {
//     commit("mutLoader", true);
//     state[page].price.push(item);
//     state[page] = await api.UploadPage(page, state[page]);
//     commit("mutLoader", false);
// };

// // добавление медио
// export const actAddMedio = async ({ commit, state }, { page, item }) => {
//     commit("mutLoader", true);
//     let src = "";
//     if (item.newImages.length != 0) {
//         src = await api.UploadImg([...item.newImages]);
//         item.images = [...src];
//     }
//     delete item.newImages;
//     delete item.oldImages;

//     state[page].medio.push(item);
//     state[page] = await api.UploadPage(page, state[page]);
//     commit("mutLoader", false);
// };

// // добавление новостей
// export const actAddNews = async ({ commit, state }, { page, item }) => {
//     commit("mutLoader", true);

//     let src = "";
//     if (item.newImages.length != 0) {
//         src = await api.UploadImg([...item.newImages]);
//         item.images = [...src];
//     }
//     delete item.newImages;
//     delete item.oldImages;

//     item.videos = [...item.newVideos];

//     delete item.newVideos;
//     delete item.oldVideos;

//     state[page].news.push(item);
//     state[page] = await api.UploadPage(page, state[page]);
//     commit("mutLoader", false);
// };
