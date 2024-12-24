let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
renderToDoList();

function addToDo() {
    const name = document.querySelector('.js-input').value;
    const date = document.querySelector('.js-input-date').value;
    if (name && date){
        todoList.push({name, date});
        localStorage.setItem('todoList', JSON.stringify(todoList));
    } else {
        alert('Enter both values');
    }
    
    renderToDoList();
    name = '';
    date = '';
}

function deleteItem(itemIndex) {
    todoList.splice(itemIndex, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    renderToDoList();
}

function renderToDoList() {
    let listItemsHTML = '';

    for (let i = 0; i < todoList.length; i++) {
        const {name, date} = todoList[i];
        listItemsHTML += `
        <p>${name}</p>
        <p>${date}</p>
        <button class="delete-todo" onclick="deleteItem(${i})">
        Delete
        </button>
        `;
    }    
    document.querySelector('.js-todo-list').innerHTML = listItemsHTML;
}
