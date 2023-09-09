import * as api from "../api/api";

export const actPageAmateur = (context) => {
    context.commit("mutPageAmateur", api.PageAmateur());
};
