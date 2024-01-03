let auth =
    "Bearer KjrOO-UX1-Ee3Shh1luZ2fDEWFeDTD?Fp/pZ4fgJdLpv3wfX/b0gmChpRFTf6YdOHF3Ije2i51LB?IthypPCxmop0pGXfNj7PygQ1MBQX/NLN57AhJg!xsXD09uBxHxW6ZGFJXItFbIOmdBGUf4kIOnTl7Tmy0eXwsClh9I6Y7??rnTL0fpV0vu/6RkH/bNW/f-eGT0Y?xYoCWxYsrqHZEXXV!7trE0hV4Of7UJXT-/voFSOeAU/-e4sGfVt=e7V";

export const UploadImg = async (src) => {
    let form = new FormData();
    if (src.length > 0) {
        for (let item of src) {
            form.append("files[]", item);
        }
    } else {
        form.append("files[]", src);
    }
    let response = await fetch("https://klwp.pro/api/upload.php", {
        method: "POST",
        headers: {
            Authorization: auth,
        },
        body: form,
    });
    let data = await response.json();
    return data.links;
};

export const UploadPage = async (kod) => {
    kod = JSON.stringify(kod);
    let form = new FormData();
    form.append("data", kod);
    let response = await fetch(`https://klwp.pro/api/page.php?page=WaterPolo`, {
        method: "POST",
        headers: {
            Authorization: auth,
        },
        body: form,
    });
    let data = await response.json();
    return data;
};

export const Page = async () => {
    let response = await fetch(`https://klwp.pro/api/pages/WaterPolo.json`);
    let data = await response.json();
    return data;
};
