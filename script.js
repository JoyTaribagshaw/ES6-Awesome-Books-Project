// const links = document.querySelectorAll('.navbar-list');
// const containers = document.querySelectorAll('.container');
// const bookHeading = document.querySelector('.book--heading');

// import { DateTime } from './node_modules/luxon/build/es6/luxon.js';
import { links, containers, bookHeading } from './modules/variables.js';

// const now = DateTime.now();
// console.log(now);
function hideAllContainers() {
  containers.forEach((container) => {
    container.style.display = 'none';
  });
}
function removeAllActiveLInks() {
  links.forEach((link) => {
    link.classList.remove('show--active--link');
  });
}

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    const linkClass = e.currentTarget.classList[1];
    hideAllContainers();
    removeAllActiveLInks();
    e.target.classList.add('show--active--link');
    containers.forEach((container) => {
      if (linkClass === container.id) {
        if (container.id === 'bookList') {
          bookHeading.style.display = 'block';
        } else {
          bookHeading.style.display = 'none';
        }
        container.style.display = 'block';
      } else {
        container.style.display = 'none';
      }
    });
  });
});
window.addEventListener('DOMContentLoaded', () => {
  hideAllContainers();
  removeAllActiveLInks();
  containers[0].style.display = 'block';
  links[0].classList.add('show--active--link');
});

class BookStore {
  constructor() {
    this.bookStore = JSON.parse(localStorage.getItem('bookItem')) || [];
    this.submitButton = document.getElementById('submit');
    this.bookListDiv = document.getElementById('bookList');

    this.submitButton.addEventListener('click', this.addBook.bind(this));
    this.displayBooks();
  }

  displayBooks() {
    this.bookListDiv.innerHTML = '';

    for (let i = 0; i < this.bookStore.length; i += 1) {
      const book = this.bookStore[i];

      const bookHTML = `
        <div class="book">
          <p>${book.bookTitle}</p>
          <p>${book.bookAuthor}</p>
          <button onclick="bookStore.removeBook(${i})">Remove</button>
        </div>
      `;
      this.bookListDiv.innerHTML += bookHTML;
      this.checkForBookstoreLength();
    }
  }

  addBook() {
    const bookTitle = document.getElementById('title').value;
    const bookAuthor = document.getElementById('author').value;
    const newBook = { bookTitle, bookAuthor };
    this.bookStore.push(newBook);
    localStorage.setItem('bookItem', JSON.stringify(this.bookStore));
    this.displayBooks();
    this.clearForm();
  }

  removeBook(index) {
    this.bookStore.splice(index, 1);
    localStorage.setItem('bookItem', JSON.stringify(this.bookStore));
    this.displayBooks();
    this.checkForBookstoreLength();
  }

  checkForBookstoreLength() {
    return this.bookStore.length > 0 ? this.bookListDiv.classList.add('showBookListBorder') : this.bookListDiv.classList.remove('showBookListBorder');
  }

  clearForm() {
    this.document.getElementById('title').value = '';
    this.document.getElementById('author').value = '';
  }
}

this.bookStore = new BookStore();