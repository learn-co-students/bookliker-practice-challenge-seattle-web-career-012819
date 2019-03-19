document.addEventListener("DOMContentLoaded", function() {});

const showPanel = document.getElementById('show-panel')
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
  li.addEventListener("click", () => {
    displayBookInfo(book);
  })

  list.appendChild(li);
}

function displayBookInfo(book){
  showPanel.innerHTML = ' '

  let bookTitle = document.createElement("h1");
  let bookImg = document.createElement("img");
  let bookDescription = document.createElement("p");
  let bookButton = document.createElement("button");
  let ul = document.createElement("ul");


  let title = book["title"]
  let image = book["img_url"]
  let description = book["description"]

  for (let user of book["users"]){
    let li = document.createElement("li")
    li.textContent = user.username
    ul.append(li)
  }

  bookTitle.textContent = title
  bookImg.setAttribute("src", image)
  bookDescription.textContent = description
  bookButton.textContent = "Like"
  bookButton.addEventListener("click", () => {
    likeBook(book)
  })

  showPanel.appendChild(bookTitle)
  showPanel.appendChild(bookImg)
  showPanel.appendChild(bookDescription)
  showPanel.appendChild(ul)
  showPanel.appendChild(bookButton)
}

function likeBook(book){
  // let newBookUsers = book.users;
  // console.log(newBookUsers);
  // newBookUsers.push({"id":1, "username":"pouros"})
  // console.log('after push', newBookUsers);
  fetch(`http://localhost:3000/books/${book.id}`, {
    method: "PATCH",
    headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    body:
      JSON.stringify({
        "users": book.users.push({"id":1, "username":"pouros"})
        // "users": [...newBookUsers]
    })
  }).then(result => console.log(book.users));

  displayBookInfo(book)
  console.log("Finished the PATCH")

}
