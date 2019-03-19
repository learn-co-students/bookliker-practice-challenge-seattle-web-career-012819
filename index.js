document.addEventListener("DOMContentLoaded", function() {});

const BOOKS_URL = 'http://localhost:3000/books';
const USERS_URL = 'http://localhost:3000/users';

renderBooks()

function renderBooks() {
  const listUl = document.getElementById('list');

  fetch(BOOKS_URL)
    .then(res => res.json())
    .then(json => addBooks(json, listUl))
}

function addBooks(books, parentUl) {
  books.forEach(function(book) {
    li = document.createElement('li')
    li.innerText = book.title
    li.setAttribute('id', book.id)
    parentUl.appendChild(li)

    li.addEventListener('click', () => { displayBook(book) })
  })
}

// function displayBook(book) {
//   let showPanel = document.getElementById('show-panel')
//   let showPanelKids = Array.from(showPanel.children)
//   showPanelKids.forEach(function(child) {
//     showPanel.removeChild(child);
//   })
//
//   let titleH4 = document.createElement('h4');
//   titleH4.innerText = book.title;
//
//   let image = document.createElement('img');
//   image.setAttribute('src', book.img_url);
//
//   let descrP = document.createElement('p');
//   descrP.innerText = book.description;
//
//   let likers = document.createElement('ul')
//   likers.innerText = 'Users Who\'ve Read This Book'
//   book.users.forEach(function(usr) {
//     let li = document.createElement('li')
//     li.innerText = usr.username
//     likers.appendChild(li)
//   })
//
//   let readButton = document.createElement('button');
//   readButton.innerText = 'Read Book';
//   readButton.setAttribute('type', 'button');
//
//   readButton.addEventListener('click', () => { readBook(book) })
//
//   let children = [titleH4, image, descrP, readButton, likers]
//   children.forEach((child) => showPanel.appendChild(child))
//
//   // showPanel.appendChild(titleH4)
//   // showPanel.appendChild(image)
//   // showPanel.appendChild(descrP)
//   // showPanel.appendChild(readButton)
//   // showPanel.appendChild(likers)
// }


function displayBook(book) {
  let showPanel = document.getElementById('show-panel')
  let showPanelKids = Array.from(showPanel.children)
  showPanelKids.forEach(function(child) {
    showPanel.removeChild(child);
  })

  let titleH4 = createElmt('h4', showPanel, (h4) => h4.innerText = book.title);
  let image = createElmt('img', showPanel, (src) => src.setAttribute('src', book.img_url));
  let descrP = createElmt('p', showPanel, (p) => p.innerText = book.description);

  let likers = createElmt('ul', showPanel, (ul) => ul.innerText = 'Users Who\'ve Read This Book');
  book.users.forEach(function(usr) {
    createElmt('li', likers, (li) => li.innerText = usr.username)
  })

  let readButton = createElmt('button', showPanel, (button) => {
    button.innerText = 'Read Book'
    button.setAttribute('type', 'button')
  });
  readButton.addEventListener('click', () => { readBook(book) })
}

function createElmt(elmtName, parent, callback) {
  let e = document.createElement(elmtName)
  callback(e)
  parent.appendChild(e)
  return e
}

function readBook(book) {
  let currentUser = {"id":1, "username":"pouros"};
  let allUsers = book.users;

  if (allUsers.filter(usr => usr.id == currentUser.id).length == 0) {
    allUsers.push(currentUser);
  } else { allUsers = allUsers.filter(usr => usr.id != currentUser.id)  }

  fetch(BOOKS_URL + '/' + book.id, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({'users': allUsers})
  })
    .then(res => res.json())
    .then(json => displayBook(json))
}
