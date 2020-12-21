const db = new DB();
const table = new Table();
//Кнопки
const btnCreate = document.querySelector('#create-table'); // Созадние таблицы product
const btnRemove = document.querySelector('#remove-table'); // Удаление таблицы product
const updateRow = document.querySelector('#update-row'); //
const createRow = document.querySelector('#create-row'); //
const printTable = document.querySelector('#print-table'); //Печать таблицы product

const dataRow = document.querySelector('#data-row'); // Tbody таблицы
//Элементы формы
const form = document.querySelector('#form'); //Форма

const inputId = form.querySelector("#id");
const inputDate = form.querySelector('#date')
const inputSupplier = form.querySelector('#supplier')
const inputWarehouse = form.querySelector('#warehouse')
const inputNameProduct = form.querySelector('#name_product')
const inputCount = form.querySelector('#count')
const inputTotal = form.querySelector('#total')

// Фильтры
const filterDate = document.querySelector("#filter-date");
const filterSupplier = document.querySelector("#filter-supplier");
const filterWarehouse = document.querySelector("#filter-warehouse");
const filterNameProduct = document.querySelector("#filter-name_product");
const filterCount = document.querySelector("#filter-count");
const filterTotal = document.querySelector("#filter-total");


table.selectRow('product');

btnCreate.addEventListener('click', ()=>{
    db._createTable('product');
})

btnRemove.addEventListener('click', ()=>{
    db._removeTable('product')
})

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    if (inputId.value === '') {
        let form = new FormData(event.target);
        table.insertRow('product', form);
        alert('Строка добавлена');
    }

});

updateRow.addEventListener('click', (e) => {
    e.preventDefault();
    let id = inputId.value;
    table.updateRow('product', id, true);
})

printTable.addEventListener('click', () => {
    db._printTable('product');
})

filterDate.addEventListener('input', ()=>{
    table.filterRow('product');
})
filterSupplier.addEventListener('input', ()=>{
    table.filterRow('product');
})
filterWarehouse.addEventListener('input', ()=>{
    table.filterRow('product');
})
filterNameProduct.addEventListener('input', ()=>{
    table.filterRow('product');
})
filterCount.addEventListener('input', ()=>{
    table.filterRow('product');
})
filterTotal.addEventListener('input', ()=>{
    table.filterRow('product');
})