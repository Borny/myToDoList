// Recovering the data
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
};

renderTodoList();

// Triggers event on button
document.getElementById('add').addEventListener('click', function () {
    var input = document.getElementById('input_todo'),
        inputValue = (input) ? input.value : undefined;

    if (input && inputValue) {
        addItem(inputValue);
    }

    dataObjectUpDated();

});

document.getElementById('input_todo').addEventListener('keydown', function (e) {

    var value = this.value;
    if (e.code === 'Enter' && value) {

        var input = document.getElementById('input_todo'),
            inputValue = (input) ? input.value : undefined;

        if (input && inputValue) {
            addItem(inputValue);
        }

        dataObjectUpDated();
    }
});

function addItem(inputValue){
    addItemToDOM(inputValue); // function to add item with the input value as title
    document.getElementById('input_todo').value = ''; 	// empties the input
    document.getElementById('input_todo').focus();    	// gets the focus on the button after clicking

    // adds the input value to the todo array
    data.todo.push(inputValue);
}

// Dispalys the items stored in the Object locale storage
function renderTodoList() {
    if (!data.todo.length && !data.completed.length) return;

    for (i = 0; i < data.todo.length; i++) {
        var value = data.todo[i];
        addItemToDOM(value);
    }
    for (j = 0; j < data.completed.length; j++) {
        var value = data.completed[j];
        addItemToDOM(value, true);
    }
}

function dataObjectUpDated() {
    localStorage.setItem('todoList', JSON.stringify(data));
};

// Remove item function by clicking on remove icon
function removeItem() {
    var item = this.parentNode.parentNode,
        parent = item.parentNode,
        id = parent.id,
        value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }

    // removes item node
    parent.removeChild(item);

    dataObjectUpDated();
}

// Moves the item by clicking on the completed task
function moveCompletedItem() {
    var item = this.parentNode.parentNode,
        parent = item.parentNode,
        id = parent.id,
        value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }

    // if : watches if the parent item is the todo most or completed list
    // so that the target variable switches value
    var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

    parent.removeChild(item);
    target.appendChild(item);

    dataObjectUpDated();
}

// Adds item to the todo list
function addItemToDOM(text, completed) {

    var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

    var item = document.createElement('li');
    item.classList.add('list_item');

    var itemTextContent = document.createElement('span');
    itemTextContent.classList.add('list_item-content');
    itemTextContent.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons_container');

    var remove = document.createElement('button');
    remove.classList.add('remove');

    remove.addEventListener('click', removeItem);

    var success = document.createElement('button');
    success.classList.add('success');

    success.addEventListener('click', moveCompletedItem);

    list.prepend(item);
    item.appendChild(itemTextContent);
    item.appendChild(buttons);
    buttons.appendChild(remove);
    buttons.appendChild(success);

}

