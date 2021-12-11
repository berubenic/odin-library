let myLibrary = [
  new Book("In Search of Lost Time", "Marcel Proust", 468, false),
  new Book("Ulysses", "James Joyce", 736, false),
  new Book("Don Quixote", "Miguel de Cervantes", 1072, false),
];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function displayBooks(books) {
  const bookList = document.getElementById("book_list");
  // reset list
  bookList.innerHTML = "";
  books.forEach((book) => {
    let listElement = document.createElement("li");
    listElement.appendChild(document.createTextNode(book.title));
    bookList.appendChild(listElement);
    displayBookInformation(listElement, book);
  });
}

function displayBookInformation(listElement, book) {
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
        addAuthorToList(property, listElement, informationList);
        break;
      case "pages":
        addPagesToList(property, listElement, informationList);
        break;
      case "isRead":
        addIsReadToList(property, listElement, informationList);
        break;
    }
  });
}

function addAuthorToList(property, listElement, informationList) {
  text = `${property[0]}: ${property[1]}`;
  listElement.appendChild(document.createTextNode(text));
  informationList.appendChild(listElement);
}

function addPagesToList(property, listElement, informationList) {
  numberOfPages = property[1].toString();
  text = `Number of pages: ${numberOfPages}`;
  listElement.appendChild(document.createTextNode(text));
  informationList.appendChild(listElement);
}

function addIsReadToList(property, listElement, informationList) {
  if (property[1] === true) {
    text = "This book has been read.";
  } else {
    text = "This book has not been read yet.";
  }
  listElement.appendChild(document.createTextNode(text));
  informationList.appendChild(listElement);
}

function docReady(fn) {
  // see if DOM is already available
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

docReady(function () {
  document
    .getElementById("new_book_button")
    .addEventListener("click", createNewBookForm);
});

function createNewBookForm() {
  // reset
  document.getElementById("new_book_form_container").innerHTML = "";

  let form = document.createElement("form");
  form.setAttribute("action", "#");
  form.setAttribute("onsubmit", "addNewBook()");
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
  numberOfPagesLabel.appendChild(document.createTextNode("Number of Pages: "));
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
}

function addNewBook() {
  console.log("hi");
  // get title
  const title = document.getElementById("title").value;
  // get author
  const author = document.getElementById("author").value;
  // get number of pages
  const numberOfPages = document.getElementById("number_of_pages").value;
  // get isRead
  const isReadValue = findCheckedRadio();

  const book = new Book(title, author, numberOfPages, isReadValue);

  if (title === "" || author === "" || numberOfPages === "") {
    return errorAddingNewBook();
  }

  console.log(book);
  myLibrary.push(book);
  // remove form
  document.getElementById("new_book_form_container").innerHTML = "";
  return displayBooks(myLibrary);
}

function errorAddingNewBook() {
  alert("Something is wrong with the form, please try again...");
  return createNewBookForm();
}

function findCheckedRadio() {
  let value = false;
  const elements = document.getElementsByName("isRead");
  elements.forEach((element) => {
    if (element.checked) {
      value = element.value;
    }
  });
  return value;
}

docReady(function () {
  displayBooks(myLibrary);
});
