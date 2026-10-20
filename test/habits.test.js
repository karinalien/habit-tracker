const { test } = require("node:test");
const assert = require("node:assert/strict");
const { HabitTracker } = require("../src/habits");

test("создание привычки и защита от внешнего изменения", () => {
    const tracker = new HabitTracker();
    const habit = tracker.add(" Читать ");
    assert.equal(habit.title, "Читать");
    habit.title = "Изменено";
    assert.equal(tracker.list()[0].title, "Читать");
    assert.throws(() => tracker.add(" "));
});

test("отметка за день не дублируется", () => {
    const tracker = new HabitTracker();
    const habit = tracker.add("Прогулка");
    tracker.complete(habit.id, "2026-10-20");
    tracker.complete(habit.id, "2026-10-20");
    assert.deepEqual(tracker.list()[0].completedDates, ["2026-10-20"]);
});

test("ошибочная дата и неизвестная привычка отклоняются", () => {
    const tracker = new HabitTracker();
    const habit = tracker.add("Читать");
    assert.throws(() => tracker.complete(habit.id, "2026-02-30"));
    assert.throws(() => tracker.complete(habit.id, "20.10.2026"));
    assert.throws(() => tracker.complete("missing", "2026-10-20"));
    assert.deepEqual(tracker.list()[0].completedDates, []);
});
