/* Global Variables */

// A variable used to link elements with associated CSS class names (see styles.css)
const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

// A "helper variable" used to identify TODOs (each task is assigned with an id)
var identifier = 0
// A global reference to the list of TODOs.
const list = document.getElementById('todo-list');
// A global reference to the TODOs counter label.
const itemCountSpan = document.getElementById('item-count');
// A global reference to the TODOs unchecked counter label.
const uncheckedCountSpan = document.getElementById('unchecked-count');


/* Functions */

// This function is triggered whenever the "New TODO" button is pressed. It
// creates a new todo task, sets its relevant attributes, and appends the task/todo
// to the list of TODOs.
function newTodo() {
  // Creates an HTML list element and appends it to the TODOs list
  const li = document.createElement("li");
  li.className = classNames['TODO_ITEM'];
  list.appendChild(li);

  // Creates a unique identifier for the element, and sets the element's text as that identifier .
  identifier += 1
  const text = document.createTextNode('Task ' + identifier);
  text.className = classNames['TODO_TEXT'];
  li.appendChild(text);

  // Create a checkbox, link it to a handler, and append it to the list element.
  const checkbox = document.createElement('input');
  checkbox.className = classNames['TODO_CHECKBOX'];
  checkbox.type = 'checkbox';
  checkbox.name = 'checkbox';
  checkbox.onclick = updateCountingLabels;
  li.appendChild(checkbox)

  // Create a deleteButton, link it to a handler, and append it to the list element.
  const deleteButton = document.createElement("button");
  deleteButton.className = classNames['TODO_DELETE'];
  deleteButton.innerHTML = 'Delete'
  deleteButton.onclick = deleteListItem
  li.appendChild(deleteButton)

  // Update the todo Items count
  updateCountingLabels()
}

// Deletes a list item from the list (This function may only be triggered by
// elements of the global TODOs list).
function deleteListItem() {
  const listItem = this.parentNode;
  list.removeChild(listItem);

  // Update the todo Items count
  updateCountingLabels();
}

// Counts the overall number of todo items and the number of unchecked todo
// items, and update the appropiate labels on the webpage.
function updateCountingLabels() {
  // Count how many list elements (todoItems) are on the webpage:
  const todoItems = document.getElementsByTagName("li");

  // Declare variables for the counters
  const itemsCounter = todoItems.length;
  var uncheckedCounter = todoItems.length;

  // Get all checkBoxes on the webpage:
  const checkBoxes = document.getElementsByName("checkbox");
  // Decrease the number of checked todo's from the unchecked counter.
  for (let i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
      uncheckedCounter -= 1;
    }
  }

  // Update the labels of the counters.
  itemCountSpan.innerHTML = itemsCounter;
  uncheckedCountSpan.innerHTML = uncheckedCounter;
}
