class Update {
    updateTaskStatus(todoList, index) {
      todoList.tasks[index].completed = !todoList.tasks[index].completed;
      todoList.saveTasks();
      todoList.render();
    }
  
    clearCompletedTasks(todoList) {
      todoList.tasks = todoList.tasks.filter((task) => !task.completed);
      todoList.updateTaskIndexes();
      todoList.saveTasks();
      todoList.render();
    }
  }

  export default Update;