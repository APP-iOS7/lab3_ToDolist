function addTodo(text, checked = false) {

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
}


document.addEventListener('DOMContentLoaded', initialize);
