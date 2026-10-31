// 1. Selection of the DOM elements(Hooks)
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const totalCount = document.getElementById('total-count');
const completedCount = document.getElementById('completed-count');
const pendingCount = document.getElementById('pending-count');

// 2. Application State (Tasks Array)
let tasks = [
  { id: 1, text: "Learn Node", completed: false },
  { id: 2, text: "Practise API testing", completed: true },
  { id: 3, text: "Build Todo application", completed: false }
];

// 3. Function to Update the Stats Dashboard Counters
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  totalCount.textContent = total;
  completedCount.textContent = completed;
  pendingCount.textContent = pending;
}

// 4. Function to Render Tasks & Sync UI
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    // Create the <li> container
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    // Create Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      renderTasks(); // Re-render to update counters and styles
    });

    // Create Text Span
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    // Create Actions Wrapper (Edit & Delete buttons)
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✏️';
    editBtn.setAttribute('aria-label', 'Edit task');
    editBtn.addEventListener('click', () => {
      const updatedText = prompt('Edit your task:', task.text);
      if (updatedText !== null && updatedText.trim() !== '') {
        task.text = updatedText.trim();
        renderTasks();
      }
    });

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
    });

    // Append buttons into the actions container
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    // Append all parts into the main <li> element
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(actionsDiv);

    // Append the <li> into the <ul> (#task-list)
    taskList.appendChild(li);
  });

  // Update the numbers at the top
  updateStats();
}

// 5. Event Listener for Adding New Tasks
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();

  if (text === '') {
    alert('Please enter a task!');
    return;
  }

  const newTask = {
    id: Date.now(), // Generates a unique numeric ID using the current timestamp
    text: text,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = ''; // To Reset input field
  renderTasks();
});

renderTasks();