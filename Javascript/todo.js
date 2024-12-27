const todoListElement = document.getElementById("todoList");
const addButton = document.getElementById("addTodo");
const todoInput = document.getElementById("todoInput");

function addTodo(text, checked = false) {
  // li 요소 만들기
  const li = document.createElement("li");
  li.classList.add(
    "list-group-item",
    "d-flex",
    "align-items-center",
    "justify-content-between"
  );

  // 체크박스 만들기
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("form-check-input");
  // checkbox 요소 checked 프로퍼티에 checked 파라미터의 값 (true/false) 할당
  checkbox.checked = checked;

  // 텍스트 추가
  const spanElement = document.createElement("span");
  spanElement.classList.add("ms-2", "flex-grow-1");
  spanElement.textContent = text;

  // 체크박스 상태에 따라 취소선 처리
  spanElement.style.textDecoration = checked ? "line-through" : "none";

  // 체크박스 클릭시 처리
  // 체크박스의 값이 변경되면, 여기서 정의한 함수가 실행됨 (지연 실행)
  checkbox.addEventListener("change", () => {
    spanElement.style.textDecoration = checkbox.checked
      ? "line-through"
      : "none";

    // localStorage 업데이트
    const todos = loadTodos();
    const index = Array.prototype.indexOf.call(li.parentElement.children, li);
    todos[index].checked = checkbox.checked;
    saveTodos(todos);
  });

  li.prepend(checkbox);
  li.append(spanElement);
  li.append(makeEditButton(li));
  li.append(makeDeleteButton(li));
  todoListElement.append(li);
}

function makeEditButton(li) {
  const editButton = document.createElement("button");
  editButton.classList.add("btn", "btn-warning", "btn-sm", "ms-2");
  editButton.textContent = "수정";

  editButton.addEventListener("click", () => {
    const spanElement = li.querySelector("span");
    let inputElement = li.querySelector("input[type='text']");

    if (!inputElement) {
      spanElement.style.display = "none";

      inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.className = "form-control form-control-sm";
      inputElement.placeholder = "수정할 일을 입력해주세요.";
      inputElement.value = spanElement.textContent;
      inputElement.style.marginLeft = "8px";

      li.insertBefore(inputElement, spanElement);

      inputElement.focus();
      inputElement.setSelectionRange(0, inputElement.value.length);

      editButton.classList.remove("btn-warning");
      editButton.classList.add("btn-success");
      editButton.textContent = "완료";

      // 엔터 키 이벤트 리스너 추가
      inputElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault(); // 기본 엔터 동작(새 줄 추가) 방지
          completeEdit();
        }
      });
    } else completeEdit();

    function completeEdit() {
      if (inputElement.value.trim() === "") {
        alert("최소 한 글자 이상 입력해주세요.");
        return;
      }
      spanElement.textContent = inputElement.value.trim();
      spanElement.style.display = "inline";

      inputElement.remove();

      editButton.classList.remove("btn-success");
      editButton.classList.add("btn-warning");
      editButton.textContent = "수정";

      const todos = loadTodos();
      const index = Array.prototype.indexOf.call(li.parentElement.children, li);
      todos[index].text = spanElement.textContent;
      saveTodos(todos);
    }
  });

  return editButton;
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
function saveTodos(todos) {
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
      if (todoInput.value.trim() === "") {
        alert("최소 한 글자 이상 입력해주세요.");
        return; // 빈 입력 방지
      }

      // 새로운 할일 추가
      addTodo(todoInput.value);

      // // localStorage 업데이트
      const todos = loadTodos();
      todos.push({ text: todoInput.value, checked: false });
      saveTodos(todos);

      // 입력창 비우기
      todoInput.value = "";
    }
  });

  addButton.addEventListener("click", () => {
    if (todoInput.value.trim() === "") {
      alert("최소 한 글자 이상 입력해주세요.");
      return;
    }

    addTodo(todoInput.value);

    const todos = loadTodos();
    todos.push({ text: todoInput.value, checked: false });
    saveTodos(todos);

    todoInput.value = "";
  });
}

//페이지 로드시 초기화
document.addEventListener("DOMContentLoaded", initialize);
