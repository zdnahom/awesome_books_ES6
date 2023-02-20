/* eslint import/no-unresolved*/


import Library from './modules/Library.js';
import { DateTime } from './node_modules/luxon/src/luxon.js';

const books = JSON.parse(localStorage.getItem('books')) || [];
const lib = new Library();
window.lib = lib;
const now = DateTime.now().toLocaleString(DateTime.DATETIME_MED);

const dateP = document.querySelector('.date');
const booksList = document.querySelector('.books');
const nav = document.querySelector('.navigator ul');
const listLink = document.querySelector('#book-list');
const newBookLink = document.querySelector('#new-book');
const contactLink = document.querySelector('#contact');
const bookListSection = document.querySelector('.booklist');
const addBookSection = document.querySelector('.addbook-section');
const contactSection = document.querySelector('.contact-details');
const form = document.querySelector('form');
const { title, author } = form.elements;

const generateBooks = (data) => {
  data.forEach((item) => {
    const title = item.title[0].toUpperCase() + item.title.slice(1);
    const author = item.author[0].toUpperCase() + item.author.slice(1);
    const book = document.createElement('div');
    book.innerHTML = `
        <p> "${title}" by <strong>${author}</strong></p>
        <button type="button" onclick="window.lib.removeBooks(${item.id})">Remove</button>
        `;
    booksList.appendChild(book);
  });
};

nav.addEventListener('click', (event) => {
  if (event.target.id === listLink.id) {
    listLink.classList.add('active');
    newBookLink.classList.remove('active');
    contactLink.classList.remove('active');

    addBookSection.classList.add('hide');
    bookListSection.classList.remove('hide');
    contactSection.classList.add('hide');
  } else if (event.target.id === newBookLink.id) {
    newBookLink.classList.add('active');
    listLink.classList.remove('active');
    contactLink.classList.remove('active');

    addBookSection.classList.remove('hide');
    bookListSection.classList.add('hide');
    contactSection.classList.add('hide');
  } else {
    contactLink.classList.add('active');
    listLink.classList.remove('active');
    newBookLink.classList.remove('active');

    addBookSection.classList.add('hide');
    bookListSection.classList.add('hide');
    contactSection.classList.remove('hide');
  }
});

form.addEventListener('submit', () => {
  lib.addBooks(title, author);
});

dateP.innerHTML = `${now}`;
generateBooks(books);
if (books.length === 0) {
  booksList.style.display = 'none';
}
