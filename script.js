const myLibrary = [];

function Book (name, author, year) {
    this.name = name;
    this.author = author;
    this.year = year;

}

function addBookToLibrary (book) {
    myLibrary.push(book);
}

const book1 = new Book("river and the source", "Margaret Ogolla", "2000"); 
addBookToLibrary(book1);
console.log(book1);
console.log(myLibrary);
