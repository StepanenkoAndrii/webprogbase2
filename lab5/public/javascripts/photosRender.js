function uploadData(currentPage, pageName) {
    fetch("/templates/loading.mst").then((x) => x.text())
        .then((loading) => {
            const appEl = document.getElementById("app");
            document.getElementById("div-search-new").classList.add("hidden-input");
            appEl.innerHTML = loading;
        })
        .catch((err) => console.error(err));
    Promise.all([
            fetch("/templates/photosStructure.mst").then((x) => x.text()),
            fetch("/templates/photosPagination.mst").then((x) => x.text()),
            fetch(`/api/photos?page=${currentPage}&name=${pageName}`).then((x) => x.json()),
        ])
        .then(([templateStr, paginationStr, jsonObject]) => {
            const itemsData = jsonObject.photos;
            const renderedPaginationStr = Mustache.render(paginationStr, {
                pagesNumber: jsonObject.pagesNumber,
                pages: jsonObject.pages
            });
            const renderedHtmlStr = Mustache.render(templateStr, {
                photos: itemsData,
                pagination: renderedPaginationStr
            });
            return renderedHtmlStr;
        })
        .then((htmlStr) => {
            const appEl = document.getElementById("app");
            appEl.innerHTML = htmlStr;
            document.getElementById("div-search-new").classList.remove("hidden-input");
            const prev = document.getElementById("prev");
            const next = document.getElementById("next");
            const total = document.getElementById("total");
            const controls = document.getElementById("controls");
            const searchName = document.getElementById("searchName");
            searchName.focus();

            if (currentPage == 1) {
                controls.classList.add("noPrev");
            }
            if (currentPage == Number.parseInt(total.textContent)) {
                controls.classList.add("noNext");
            }

            searchName.oninput = () => {
                uploadData(1, searchName.value);
            }
            prev.addEventListener('click', () => {
                uploadData(currentPage - 1, pageName);
            })
            next.addEventListener('click', () => {
                uploadData(currentPage + 1, pageName);
            })
        })
        .catch((err) => console.error(err));
}

uploadData(1, "");