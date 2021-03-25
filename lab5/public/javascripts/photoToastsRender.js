const protocol = location.protocol === "https:" ? "wss:" : "ws:";
const wsLocation = `${protocol}//${location.host}`;
const connection = new WebSocket(wsLocation);

function renderToast(messageText) {
    const newItemToast = JSON.parse(messageText.data);
    fetch("/templates/toastMessage.mst")
        .then((x) => x.text())
        .then((toastMessage) => {
            const date = new Date();
            const time = date.getHours() + ":" + date.getMinutes();
            const toastsContainer = document.getElementById("div-toast-messages");
            toastsContainer.insertAdjacentHTML('beforeend', Mustache.render(toastMessage, {
                id: newItemToast._id,
                name: newItemToast.photoName,
                time: time,
                photoUrl: newItemToast.photoUrl
            }));
            const currentToast = document.getElementById("div-current-toast-" + newItemToast._id);
            const newPhotoHref = document.getElementById("a-new-photo-created-" + newItemToast._id);
            const buttonClose = document.getElementById("button-close-toast-" + newItemToast._id);
            buttonClose.addEventListener('click', () => {
                document.getElementById("div-current-toast-" + newItemToast._id).classList.add("hide");
            });
            newPhotoHref.href = `/photos/${newItemToast._id}`;
            const toastOption = {
                animation: true,
                autohide: true,
                delay: 60000,
            };
            new bootstrap.Toast(currentToast, toastOption).show();
        });
}

connection.addEventListener("open", () =>
    console.log(`Connected to ws server: `, wsLocation)
);
connection.addEventListener("error", () => console.error(`ws error`));
connection.addEventListener("message", (message) => {
    renderToast(message);
});