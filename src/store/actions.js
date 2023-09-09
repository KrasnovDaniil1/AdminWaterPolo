import * as api from "../api/api";

export const actPageAmateur = (context) => {
    context.commit("mutPageAmateur", api.PageAmateur());
};

export const actPageChildren = (context) => {
    context.commit("mutPageChildren", api.PageChildren());
};

export const actPageStudent = (context) => {
    context.commit("mutPageStudent", api.PageStudent());
};
export const actPageFederation = (context) => {
    context.commit("mutPageFederation", api.PageFederation());
};

