import { test, expect } from '@playwright/test';

test('Додавання нового завдання відображається у списку', async ({ page }) => {
    // 1. Відкриваємо сторінку (Playwright може відкривати локальні файли)
    // Заміни шлях на абсолютний шлях до твого файлу index.html на комп'ютері
    // Наприклад: 'file:///C:/Users/ТвоєІмя/Desktop/git-lab-task-manager/index.html'
    // АБО якщо ти запускаєш локальний сервер (Live Server/Vite), встав його адресу, наприклад 'http://localhost:5173'
    await page.goto('file:///D:/University/6_semestr/IT_Projects/git-task-manager/index.html');

    // 2. Знаходимо елементи на сторінці
    const taskInput = page.locator('#taskInput');
    const prioritySelect = page.locator('#prioritySelect');
    const addTaskBtn = page.locator('#addTaskBtn');
    const taskList = page.locator('#taskList');

    // 3. Імітуємо дії користувача
    await taskInput.fill('Зробити лабораторну роботу №2');
    await prioritySelect.selectOption('High');
    await addTaskBtn.click();

    // 4. Перевіряємо результат (чи з'явився текст у списку)
    await expect(taskList).toContainText('[High] Зробити лабораторну роботу №2');
});