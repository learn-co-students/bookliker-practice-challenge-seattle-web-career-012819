document.addEventListener("DOMContentLoaded", function() {});
BOOKS_URL = 'http://localhost:3000/books'

const showDiv = document.getElementById('show-panel')
const img = document.createElement('img')
const p = document.createElement('p')
const p2 = document.createElement('p2')
const ul = document.createElement('ul')
const button = document.createElement('button')
button.innerText = 'Like!'
showDiv.appendChild(img)
showDiv.appendChild(p)
showDiv.appendChild(p2)
showDiv.appendChild(ul)

fetch(BOOKS_URL)
    .then(response => response.json())
    .then(json => {
    books = json
    showAll(books)
})

function showAll(books) {
    for (let book of books){    
    const li = document.createElement('li')
    li.innerText = book.title

    li.addEventListener('click', ()=> showBook(book))

    list.appendChild(li)
    }
}

function showBook(book){
    ul.innerText = ''
    img.src = book.img_url
    p.innerText = book.description
    p2.innerText = "This book has been liked by:"
    for (let user of book.users){
        const li = document.createElement('li')
        li.innerText = user.username
        ul.appendChild(li)
    }
    button.addEventListener('click',() => addUser(book))
    showDiv.append(button)
}

function addUser(book){
    const me = {"id":1, "username": "pouros"}
    if(book.users[book.users.length - 1].id == me.id) {
        alert("screw you")
        return
    }
    book.users.push(me)
    
    fetch(`${BOOKS_URL}/${book.id}`,{
    method: "PATCH",
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    body: JSON.stringify({'users': book.users})
    })
    showBook(book)
}