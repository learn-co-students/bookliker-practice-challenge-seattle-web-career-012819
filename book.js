class Book {
  constructor(bookData) {
    this.id = bookData.id
    this.title = bookData.title
    this.description = bookData.description
    this.img_url = bookData.img_url
    this.users = bookData.users
  }

  static renderBooks(url) {
    const listUl = document.getElementById('list');

    fetch(url)
      .then(res => res.json())
      .then(json => this.addBooks(json, listUl))
      // .then(json => console.log("rendering books"))
  }

  static addBooks(books, parentUl) {
    books.forEach(function(book) {
      let newBook = new Book(book);
      let li = newBook.createElmt('li', parentUl, (li) => {
          li.innerText = newBook.title;
          li.setAttribute('id', newBook.id)
        })

      li.addEventListener('click', () => { newBook.displayBook() })
    })
  }

  displayBook() {
    let showPanel = document.getElementById('show-panel')
    let showPanelKids = Array.from(showPanel.children)
      showPanelKids.forEach(function(child) {
        showPanel.removeChild(child);
      })

    this.createElmt('h4', showPanel, (h4) => h4.innerText = this.title);
    this.createElmt('img', showPanel, (src) => src.setAttribute('src', this.img_url));
    this.createElmt('p', showPanel, (p) => p.innerText = this.description);

    let likers = this.createElmt('ul', showPanel, (ul) => ul.innerText = 'Users Who\'ve Read This Book');
    this.users.forEach(function(usr) {
      this.createElmt('li', likers, (li) => li.innerText = usr.username)
    }.bind(this))

    let readButton = this.createElmt('button', showPanel, (button) => {
      button.innerText = 'Read Book'
      button.setAttribute('type', 'button')
    });
    readButton.addEventListener('click', () => { this.readBook() })
  }

// if i wanted to pass readBook a url parameter, how would that propogate down when readBook is called on ln 51?
  readBook() {
    const url = 'http://localhost:3000/books'
    const currentUser = {"id":1, "username":"pouros"};
    let allUsers = this.users;

    if (allUsers.filter(usr => usr.id == currentUser.id).length == 0) {
      allUsers.push(currentUser);
    } else { // why doesn't this.users get updated when the below is allUsers = allUsers.filter(usr => usr.id != currentUser.id)?
      this.users = allUsers.filter(usr => usr.id != currentUser.id)
     }

    fetch(url + '/' + this.id, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'users': allUsers})
    })
      .then(res => res.json())
      .then(json => this.displayBook())
  }

  createElmt(elmtName, parent, callback) {
    let e = document.createElement(elmtName);
    callback(e);
    parent.appendChild(e);
    return e;
  }
}
