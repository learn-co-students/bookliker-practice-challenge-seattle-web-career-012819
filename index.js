const BOOKS = "http://localhost:3000/books"

document.addEventListener("DOMContentLoaded", listBooks());


function listBooks(){
   fetch(BOOKS)
   .then(response => response.json())
   .then(json =>
      json.forEach((book) => {
         let li = document.createElement('li')
         let ul = document.getElementById('list')
         li.textContent = book.title
         li.addEventListener('click', () => {
            let info = document.getElementById('show-panel')
            info.innerHTML = '';
            let h1 = document.createElement('h1')
            let img = document.createElement('img')
            let body = document.createElement('body')
            let button = document.createElement('button')
            let h3 = document.createElement('h3')
            let bookUl = document.createElement('ul')
            bookUl.id = 'like-list'
            h1.textContent = book.title
            h3.textContent = "Users who like this Book:"
            img.src = book.img_url
            body.textContent = "description"
            button.textContent = 'Like Book'
            for (let i = 0; i < book.users.length; i++){
               let like = document.createElement('li')
               like.textContent = book.users[i].username
               bookUl.appendChild(like)
            }
            info.appendChild(h1)
            info.appendChild(img)
            info.appendChild(body)
            button.addEventListener('click', () => likeBook(book))
            info.appendChild(button)
            info.appendChild(h3)
            info.appendChild(bookUl)
            })
         ul.appendChild(li);
      })
   )
}

function likeBook(book){
   bookUl = document.getElementById('like-list')
   currentLikers = book.users
   allusers = currentLikers.map(user => user.username)
   user1 = {"id":1, "username":"kevben"}
   if (allusers.includes(user1.username)){
      alert("You already freakin liked it!");
   }
   else {(currentLikers.push(user1))
   fetch(BOOKS + `/${book.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify({"users": currentLikers})
   })
   .then(response => response.json())
   .then(json => {
      let newLike = document.createElement('li')
      newLike.textContent = json.users[json.users.length - 1].username
      bookUl.appendChild(newLike)
   })
}
}
