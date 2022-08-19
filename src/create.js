import Completed from './module/completed';
import Clear from './module/clear';

export default function create() {
  const addListInput = document.querySelector('.add');
  const AddToList = document.querySelector('.add-to-list');
  const todo = document.querySelector('.todo-list');
  const todoContainer = document.querySelector('.todo-wrapper');
  const clear = document.querySelector('#clearAll');

  const addList = () => {
    const tasks = JSON.parse(localStorage.getItem('localTasks')) || [];
    const objectTasks = {
      description: addListInput.value,
      completed: false,
      index: tasks.length,
    };
    tasks.push(objectTasks);
    localStorage.setItem('localTasks', JSON.stringify(tasks));
    window.location.reload();
  };

  const display = () => {
    // todo.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('localTasks')) ?? [];
    tasks.forEach((task) => {
      const todo = document.querySelector('.todo-list');
      const list = document.createElement('div');
      list.classList.add('list');
      list.innerHTML = `
      <div class="list-one">
        <input class="check" id="${task.index}" type="checkbox" autocomplete="off" />
        <input class="listInput" value="${task.description}"/>
      </div>
      <div class="happy">
        <i class="fa-solid fa-trash-can"  id="${task.index}" ></i>
      </div>
      `;
      if (task.completed === true) {
        list.firstElementChild.firstElementChild.setAttribute('checked', '');
        list.firstElementChild.firstElementChild.nextElementSibling.classList.add('checked');
      } else {
        list.firstElementChild.firstElementChild.removeAttribute('checked', '');
        list.firstElementChild.firstElementChild.nextElementSibling.classList.remove('checked');
      }
      todo.appendChild(list);
    });
  };
  display();

  AddToList.addEventListener('click', () => {
    if (addListInput.value === '') return;
    addList(addListInput.value);
    addListInput.value = '';
    display();
  });

  const removeList = (id) => {
    const tasks = JSON.parse(localStorage.getItem('localTasks')) ?? [];
    const filteredLists = tasks.filter((task) => task.index !== parseInt(id, 10));
    tasks.length = 0;
    let i = 0;
    filteredLists.forEach((e) => { e.index = i; i += 1; });
    tasks.push(...filteredLists);
    localStorage.setItem('localTasks', JSON.stringify(filteredLists));
    display(filteredLists);
    window.location.reload();
  };

  todo.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-solid')) {
      const { id } = e.target;
      e.target.parentElement.parentElement.remove();
      removeList(id);
    }
  });

  todo.addEventListener('change', (e) => {
    const { className } = e.target;
    if (className === 'check') {
      if (e.target.checked) {
        e.target.nextElementSibling.classList.add('checked');
        e.target.setAttribute('checked', '');
      } else {
        e.target.nextElementSibling.classList.remove('checked');
        e.target.removeAttribute('checked');
      }
      const { id } = e.target;
      Completed.add(id);
    }
  });

  const clearAll = () => {
    const List = document.querySelectorAll('.list');
    List.forEach((list) => {
      list.remove();
    });
    document.querySelector('.clear').getElementsByClassName.display = 'none';
  };
  clear.addEventListener('click', () => {
    clearAll();
    Clear.clearLocal();
  });

  const clearAllChecked = () => {
    const tasks = JSON.parse(localStorage.getItem('localTasks')) ?? [];
    let checkedLists = tasks.filter((task) => !task.completed);
    // eslint-disable-next-line no-plusplus
    checkedLists = checkedLists.map((list, idx) => ({ ...list, index: idx++ }));
    localStorage.setItem('localTasks', JSON.stringify(checkedLists));
  };

  todoContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('clear')) {
      const todos = document.querySelectorAll('.list');
      todos.forEach((todo) => {
        if (todo.firstElementChild.firstElementChild.checked) {
          todo.remove();
        }
      });

      clearAllChecked();
    }
  });
}
