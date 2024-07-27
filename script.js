const addBtn = document.querySelector('#add-btn');
const addForm = document.querySelector('#add-form');
const container = document.querySelector('#books');

addBtn.addEventListener('click', () => {
	addForm.style.display = 'block';
});

const myLibrary = [];

class Book {

	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	info() {
		const readString = (this.read)? 'already read' : 'not read yet';
		return `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`;
	}

	toggleRead() {
		this.read = !this.read;
	}

}

function addBookToLibrary(e) {
	e.preventDefault();
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const pages = document.querySelector('#pages').value;
	const read = document.querySelector('#read').value;
	myLibrary.push(new Book(title, author, Number(pages), Boolean(read)));
	addForm.style.display = 'none';
	addForm.reset();
	displayBooks();
}

function displayBooks() {
	container.textContent = '';
	myLibrary.forEach((book, index) => {
		const card = document.createElement('div');
		card.textContent = book.info();

		const delBtn = document.createElement('button');
		delBtn.id = 'del-' + index;
		delBtn.textContent = 'Remove';
		delBtn.addEventListener('click', (e) => {
			const idx = Number(e.target.id.split('-')[1]);
			myLibrary.splice(idx, 1);
			displayBooks();
		});
		card.appendChild(delBtn);

		const readBtn = document.createElement('button');
		readBtn.id = 'read-' + index;
		readBtn.textContent = (book.read)? 'Mark unread' : 'Mark read';
		readBtn.addEventListener('click', (e) => {
			const idx = Number(e.target.id.split('-')[1]);
			myLibrary[idx].toggleRead();
			displayBooks();
		});
		card.appendChild(readBtn);

		container.appendChild(card);
	});
}

displayBooks();