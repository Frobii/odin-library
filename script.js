const myLibrary = [];
const bookTable = document.getElementById('book-table');
const form = document.getElementById('book-form');

function Book(title, author, readingStatus, itemised) {
  this.title = title;
  this.author = author;
  this.readingStatus = readingStatus;
  this.itemised = false;
}

function addBookToLibrary(title, author, read) {
  myLibrary.push(new Book(title, author, read));
}

function populateTable(library = myLibrary, table = bookTable) {
  library.forEach((item) => {
    if (item.itemised) {
      return;
    }

    const row = table.insertRow();

    const titleCell = row.insertCell();
    titleCell.textContent = item.title;

    const authorCell = row.insertCell();
    authorCell.textContent = item.author;

    const statusCell = row.insertCell();
    statusCell.textContent = item.readingStatus;

    item.itemised = true;
  });
}

function checkDuplicate(library, title, author) {
  let duplicateFound = false;

  library.forEach((item) => {
    if (item.title === title && item.author === author) {
      duplicateFound = true;
    }
  });

  return duplicateFound;
}

function submitForm(event) {
  event.preventDefault();

  const formData = new FormData(document.getElementById('book-form'));

  const title = formData.get('title');
  const author = formData.get('author');
  const readingStatus = formData.get('reading-status');

  if (!checkDuplicate(myLibrary, title, author) && title !== '') {
    addBookToLibrary(title, author, readingStatus);
    populateTable();
  }
}

form.addEventListener('submit', submitForm);

addBookToLibrary('Where The Wild Things Are', 'Mauriece Sendak', 'Read');

addBookToLibrary('Thinking Fast and Slow', 'Daniel Kahneman', 'Not Read');

addBookToLibrary('Think Like A Programmer', 'V. Anton Spraul', 'In Progress');

populateTable();
