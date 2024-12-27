const todoListElement = document.getElementById("todoList");
const addButton = document.getElementById("addTodo");
const todoInput = document.getElementById("todoInput");

function addTodo(text, checked = false) {
  const li = document.createElement("li");
  li.textContent = text;
  li.classList.add("list-group-item");

  todoListElement.appendChild(li);
}

function makeDeleteButton(li) {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
  deleteButton.textContent = "삭제";
  deleteButton.addEventListener("click", () => {
    const todos = loadTodos();
    const index = Array.prototype.indexOf.call(li.parentElement.children, li);
    todos.splice(index, 1);
    saveTodos(todos);
    li.remove();
  });
  return deleteButton;
}

//할 일 목록 저장
function saveTodos(todoList) {
  const todos = todoList.map((item) => ({
    text: item,
  }));
  localStorage.setItem("todoList", JSON.stringify(todos));
}

//할 일 목록 가져오기
function loadTodos() {
  const savedTodos = localStorage.getItem("todoList");
  return savedTodos ? JSON.parse(savedTodos) : [];
}

//초기화 함수
function initialize() {
  const todos = loadTodos();
  todos.forEach((todo) => {
    addTodo(todo.text, todo.checked);
  });


  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      if (todoInput.value.trim() === "") return; // 빈 입력 방지

      // 새로운 할일 추가
      addTodo(todoInput.value);

      // // localStorage 업데이트
      const todos = loadTodos();
      const todoData = {
        text: todoInput.value,
        checked: false,
      };
      todos.push(todoData);
      saveTodos(todos);

      // 입력창 비우기
      todoInput.value = "";
    }
  });

  addButton.addEventListener("click", () => {
    if (todoInput.value.trim() === "") return;

    addTodo(todoInput.value);

    const todos = loadTodos();
    todos.push({ text: todoInput.value, checked: false });
    saveTodos(todos);

    todoInput.value = "";
  });
}

//페이지 로드시 초기화
document.addEventListener("DOMContentLoaded", initialize);
