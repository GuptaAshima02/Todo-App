const button = document.getElementById("btn");
const container = document.getElementById("todo-list");
const input = document.getElementById("todo-input");

button.addEventListener("click", (e) => {
    let todo = document.createElement("div");
    todo.classList.add("todo");

    let li = document.createElement("li");
    li.innerText = input.value;
    todo.appendChild(li);

    let checkButton = document.createElement("button");
    checkButton.innerHTML = "Check";
    checkButton.classList.add("todo-check");
    todo.appendChild(checkButton);

    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.classList.add("todo-edit");
    todo.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("todo-delete");
    todo.appendChild(deleteButton);

    if (input.value === "") {
        alert("Please enter some text.");
    } else {
        container.appendChild(todo);
    }
    input.value = "";
});

container.addEventListener("click", (e) => {
    let target = e.target;
    if (target.classList.contains("todo-delete")) {
      let item = target.parentElement;
      item.remove();
    }
    if (target.classList.contains("todo-check")) {
      let item = target.parentElement;
      let li = item.querySelector("li");
      li.classList.toggle("completed");
    }
    if (target.classList.contains("todo-edit")) {
      let item = target.parentElement;
      let li = item.querySelector("li");
      let newText = prompt("Enter new text", li.innerText);
      if (newText !== null && newText !== "") {
        li.innerText = newText;
      }
    }
  });
