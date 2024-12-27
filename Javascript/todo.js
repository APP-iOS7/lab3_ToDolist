function addTodo(text, checked = false) {

}

function makeDeleteButton(li) {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
  deleteButton.textContent = "삭제";
  deleteButton.addEventListener("click", () => {
    const todos = loadTodos();
    const index = Array.from(li.parentElement.children).indexOf(li);
    todos.splice(index, 1);
    saveTodos(todos);
    li.remove();
  });
  return deleteButton;
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
