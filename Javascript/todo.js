const todoListElement = document.getElementById('todoList');
const addButton = document.getElementById('addTodo');
const todoInput = document.getElementById('todoInput');

function addTodo(text, checked = false) {
  const li = document.createElement('li');
  li.textContent = text;
  li.classList.add('list-group-item');
  
  todoListElement.appendChild(li);
}

//할 일 목록 저장
function saveTodos(todoList) {
  const todos = todoList.map(item => ({
    text: item,
  }));
  localStorage.setItem('todoList', JSON.stringify(todos));
}

//할 일 목록 가져오기
function loadTodos() {
  const savedTodos = localStorage.getItem('todoList');
  return savedTodos ? JSON.parse(savedTodos) : [];
}

//초기화 함수
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

//페이지 로드시 초기화
document.addEventListener('DOMContentLoaded', initialize);