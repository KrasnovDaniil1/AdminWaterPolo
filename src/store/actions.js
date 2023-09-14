import * as api from "../api/api";

export const actPageAmateur = async (context) => {
    context.commit("mutPageAmateur", await api.Page("pageAmateur"));
};

export const actPageChildren = async (context) => {
    context.commit("mutPageChildren", await api.Page("pageChildren"));
};

export const actPageStudent = async (context) => {
    context.commit("mutPageStudent", await api.Page("pageStudent"));
};

export const actPageFederation = async (context) => {
    context.commit("mutPageFederation", await api.Page("pageFederation"));
};

export const actDeleteTrainer = async (context, { page, id }) => {
    context.state[page].trainers.splice(id, 1);
    context.state[page] = await api.UploadPage(page, context.state.pageAmateur);
};

// export const actNewPageAmateur = async (context) => {
//     context.commit(
//         "mutPageAmateur",
//         await api.UploadPage("pageAmateur", context.state.pageAmateur)
//     );
// };

// export const actNewPageChildren = async (context) => {
//     context.commit("mutPageChildren", await api.UploadPage("pageChildren"));
// };

// export const actNewPageStudent = async (context) => {
//     context.commit("mutPageStudent", await api.UploadPage("pageStudent"));
// };

// export const actNewPageFederation = async (context) => {
//     context.commit("mutPageFederation", await api.UploadPage("pageFederation"));
// };
