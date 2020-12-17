const db = new DB();
const table = new Table();
const btnCreate = document.querySelector('#create-table');
const btnRemove = document.querySelector('#remove-table');
const printTable = document.querySelector('#print-table');
const createRow = document.querySelector('#create-row');
const dataRow = document.querySelector('#data-row');


table.selectRow('product');

btnCreate.addEventListener('click', ()=>{
    db._createTable('product');
})

btnRemove.addEventListener('click', ()=>{
    db._removeTable('product');
})

printTable.addEventListener('click', () => {
    db._printTable('product');
})

createRow.addEventListener('submit', (event)=>{
    event.preventDefault();
    let form = new FormData(event.target);
    table.insertRow('product', form);
    alert('Строка добавлена');
});









