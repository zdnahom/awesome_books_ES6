export class Library {
    books = [];
  
    addBooks(title, author) {
      const idRandom = Math.floor(Math.random() * 100000);
      const bookInfo = new Book(idRandom, title.value, author.value);
      this.books.push(bookInfo);
      localStorage.setItem("books", JSON.stringify(this.books));
    }
  
    removeBooks(id) {
      this.books = this.books.filter((book) => book.id !== id);
      localStorage.setItem("books", JSON.stringify(this.books));
      window.location.reload();
    }
  }