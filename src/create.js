const addListInput = document.querySelector('.add');
const AddToList = document.querySelector('.add-to-list');
const todo = document.querySelector('.todo-list');

let tasks = [];

export function addList() {
  tasks = JSON.parse(localStorage.getItem('localTasks')) ?? [];
  const objectTasks = {
    description: addListInput.value,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(objectTasks);
  localStorage.setItem('localTasks', JSON.stringify(tasks));
  window.location.reload();
}

export function completed(index) {
  const tasks = JSON.parse(localStorage.getItem('localTasks')) ?? [];
  tasks.map((task) => {
    if (task.index === index) {
      const { completed } = task;
      task.completed = !completed;
    }
    return task;
  });
  localStorage.setItem('localTasks', JSON.stringify(tasks));
}

export function display() {
  todo.innerHTML = '';
  tasks = JSON.parse(localStorage.getItem('localTasks')) ?? [];
  tasks.forEach((task) => {
    const todo = document.querySelector('.todo-list');
    const list = document.createElement('div');
    list.classList.add('list');
    list.innerHTML = `
  <div class="list-one">
  <input class="check" type="checkbox" />
  <input class="listInput" value="${task.description}"/>
   </div>
   <div class="happy">
   <i class="fa-solid fa-trash-can"  id="${task.index}" ></i>
   </div>
  
  `;
    todo.appendChild(list);
  });
}

display();

export function removeList(id) {
  const tasks = JSON.parse(localStorage.getItem('localTasks')) ?? [];
  const filteredLists = tasks.filter((task) => task.index !== parseInt(id, 10));

  localStorage.setItem('localTasks', JSON.stringify(filteredLists));
  display(filteredLists);
  window.location.reload();
}

AddToList.addEventListener('click', () => {
  if (addListInput.value === '') return;
  addList(addListInput.value);
  addListInput.value = '';
  display();
});

todo.addEventListener('click', (e) => {
  const { className } = e.target;
  if (className === 'check') {
    e.target.nextElementSibling.classList.toggle('checked');
    completed();
  }
});

// delete button event listener;
const deleteIcon = document.querySelector('.happy');
deleteIcon.addEventListener('click', (e) => {
  const { id } = e.target;
  e.target.parentElement.parentElement.remove();
  removeList(id);
});