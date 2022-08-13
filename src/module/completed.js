export default class Completed {
  static add = (id) => {
    const tasks = JSON.parse(localStorage.getItem('localTasks')) ?? [];
    tasks.map((task) => {
      if (task.index === id) {
        const { completed } = task;
        if (completed) {
          task.completed = false;
        } else {
          task.completed = true;
        }
      }
      return task;
    });
    localStorage.setItem('localTasks', JSON.stringify(tasks));
  }
}
