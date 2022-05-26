let library = [];

class Book {
    title;
    author;
    constructor (title, author) {
        this.title = title;
        this.author = author
    }
}
 
function addBookToLibrary(Book) {
    library.push(Book);
    return library
}


addBookToLibrary(new Book('Quantum Mechanics', 'Messiah'));
addBookToLibrary(new Book('Anatomy for the Artist', 'Sarah Simblet'));

// Build library cards
function buildLibrary() {
    const cardContainer = document.querySelector('.card-container');
    console.log(library);
    library.forEach(book => {
        addCard(cardContainer, book);
    })

}

function addCard(cardContainer, Book) {
    // Check if title already has card
    if (isInLibrary(Book)) return;

    let bookCard = document.createElement('div');
    let bookTitle = document.createElement('h3');
    let bookAuthor = document.createElement('h4');
    let removeButton = document.createElement('button');
    let readButton = document.createElement('button');

    bookCard.classList.add('card');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = Book.title;
    bookAuthor.textContent = Book.author;
    removeButton.textContent = 'Remove';
    readButton.textContent = 'Read';

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(removeButton);
    bookCard.appendChild(readButton);
    cardContainer.appendChild(bookCard);

    Book.Card = bookCard;

    removeButton.addEventListener('click', e => {
        let Card = e.target.parentNode;
        Card.parentNode.removeChild(Card);
    });

    readButton.addEventListener('click', e => {
        let Card = e.target.parentNode;
        Card.classList.toggle('read');
    });
}

function isInLibrary(Book) {
    let bookTitles = Array.from(document.querySelectorAll('.book-title'))
                    .map(element=>element.textContent);
    return bookTitles.includes(Book.title) ? true : false
}


const addBookButton = document.querySelector('button.add-book');
// Button display-hide form
addBookButton.addEventListener('click', e => displayForm(e));
function displayForm(e) {
    if (addBookForm.parentNode) {
        formContainer.removeChild(addBookForm);
    } else {
        formContainer.appendChild(addBookForm);
    }
}


const submitButton = document.querySelector('button#submit');
submitButton.addEventListener('click', e => {
    let titleField = document.querySelector('input[name="title"]').value;
    let authorField = document.querySelector('input[name="author"]').value;
    // Reset Fields


    // Dont add book if library has it
    let newBook = new Book(titleField, authorField)
    if (!isInLibrary(newBook)) {
        addBookToLibrary(newBook);
    }
    buildLibrary();
})



// Initial Page Setup
// Select Form
let formContainer = document.querySelector('.form-container');
let addBookForm = document.querySelector('.form');
// Hide form
formContainer.removeChild(addBookForm);

buildLibrary();