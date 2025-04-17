function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskTime = document.getElementById('taskTime').value;
    if (!taskName || !taskTime) return alert('Please enter task name and time.');

    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.innerHTML = `<strong>${taskName}</strong> - ${new Date(taskTime).toLocaleString()}`;
    document.getElementById('taskList').appendChild(taskDiv);

   setReminder(taskName, taskTime);
    document.getElementById('taskName').value = '';
    document.getElementById('taskTime').value = '';
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