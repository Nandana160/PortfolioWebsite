// Wait for page to fully load before running code
document.addEventListener("DOMContentLoaded", () => {
  // Greeting
  window.sayHello = function () {
    alert("Thanks for visiting my portfolio!");
  };

  // Contact form validation
  window.validateForm = function () {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email.includes("@") || !message) {
      alert("Please fill out all fields with valid data.");
      return false;
    }

    alert("Thank you for contacting me!");
    return true;
  };

  // To-Do List functions
  window.addTodo = function () {
    const input = document.getElementById("todoInput");
    const value = input.value.trim();
    if (!value) return;

    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.push(value);
    localStorage.setItem("todos", JSON.stringify(todos));
    input.value = "";
    renderTodos();
  };

  function renderTodos() {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    const ul = document.getElementById("todos");
    if (!ul) return;

    ul.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.textContent = todo;
      li.onclick = () => {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
      };
      ul.appendChild(li);
    });
  }

  // Weather checker
  window.getWeather = async function () {
    const city = document.getElementById("cityInput").value.trim();
    const result = document.getElementById("weatherResult");
    if (!city) {
      result.textContent = "Please enter a city name.";
      return;
    }

    result.textContent = "Loading...";
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=a66125bd7c2048f880c72059250205&q=${city}&aqi=no`
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);

      result.textContent = `🌤 ${data.location.name}: ${data.current.temp_c}°C, ${data.current.condition.text}`;
    } catch (err) {
      result.textContent = "Error: " + err.message;
    }
  };

  // Product filtering & sorting
  const products = [
    { name: "Portfolio Template", category: "web" },
    { name: "Logo Design", category: "design" },
    { name: "Responsive Layout", category: "web" },
    { name: "Illustration Pack", category: "design" },
  ];

  window.filterProducts = function () {
    const category = document.getElementById("categoryFilter")?.value;
    const sort = document.getElementById("sortFilter")?.value;
    const list = document.getElementById("productList");

    if (!list || !category || !sort) return;

    let filtered = [...products];

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (sort === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    list.innerHTML = "";
    filtered.forEach((p) => {
      const div = document.createElement("div");
      div.className = "product";
      div.textContent = `${p.name} (${p.category})`;
      list.appendChild(div);
    });
  };

  // Auto-run functions based on page
  if (document.getElementById("todos")) renderTodos();
  if (document.getElementById("productList")) filterProducts();
});
// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  renderTodos();
  requestNotificationPermission();
});

// Ask for notification permission if not already granted
function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

// Show reminder notification
function notify(task) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("⏰ Task Reminder", {
      body: `Don't forget: ${task}`,
    });
  }
}

// Add a new task
function addTodo() {
  const input = document.getElementById("todoInput");
  const task = input.value.trim();
  if (!task) return;

  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  todos.push(task);
  localStorage.setItem("todos", JSON.stringify(todos));

  input.value = "";
  renderTodos();

  // Set reminder in 30 seconds (demo)
  setTimeout(() => notify(task), 30000);
}

// Delete a task by index
function deleteTodo(index) {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Display all tasks
function renderTodos() {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteTodo(index);

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}


