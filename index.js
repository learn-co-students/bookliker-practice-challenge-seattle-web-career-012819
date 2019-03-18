// document.addEventListener("DOMContentLoaded", function() {});

const booksURL = "http://localhost:3000/books";
renderBooks();

function renderBooks() {
  fetch(booksURL)
  .then((results) => {
    return results.json();
  })
  .then((json) => {
    createBookList(json);
  })
}

function createBookList(data) {
  data.forEach((book) => {
    //Create Elements
    const div = document.getElementById('list-panel');
    const ul = document.getElementById('list');
    const li = document.createElement('li');
    li.textContent = book.title;
    
    //Append Elements
    div.appendChild(ul);
    ul.appendChild(li);

    //Add Event Listeners
    li.addEventListener('click', () => {
      showBook(book);
    });
  });
}

function showBook(book) {
  console.log(book.users)
  //Create Elements
  const div = document.getElementById('show-panel');
  div.innerHTML = '';
  const h2 = document.createElement('h2');
  h2.textContent = book.title;
  const img = document.createElement('img');
  img.src = book.img_url;
  const p = document.createElement('p');
  p.textContent = book.description;
  const ul = document.createElement('ul');
  ul.setAttribute('id', 'user-list');
  book.users.forEach((user) => {
    const li = document.createElement('li');
    li.textContent = user.username;
    // li.setAttribute('id', user.id);
    ul.appendChild(li);
  })

  const button = document.createElement('button');
  button.textContent = "Like <3"
  button.addEventListener('click', () => {
    likeBook(book);
  });

  //Append Elements
  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(button);
  div.appendChild(p);
  div.appendChild(ul);
}

function likeBook(book) {
  const bookUsers = book.users;
  console.log('users',bookUsers);
  if (!userHasLikedBook(bookUsers)) {
    bookUsers.push({id:1, username: 'pouros'});
    fetch(booksURL + `/${book.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        users: bookUsers
      })
    })
    .then((results) => {
      return results.json();
    })
    .then((json) => {
      const ul = document.getElementById('user-list');
      ul.innerHTML = '';
      json.users.forEach((user) => {
        const li = document.createElement('li');
        li.textContent = user.username;
        ul.appendChild(li);
      });
    })
  }
}

function userHasLikedBook(bookUsers) {
  console.log(bookUsers)
  let foundUser = false;
  bookUsers.forEach((i) => {
    if (i['id'] === 1) {
      foundUser = true;
      return;
    }
  });
  return foundUser;
}

