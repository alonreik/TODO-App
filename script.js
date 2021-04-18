const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

function newTodo() {
  const li = document.createElement("li");
  li.className = "todo-container";
  list.appendChild(li)

  const text = document.createTextNode('Task ' + list.getElementsByTagName("li").length);
  text.className = "todo-text";
  li.appendChild(text);

  var checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('name', 'checkbox');
  // checkbox.setAttribute('onclick', myFunction);
  checkbox.onclick = checkFunction;
  // checkbox.value = 1
  // checkbox.name = "todo[]"
  li.appendChild(checkbox)

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = 'Delete'
  deleteButton.onclick = deleteFunction()
  li.appendChild(deleteButton)

  // Update the todo Items count
  updateCountingLabels()
}

function deleteFunction() {
}

function checkFunction() {
    updateCountingLabels()
}

function updateCountingLabels() {
  var todoItems = list.getElementsByTagName("li");
  var itemsCounter = todoItems.length
  var uncheckedCounter = todoItems.length;

  const checkBoxes = document.getElementsByName("checkbox")
  for (let i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
      uncheckedCounter -= 1;
    }
  }

  itemCountSpan.innerHTML = itemsCounter;
  uncheckedCountSpan.innerHTML = uncheckedCounter;
}
