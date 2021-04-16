// Değerler
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const tasklist = document.querySelector("#list-task");
let items;

//load item 
loadItems();

//event listener
eventListeners();

function eventListeners() {
    //submit
    form.addEventListener('submit', addNewItem);

    // delete an item
    tasklist.addEventListener('click', deleteItem);

    // delete all item
    btnDeleteAll.addEventListener('click', deleteAllItems);

}

function loadItems() {

    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    });

}

//get items from Local Storage
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// set items from Local Stroge
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

// delete item from LS
function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem("items", JSON.stringify(items));

}

function createItem(text) {
    //creat li
    const li = document.createElement('li');
    li.className = "list-group-item list-group-item-white text-dark";
    li.appendChild(document.createTextNode(text));

    //creat a
    const a = document.createElement('a');
    a.classList = "delete-item float-right text-danger";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>'

    // Eleman ekleme
    li.appendChild(a);
    tasklist.appendChild(li);
}

function addNewItem(e) {
    e.preventDefault();

    if (input.value === '') {
        alert("Lütfen Boş Alanları Doldurunuz !");
    } else {
        // create item
        createItem(input.value);

        // sace to lS
        setItemToLS(input.value);

        //clear input
        input.value = "";
    }

}

function deleteItem(e) {
    if (e.target.className === "fas fa-times") {
        if (confirm("Emin Misiniz ?")) {
            e.target.parentElement.parentElement.remove();

            // delete item from LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function deleteAllItems(e) {
    //tasklist.innerHTML="";
    if (confirm("Emin Misiniz ?")) {

        while (tasklist.firstChild) {
            tasklist.removeChild(tasklist.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();
}
