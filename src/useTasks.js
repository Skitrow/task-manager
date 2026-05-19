export function getDaysUntilDeadline(deadlineString, currentDate = new Date()) {
    const deadline = new Date(deadlineString);
    deadline.setHours(0, 0, 0, 0);
    const today = new Date(currentDate);
    today.setHours(0, 0, 0, 0);
    const diffTime = deadline - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function addTask(tasks, task) {
    if (!task.title || task.title.trim() === '') {
        throw new Error('Title is required');
    }
    return [...tasks, { ...task, id: Date.now() }];
}

export function filterHotTasks(tasks, currentDate = new Date()) {
    return tasks.filter(task => {
        const days = getDaysUntilDeadline(task.deadline, currentDate);
        return days >= 0 && days <= 3;
    });
}