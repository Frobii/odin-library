const myLibrary = [];
const bookTable = document.getElementById('book-table');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function populateTable(array, table) {
  array.forEach((item) => {
    const row = table.insertRow();

    const titleCell = row.insertCell();
    titleCell.textContent = item.title;

    const authorCell = row.insertCell();
    authorCell.textContent = item.author;

    const statusCell = row.insertCell();
    statusCell.textContent = item.read;
  });
}

addBookToLibrary(
  'Where The Wild Things Are',
  'Mauriece Sendak',
  '40',
  'Complete'
);

addBookToLibrary(
  'Thinking Fast and Slow',
  'Daniel Kahneman',
  '499',
  'Not Started'
);

addBookToLibrary(
  'Think Like A Programmer',
  'V. Anton Spraul',
  '256',
  'In Progress'
);

populateTable(myLibrary, bookTable);
