// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const task = { text: taskText, completed: false };
        saveTask(task);
        taskInput.value = ''; // Clear input
        displayTasks();
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    displayTasks();
}

function displayTasks(filter = 'all') {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        if (filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'pending' && !task.completed)) {
            const taskItem = document.createElement('li');
            taskItem.classList.toggle('completed', task.completed);

            taskItem.innerHTML = `
                <span onclick="toggleComplete(${index})">${task.text}</span>
                <button onclick="deleteTask(${index})">X</button>
            `;

            taskList.appendChild(taskItem);
        }
    });
}

function toggleComplete(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function filterTasks(filter) {
    displayTasks(filter);
}
