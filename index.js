
const listUl = document.getElementById('list')
const showPanel = document.getElementById('show-panel')
let bookData = []
// let allUsers
let weirdBook

class Connection {
  constructor() {
    this.baseURL = 'http://localhost:3000/'
  }
  
  async getBooks() {
    const results =  await fetch(this.baseURL + 'books')
    return results.json()
  }
  
  async getUsers() {
    const results = await fetch(this.baseURL + 'users');
    return results.json();
  }

  async currentUser() {
    const results = await fetch(this.baseURL + 'users/1');
    return results.json();
  }

  async postUser(book) {
    const url = this.baseURL + 'books/' + book.id
    const currentUser = await this.currentUser()

    if (currentUser && book.users.map((user) => user.username).includes(currentUser.username)) {
      book.users.pop()
      let newUsers = {"users": book.users}
      const content = this.fetchContent(newUsers)
      fetch(url, content)
        .then(results => results.json())
        .then(book => {
          showPanel.innerHTML = ""
          let newBook = new Book(book.id, book.title, book.description, book.img_url, book.users)
          showPanel.appendChild(newBook.generateShowItem())
        })
    } else {
      book.users.push(currentUser)
      let newUsers = {"users": book.users}
      const content = this.fetchContent(newUsers)
      fetch(url, content)
        .then(results => results.json())
        .then(book => {
          showPanel.innerHTML = ""
          let newBook = new Book(book.id, book.title, book.description, book.img_url, book.users)
          showPanel.appendChild(newBook.generateShowItem())
        })
    }
  }

  fetchContent(newUsers) {
    const content = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUsers) 
    }
    return content
  }
}

class Book {
  constructor(id, title, description, img_url, users) {
    this.id = id
    this.title = title
    this.description = description
    this.img_url = img_url
    this.users = users
  }
  
  generateListItem() {
    let li = document.createElement('li')
    li.textContent = this.title

    li.addEventListener('click', () => {
      let bookShow = this.generateShowItem()
      showPanel.innerHTML = ""
      showPanel.appendChild(bookShow)
    })

    return li
  }
  
  generateShowItem() {
    let div = document.createElement('div')
    let h1 = document.createElement('h1')
    let img = document.createElement('img')
    let p = document.createElement('p')
    let span = document.createElement('span')
    let button = document.createElement('button')

    h1.textContent = this.title
    img.src = this.img_url
    p.textContent = this.description
    span.appendChild(this.generateUserItems(this.users))
    button.textContent = "Liek dis bewk"

    button.addEventListener('click', () => {
      let conn = new Connection
      conn.postUser(this)
    })

    div.appendChild(h1)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(span)
    div.appendChild(button)
    
    return div
  }

  generateUserItems(usersArray) {
    let ul = document.createElement('ul')

    usersArray.forEach((user) => {
      let li = document.createElement('li')
      li.textContent = user.username
      ul.appendChild(li)
    })

    return ul
  }
}

async function mane() {
  let setup = new Connection()
  let books = await setup.getBooks()
  // allUsers = await setup.getUsers()

  displayBooks(books)  
}

function displayBooks(books) {
  books.forEach( book => {
    let newBook = new Book(book.id, book.title, book.description, book.img_url, book.users)
    let bookLi = newBook.generateListItem()

    listUl.appendChild(bookLi)
    bookData.push(book)
  })
}

document.addEventListener("DOMContentLoaded", mane);