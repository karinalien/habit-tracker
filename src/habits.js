const { randomUUID } = require("node:crypto");

class HabitTracker {
    constructor() { this.habits = new Map(); }

    add(title) {
        if (typeof title !== "string" || !title.trim()) throw new Error("Укажите название привычки.");
        const habit = { id: randomUUID(), title: title.trim(), completedDates: [] };
        this.habits.set(habit.id, habit);
        return structuredClone(habit);
    }

    complete(id, date) {
        const habit = this.habits.get(id);
        if (!habit) throw new Error("Привычка не найдена.");
        if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Ожидается дата YYYY-MM-DD.");
        const parsed = new Date(date + "T00:00:00Z");
        if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) throw new Error("Несуществующая дата.");
        if (!habit.completedDates.includes(date)) habit.completedDates.push(date);
        habit.completedDates.sort();
        return structuredClone(habit);
    }

    list() { return structuredClone([...this.habits.values()]); }
}

module.exports = { HabitTracker };
