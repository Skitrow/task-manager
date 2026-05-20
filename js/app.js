document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const envStatus = document.getElementById('envStatus');
    const urgentBtn = document.getElementById('urgent-btn');
    const breakBtn = document.getElementById('break-world-btn');

    if (breakBtn) {
        breakBtn.addEventListener('click', () => {
            throw new Error("CRITICAL ALERT: Payment system crashed!");
        });
    }

    if (window.posthog) {
        window.posthog.onFeatureFlags(() => {
            if (window.posthog.isFeatureEnabled('show-urgent-filter')) {
                if (urgentBtn) {
                    urgentBtn.style.display = 'inline-block';
                }
            }
        });
    }

    if (envStatus) {
        envStatus.textContent = import.meta.env.VITE_APP_STATUS || 'Local';
    }

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
            const taskText = taskInput.value.trim();
            
            if (taskText !== '') {
                const li = document.createElement('li');
                
                const span = document.createElement('span');
                span.textContent = `[${prioritySelect.value}] ${taskText}`;
                li.appendChild(span);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Видалити';
                deleteBtn.style.marginLeft = '10px';
                deleteBtn.style.cursor = 'pointer';
                deleteBtn.addEventListener('click', () => {
                    li.remove();
                    if (window.posthog) {
                        window.posthog.capture('task_deleted', {
                            priority: prioritySelect.value,
                            reason: 'user_action'
                        });
                    }
                });
                li.appendChild(deleteBtn);

                taskList.appendChild(li);
                
                if (window.posthog) {
                    window.posthog.capture('task_created', {
                        priority: prioritySelect.value,
                        text_length: taskText.length
                    });
                }

                taskInput.value = '';
            }
        });
    }
});