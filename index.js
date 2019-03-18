document.addEventListener('DOMContentLoaded', function() {});

const BOOKS = 'http://localhost:3000/books';
const USERS = 'http://localhost:3000/users';

function getBooks() {
	fetch(BOOKS)
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			json.forEach(function(book) {
				console.log(book);
				createBook(book);
			});
		});
}

function createBook(book) {
	let list = document.getElementById('list');
	let li = document.createElement('li');
	li.textContent = book.title;
	li.addEventListener('click', () => {
		createInfo(book);
	});
	list.appendChild(li);
}

function createInfo(book) {
	// target show panel div
	let showPanel = document.getElementById('show-panel');

	showPanel.innerHTML = '';

	//create elements for show panel
	let title = document.createElement('h2');
	let image = document.createElement('img');
	let description = document.createElement('p');
	let readButton = document.createElement('button');

	//set information for newly created elements
	description.textContent = book.description;
	image.src = book.img_url;
	title.textContent = book.title;
	readButton.textContent = 'Read Book';

	//add event listener to read button
	readButton.addEventListener('click', () => {
		event.preventDefault();
		console.log('reading button has been clicked!!');
		addUser(book);
	});

	//append children to show panel div
	showPanel.appendChild(title);
	showPanel.appendChild(image);
	showPanel.appendChild(description);
	displayUsers(book);
	showPanel.appendChild(readButton);
}

function displayUsers(book) {
	let showPanel = document.getElementById('show-panel');
	let userList = document.createElement('ul');
	userList.id = 'users';

	book.users.forEach(function(user) {
		let userLi = document.createElement('li');
		userLi.textContent = user.username;
		userList.appendChild(userLi);
		showPanel.appendChild(userList);
	});
}

function addUser(book) {
	let userList = document.getElementById('users');
	let allUsers = book.users;
	let me = { id: 1, username: 'pouros' };
	let allUsernames = allUsers.map((user) => user.username);
	if (allUsernames.includes(me.username)) {
		alert('You have alread read this book!');
	} else {
		allUsers.push({ id: 1, username: 'pouros' });
		fetch(BOOKS + '/' + `${book.id}`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'PATCH',
			body: JSON.stringify({ users: allUsers })
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(book) {
				console.log(book.id);
				userList.innerHTML = '';
				createInfo(book);
			});
	}
}

getBooks();
