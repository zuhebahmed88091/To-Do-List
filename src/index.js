/* eslint max-classes-per-file: "off" */
import _ from 'lodash';
import './index.css';

class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const tasks = [
  new Task('Task 1', false, 1),
  new Task('Task 2', true, 2),
  new Task('Task 3', false, 3),
];

class ToDoList {
  constructor(tasks) {
    this.tasks = tasks;
  }

  render() {
    const todoList = document.getElementById('todo-list');

    this.tasks.forEach((task) => {
      const listItem = document.createElement('div');
      listItem.classList.add('item');
      const div = document.createElement('div');
      div.classList.add('internal-div');
      const inputItem = document.createElement('input');
      inputItem.classList.add('checkbox');
      inputItem.type = 'checkbox';
      if (task.checked) {
        listItem.classList.add('completed');
      }
      const itemDescription = document.createElement('p');
      itemDescription.innerText = task.description;
      div.appendChild(itemDescription);
      listItem.appendChild(inputItem);
      listItem.appendChild(div);

      const threeDots = document.createElement('i');
      threeDots.className = 'fa-solid fa-ellipsis-vertical';
      threeDots.classList.add('threedots');
      div.appendChild(threeDots);
      listItem.appendChild(div);
      todoList.appendChild(listItem);
    });
    const clearAll = document.createElement('div');
    clearAll.classList.add('clear-all');
    const clearBtn = document.createElement('button');
    clearBtn.classList.add('clear-btn');
    clearBtn.innerText = 'Clear all completed';
    clearAll.appendChild(clearBtn);
    todoList.appendChild(clearAll);
  }
}

const todoList = new ToDoList(tasks);
todoList.render();