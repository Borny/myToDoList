var add = document.getElementById('add');

add.addEventListener('click',function(){
	var input = document.getElementById('input_todo');
	var inputValue = document.getElementById('input_todo').value;

	if(inputValue){
		addItemTodo(inputValue);
		input.value = '';
	} 

});


function removeItem(){
	var item = this.parentNode.parentNode,
		parent = item.parentNode;

	parent.removeChild(item);
}

function moveCompletedItem(){
	var item = this.parentNode.parentNode,
		parent = item.parentNode;

	parent.removeChild(item); 

	var completedList = document.getElementById('completed');
	completedList.appendChild(item);



}


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

