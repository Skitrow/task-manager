document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const envStatus = document.getElementById('envStatus');

    // Відображення змінної оточення в інтерфейсі (з Лабораторної роботи №3)
    if (envStatus) {
        envStatus.textContent = import.meta.env.VITE_APP_STATUS || 'Local';
    }

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
            const taskText = taskInput.value.trim();
            
            if (taskText !== '') {
                // 1. Створення та додавання елемента завдання в DOM
                const li = document.createElement('li');
                li.textContent = `[${prioritySelect.value}] ${taskText}`;
                taskList.appendChild(li);
                
                // 2. Реалізація кастомної події для продуктової аналітики PostHog
                if (window.posthog) {
                    window.posthog.capture('task_created', {
                        priority: prioritySelect.value,
                        text_length: taskText.length
                    });
                }

                // 3. Очищення поля введення
                taskInput.value = '';
            }
        });
    }
});