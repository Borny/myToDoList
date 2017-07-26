// Recovering the 
var data = {
	todo: [],
	completed: []
};

// Button to add task 
var add = document.getElementById('add');

// Triggers event on button
add.addEventListener('click',function(){
	var input = document.getElementById('input_todo');
	var inputValue = document.getElementById('input_todo').value;

	if(inputValue){
		addItemTodo(inputValue); // function to add item with the input value as title
		input.value = ''; 	// empties the input
		input.focus();    	// gets the focus on the button after clicking

		// adds the input value to the todo array
		data.todo.push(inputValue);
	} 

});

// Remove item function by clicking on remove icon
function removeItem(){
	var item = this.parentNode.parentNode,
		parent = item.parentNode;

	// removes item node
	parent.removeChild(item);
}

// Moves the item by clicking on the completed task
function moveCompletedItem(){
	var item = this.parentNode.parentNode,
		parent = item.parentNode,
		id = parent.id,
		value = item.innerText;

	data.todo.slice(data.todo.indexOf(value));

		// if : watches if the parent item is the todo most or completed list
		// so that the target variable switches value
	var target = (id === 'todo')? document.getElementById('completed'): document.getElementById('todo');
			
	parent.removeChild(item);
	target.appendChild(item);

}

// Adds item to the todo list
function addItemTodo(text){

	var list = document.getElementById('todo');

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

