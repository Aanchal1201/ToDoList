const myInput = document.getElementById("myInput");
const addBtn = document.getElementById("addBtn");
const clrBtn = document.getElementById("clrBtn");
const myList = document.getElementById("myList");

//Create Li and append into UL
function createTodo(element) {
  let li = document.createElement("li");
  li.classList.add("todo");
  let text = document.createTextNode(element);
  li.appendChild(text);
  let span = document.createElement("span");
  span.classList.add("delete");
  span.innerHTML = `<i class='fas fa-trash'></i>`;
  li.appendChild(span);
  myList.prepend(li);

  li.addEventListener("click", function () {
    li.classList.toggle("checked");
  });

  //Add event listener for removing element
  span.addEventListener("click", function () {
    const parent = this.parentNode;
    let Todo = createLocalStorageItems();
    let p = parent.innerHTML.split("<span")[0];
    Todo.splice(Todo.indexOf(p), 1);
    localStorage.setItem("Todo", JSON.stringify(Todo));
    parent.remove();
  });
}

function createLocalStorageItems() {
  let Todo;
  if (localStorage.getItem("Todo") == null) {
    Todo = [];
  } else {
    Todo = JSON.parse(localStorage.getItem("Todo"));
  }
  return Todo;
}

function load() {
  let Todo = createLocalStorageItems();
  Todo.forEach((element) => {
    createTodo(element);
  });
}

function setLocalStorage() {
  let Todo = createLocalStorageItems();
  Todo.push(myInput.value);
  myInput.value = "";
  localStorage.setItem("Todo", JSON.stringify(Todo));
}

function add() {
  if (myInput.value == "") {
    return;
  }
  createTodo(myInput.value);
  setLocalStorage();
}

addBtn.addEventListener("click", function () {
  add();
});

//if you press enter then add todos
myInput.addEventListener("keydown", function (event) {
  if (event.keyCode == 13) {
    add();
  }
});

//it will clear all todos from localstorage as well from dom
clrBtn.addEventListener("click", () => {
  localStorage.clear();
  myList.innerHTML = "";
});
