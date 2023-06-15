/* eslint import/extensions: "off" */
import localStorageMock from 'jest-localstorage-mock';
import ToDoList from './module/todo.js';
import 'jsdom-global/register';

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

  describe('deleteTask', () => {
    test('should delete a task from the task list', () => {
      todoList.tasks = [
        { index: 1, description: 'Task 1' },
        { index: 2, description: 'Task 2' },
        { index: 3, description: 'Task 3' },
      ];
      const initialTasksCount = todoList.tasks.length;
      const taskIndex = 1;
      todoList.deleteTask(taskIndex);
      expect(todoList.tasks.length).toBe(initialTasksCount - 1);
      expect(todoList.tasks.findIndex((task) => task.index === taskIndex - 1)).toBe(-1);
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
  describe('editTask', () => {
    test('should update the description of a task', () => {
      // Add a task to the list
      todoList.addTask('Task 1');
      const taskIndex = 0;
      const newDescription = 'Updated Task 1';

      todoList.editTask(taskIndex, newDescription);

      expect(todoList.tasks[taskIndex].description).toBe(newDescription);
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
  describe('updateTaskStatus', () => {
    test('should update the "completed" status of a task', () => {
      // Mock the render method
      todoList.render = jest.fn();

      // Add a task to the list
      todoList.addTask('Task 1');
      const taskIndex = 0;

      // Update the task status
      todoList.updateTaskStatus(taskIndex, true);

      // Expectations...
      expect(todoList.tasks[taskIndex].completed).toBe(true);
      
    });

    describe('updateTaskStatus', () => {
      test('should update the "completed" status of a task', () => {
        // Mock the render method
        todoList.render = jest.fn();
    
        // Add a task to the list
        todoList.addTask('Task 1');
        const taskIndex = 0;
    
        // Set the initial completed status to true
        todoList.tasks[taskIndex].completed = true;
    
        // Update the task status
        todoList.updateTaskStatus(taskIndex, false); // Set it to false
    
        // Expectations
        expect(todoList.tasks[taskIndex].completed).toBe(false); // Check that the status is false
        expect(todoList.render).toHaveBeenCalled();
      });
    });
  });

  
});
