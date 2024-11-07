const myLibrary = [
    { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 281, year: 1960, isRead: true },
    { title: "Pride and Prejudice", author: "Jane Austen", pages: 279, year: 1813, isRead: false },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", pages: 214, year: 1951, isRead: true },
    { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310, year: 1937, isRead: false },
    { title: "1984", author: "George Orwell", pages: 328, year: 1949, isRead: true },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180, year: 1925, isRead: false }
];  


const newBookButton = document.getElementById('new-book');
const dialog = document.querySelector('dialog');
const newBookForm = document.getElementById('book-form');
const submitButton = document.getElementById('submit-btn');
const cancelButton = document.getElementById('cancel-btn');


function Book (title, author, pages, year, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.isRead = isRead;
}

function addBookToLibrary (book) {
    myLibrary.push(book);
}

function displayBooksTable () {
    const tableBody = document.getElementById('libraryTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    myLibrary.forEach((book) => {
        const row = document.createElement('tr');

        for (const key in book) {
            const cell = document.createElement('td');
            cell.textContent = book[key];
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    });
}
// show modal
function showFormDialog () {
    dialog.showModal();
}

//close modal
function closeFormDialog () {
    dialog.close();
}

newBookButton.addEventListener('click', showFormDialog);
cancelButton.addEventListener('click', closeFormDialog);

// Handle form submission behavior.
const bookForm = document.getElementById('book-form');
bookForm.addEventListener('click', (event) => {
    event.preventDefault();
})

// Get form input values
const title = document.getElementById('book-title').value;
const author = document.getElementById('book-author').value;
const pages =  parseInt(document.getElementById('book-pages').value, 10); /* to base 10 */
const year = parseInt(document.getElementById('book-year').value, 10);
const isRead = document.getElementById('book-read').checked;



displayBooksTable();


