const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary('Where The Wild Things Are', 'Mauriece Sendak', '40', 'Yes');

addBookToLibrary('Think Like A Programmer', 'V. Anton Spraul', '256', 'Yes');

console.log(myLibrary);
