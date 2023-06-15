import ToDoList from '../src/module/todo.js';
import 'jsdom-global/register';
import localStorageMock from 'jest-localstorage-mock';

describe('ToDoList', () => {
  let todoList;

  beforeEach(() => {
    localStorage.clear();
    todoList = new ToDoList();
  });

  describe('addTask', () => {
    test('should add a new task to the task list', () => {
      const initialTasksCount = todoList.tasks.length;
      const newTaskDescription = 'New Task';

      todoList.addTask(newTaskDescription);

      expect(todoList.tasks.length).toBe(initialTasksCount + 1);
      expect(todoList.tasks[initialTasksCount].description).toBe(newTaskDescription);
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
});