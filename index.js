
class Book {
    constructor(title, author){
         this.title = title;
         this.author = author;
    }
}

class UI {
    static displayBooks(){
        const books = Store.getBooks();
        
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-Collection');
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td><a href="#" class="btn delete">Remove</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')) {
          el.parentElement.parentElement.remove();
        }
      }
     
      static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#bookForm');
        container.insertBefore(div, form);

        //Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearFilds() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
      }
}

// Store class: Handles storage