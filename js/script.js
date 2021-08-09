document.addEventListener("DOMContentLoaded", function() {

    const submitForm = document.getElementById("createNewBook");
    const searchForm = document.getElementById("findBook");

    submitForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addNewBook();
    });

    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        searchBook();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Buku berhasil disimpan");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});