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
  var text = document.createTextNode('Task ' + identifier + '   ');
  text.className = classNames['TODO_TEXT'];
  li.appendChild(text);

  // Creates a text box for describing the content of the task, and appends it to the list element.
  const description = document.createElement('input');
  description.type = 'text'
  description.className = classNames['TODO_TEXT']
  li.appendChild(description)

  // Create a checkbox, link it to a handler, and append it to the list element.
  const checkbox = document.createElement('input');
  checkbox.className = classNames['TODO_CHECKBOX'];
  checkbox.type = 'checkbox';
  checkbox.name = 'checkbox';
  checkbox.onclick = checkTodo;
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

// Triggered when a todo item element is checked (or unchecked).
// [] --> The item will have regular (not strike-through) text.
// [V] --> The item will have strikedThrough text.
function checkTodo(){
  // comment: this = checkbox.
  // (i.e, when referencing this, we're referencing the most recently "used" checkbox)
  const listItem = this.parentNode;

  // make the text of the item striked-through iff the checkbox is checked.
  listItem.style.textDecoration = (this.checked)? 'line-through' : ''

  // Every list item is created in a manner that assures that listItem.childNodes[1]
  // is the text box for the item's description.
  listItem.childNodes[1].hidden = (this.checked)? true: false

  // Update the todo Items count
  updateCountingLabels()
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
