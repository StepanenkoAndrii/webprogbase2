function uploadData() {
    fetch("/templates/loading.mst").then((x) => x.text())
        .then((loading) => {
            const appEl = document.getElementById("div-right-part-2");
            appEl.innerHTML = loading;
        })
        .catch((err) => console.error(err));
    Promise.all([
            fetch("/templates/lastPhotos.mst").then((x) => x.text()),
            fetch("/api/photos").then((x) => x.json()),
        ])
        .then(([templateLastPhotosStr, allPhotos]) => {
            const renderedHtmlStrList = Mustache.render(templateLastPhotosStr, {
                photos: allPhotos.lastPhotos,
            });
            return renderedHtmlStrList;
        })
        .then((htmlStr) => {
            const appEl = document.getElementById("div-right-part-2");
            appEl.innerHTML = htmlStr;
            const newPhotoButton = document.getElementById("input-new-photo");
            const currentForm = document.getElementById("form-photo-creation");
            newPhotoButton.disabled = false;

            newPhotoButton.onclick = () => {
                currentForm.onsubmit = function (el) {
                    console.log("+" + this);
                    el.preventDefault();
                    const formData = new FormData(this);
                    postData(formData);
                    currentForm.reset();
                }
            };
        })
        .catch((err) => console.error(err));
}

function postData(formData) {
    const newPhotoButton = document.getElementById("input-new-photo");
    const currentForm = document.getElementById("form-photo-creation");
    newPhotoButton.removeAttribute("onclick");
    currentForm.removeAttribute("onsubmit");
    fetch("/templates/loading.mst").then((x) => x.text())
        .then((loading) => {
            const appEl = document.getElementById("div-right-part-2");
            newPhotoButton.disabled = true;
            appEl.innerHTML = loading;
        })
        .catch((err) => console.error(err));
    Promise.all([
            fetch(
                `/api/photos`, {
                    method: "POST",
                    body: formData,
                }
            ).then((x) => x.json()),
        ])
        .then((newPhoto) => {
            const item = newPhoto[0];
            fetch("/toasts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(item),
            }).then((x) => x);
            uploadData();
        })
        .catch((err) => console.error(err));
}

uploadData();