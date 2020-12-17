class Table extends DB {
    constructor() {
        super();
    }

    insertRow(tableName, form) {
        let obj = {};

        for (let pair of form.entries()) {
            obj[pair[0]] = pair[1];
        }
        this.connect.transaction(function (tx) {
            tx.executeSql(`INSERT INTO ${tableName} (data, supplier, warehouse , name_product, count, total) VALUES (?,?,?,?,?,?)`, [
                obj.date, obj.supplier, obj.warehouse, obj.name_product, obj.count, obj.total
            ]);
        });
        this.selectRow(tableName);
    }

    selectRow(tableName) {
        const dataRow = document.querySelector('#data-row');
        dataRow.innerHTML='';
        this.connect.transaction((tx) => {
            tx.executeSql(`SELECT * from ${tableName}`, [], (tx, result) => {
                for (let i = 0; i < result.rows.length; i++) {
                    let item = result.rows.item(i);
                    let row = document.createElement('tr');
                    let btnEdit = createBtn('btn btn-warning', 'Изменить');
                    let btnDelete = createBtn('btn btn-danger', 'Удалить');
                    btnEdit.addEventListener('click', (e)=>{
                        e.preventDefault();
                        this.updateRow(tableName, item.id);
                    });
                    btnDelete.addEventListener('click', (e)=>{
                        e.preventDefault();
                        this.deleteRow(tableName, item.id);
                        this.selectRow(tableName);
                    })
                        row.innerHTML = `
                                <td>${item.id}</td>
                                <td>${new Date(item.data).toLocaleDateString()}</td>
                                <td>${item.supplier}</td>
                                <td>${item.warehouse}</td>
                                <td>${item.name_product}</td>
                                <td>${item.count}</td>
                                <td>${item.total}</td>
                        `;
                    row.append(btnEdit);
                    row.append(btnDelete);
                    dataRow.append(row);
                }
            });
        });
    }

    deleteRow(tableName, id){
        this.connect.transaction(function (tx) {
            tx.executeSql(`DELETE FROM ${tableName} WHERE id=?;`, [id]);
        });
    }

    updateRow(tableName, id){
        this.connect.transaction((tx) => {
            tx.executeSql(`SELECT * from ${tableName} WHERE id=?`, [id], (tx, result) => {
                for (let i = 0; i < result.rows.length; i++) {
                    let item = result.rows.item(i);

                }
            })
        })
    }
}

function createBtn(classList, value) {
    let td = document.createElement('td');
    let btn = document.createElement('button');
    btn.className  = classList;
    btn.innerText = value;
    td.append(btn);
    return td;
}


// function UpdateValue() {
//     let thisname = document.getElementById("tx1").value;
//     let thisvalue = document.getElementById("tx2").value;
//     let thisdata = document.getElementById("tx3").value;
//     if ((thisname == '') || (thisvalue == '') || (thisdata == '')) {
//         alert('Необходимо заполнить поля ключ и значение');
//         return;
//     }

//     let db = openDatabase('db', '1.0', 'my first database', 2 * 1024 * 1024);
//     db.transaction(function (tx) {
//         tx.executeSql('UPDATE t1 SET value=? WHERE name=? WHERE data=?;', [thisvalue, thisname, thisdata]);
//     });
//     alert('Значения обновлены');
// }

// function DeleteRow() {
//     let thisname = document.getElementById("tx1").value;
//     let thisvalue = document.getElementById("tx2").value;
//     let thisdata = document.getElementById("tx3").value;
//     if ((thisname == '') && (thisvalue == '') && (thisdata == '')) {
//         alert('Необходимо заполнить поля ключ или значение');
//         return;
//     }

//     let db = openDatabase('db', '1.0', 'my first database', 2 * 1024 * 1024);
//     db.transaction(function (tx) {
//         if (thisname != '') {
//             tx.executeSql('DELETE FROM t1 WHERE name=?;', [thisname]);
//         }
//     });

//     db.transaction(function (tx) {
//         if (thisvalue != '') {
//             tx.executeSql('DELETE FROM t1 WHERE value=?;', [thisvalue]);
//         }
//     });
//     db.transaction(function (tx) {
//         if (thisdata != '') {
//             tx.executeSql('DELETE FROM t1 WHERE data=?;', [thisdata]);
//         }
//     });
//     alert('Строка удалена');
// }

// function OutRow(id, name, value, data) {
//     let row = document.createElement("tr");
//     let idCell = document.createElement("td");
//     let nameCell = document.createElement("td");
//     let valueCell = document.createElement("td");
//     let dataCell = document.createElement("td");
//     idCell.textContent = id;
//     nameCell.textContent = name;
//     valueCell.textContent = value;
//     dataCell.textContent = data;
//     row.appendChild(idCell);
//     row.appendChild(nameCell);
//     row.appendChild(valueCell);
//     row.appendChild(dataCell);
//     document.getElementById("tabletable").appendChild(row);
// }

// function DoSelect() {
//     let db = openDatabase('db', '1.0', 'my first database', 2 * 1024 * 1024);
//     document.getElementById("tabletable").innerHTML = '<th>Id</th> <th>Name</th> <th>Value</th> <th>Дата</th>';
//     db.transaction(function (tx) {
//         tx.executeSql('SELECT * from t1', [], function (tx, result) {
//             for (let i = 0; i < result.rows.length; i++) {
//                 let item = result.rows.item(i);
//                 OutRow(item.id, item.name, item.value, item.data);
//             }
//         });
//     });
// }
