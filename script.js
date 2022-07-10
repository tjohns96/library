const title = document.querySelector("#title");
const author = document.querySelector("#author");
const numPages = document.querySelector("#pages");
const read = document.querySelector("#read");
const addBook = document.querySelector(".add-book")
const library = document.querySelector(".library");
function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}
Book.prototype.addToLibrary = function () {
    let bookDiv = document.createElement("div");
    let bookTitle = document.createElement("p");
    let bookAuthor = document.createElement("p");
    let bookNumPages = document.createElement("p");
    let bookRead = document.createElement("p");
    let deleteButton = document.createElement("input");
    let switchLabel = document.createElement("label");
    let checkbox = document.createElement("input");
    let slider = document.createElement("span");
    deleteButton.setAttribute("type", "image");
    deleteButton.setAttribute("src", "trash-can-outline.svg");
    deleteButton.setAttribute("class", "delete-button");
    switchLabel.setAttribute("class", "switch");
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("class", "toggleReadButton");
    slider.setAttribute("class", "slider");
    bookTitle.textContent = this.title;
    bookAuthor.textContent = `By: ${this.author}`;
    bookNumPages.textContent = `${this.numPages} pages`;
    if (this.read) {
        bookDiv.classList.add("read");
    }
    bookRead.textContent = this.read ? "Read ✔️" : "Read ❌";
    checkbox.checked = this.read;
    switchLabel.append(checkbox, slider);
    bookDiv.append(bookTitle, bookAuthor, bookNumPages, bookRead, switchLabel, deleteButton);
    bookDiv.classList.add("book");
    library.appendChild(bookDiv);
}
function createBook() {
    let book = new Book(title.value, author.value, numPages.value, read.checked);
    return book;
}
function deleteBook() {
    library.removeChild(this.parentElement);
}
function toggleRead() {
    let currBook = this.parentElement.parentElement;
    let readStatus = this.parentElement.previousElementSibling;
    readStatusBool = (readStatus.textContent === "Read ❌");
    readStatus.textContent = readStatusBool ? "Read ✔️" : "Read ❌";
    currBook.classList.toggle("read");
}
addBook.addEventListener("click", (e) => {
    let newBook = createBook();
    if (!(newBook.title && newBook.author && newBook.numPages) || (newBook.numPages < 1 || newBook.numPages > 10000)) {
        return;
    }
    newBook.addToLibrary();
    let deleteButton = document.querySelector(".book:last-child>.delete-button");
    deleteButton.addEventListener("click", deleteBook);
    let toggleReadButton = document.querySelector(".book:last-child>label>.toggleReadButton");
    toggleReadButton.addEventListener("click", toggleRead);
    e.preventDefault();
})