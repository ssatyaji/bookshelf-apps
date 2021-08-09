const UNREADED_BOOK = "unread";
const READED_BOOK = "readed";
const BOOK_ITEMID = "itemId";

function createBook(title, author, year, isCompleted) {

    const textTitle = document.createElement("h3");
    textTitle.innerText = title;

    const textAuthor = document.createElement("p");
    textAuthor.setAttribute("id", "author");
    textAuthor.innerText = author;

    const textYear = document.createElement("p");
    textYear.setAttribute("id", "year");
    textYear.innerText = year;

    const container = document.createElement("article");
    container.classList.add("unreaded")
    container.setAttribute("id", "book-unread");
    container.append(textTitle, textAuthor, textYear);

    if(isCompleted) {
        container.append(
            createUndoneButton(),
            createTrashButton()
        );
    }else{
        container.append(
            createDoneButton(),
            createTrashButton()
        );
    }

    return container;
}

function createDoneButton() {
    return createButton("btn", "btn-done", "Tandai Sudah Dibaca", function (event) {
        doneTaskFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("btn", "btn-delete", "Hapus", function (event) {
        deleteTask(event.target.parentElement);
        createModal("Buku berhasil dihapus!", "delete");
    });
}

function createUndoneButton() {
    return createButton("btn", "btn-undone", "Tandai Belum Dibaca", function (event) {
        undoneTaskCompleted(event.target.parentElement);
    });
}

function createModal(textModal, param) {
    const modal = document.getElementById("myModal");
    
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const modalSpan = document.createElement("span");
    modalSpan.setAttribute("id","close");
    modalSpan.innerText = 'x';

    const containerModal = document.createElement("p");
    containerModal.innerText = textModal;

    modalContent.append(modalSpan,containerModal);

    modal.append(modalContent);
    modal.style.display = "block";

    if(param === 'create'){
        modalContent.style.border = "2px solid #0abde3";
    }else if(param === 'delete'){
        modalContent.style.border = "2px solid #ee5253";
    }

    if(modalContent) {
        const spanClose = document.getElementById("close");

        spanClose.onclick = function() {
            modal.style.display = "none";
            modalContent.remove();
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            modalContent.remove();
        }
    }
}

function createButton(buttonTypeClass1, buttonTypeClass2, buttonText, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass1, buttonTypeClass2);
    button.textContent = buttonText;
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function addNewBook() {
    const uncompletedReadBook = document.getElementById(UNREADED_BOOK);
    const completedReadBook = document.getElementById(READED_BOOK);
    const textTitle = document.getElementById("title").value;
    const textAuthor = document.getElementById("author").value;
    const textYear = document.getElementById("date").value;
    const checkBox = document.getElementById("checklist").checked;

    const newBook = createBook(textTitle, textAuthor, textYear, checkBox);
    const newBookObject = composeNewBookObject(textTitle, textAuthor, textYear, checkBox);

    newBook[BOOK_ITEMID] = newBookObject.id;
    books.push(newBookObject);

    if(checkBox === true) {
        completedReadBook.append(newBook);
    }else{
        uncompletedReadBook.append(newBook);
    }
    
    updateDataToStorage();

    createModal("Berhasil membuat buku!", "create");
}

function doneTaskFromCompleted(taskElement) {
    const bookCompleted = document.getElementById(READED_BOOK);
    const bookTitle = taskElement.querySelector("#book-unread > h3").innerText;
    const bookAuthor = taskElement.querySelector("#author").innerText;
    const bookYear = taskElement.querySelector("#year").innerText;

    const newBook = createBook(bookTitle, bookAuthor, bookYear, true);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    bookCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function deleteTask(taskElement){
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function undoneTaskCompleted(taskElement) {
    const bookUncompleted = document.getElementById(UNREADED_BOOK);
    const bookTitle = taskElement.querySelector("#book-unread > h3").innerText;
    const bookAuthor = taskElement.querySelector("#author").innerText;
    const bookYear = taskElement.querySelector("#year").innerText;

    const newBook = createBook(bookTitle, bookAuthor, bookYear, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    bookUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function refreshDataFromBooks() {
    const bookUncompleted = document.getElementById(UNREADED_BOOK);
    const bookCompleted = document.getElementById(READED_BOOK);

    for(book of books) {
        const newBook = createBook(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;

        if(book.isCompleted){
            bookCompleted.append(newBook);
        }else{
            bookUncompleted.append(newBook);
        }
    }
}

function searchBook(){
    let input, filter, card, h3, textHeader, p, i;
    input = document.getElementById("cari_buku");
    filter = input.value.toUpperCase();
    card = document.getElementById("containerBooks");
    h3 = card.getElementsByTagName("h3");

    for (i = 0; i < h3.length; i++) {
        textHeader = h3[i].textContent || h3[i].innerHTML;
        if(textHeader.toUpperCase().indexOf(filter) > -1){
            h3[i].parentElement.style.display = "";
        }else{
            h3[i].parentElement.style.display = "none";
        }
    }
}