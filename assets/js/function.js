function createBtn(classList, value) {
    let td = document.createElement('td');
    let btn = document.createElement('button');
    btn.className  = classList;
    btn.innerText = value;
    td.append(btn);
    return td;
}

