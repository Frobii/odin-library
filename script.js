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

function populateData(row, item) {
  const titleCell = row.insertCell();
  const authorCell = row.insertCell();
  const statusCell = row.insertCell();

  titleCell.textContent = item.title;
  authorCell.textContent = item.author;
  statusCell.textContent = item.readingStatus;
}

function createDeleteButton(row, item, library = myLibrary) {
  const deleteButton = document.createElement('button');
  const deleteButtonCell = row.insertCell();

  deleteButtonCell.appendChild(deleteButton);

  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';

  const index = library.indexOf(item);

  deleteButton.setAttribute('index', index);
  deleteButton.setAttribute('onclick', `deleteBook(${index})`);
}

function populateTable(library = myLibrary, table = bookTable) {
  library.forEach((item) => {
    if (item.itemised) {
      return;
    }

    const row = table.insertRow();

    populateData(row, item);

    createDeleteButton(row, item);

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
