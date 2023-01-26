import { defineStore } from "pinia";

export default defineStore("task", {
  state: () => ({
    tasks: [
      {
        id: 1,
        todo: "Do something nice for someone I care about",
        completed: true,
        userId: 26,
      },
    ],
  }),
  actions: {
    create(todo) {
      const id = this.tasks.length + 1;
      this.tasks.push({ id, todo });
    },
    update(id, todo, completed) {
      const target = this.tasks.find((task) => task.id == id);
      console.log(target);
      target.todo = todo;
      target.completed = completed;
    },
    delete(id) {
      this.tasks = this.tasks.filter((task) => task.id != id);
    },
    bulkDelete(ids) {
      this.tasks = this.tasks.filter((task) => !ids.has(task.id));
    },
    getTask(id) {
      console.log(id);
      this.tasks.map((task) => console.log(task));
      const target = this.tasks.find((task) => task.id == id);
      return target;
    },
  },
});
