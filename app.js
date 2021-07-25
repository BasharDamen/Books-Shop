'use strict';


Books.globalArray = [];
let totalPrice = 0;
function Books(name, pages, price){
    this.name = name;
    this.pages = pages;
    this.price = price;

    Books.globalArray.push(this)
}


function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min +1) + min)
}




let bookForm = document.getElementById('bookForm');
bookForm.addEventListener('submit', handleSubmit);

function handleSubmit(event){

    // event.preventDefault();

    let bookName = event.target.bookName.value;
    
    let bookPages = getRandomNumber(1, 500);
    
    let bookPrice = event.target.bookPrice.value;

        
    let newBook =  new Books(bookName, bookPages, bookPrice);


    
    saveToLocal();
    newBook.render();

}


let booksList = document.getElementById('booksList');
let table = document.createElement('table');
booksList.appendChild(table);

function makeHeader(){

let headRow = document.createElement('tr')
table.appendChild(headRow)
let th1 = document.createElement('th')
let th2 = document.createElement('th')
let th3 = document.createElement('th')

headRow.appendChild(th1);
headRow.appendChild(th2);
headRow.appendChild(th3);

th1.textContent = 'Book Name';
th2.textContent = 'Book Pages';
th3.textContent = 'Book Price';



}makeHeader();

Books.prototype.render = function(){

    let bookRow = document.createElement('tr');
    table.appendChild(bookRow);

  
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let td3 = document.createElement('td')

    bookRow.appendChild(td1);
    bookRow.appendChild(td2);
    bookRow.appendChild(td3);
        
    td1.textContent = this.name;
    td2.textContent = this.pages;
    td3.textContent = this.price;
    

}


let totalElmnt = document.createElement('h4');
booksList.appendChild(totalElmnt);
totalElmnt.textContent = `Total : ${totalPrice}`;

function tableRendering(){

    for (let i = 0; i < Books.globalArray.length; i++) {
        
        let bookRow = document.createElement('tr');
        table.appendChild(bookRow);
    
      
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')
    
        bookRow.appendChild(td1);
        bookRow.appendChild(td2);
        bookRow.appendChild(td3);
        bookRow.appendChild(td4);
            
        td1.textContent = Books.globalArray[i].name;
        td2.textContent = Books.globalArray[i].pages;
        td3.textContent = Books.globalArray[i].price + 'JD';
        

        let removeBtn = document.createElement('input');

        removeBtn.type = 'button';
        removeBtn.value = 'X'
        td4.appendChild(removeBtn);

        removeBtn.addEventListener('click', handleRemove);

        function handleRemove(event, i){
            Books.globalArray.splice(i, 1)
            saveToLocal();
            location.reload();

        }
        totalPrice += Books.globalArray[i].price - 0
        

        totalElmnt.textContent = `Total : ${totalPrice} JD`;
    }
}


let clearBtn = document.getElementById('clear');

clearBtn.addEventListener('click', handleClear);

function handleClear(){

    localStorage.clear();
    location.reload();
}

    
  
    



function saveToLocal(){
    localStorage.setItem('Books', JSON.stringify(Books.globalArray));
}

function getFromLocal(){

    let convertedData = JSON.parse(localStorage.getItem('Books'))

    if (convertedData !== null){
        Books.globalArray = convertedData;
        tableRendering();
    }
}getFromLocal();