const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [
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

function Book(title, author, pages, year, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.isRead = isRead;
}

// Add the toggleReadStatus method to the Book prototype
Book.prototype.toggleReadStatus = function () {
    this.isRead = !this.isRead; // Toggle the read status
};

function addBookToLibrary(book) {
    myLibrary.push(book);
    saveLibraryToLocalStorage(); // Save to local storage after adding a book
}

function displayBooksTable() {
    const tableBody = document.getElementById('libraryTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const row = document.createElement('tr');

        for (const key in book) {
            if (typeof book[key] === 'function') continue;
            const cell = document.createElement('td');
            if (key === 'isRead') {
                cell.textContent = book[key] ? 'Yes' : 'No';
            } else {
                cell.textContent = book[key];
            }
            row.appendChild(cell);
        }

        // Add Remove button to each book
        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.setAttribute('data-index', index);
        removeButton.onclick = function () {
            const bookIndex = this.getAttribute('data-index');
            removeBook(bookIndex);
            displayBooksTable(); // Refresh table after removal
            saveLibraryToLocalStorage(); // Update local storage after removal
        };
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        // Create the Toggle Read Status button
        const toggleReadCell = document.createElement('td');
        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = book.isRead ? 'Mark as Unread' : 'Mark as Read'; // Toggle button text
        toggleReadButton.classList.add('toggle-read-button');
        toggleReadButton.setAttribute('data-index', index); // Set data-index for the button
        toggleReadButton.onclick = function () {
            const bookIndex = this.getAttribute('data-index');
            toggleReadStatus(bookIndex);
            displayBooksTable(); // Refresh table after toggling read status
            saveLibraryToLocalStorage(); // Update local storage after toggling status
        };
        toggleReadCell.appendChild(toggleReadButton);
        row.appendChild(toggleReadCell);

        tableBody.appendChild(row);
    });
}

function toggleReadStatus(index) {
    const book = myLibrary[index];
    book.toggleReadStatus(); // Toggle the read status of the book
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    saveLibraryToLocalStorage(); // Save to local storage after removal
}

// Show modal
function showFormDialog() {
    dialog.showModal();
}

// Close modal
function closeFormDialog() {
    dialog.close();
}

newBookButton.addEventListener('click', showFormDialog);
cancelButton.addEventListener('click', closeFormDialog);

// Close dialog when outer screen is clicked
const wrapper = document.querySelector('.wrapper');
dialog.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
        dialog.close();
    }
});

// Handle form submission behavior
submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    // Get form input values
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const pages = parseInt(document.getElementById('book-pages').value, 10); // to base 10
    const year = parseInt(document.getElementById('book-year').value, 10);
    const isRead = document.getElementById('book-read').checked;

    // Validate input
    if (!title || !author || isNaN(pages) || isNaN(year)) {
        alert("Please fill in all required fields");
        return;
    }

    // Save book values in a new book
    const newBook = new Book(title, author, pages, year, isRead);
    addBookToLibrary(newBook); // Add new book to library and save

    displayBooksTable();

    newBookForm.reset();

    dialog.close();
});

// Save library to local storage
function saveLibraryToLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// Load library from local storage
function loadLibraryFromLocalStorage() {
    const storedLibrary = localStorage.getItem('myLibrary');
    if (storedLibrary) {
        myLibrary.length = 0; // Clear the current array
        myLibrary.push(...JSON.parse(storedLibrary)); // Restore the library from storage
    }
}

// Load library and display on page load
loadLibraryFromLocalStorage();
displayBooksTable();
