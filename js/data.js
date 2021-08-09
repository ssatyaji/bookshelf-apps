const STORAGE_KEY = "BOOKSHELF_APP";

let books = [];

function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert("Broswer tidak didukung local storage");
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const seralizeData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(seralizeData);

    if(data !== null) {
        books = data;

    }
    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist()){
        saveData();
    }
}

function composeNewBookObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}

function findBook(bookId) {
    for(book of books){
        if(book.id === bookId)
            return book;
    }

    return null;
}

function findBookIndex(bookId) {
    let index = 0;
    for(book of books) {
        if(book.id === bookId)
            return index;

        index++;
    }

    return -1;
}