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
        this.clearField();
    }

    clearField(){
        inputId.value = '';
        inputDate.value = '';
        inputSupplier.value = '';
        inputWarehouse.value = '';
        inputNameProduct.value = '';
        inputCount.value = '';
        inputTotal.value = '';
    }

    selectRow(tableName, query = `SELECT * from ${tableName}`, params = []) {
        const dataRow = document.querySelector('#data-row');
        dataRow.innerHTML = '';
        console.log(query);
        this.connect.transaction((tx) => {
            tx.executeSql(query, params, (tx, result) => {
                for (let i = 0; i < result.rows.length; i++) {
                    let item = result.rows.item(i);
                    let row = document.createElement('tr');
                    let btnEdit = createBtn('btn btn-warning', 'Изменить');
                    let btnDelete = createBtn('btn btn-danger', 'Удалить');

                    //Обновление записи
                    btnEdit.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.updateRow(tableName, item.id);
                    });

                    //Удаление записи
                    btnDelete.addEventListener('click', (e) => {
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

    deleteRow(tableName, id) {
        this.connect.transaction(function (tx) {
            tx.executeSql(`DELETE FROM ${tableName} WHERE id=?;`, [id]);
        });
    }

    updateRow(tableName, id, boolean = false) {
        if (!boolean) {
            this.connect.transaction((tx) => {
                tx.executeSql(`SELECT * from ${tableName} WHERE id=?`, [id], (tx, result) => {
                    const item = result.rows[0];
                    console.log(item);
                    inputDate.value = item.data;
                    inputSupplier.value = item.supplier;
                    inputWarehouse.value = item.warehouse;
                    inputNameProduct.value = item.name_product;
                    inputCount.value = item.count;
                    inputTotal.value = item.total;
                    inputId.value = item.id;

                    createRow.classList.add('d-none');
                    updateRow.classList.remove('d-none');
                })
            })
        } else {

            this.connect.transaction((tx) => {
                tx.executeSql(`UPDATE ${tableName} SET data=?, supplier =?, warehouse=?, name_product=?, count=?, total=? WHERE id=?;`, 
                [inputDate.value, inputSupplier.value, inputWarehouse.value,
                    inputNameProduct.value, inputCount.value, inputTotal.value, inputId.value
                ]);
                this.selectRow(tableName);
                this.clearField();
                createRow.classList.remove('d-none');
                updateRow.classList.add('d-none');
            });

        }
    }

    filterRow(tableName){
        let query = `SELECT * from ${tableName}`;
        let params = [];
        if (filterDate.value !== '') {
            query += ' WHERE data=?';
            params.push(filterDate.value);
        }
        if (filterSupplier.value !== '') {
            query += ' WHERE supplier LIKE ?';
            params.push(`%${filterSupplier.value}%`);
        }
        if (filterWarehouse.value !== '') {
            query += ' WHERE warehouse LIKE ?';
            params.push(`%${filterWarehouse.value}%`);
        }
        if (filterNameProduct.value !== '') {
            query += ' WHERE name_product LIKE ?';
            params.push(`%${filterNameProduct.value}%`);
        }
        if (filterCount.value !== '') {
            query += ' WHERE count >= ?';
            params.push(filterCount.value);
        }
        if (filterTotal.value !== '') {
            query += ' WHERE total >= ?';
            params.push(filterTotal.value);
        }
        this.selectRow(tableName, query, params)
    }
}