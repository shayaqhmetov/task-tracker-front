import { defineStore } from "pinia";

export default defineStore("task", {
  state: () => ({
    tasks: [
      {
        id: 1,
        todo: "Do something nice for someone I care about",
        completed: true,
        userId: 26,
        subtasks: [],
      },
    ],
  }),
  actions: {
    create(todo, task) {
      console.log(this.tasks);
      if (task) {
        const id = `sutask-${task.subtasks.length + 1}`;
        task.subtasks.push({
          id,
          todo,
          completed: false,
        });
      } else {
        const id = this.tasks.length + 1;
        this.tasks.push({
          id,
          todo,
          completed: false,
          subtasks: [],
        });
      }
    },
    update(task, todo, completed) {
      task.todo = todo;
      task.completed = completed;
    },
    delete(currentTask, parentTask) {
      if (parentTask) {
        parentTask.subtasks = parentTask.subtasks.filter(
          (task) => currentTask.id != task.id
        );
      } else {
        this.tasks = this.tasks.filter((task) => task.id != currentTask.id);
      }
    },
    bulkDelete(ids, task) {
      if (task) {
        task.subtasks = task.subtasks.filter((subtask) => !ids.has(subtask.id));
      } else {
        this.tasks = this.tasks.filter((task) => !ids.has(task.id));
      }
    },
    getTask(id) {
      const target = this.tasks.find((task) => task.id == id);
      return target;
    },
  },
});
