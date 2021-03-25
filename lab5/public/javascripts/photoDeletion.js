function deleteData() {
    fetch("/templates/loading.mst").then((x) => x.text())
        .then((loading) => {
            const modalWindow = document.getElementById("exampleModal");
            bootstrap.Modal.getInstance(modalWindow).hide();
            const div_main = document.getElementById("div-main");
            div_main.innerHTML = loading;
        })
        .catch((err) => console.error(err));
    Promise.all([
            fetch("/templates/photoDel.mst").then((x) => x.text()),
            fetch(`/api/photos/${window.location.href.split('/')[4]}`, {
                method: "POST"
            }),
        ])
        .then((templateStr) => {
            const htmlStr = Mustache.render(templateStr[0]);
            const mainDiv = document.getElementById("div-main");
            mainDiv.innerHTML = htmlStr;
        })
        .catch((err) => console.error(err));
}

const deleteButton = document.getElementById("button-delete-photo-confirmed");
deleteButton.onclick = () => {
    deleteData();
}