// array that stores instances of Book

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleReadStatus() {
    if (this.isRead === true) {
      this.isRead = false;
    } else {
      this.isRead = true;
    }
  }
}

class Library {
  constructor() {
    this.books = [
      new Book("In Search of Lost Time", "Marcel Proust", 468, true),
      new Book("Ulysses", "James Joyce", 736, false),
      new Book("Don Quixote", "Miguel de Cervantes", 1072, false),
    ];
  }

  displayBookInformation(listElement, book) {
    const informationList = document.createElement("ul");
    listElement.appendChild(informationList);
    const properties = Object.entries(book);
    properties.forEach((property) => {
      if (property[0] === "title") {
        return;
      }
      let listElement = document.createElement("li");
      switch (property[0]) {
        case "author":
          this.addAuthorToList(property, listElement, informationList);
          break;
        case "pages":
          this.addPagesToList(property, listElement, informationList);
          break;
        case "isRead":
          this.addIsReadToList(property, listElement, informationList);
          break;
      }
    });
    this.addReadStatusToggleButton(informationList, book);
    this.addDeleteButton(informationList, book);
  }

  displayBooks() {
    const bookList = document.getElementById("book_list");
    // reset list
    bookList.innerHTML = "";
    this.books.forEach((book) => {
      let listElement = document.createElement("li");
      listElement.appendChild(document.createTextNode(book.title));
      bookList.appendChild(listElement);
      this.displayBookInformation(listElement, book);
    });
    addDeleteBookButtonListeners();
    addToggleReadButtonListeners();
    addNewBookButtonListener();
  }

  addReadStatusToggleButton(informationList, book) {
    let listElement = document.createElement("li");
    let toggleButton = document.createElement("button");
    const bookIndex = this.books.indexOf(book);
    toggleButton.setAttribute("class", "toggle-read-button");
    toggleButton.setAttribute("data-index-number", `${bookIndex}`);
    toggleButton.appendChild(document.createTextNode("Toggle Read Status"));
    informationList.appendChild(listElement);
    listElement.appendChild(toggleButton);
  }

  addDeleteButton(informationList, book) {
    let listElement = document.createElement("li");
    let deleteButton = document.createElement("button");
    const bookIndex = this.books.indexOf(book);
    deleteButton.setAttribute("class", "delete-book-button");
    deleteButton.setAttribute("data-index-number", `${bookIndex}`);
    deleteButton.appendChild(document.createTextNode("Delete Book"));
    informationList.appendChild(listElement);
    listElement.appendChild(deleteButton);
  }

  addAuthorToList(property, listElement, informationList) {
    let text = `Author: ${property[1]}`;
    listElement.appendChild(document.createTextNode(text));
    informationList.appendChild(listElement);
  }

  addPagesToList(property, listElement, informationList) {
    let numberOfPages = property[1].toString();
    let text = `Number of pages: ${numberOfPages}`;
    listElement.appendChild(document.createTextNode(text));
    informationList.appendChild(listElement);
  }

  addIsReadToList(property, listElement, informationList) {
    let text = "";
    if (property[1] === true) {
      text = "This book has been read.";
    } else {
      text = "This book has not been read yet.";
    }
    listElement.appendChild(document.createTextNode(text));
    informationList.appendChild(listElement);
  }

  addNewBook() {
    // get title
    const title = document.getElementById("title").value;
    // get author
    const author = document.getElementById("author").value;
    // get number of pages
    const numberOfPages = document.getElementById("number_of_pages").value;
    // get isRead
    const isReadValue = bookFormController.findCheckedRadio();
    const book = new Book(title, author, numberOfPages, isReadValue);
    if (title === "" || author === "" || numberOfPages === "") {
      return bookFormController.errorAddingNewBook();
    }
    this.books.push(book);
    // remove form
    document.getElementById("new_book_form_container").innerHTML = "";
    // remove hide form button
    let newBookButtonContainer = document.getElementById(
      "new_book_button_container"
    );
    newBookButtonContainer.innerHTML = "";
    // add new book button
    let newBookButton = document.createElement("button");
    newBookButton.setAttribute("id", "new_book_button");
    newBookButtonContainer.appendChild(newBookButton);
    newBookButton.appendChild(document.createTextNode("New Book"));
    return this.displayBooks();
  }

  deleteBook(bookIndex) {
    this.books.splice(bookIndex, 1);
    this.displayBooks();
  }

  toggleRead(bookIndex) {
    let book = this.books[bookIndex];
    book.toggleReadStatus();
    this.displayBooks();
  }
}
// creates and displays form for creating new book
class BookFormController {
  createNewBookForm() {
    // reset
    document.getElementById("new_book_form_container").innerHTML = "";

    let form = document.createElement("form");
    form.setAttribute("action", "#");
    form.setAttribute("onsubmit", "library.addNewBook()");
    // title label
    let titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.appendChild(document.createTextNode("Title: "));
    form.appendChild(titleLabel);
    // title input
    let title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("name", "Title");
    title.setAttribute("id", "title");
    title.setAttribute("placeholder", "Title");
    titleLabel.appendChild(title);
    // author label
    let authorLabel = document.createElement("label");
    authorLabel.setAttribute("for", "author");
    authorLabel.appendChild(document.createTextNode("Author: "));
    form.appendChild(authorLabel);
    // author input
    let author = document.createElement("input");
    author.setAttribute("type", "text");
    author.setAttribute("name", "Author");
    author.setAttribute("id", "author");
    author.setAttribute("placeholder", "Author");
    authorLabel.appendChild(author);
    // pages label
    let numberOfPagesLabel = document.createElement("label");
    numberOfPagesLabel.setAttribute("for", "numberOfPages");
    numberOfPagesLabel.appendChild(
      document.createTextNode("Number of Pages: ")
    );
    form.appendChild(numberOfPagesLabel);
    // pages input
    let numberOfPages = document.createElement("input");
    numberOfPages.setAttribute("type", "number");
    numberOfPages.setAttribute("name", "Number of Pages");
    numberOfPages.setAttribute("id", "number_of_pages");
    numberOfPages.setAttribute("placeholder", "Number of Pages");
    numberOfPagesLabel.appendChild(numberOfPages);
    // isRead label
    let isReadLabel = document.createElement("label");
    isReadLabel.setAttribute("for", "isRead");
    isReadLabel.appendChild(
      document.createTextNode("Has the book been read yet?")
    );
    form.appendChild(isReadLabel);
    // isRead True input
    let hasBeenRead = document.createElement("input");
    hasBeenRead.setAttribute("type", "radio");
    hasBeenRead.setAttribute("id", "true");
    hasBeenRead.setAttribute("name", "isRead");
    hasBeenRead.setAttribute("value", "true");
    // isRead True label
    let hasBeenReadLabel = document.createElement("label");
    hasBeenReadLabel.setAttribute("for", "true");
    hasBeenReadLabel.appendChild(document.createTextNode("Yes."));
    isReadLabel.appendChild(hasBeenRead);
    isReadLabel.appendChild(hasBeenReadLabel);
    // isRead False input
    let hasNotBeenRead = document.createElement("input");
    hasNotBeenRead.setAttribute("type", "radio");
    hasNotBeenRead.setAttribute("id", "false");
    hasNotBeenRead.setAttribute("name", "isRead");
    hasNotBeenRead.setAttribute("value", "false");
    // isRead False label
    let hasNotBeenReadLabel = document.createElement("label");
    hasNotBeenReadLabel.setAttribute("for", "false");
    hasNotBeenReadLabel.appendChild(document.createTextNode("No."));
    isReadLabel.appendChild(hasNotBeenRead);
    isReadLabel.appendChild(hasNotBeenReadLabel);
    // Submit
    let submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Submit");
    submit.setAttribute("id", "submit_new_book_button");
    form.appendChild(submit);
    // append to DOM
    document.getElementById("new_book_form_container").appendChild(form);
    // remove new book button
    let span = document.getElementById("new_book_button_container");
    span.innerHTML = "";
    // create hide form button
    let hideButton = document.createElement("button");
    hideButton.setAttribute("id", "hide_new_book_form");
    hideButton.appendChild(document.createTextNode("Hide Form"));
    span.appendChild(hideButton);

    addHideFormButtonListener();
  }

  hideNewBookForm() {
    let formContainer = document.getElementById("new_book_form_container");
    formContainer.innerHTML = "";
    let newBookButton = document.createElement("button");
    newBookButton.setAttribute("id", "new_book_button");
    let newBookButtonContainer = document.getElementById(
      "new_book_button_container"
    );
    newBookButtonContainer.innerHTML = "";
    newBookButton.appendChild(document.createTextNode("New Book"));
    newBookButtonContainer.appendChild(newBookButton);
    addNewBookButtonListener();
  }

  errorAddingNewBook() {
    alert("Something is wrong with the form, please try again...");
    return this.createNewBookForm();
  }

  findCheckedRadio() {
    let value = false;
    const elements = document.getElementsByName("isRead");
    elements.forEach((element) => {
      if (element.checked) {
        value = element.value;
      }
    });
    if (value === "true") {
      return true;
    } else return false;
  }
}

let bookFormController = new BookFormController();
let library = new Library();

// see if DOM is already available
function docReady(fn) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

// add listener to hide book form button
function addHideFormButtonListener() {
  document
    .getElementById("hide_new_book_form")
    .addEventListener("click", bookFormController.hideNewBookForm);
}

// add listener to all delete book buttons
function addDeleteBookButtonListeners() {
  document.querySelectorAll(".delete-book-button").forEach((item) => {
    let bookIndex = item.dataset.indexNumber;
    item.addEventListener("click", function () {
      library.deleteBook(bookIndex);
    });
  });
}

// add listener to all toggle read buttons
function addToggleReadButtonListeners() {
  document.querySelectorAll(".toggle-read-button").forEach((item) => {
    let bookIndex = item.dataset.indexNumber;
    item.addEventListener("click", function () {
      library.toggleRead(bookIndex);
    });
  });
}

// add listener to add new book button
function addNewBookButtonListener() {
  document
    .getElementById("new_book_button")
    .addEventListener("click", bookFormController.createNewBookForm);
}

// DOM ready before displaying books

docReady(function () {
  library.displayBooks();
});
