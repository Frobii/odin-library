const myLibrary = [];
const bookTable = document.getElementById('book-table');
const form = document.getElementById('book-form');

function Book(title, author, readingStatus) {
  this.title = title;
  this.author = author;
  this.readingStatus = readingStatus;
}

function addBookToLibrary(title, author, read) {
  myLibrary.push(new Book(title, author, read));
}

function populateTable(title, author, readingStatus, table = bookTable) {
  const row = table.insertRow();

  const titleCell = row.insertCell();
  titleCell.textContent = title;

  const authorCell = row.insertCell();
  authorCell.textContent = author;

  const statusCell = row.insertCell();
  statusCell.textContent = readingStatus;
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

  if (!checkDuplicate(myLibrary, title, author)) {
    addBookToLibrary(title, author, readingStatus);
    populateTable(title, author, readingStatus);
  }
}

form.addEventListener('submit', submitForm);

addBookToLibrary('Where The Wild Things Are', 'Mauriece Sendak', 'Complete');
populateTable(
  myLibrary[0].title,
  myLibrary[0].author,
  myLibrary[0].readingStatus
);
addBookToLibrary('Thinking Fast and Slow', 'Daniel Kahneman', 'Not Started');
populateTable(
  myLibrary[1].title,
  myLibrary[1].author,
  myLibrary[1].readingStatus
);
addBookToLibrary('Think Like A Programmer', 'V. Anton Spraul', 'In Progress');
populateTable(
  myLibrary[2].title,
  myLibrary[2].author,
  myLibrary[2].readingStatus
);
