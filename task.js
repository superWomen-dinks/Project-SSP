let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = function () {
    renderTasks();
};

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskTime = document.getElementById('taskTime').value;

    if (!taskName || !taskTime) return alert('Please enter task name and time.');

    const task = {
        id: Date.now(),
        name: taskName,
        time: taskTime
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    setReminder(task.name, task.time);

    document.getElementById('taskName').value = '';
    document.getElementById('taskTime').value = '';
}


function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
            <strong>${task.name}</strong> - ${new Date(task.time).toLocaleString()}
            <br>
            <button onclick="editTask(${task.id})"><i class="bi bi-pencil-square"></i>Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskDiv);
    });
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'tasks';

        taskDiv.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span><strong>${task.name}</strong> - ${new Date(task.time).toLocaleString()}</span>
            <span>
              <button onclick="editTask(${task.id})" title="Edit"><i class="fas fa-edit"></i></button>
              <button onclick="deleteTask(${task.id})" title="Delete"><i class="fas fa-trash"></i></button>
            </span>
          </div>
        `;

        taskList.appendChild(taskDiv);
    });
}









function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    document.getElementById('taskName').value = task.name;
    document.getElementById('taskTime').value = task.time;

    // Remove from list while editing
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function setReminder(task, time) {
    const taskTime = new Date(time).getTime();
    const now = new Date().getTime();
    const delay = taskTime - now;

    if (delay > 0) {
        setTimeout(() => {
            alert(`Reminder: ${task}`);
        }, delay);
    }
}
