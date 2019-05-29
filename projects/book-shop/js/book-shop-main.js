'use strict'


function onInit() {
    createBooks()
    renderBooks()
    doTrans();
}

function renderBooks() {
    var books = getBooks()
    var strHtmls =
        books.map(book => {
            return `        
        <tr>
      <th scope="row">${book['id']}</th>
      <td>${book['title']}</td>
      <td>${book['price']}</td>
      <td>${book['rating']}</td>
      <td><button type="button" onClick="onReadBook('${book['id']}')" class="btn btn-primary"
      data-toggle="modal" data-trans="btn-read" data-target="#exampleModalScrollable">Read</button></td>
      <td><button type="button"data-trans="btn-update" onClick="onReadAndUpdateNewBook('${book['id']}')"
      data-toggle="modal" data-target="#exampleModalScrollable"
      class="btn btn-warning">Update</button></td>
      <td><button type="button" onClick="onDeleteBook('${book['id']}')" data-trans="btn-delete" class="btn btn-danger">Delete</button></td>
    </tr>
        `
        })
    $('.books-table').html(strHtmls)
}

function onReadBook(bookId) {
    var book = readBook(bookId)
    var strHtmls = `<img src="img/${book.imgUrl}.jpg" alt="book img" class="img-thumbnail" height="150px" width="150px">
    <div class="info"><h1>${book.title}</h1>
    <h3>price: ${book.price}$</h3></div>
    <div class="btn-group" data-toggle="buttons">
    <button type="button" class="btn btn-primary" onclick="onRatingChange('${book.id}', -1)">-</button>
    <h5><span class="rating-change">${book.rating}</span></h5>
    <button type="button" class="btn btn-primary" onclick="onRatingChange('${book.id}', 1)">+</button>
    </div>`
    $('.modal-title').text(book['title'])
    $('.modal-body').html(strHtmls)
}
function onReadAndUpdateNewBook(bookId) {
    // var newPrice = +prompt('Please enter the new price for the book')
    var strHtmls = `<div class="input-group input-group-sm mb-3">
    <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-sm">New Price</span>
    </div>
    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
    </div>`
    $('.modal-body').html(strHtmls)
    $('.modal-footer').html(`<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="updateBook('${bookId}')">Save changes</button>`)
    updateBook(bookId)
    renderBooks()
}
function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onReadAndAddNewBook() {
    var name = prompt('Please enter the name of the book')
    var price = +prompt('Please enter the price of the book')
    addBook(name,price)
    renderBooks()
}

function onRatingChange(book, changer) {
    $('.rating-change').text(ratingChange(book,changer))
    renderBooks()
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');

    doTrans();
}
