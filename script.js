const bookTable = document.getElementById('book-table');
const form = document.getElementById('book-form');

const popUp = document.querySelector('.popup');
const popUpButton = document.querySelector('.popup-button');
const popUpOverlay = document.querySelector('.popup-overlay');

class Book {
  constructor(title, author, readingStatus, itemised = false) {
    this.title = title;
    this.author = author;
    this.readingStatus = readingStatus;
    this.itemised = itemised;
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
 
  static books = [];

  static addBookToLibrary(title, author, read) {
    this.books.push(new Book(title, author, read));
  }

  static deleteBook(index, library = this.books, table = bookTable) {
    library.splice(index, 1);
    table.deleteRow(index + 1);
  }

  static checkDuplicate(library = this.books, title, author) {
    let duplicateFound = false;
  
    library.forEach((item) => {
      if (item.title === title && item.author === author) {
        duplicateFound = true;
      }
    });
  
    return duplicateFound;
  }

  static populateTable(library = this.books, table = bookTable) {
    library.forEach((item) => {
      if (item.itemised) {
        return;
      }
  
      const row = table.insertRow();
  
      Table.populateData(row, item);
  
      Table.createStatusButton(row, item);
  
      Table.createDeleteButton(row, item);
  
      item.itemised = true;
    });
  }

  static submitForm(event) {
    event.preventDefault();
  
    const formData = new FormData(document.getElementById('book-form'));
  
    const title = formData.get('title');
    const author = formData.get('author');
    const readingStatus = formData.get('reading-status');

    const duplicate = Library.checkDuplicate(this.books, title, author)
  
    if (!duplicate && title !== '') {
      Library.addBookToLibrary(title, author, readingStatus);
      Library.populateTable();
    }
  }

}

class Table {
  static populateData(row, item) {
    const titleCell = row.insertCell();
    const authorCell = row.insertCell();
  
    titleCell.textContent = item.title;
    authorCell.textContent = item.author;
  }

  static createStatusButton(row, item, library = Library.books, table = bookTable) {
    const statusButton = document.createElement('button');
    const statusButtonCell = row.insertCell();
  
    statusButtonCell.appendChild(statusButton);
  
    statusButton.innerText = item.readingStatus;
    statusButton.className = 'status-button';
  
    statusButton.addEventListener('click', () => {
      item.changeStatus();
    });
  }

  static createDeleteButton(row, item, table = bookTable) {
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
      Library.deleteBook(index);
    });
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

form.addEventListener('submit', Library.submitForm);

whereTheWildThingsAre = new Book('Where The Wild Things Are', 'Mauriece Sendak', 'Read');
thinkingFastAndSlow = new Book('Thinking Fast and Slow', 'Daniel Kahneman', 'Not Read');
thinkLikeAProgrammer = new Book('Think Like A Programmer', 'V. Anton Spraul', 'In Progress')

Library.addBookToLibrary(whereTheWildThingsAre.title, whereTheWildThingsAre.author, whereTheWildThingsAre.readingStatus);
Library.addBookToLibrary(thinkingFastAndSlow.title, thinkingFastAndSlow.author, thinkingFastAndSlow.readingStatus);
Library.addBookToLibrary(thinkLikeAProgrammer.title, thinkLikeAProgrammer.author, thinkLikeAProgrammer.readingStatus);

Library.populateTable();
