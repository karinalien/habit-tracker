const { HabitTracker } = require("./habits");
const tracker = new HabitTracker();
const habit = tracker.add("Читать 20 минут");
tracker.complete(habit.id, new Date().toISOString().slice(0, 10));
console.log(JSON.stringify(tracker.list(), null, 2));
