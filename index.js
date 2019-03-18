// Still need to add functionality to stop users liking same book more than once.

document.addEventListener("DOMContentLoaded", function() {

const bookList = document.getElementById('list')


function createBookShowSection(book){
  //create all elements to show a book
  const showPanel = document.getElementById('show-panel')
  showPanel.innerHTML = ''
  const div = document.createElement('div')
  const title = document.createElement('h3')
  const image = document.createElement('img')
  const description = document.createElement('p')
  const users = document.createElement('ul')
  const likeButton = document.createElement('button')
  likeButton.id = "like-btn"
  likeButton.textContent = "Read Book"
  //attach all the elements for showing a book
  div.appendChild(title)
  div.appendChild(image)
  div.appendChild(description)
  div.appendChild(users)
  div.appendChild(likeButton)
  showPanel.appendChild(div)
  //fill out the content for each book
  title.textContent = book.title
  description.textContent = book.description
  image.src = book.img_url
  book.users.forEach((user) => {
    userLi = document.createElement('li')
    userLi.textContent = user.username
    users.appendChild(userLi)
  })
}
//get all the books
function getBooks(){
  fetch('http://localhost:3000/books')
  .then(response => response.json())
  .then(json => {
    attachBooks(json)
  })
}

function attachBooks(data){
  //loop through all the books from fetch request
  data.forEach((book) => {
    let bookTitle = book.title
    let li = document.createElement('li')
    li.textContent = bookTitle
    // add an event listener to each individual book
    li.addEventListener('click',function(){
      createBookShowSection(book);
      const likeButton = document.getElementById('like-btn')
      // on click uses a fetch request to update the list of users to show that current user also likes it
      // *** currently nothing stopping someone from liking it more than once
      likeButton.addEventListener('click', function(e){
         book.users.push({"id":1, "username":"pouros"},)
          const body = {
            "users": book.users
          }
          fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(response => response.json())
          .then(book => createBookShowSection(book))
        }) // end of like button event listener
    }) // end of li event listener
    bookList.appendChild(li)
  }) // end of data for loop
} // end of attachbooks function

getBooks();
});









//
