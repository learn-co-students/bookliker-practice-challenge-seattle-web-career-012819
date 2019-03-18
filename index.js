document.addEventListener("DOMContentLoaded", function() {});

const listPanel = document.getElementById('list-panel')
const list = document.getElementById('list')

console.log("Program is RUNNING!!!")

fetch("http://localhost:3000/books")
.then(result => result.json())
.then(json => {
  console.log("I'm in the fetch method. Here is JSON: ", json);
  makeBookList(json)
})

function makeBookList(books){
  for (let i = 0; i < books.length; i++){
    addBookToList(books[i]);
  }
}

function addBookToList(book){
  let li = document.createElement("li");
  li.textContent = book.title;
  list.appendChild(li);

  console.log("THIS IS BOOK:  ", book)
  console.log("I'm in ADD_BOOK_TO_LIST")
}
