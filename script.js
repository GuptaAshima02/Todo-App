const button = document.getElementById("btn");
const container = document.getElementById("todo-list");
const input = document.getElementById("todo-input");

// Function to load todo list from local storage and displaying it on the page
function loadTodoList() {
  const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  todoList.forEach(todo => {
    container.appendChild(createTodoElement(todo));
  });
}

// Function to save todo list to local storage
function saveTodoList() {
  const todoList = Array.from(container.children).map(todoElement => {
    return {
      text: todoElement.querySelector('li').innerText,
      completed: todoElement.querySelector('li').classList.contains('completed')
    };
  });
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Function to create a todo element
function createTodoElement(todo) {
  const { text, completed } = todo;
  let todoElement = document.createElement("div");
  todoElement.classList.add("todo");

  let li = document.createElement("li");
  li.innerText = text;
  if (completed) {
    li.classList.add("completed");
  }
  todoElement.appendChild(li);

  let checkButton = document.createElement("button");
  checkButton.innerHTML = "Check";
  checkButton.classList.add("todo-check");
  todoElement.appendChild(checkButton);

  let editButton = document.createElement("button");
  editButton.innerHTML = "Edit";
  editButton.classList.add("todo-edit");
  todoElement.appendChild(editButton);

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.classList.add("todo-delete");
  todoElement.appendChild(deleteButton);

  return todoElement;
}

// Event listener for adding a new todo
button.addEventListener("click", (e) => {
  let todoText = input.value.trim();

  if (todoText === "") {
    alert("Please enter some text.");
    return;
  }

  let todo = {
    text: todoText,
    completed: false
  };

  container.appendChild(createTodoElement(todo));
  input.value = "";

  // Save todo list to local storage
  saveTodoList();
});

// Event listener for container
container.addEventListener("click", (e) => {
  let target = e.target;

  if (target.classList.contains("todo-delete")) {
    let todoElement = target.parentElement;
    todoElement.remove();
  }
  
  if (target.classList.contains("todo-check")) {
    let todoElement = target.parentElement;
    let li = todoElement.querySelector("li");
    li.classList.toggle("completed");
  }
  
  if (target.classList.contains("todo-edit")) {
    let todoElement = target.parentElement;
    let li = todoElement.querySelector("li");
    let editText = li.innerText.trim();

    if (target.innerText === "Edit") {
      // Change the button text to "Save"
      target.innerText = "Save";

      // Create an input element to allow editing
      let editInput = document.createElement("input");
      editInput.value = editText;
      editInput.classList.add("edit-input");
      todoElement.insertBefore(editInput, li);

      // Hide the li element
      li.style.display = "none";
    } else if (target.innerText === "Save") {
      let editInput = todoElement.querySelector(".edit-input");
      let newText = editInput.value.trim();

      if (newText !== "") {
        // Update the text in li element
        li.innerText = newText;
      }

      // Remove the edit input element
      editInput.remove();

      // Show the li element
      li.style.display = "block";

      // Change the button text back to "Edit"
      target.innerText = "Edit";

      // Save todo list to local storage
      saveTodoList();
    }
  }

  
  // Save todo list to local storage
  saveTodoList();
});

// Load todo list from local storage on page load
loadTodoList();
