/* eslint max-classes-per-file: "off" */
import Update from './update.js';

class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

class ToDoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.update = new Update();

    this.updateTaskStatus = this.update.updateTaskStatus.bind(this, this);
    this.clearCompletedTasks = this.update.clearCompletedTasks.bind(this, this);
  }

  addTask(description) {
    const newTask = new Task(description, false, this.tasks.length + 1);
    this.tasks.push(newTask);
    this.saveTasks();
  }

  deleteTask(index) {
    this.tasks = this.tasks.filter((task) => task.index !== index);
    this.updateTaskIndexes();
    this.saveTasks();
  }

  editTask(index, newDescription) {
    this.tasks[index].description = newDescription;
    this.saveTasks();
  }

  updateTaskIndexes() {
    this.tasks.forEach((task, index) => {
      task.index = index + 1;
    });
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  render() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    this.tasks.forEach((task, index) => {
      const listItem = document.createElement('div');
      listItem.classList.add('item', 'row');
      const div = document.createElement('div');
      div.classList.add('internal-div', 'col-md-8');
      const divInput = document.createElement('div');
      divInput.classList.add('input-wrap', 'col-md-4');
      const inputItem = document.createElement('input');
      inputItem.classList.add('checkbox');
      inputItem.type = 'checkbox';
      inputItem.checked = task.completed;
      if (task.completed) {
        listItem.classList.add('completed');
      }
      const itemDescription = document.createElement('input');
      itemDescription.classList.add('edit-input');
      itemDescription.type = 'text';
      itemDescription.value = task.description;
      divInput.appendChild(inputItem);
      div.appendChild(itemDescription);
      listItem.appendChild(divInput);
      listItem.appendChild(div);

      const editBtn = document.createElement('button');
      editBtn.classList.add('edit');
      const editIcon = document.createElement('i');
      editIcon.className = 'fa-solid fa-file-pen';
      editIcon.classList.add('edit-icon');
      editBtn.appendChild(editIcon);
      editBtn.addEventListener('click', () => {
        itemDescription.disabled = false;
        itemDescription.focus();
        itemDescription.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            const newDescription = itemDescription.value;
            if (newDescription) {
              this.editTask(task.index - 1, newDescription);
              this.render();
            }
          }
        });
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete');
      const deleteIcon = document.createElement('i');
      deleteIcon.className = 'fa-solid fa-trash';
      deleteIcon.classList.add('delete-icon');
      deleteBtn.appendChild(deleteIcon);
      deleteBtn.addEventListener('click', () => {
        this.deleteTask(task.index);
        this.render();
      });

      div.appendChild(deleteBtn);
      div.appendChild(editBtn);
      listItem.appendChild(div);
      todoList.appendChild(listItem);

      inputItem.addEventListener('change', () => {
        this.updateTaskStatus(index);
      });
    });

    const clearAll = document.createElement('div');
    clearAll.classList.add('clear-all');
    const clearBtn = document.createElement('button');
    clearBtn.classList.add('clear-btn');
    clearBtn.innerText = 'Clear all completed';
    clearAll.appendChild(clearBtn);
    todoList.appendChild(clearAll);

    clearBtn.addEventListener('click', () => {
      this.clearCompletedTasks();
    });
  }
}

export default ToDoList;
