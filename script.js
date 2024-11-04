const myLibrary = [];

function Book (name, author, pages, year, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.isRead = isRead;
}

function addBookToLibrary (book) {
    myLibrary.push(book);
}

const book1 = new Book("river and the source", "Margaret Ogolla", 400, "2000", true); 
addBookToLibrary(book1);
console.log(book1);
console.log(myLibrary);
