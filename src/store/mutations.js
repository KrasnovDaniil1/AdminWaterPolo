import * as api from "../api/api";

export const mutPageAmateur = (state, page) => (state.pageAmateur = page);

export const mutDeleteTrainer = (state, { page, id }) => {
    state[page].trainers.splice(id, 1);
};

export const mutChangeTrainer = (state, { page, id, item }) => {
    if (item.src != "") {
        item.src = api.UploadImg(item.src);
    }
    for (let key in item) {
        if (item[key] != "") {
            state[page].trainers[id][key] = item[key];
        }
    }
    console.log(state.pageAmateur.trainers);
};

export const mutPageChildren = (state, page) => (state.pageChildren = page);

export const mutPageStudent = (state, page) => (state.pageStudent = page);

export const mutPageFederation = (state, page) => (state.pageFederation = page);
