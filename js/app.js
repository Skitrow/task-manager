document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const envStatus = document.getElementById('envStatus');

    // Відображення змінної оточення в інтерфейсі
    if (envStatus) {
        envStatus.textContent = import.meta.env.VITE_APP_STATUS || 'Local';
    }

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                const li = document.createElement('li');
                li.textContent = `[${prioritySelect.value}] ${taskText}`;
                taskList.appendChild(li);
                taskInput.value = '';
            }
        });
    }
});