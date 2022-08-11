import './style.css';

const tasks = [
  {
    description: 'Cook for my family',
    completed: false,
    index: 0,
  },

  {
    description: 'Finish the todo list',
    completed: false,
    index: 1,
  },

  {
    description: 'Play with little kids',
    completed: false,
    index: 2,
  },
];

const todo = document.querySelector('.todo-list');

tasks.forEach((task, index) => {
  if (task.index === index) {
    todo.innerHTML += `
        <div class="Lists">
         <div class="list">
         <div class="list-one">
         <input type="checkbox" bool=${task.completed}/>
         <p>${task.description}</p>
         </div>
         <div class="dots">
         <i class="fa-solid fa-ellipsis-vertical"></i>
         </div>
         </div>
        </div>
        `;
  }
});