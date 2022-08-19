document.body.innerHTML = `
<div class='todo-list'></div>`;

const LocalStorageMock = () => {
  let store = [];
  return {
    getItem(id) {
      return store[id] || null;
    },
    setItem(tasks) {
      store = tasks;
    },
    removeItem(id) {
      delete store[id];
    },
    clearAll() {
      store = [];
    },
    getAll() {
      return store;
    },
  };
};

describe('testing for add and remove', () => {
  it('add function', () => {
    const localStorage = new LocalStorageMock();
    const tasks = localStorage.getAll();
    const task = {
      description: 'hello',
      completed: false,
      index: 1,
    };
    tasks.push(task);
    expect(tasks).toHaveLength(1);
  });
  it('remove function', () => {
    const localStorage = new LocalStorageMock();
    const tasks = localStorage.getAll();
    tasks.pop();
    expect(tasks).toHaveLength(0);
  });
});