const newBook = document.querySelector("#new-open");
const bookInfo = document.querySelector(".book-info");
newBook.addEventListener("click", () => {
  bookInfo.classList.toggle("hidebookinfo");
});

let myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function domManipulation() {
  let bookTitle, bookAuthor, bookPages, readStatus;
  const bookForm = document.querySelector("#bookform");
  bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    bookTitle = document.querySelector("#title").value;
    bookAuthor = document.querySelector("#author").value;
    bookPages = document.querySelector("#pages").value;
    readStatus = document.querySelector(
      'input[name="read-status"]:checked'
    ).value;
    addBookToLibrary(bookTitle, bookAuthor, bookPages, readStatus);
  });
}

domManipulation();

function addBookToLibrary(bookTitle, bookAuthor, bookPages, readStatus) {
  const boolRead = readStatus === "read" ? true : false;

  const book = new Book(bookTitle, bookAuthor, bookPages, boolRead);
  myLibrary.push(book);
  displayBook();
}
const bookContainer = document.querySelector("#book-container");

function displayBook() {
  bookContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("bookItem");
    const { id, title, author, pages, read } = book;
    const h2Title = document.createElement("h2");
    h2Title.textContent = title;
    const h3Author = document.createElement("h3");
    h3Author.textContent = author;
    const h4Pages = document.createElement("h4");
    h4Pages.textContent = `Pages:${pages}`;
    readStatus = read === true ? "Read" : "Not Read";
    const buttonRead = document.createElement("button");
    const colorClass = read === true ? "green-btn" : "red-btn";
    buttonRead.classList.add(colorClass);
    buttonRead.textContent = readStatus;
    buttonRead.addEventListener("click", () => {
      if (buttonRead.textContent === "Read") {
        book.read = false;
        buttonRead.classList.remove("green-btn");
        buttonRead.classList.add("red-btn");

        buttonRead.textContent = "Not Read";
      } else {
        book.read = true;
        buttonRead.classList.remove("red-btn");
        buttonRead.classList.add("green-btn");
        buttonRead.textContent = "Read";
      }
    });
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      myLibrary = myLibrary.filter((book) => book.id != id);
      displayBook();
    });

    bookItem.appendChild(h2Title);
    bookItem.appendChild(h3Author);
    bookItem.appendChild(h4Pages);
    bookItem.appendChild(buttonRead);
    bookItem.appendChild(removeButton);
    bookContainer.appendChild(bookItem);
  });
}
