import Completed from './module/completed';

export default function create() {
  let tasks = [];
  const addListInput = document.querySelector('.add');
  const AddToList = document.querySelector('.add-to-list');
  const todo = document.querySelector('.todo-list');

  const addList = () => {
    tasks = JSON.parse(localStorage.getItem('localTasks')) ?? [];
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
    todo.innerHTML = '';
    tasks = JSON.parse(localStorage.getItem('localTasks')) ?? [];
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
  };

  todo.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-solid')) {
      const { id } = e.target;
      e.target.parentElement.parentElement.remove();
      removeList(id);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const check = document.querySelector('.check');
    check.addEventListener('change', (e) => {
      const { id } = e.target;
      Completed.add(id);
      check.nextElementSibling.classList.toggle('checked');
      localStorage.checked = check.id;
    });
  });
}