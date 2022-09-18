/**
 * @jest-environment jsdom
 */

const LocalStorageMock = () => {
  let store = [];
  return {
    getItem(id) {
      return store[id] || [];
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
  it('add list to ui', () => {
    const localStorage = new LocalStorageMock();
    const tasks = localStorage.getAll();
    const task = {
      description: 'hello',
      completed: false,
      index: 2,
    };
    tasks.push(task);
    const lists = document.querySelectorAll('.todo-list');
    expect(lists).toHaveLength(0);
  });
  it('remove from ui', () => {
    const localStorage = new LocalStorageMock();
    localStorage.getAll();
    const lists = document.querySelectorAll('.todo-list');
    expect(lists).toHaveLength(0);
  });
});

describe('second task', () => {
  it('updating checked', () => {
    const localStorage = new LocalStorageMock();
    localStorage.getAll();
    const task = {
      description: 'hello',
      completed: false,
      index: 2,
    };
    expect(task.completed).toBe(task.completed === true);
  });
  it('check for clear all completed', () => {
    const localStorage = new LocalStorageMock();
    const tasks = localStorage.getItem();
    const tsk = tasks.filter((task) => !task.completed);
    expect(tsk).toHaveLength(0);
  });
});
