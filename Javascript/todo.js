const addButton = document.getElementById("addTodo");
const todoInput = document.getElementById("todoInput");

function addTodo(text, checked = false) {

}

// localStorage에서 할일 목록 가져오기
function loadTodos() {
  const savedTodos = localStorage.getItem("todoList");
  return savedTodos ? JSON.parse(savedTodos) : [];
}

// localStorage에 할일 목록 저장하기
function saveTodos(todos) {
  localStorage.setItem("todoList", JSON.stringify(todos));
}

// 초기화 함수
function initialize() {
  // 저장된 할일 목록 불러오기
  const todos = loadTodos();
  todos.forEach((todo) => {
    addTodo(todo.text, todo.checked);
  });

  // 새로운 할일 추가 버튼 클릭 이벤트
  addButton.addEventListener("click", () => {
    if (todoInput.value.trim() === "") return; // 빈 입력 방지

    // 새로운 할일 추가
    addTodo(todoInput.value);

    // localStorage 업데이트
    const todos = loadTodos();
    const todoData = {
      text: todoInput.value,
      checked: false,
    };
    todos.push(todoData);
    saveTodos(todos);

    // 입력창 비우기
    todoInput.value = "";
  });
}


document.addEventListener('DOMContentLoaded', initialize);