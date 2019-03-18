document.addEventListener("DOMContentLoaded", function() {});

const booksURL = "http://localhost:3000/books";
const usersURL = "http://localhost:3000/users";

const bookUl = document.getElementById("list");
const showPanel = document.getElementById("show-panel");


fetch(booksURL)
.then(response => response.json())
.then(json =>{
  json.forEach(book =>{
      const bookList = document.createElement("li");
      bookList.textContent = book.title;
      bookUl.appendChild(bookList);

      const isDuplicate = "yes";
      //show book images, users and description when title is clicked

      bookList.addEventListener('click', (ev)=>{
      showPanel.innerHTML = "";
      const bookImg = document.createElement("img");
      bookImg.src = book.img_url;
      showPanel.appendChild(bookImg);

      const bookDescription = document.createElement("p");
      bookDescription.textContent = book.description;
      showPanel.appendChild(bookDescription);

      const likeButton = document.createElement("button");
      likeButton.textContent = "Like it!";
      showPanel.appendChild(likeButton);


      const userUl = document.createElement("ul");
      let user1 = {"id":1, "username": "pouros"};

      //like button click start
      likeButton.addEventListener('click', ()=>{
        //update the frontend user list
        const newUserLi = document.createElement("li");
      if (!book.users.includes(user1)){
        book.users.push(user1);
        console.log(book.users);
        newUserLi.textContent = user1.username;
        userUl.appendChild(newUserLi);
      }
      else{
        alert("You have already liked it!!");
      }

        let updateUsers = book.users;
        console.log(updateUsers);
        fetch(`http://localhost:3000/books/${book.id}`, {
          method: 'PATCH',
          headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({users: updateUsers})
        })
        })

      //show users as li
      book.users.forEach(user =>{
        const userLi = document.createElement("li");
        userLi.textContent = user.username;
        userUl.appendChild(userLi);
        showPanel.appendChild(userUl);
      })
    })
  })
})
