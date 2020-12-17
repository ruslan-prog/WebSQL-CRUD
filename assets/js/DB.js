class DB {
    constructor() {
        this.connect = openDatabase('db','1.0','my first database',2*1024*1024);
    }
    //Созадание таблицы если её нет
    _createTable(nametable){
        // let db= openDatabase('db','1.0','my first database',2*1024*1024);

        this.connect.transaction(function (tx)
        {
            //ID, Дата, Наименование поставщика, Склад приймки, Наименование товара, колличество, сумма
            tx.executeSql(`CREATE TABLE IF NOT EXISTS ${nametable} (id integer primary key autoincrement, data, supplier, warehouse , name_product, count, total)`);
        });
    }
    //Удаление таблицы
    _removeTable(nametable){
        this.connect.transaction(function (tx)
        {
            tx.executeSql(`DROP TABLE ${nametable}`);
        });
        alert('Таблица удалена');
    }
    
    _printTable(nametable){
        this.connect.transaction(function (tx)
        {
            tx.executeSql(`SELECT * from ${nametable}`, [], () => {
                let divToPrint=document.getElementById("data-row");
                let printWindow = window.open('', '', 'height=800,width=800');
                printWindow.document.write(divToPrint.outerHTML);
                printWindow.print();
                printWindow.close();
            });
        });
    }
}