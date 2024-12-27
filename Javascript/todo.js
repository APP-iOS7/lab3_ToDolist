const todoListElement = document.getElementById("todoList");
const addButton = document.getElementById("addTodo");
const todoInput = document.getElementById("todoInput");
const dropdown = document.getElementById("dropdown");

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
    spanElement.style.textDecoration = checkbox.checked ? "line-through" : "none";

    // localStorage 업데이트
    const todos = loadTodos();
    const index = Array.from(li.parentElement.children).indexOf(li);
    todos[index].checked = checkbox.checked;
    saveTodos(todos);
  });

  li.prepend(checkbox);
  li.append(spanElement);
  li.append(makeDeleteButton(li));
  todoListElement.append(li);
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

// 할일 목록 가져오기
function loadTodos(isFiltered = false) {
  const savedTodos = localStorage.getItem("todoList");
  const todos = savedTodos ? JSON.parse(savedTodos) : [];

  // isCheckedFilter 값에 따라 필터링
  let filteredTodos;
  if (isFiltered === true) {
    filteredTodos = todos.filter((todo) => todo.checked == false);
  } else {
    filteredTodos = todos; // 모든 항목 포함
  }

  return filteredTodos;
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
        alert("할 일을 입력해주세요.");
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
      alert("할 일을 입력해주세요.");
      return;
    }

    addTodo(todoInput.value);

    const todos = loadTodos();
    todos.push({ text: todoInput.value, checked: false });
    saveTodos(todos);

    todoInput.value = "";
  });

  // 이벤트 설정
  dropdown.addEventListener("click", function (event) {
    const target = event.target;

    // a 태그인지 확인
    if (target.tagName === "A" && target.classList.contains("dropdown-item")) {
      const action = target.getAttribute("data-action"); // data-action 속성 값 가져오기

      let todos;
      // 분기 처리
      switch (action) {
        case "action1": // 전체보기
          todos = loadTodos();
          break;
        case "action2": // 할일보기
          todos = loadTodos(true);
          break;
        default:
          console.log("알 수 없는 액션");
      }

      // 기존 목록 비우기
      todoListElement.innerHTML = "";

      // 필터링된 항목으로 갱신
      todos.forEach((todo) => {
        addTodo(todo.text, todo.checked);
      });

      // 기본 동작 방지 (필요시)
      event.preventDefault();
    }
  });
}

//페이지 로드시 초기화
document.addEventListener("DOMContentLoaded", initialize);
