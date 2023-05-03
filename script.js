const myLibrary = [];
const bookTable = document.getElementById('book-table');
const form = document.getElementById('book-form');

const popUpButton = document.querySelector('.popup-button');
const popUp = document.querySelector('.popup');
const popUpOverlay = document.querySelector('.popup-overlay');

class Book {
  constructor(title, author, readingStatus, itemised = false) {
    this.title = title;
    this.author = author;
    this.readingStatus = readingStatus;
    this.itemised = false;
  }

  changeStatus() {
    if (this.readingStatus === 'Read') {
      this.readingStatus = 'Not Read';
    } else if (this.readingStatus === 'Not Read') {
      this.readingStatus = 'In Progress';
    } else if (this.readingStatus === 'In Progress') {
      this.readingStatus = 'Read';
    }
    const id = this.title + this.author;
    const rowToAlter = document.querySelector(`[data-id="${id}"]`);
    rowToAlter.cells[2].querySelector('.status-button').textContent =
      this.readingStatus;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBookToLibrary(title, author, read) {
    this.books.push(new Book(title, author, read));
  }

  populateData(row, item) {
    const titleCell = row.insertCell();
    const authorCell = row.insertCell();
  
    titleCell.textContent = item.title;
    authorCell.textContent = item.author;
  }

}

function createStatusButton(row, item, library = myLibrary, table = bookTable) {
  const statusButton = document.createElement('button');
  const statusButtonCell = row.insertCell();

  statusButtonCell.appendChild(statusButton);

  statusButton.innerText = item.readingStatus;
  statusButton.className = 'status-button';

  statusButton.addEventListener('click', () => {
    item.changeStatus();
  });
}

function createDeleteButton(row, item, library = myLibrary, table = bookTable) {
  const deleteButton = document.createElement('button');
  const deleteButtonCell = row.insertCell();

  deleteButtonCell.appendChild(deleteButton);

  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';

  const id = item.title + item.author;
  row.setAttribute('data-id', id);

  deleteButton.addEventListener('click', () => {
    const rowToDelete = document.querySelector(`[data-id="${id}"]`);
    const index = Array.from(table.rows).indexOf(rowToDelete) - 1;
    deleteBook(index);
  });
}

function deleteBook(index, library = myLibrary, table = bookTable) {
  library.splice(index, 1);
  table.deleteRow(index + 1);
}

function populateTable(library = myLibrary, table = bookTable) {
  library.forEach((item) => {
    if (item.itemised) {
      return;
    }

    const row = table.insertRow();

    populateData(row, item);

    createStatusButton(row, item);

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

popUpButton.addEventListener('click', () => {
  popUp.style.display = 'block';
  popUpOverlay.style.display = 'block';
});

popUpOverlay.addEventListener('click', () => {
  popUp.style.display = 'none';
  popUpOverlay.style.display = 'none';
});

form.addEventListener('submit', submitForm);

addBookToLibrary('Where The Wild Things Are', 'Mauriece Sendak', 'Read');
addBookToLibrary('Thinking Fast and Slow', 'Daniel Kahneman', 'Not Read');
addBookToLibrary('Think Like A Programmer', 'V. Anton Spraul', 'In Progress');

populateTable();
