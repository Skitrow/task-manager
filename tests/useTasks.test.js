    import { describe, it, expect } from 'vitest';
    import { getDaysUntilDeadline, addTask, filterHotTasks } from '../src/useTasks';

    describe('getDaysUntilDeadline', () => {
        it('коректно розраховує дні до дедлайну (дедлайн через 2 дні)', () => {
            const today = new Date('2023-10-10');
            expect(getDaysUntilDeadline('2023-10-12', today)).toBe(2);
        });

        it('повертає 0, якщо дедлайн сьогодні', () => {
            const today = new Date('2023-10-10');
            expect(getDaysUntilDeadline('2023-10-10', today)).toBe(0);
        });

        it('повертає негативне значення, якщо дата вже минула', () => {
            const today = new Date('2023-10-10');
            expect(getDaysUntilDeadline('2023-10-05', today)).toBe(-5);
        });
    });

    describe('addTask', () => {
        it('додає нове завдання до списку', () => {
            const result = addTask([], { title: 'New Task' });
            expect(result.length).toBe(1);
            expect(result[0].title).toBe('New Task');
        });

        it('викидає помилку, якщо назва порожня', () => {
            expect(() => addTask([], { title: '' })).toThrow('Title is required');
        });
    });

    describe('filterHotTasks', () => {
        it('фільтрує гарячі завдання', () => {
            const tasks = [
                { title: 'Task 1', deadline: '2023-10-11' }, // 1 день (гаряче)
                { title: 'Task 2', deadline: '2023-10-15' }, // 5 днів (не гаряче)
            ];
            const today = new Date('2023-10-10');
            const hot = filterHotTasks(tasks, today);
            expect(hot.length).toBe(1);
            expect(hot[0].title).toBe('Task 1');
        });
    });