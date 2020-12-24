//book object
class Book{
    constructor(url, tittle, author, pages){
        this.url = url;
        this.tittle = tittle;
        this.author = author;
        this.pages = pages;
    }
}
//ui task
class UI{
    static displayBooks(){
        const books = Store.getBooks();
    
        books.forEach((book) => UI.addBookToList(book));
  
    }

    static addBookToList(book){
        const selectingParentNode = document.querySelector('#attCard');
        let divNewBook = document.createElement('div'); 
        divNewBook.classList.add("cardBook");
        //structure at the end of code
        divNewBook.innerHTML = `<div class="card"><div class="imageCover"><div class="imageFrame"><h1 class="noBook">No Cover</h1><img class="covImg"src="${book.url}"></div></div><div class="infoBooK"><div class="bookTittle"><h2 class="actualTittle">${book.tittle}</h2></div><div class="author"><p class="bookAuthor">${book.author}</p></div><div class="numberOfPages"><p class="pages">${book.pages} pages</p></div><div class="buttonDelete"><button id="remove" class="remove">Remove</button></div></div></div>`;
        selectingParentNode.appendChild(divNewBook); 
    }   

    static deleteBook(el){
        if(el.classList.contains('remove')){
            // console.log(el.parentElement.parentElement.parentElement)
            el.parentElement.parentElement.parentElement.parentElement.remove();
        }
    }


    static showAlert(){
        const spanAuthor = document.createElement('span');
        spanAuthor.className = 'alertSpan';
        spanAuthor.innerHTML = '&nbsp Please add an Author';
        const authorNeeded = document.querySelector('.authorNeeded');
        authorNeeded.append(spanAuthor);

        const spanTittle = document.createElement('span');
        spanTittle.className = 'alertSpan';
        spanTittle.innerHTML = '&nbsp Please add a tittle';
        const tittleNeeded = document.querySelector('.tittleNeeded');
        tittleNeeded.append(spanTittle);
        //delete alert
        setTimeout(()=>document.querySelector('span').remove(), 2000);
        setTimeout(()=>document.querySelector('span').remove(), 2000);
    }

    static clearFields(){
        document.querySelector('.BookCoverBase').value = '';
        document.querySelector('.BookTittleBase').value = '';
        document.querySelector('.BookAuthorBase').value = '';
        document.querySelector('.BookPagesBase').value = '';
    }
}
//storage

class Store {
    //retrive books from local store
    static getBooks(){
        let books;
        if(localStorage.getItem('books')=== null){
            books = [
              {   
                url : 'https://images-na.ssl-images-amazon.com/images/I/41kn-mEpe6L._SX331_BO1,204,203,200_.jpg',
                tittle  : 'Up & Going',                
                author : 'Kyle Simpson' ,
                pages : 88 
            },
            ];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
    static addBook(book){

        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(tittle){

        const books = Store.getBooks();

        books.forEach((book, index)=>{
            if(book.tittle === tittle){
                 books.splice(index, 1)
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}
//event display books
document.addEventListener('DOMContentLoaded',UI.displayBooks)
//event add a book
document.querySelector('.addBook').addEventListener('click', (e)=>{
    e.preventDefault();
    const url = document.querySelector('.BookCoverBase').value;
    const tittle = document.querySelector('.BookTittleBase').value;
    const author = document.querySelector('.BookAuthorBase').value;
    let pages = document.querySelector('.BookPagesBase').value;
    if(pages === ''){ 
        pages = 'Unknown number of'
    }
    if(tittle === '' || author === ''){
        UI.showAlert();
    }else{
        
        //instantiate book
        const book = new Book(url, tittle, author, pages);

        //add book to list

        UI.addBookToList(book);

        //add book to store
        Store.addBook(book);

        //clear input after adding book
        UI.clearFields();
    }
 
})
//event delete book

document.querySelector('#attCard ').addEventListener('click', (e)=>{
    //remove book from UI  -----  event propagation
    UI.deleteBook (e.target)
    //remove book from store
    Store.removeBook(e.target.parentElement.parentElement.firstElementChild.textContent);
});






// `
//                         <div class="card" ">
//                             <div class="imageCover">
//                                 <div class="imageFrame">
//                                     <h1 class="noBook">No Cover</h1>

//                                     <img class="covImg"
//                                     src="${book.url}">
                                    
//                                 </div>
//                             </div>
//                             <div class="infoBooK">
//                                 <div class="bookTittle">
//                                     <h2 class="actualTittle">${book.tittle}</h2>
//                                 </div>
//                                 <div class="author">
//                                     <p class="bookAuthor">${book.author}</p>
//                                 </div>
//                                 <div class="numberOfPages">
//                                     <p class="pages">${book.pages} pages</p>
//                                 </div>
//                                 <div class="pendingRead">
//                                     <div class="readingOptions">
//                                         <input type="checkbox" name="done"><label for="done">Mark if read</label>
//                                     </div>
//                                 </div>
//                                 <div class="buttonDelete">
//                                     <button id="remove" class="remove">Remove</button>
//                             </div>
//                             </div>
//                         </div>
//                     `;