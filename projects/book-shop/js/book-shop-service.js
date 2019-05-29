'use strict'

var gBooks;

function getBooks() {
    return gBooks
}

function createBooks() {
    var books = []
    var bookTitles = ['Harry Potter', 'The Hobbit', 'Eragon', 'Lord Of The Rings']
    for (let i = 0; i < bookTitles.length; i++) {
        books.push(createBook(bookTitles[i]))
    }
    gBooks = books;
    return gBooks
}

function createBook(title, price = getRandomIntInclusive(1, 200), rating = 0) {
    return {
        id: makeId(),
        title: title,
        price: price,
        rating: rating,
        imgUrl: title.replace(/\s/g, "")
    }
}

function readBook(bookId) {
    return gBooks.find(book => book.id === bookId)
}

function updateBook(bookId, price) {
    var book = gBooks.find(book => book.id === bookId)
    $('.modal-title').text(book['title'])
    book['price'] = price
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
}

function addBook(name, price) {
    gBooks.unshift(createBook(name, price))
}

function ratingChange(bookId, change) {
    var book = gBooks.find(book => book.id === bookId)
    book['rating'] += change
    if (book['rating'] < 0) book['rating']++
    if (book['rating'] > 10) book['rating']--
    console.log(book['rating'])
    return book['rating']
}