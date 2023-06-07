/* eslint max-classes-per-file: "off" */
import _ from 'lodash';
import './index.css';
import ToDoList from './module/todo.js';

const todoList = new ToDoList();

const inputTodo = document.getElementById('input-todo');
inputTodo.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const description = inputTodo.value;
    if (description) {
      todoList.addTask(description);
      inputTodo.value = '';
      todoList.render();
    }
  }
});
todoList.render();
