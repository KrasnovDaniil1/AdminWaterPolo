export const mutPage = (state, data) => {
    state.data = data;
};

export const mutLoader = (state, status) => (state.loader = status);

// export const mutAddTrainer = async (state, { item }) => {
//     let src = "";
//     if (item.src != "") {
//         src = await api.UploadImg(item.src);
//         item.src = "https://klwp.pro/" + src[0];
//     }
//     state.trainers.push(item);
// };

// export const mutDeleteGroup = (state, { page, id }) => {
//     state[page].groups.splice(id, 1);
// };

// export const mutChangeTrainer = async (state, { page, id, item }) => {
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
// };

// export const mutChangeGroup = async (state, { page, id, item }) => {
//     for (let key in item) {
//         if (item[key] != "") {
//             state[page].groups[id][key] = item[key];
//         }
//     }
// };

// export const mutAddTrainer = async (state, { page, item }) => {
//     let src = "";
//     if (item.src != "") {
//         src = await api.UploadImg(item.src);
//         item.src = "https://klwp.pro/" + src[0];
//     }
//     state[page].trainers.push(item);
// };

// export const mutAddGroup = async (state, { page, item }) => {
//     state[page].groups.push(item);
// };

// export const mutPageChildren = (state, page) => (state.pageChildren = page);

// export const mutPageStudent = (state, page) => (state.pageStudent = page);

// export const mutPageFederation = (state, page) => (state.pageFederation = page);
