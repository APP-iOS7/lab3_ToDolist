const todoListElement = document.getElementById('todoList');
const addButton = document.getElementById('addTodo');
const todoInput = document.getElementById('todoInput');

function addTodo(text, checked = false) {
  const li = document.createElement('li');
  li.textContent = text;
  li.classList.add('list-group-item');
  
  todoListElement.appendChild(li);
}

function saveTodos() {
  const todos = Array.from(todoListElement.children).map(li => ({
      text: li.textContent.trim(),
    }));
  localStorage.setItem('todoList', JSON.stringify(todos));
}

function loadTodos() {
  const savedTodos = localStorage.getItem('todoList');
  return savedTodos ? JSON.parse(savedTodos) : [];
}

function initialize() {
  const todos = loadTodos();
  todos.forEach(todo => {
    addTodo(todo.text, todo.checked);
  });

  addButton.addEventListener('click', () => {
    if (todoInput.value.trim() === '') return;

    addTodo(todoInput.value);

    const todos = loadTodos();
    todos.push({ text: todoInput.value, checked: false });
    saveTodos(todos);
    
    todoInput.value = ''; 
  });
}

document.addEventListener('DOMContentLoaded', initialize);