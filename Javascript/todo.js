// DOM 요소들을 미리 저장
const todoListElement = document.getElementById("todoList");
const addButton = document.getElementById("addTodo");
const todoInput = document.getElementById("todoInput");

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
