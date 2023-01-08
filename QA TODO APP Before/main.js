const form = document.getElementById('form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const todoText = todoInput.value.trim();
  if (todoText === '') {
    return;
  }

  const todoItem = createTodoItem(todoText);
  todoList.appendChild(todoItem);
  todoInput.value = '';
  addTodoToLocalStorage(todoText);
});

todoList.addEventListener('click', (event) => {
  if (event.target.className === 'delete-button') {
    const li = event.target.parentElement;
    todoList.removeChild(li);
    removeTodoFromLocalStorage(li);
  }
});

function createTodoItem(text) {
  const li = document.createElement('li');
  const timestamp = new Date().toLocaleString();
  li.innerHTML = `
    <span>${text}</span>
    <small class="timestamp">Added on ${timestamp}</small>
    <button class="delete-button">Delete</button>
  `;
  return li;
}

function addTodoToLocalStorage(todo) {
  let todos = getTodosFromLocalStorage();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodoFromLocalStorage(li) {
  let todos = getTodosFromLocalStorage();
  todos = todos.filter((todo) => todo !== li.firstChild.textContent);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodosFromLocalStorage() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}

function displayTodosFromLocalStorage() {
  let todos = getTodosFromLocalStorage();
  todos.forEach((todo) => {
    const todoItem = createTodoItem(todo);
    todoList.appendChild(todoItem);
  });
}

displayTodosFromLocalStorage();
