import posthog from 'posthog-js';

posthog.init('phc_obuvMzHKcncyhXc9YghmkMAJerhiuuiRF2SofoGVmPCA', {
    api_host: window.location.origin + '/v-status',
    ui_host: 'https://us.posthog.com',
    person_profiles: 'always'
});
window.posthog = posthog;

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const envStatus = document.getElementById('envStatus');
    const urgentBtn = document.getElementById('urgent-btn');

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