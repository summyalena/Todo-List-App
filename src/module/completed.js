const tasks = JSON.parse(localStorage.getItem('localTasks')) ?? [];
export default class Completed {
  static add = (id) => {
    // const tasks = JSON.parse(localStorage.getItem('localTasks')) ?? [];
    tasks.map((task) => {
      if (task.index === parseInt(id, 10)) {
        task.completed = !task.completed;
      } return task;
    });
    localStorage.setItem('localTasks', JSON.stringify(tasks));
  }
}
