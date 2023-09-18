import * as api from "../api/api";

// получение json страницы
export const actPage = async (context, page) => {
    context.commit("mutLoader", true);
    context.commit("mutPage", {
        page: page,
        data: await api.Page(page),
    });
    context.commit("mutLoader", false);
};

// удаление тренера
export const actDeleteTrainer = async ({ commit, state }, { page, id }) => {
    commit("mutLoader", true);
    state[page].trainers.splice(id, 1);
    state[page] = await api.UploadPage(page, state[page]);
    commit("mutLoader", false);
};

// удаление группы
export const actDeleteGroup = async ({ commit, state }, { page, id }) => {
    commit("mutLoader", true);
    state[page].groups.splice(id, 1);
    state[page] = await api.UploadPage(page, state[page]);
    commit("mutLoader", false);
};

// удаление цены
export const actDeletePrice = async ({ commit, state }, { page, id }) => {
    commit("mutLoader", true);
    state[page].price.splice(id, 1);
    state[page] = await api.UploadPage(page, state[page]);
    commit("mutLoader", false);
};

// редактирование тренера
export const actChangeTrainer = async (
    { commit, state },
    { page, id, item }
) => {
    commit("mutLoader", true);
    let src = "";
    if (item.src != "") {
        src = await api.UploadImg(item.src);
        item.src = src[0];
    }
    for (let key in item) {
        if (item[key] != "") {
            state[page].trainers[id][key] = item[key];
        }
    }
    state[page] = await api.UploadPage(page, state[page]);
    commit("mutLoader", false);
};

// редактирование группы
export const actChangeGroup = async ({ commit, state }, { page, id, item }) => {
    commit("mutLoader", true);
    for (let key in item) {
        if (item[key] != "") {
            state[page].groups[id][key] = item[key];
        }
    }
    state[page] = await api.UploadPage(page, state[page]);
    commit("mutLoader", false);
};

// редактирование цен
export const actChangePrice = async ({ commit, state }, { page, id, item }) => {
    commit("mutLoader", true);
    for (let key in item) {
        if (item[key] != "") {
            state[page].price[id][key] = item[key];
        }
    }
    state[page] = await api.UploadPage(page, state[page]);
    commit("mutLoader", false);
};

// редактирование медио
export const actChangeMedio = async ({ commit, state }, { item }) => {
    commit("mutLoader", true);
    console.log("actChangeMedio", item);
    // let src = "";
    // if (item.oldImages != "") {
    //     src = await api.UploadImg(item.oldImages);
    //     item.oldImages = src;
    //     console.log("Изменил", item.oldImages);
    // }
    // for (let key in item) {
    //     if (item[key] != "") {
    //         state[page].trainers[id][key] = item[key];
    //     }
    // }
    // state[page] = await api.UploadPage(page, state[page]);
    commit("mutLoader", false);
};

// добавление тренера
export const actAddTrainer = async ({ commit, state }, { page, item }) => {
    commit("mutLoader", true);
    let src = "";
    if (item.src != "") {
        src = await api.UploadImg(item.src);
        item.src = src[0];
    }
    state[page].trainers.push(item);
    state[page] = await api.UploadPage(page, state[page]);
    commit("mutLoader", false);
};

// добавление группы
export const actAddGroup = async ({ commit, state }, { page, item }) => {
    commit("mutLoader", true);
    state[page].groups.push(item);
    state[page] = await api.UploadPage(page, state[page]);
    commit("mutLoader", false);
};

// добавление цен
export const actAddPrice = async ({ commit, state }, { page, item }) => {
    commit("mutLoader", true);
    state[page].price.push(item);
    state[page] = await api.UploadPage(page, state[page]);
    commit("mutLoader", false);
};
