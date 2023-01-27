<template>
  <div class="task-tracker">
    <Search @updateName="todoName" :todoName="todoName"></Search>
    <div class="row">
      <div class="col-1"></div>
      <button class="btn col-3" @click="addTask">Создать</button>
      <div class="col-1"></div>
      <button class="btn col-3" @click="filterTasks">Найти</button>
      <div class="col-1"></div>

      <select v-model="sort" class="btn col-3" v-on:change="filterTasks">
        <option value="0">Все</option>
        <option value="1">Выполненные</option>
        <option value="2">Невыполненные</option>
      </select>
    </div>
    <div class="row" v-if="selected.size > 0">
      <button class="btn col-12" @click="deleteSelected">
        Удалить отмеченные
      </button>
    </div>
    <div class="row" v-if="task">
      <Task v-for="currentTask in currentTasks" :key="currentTask.id" :task="currentTask" :parentTask="task"></Task>
    </div>
    <div class="row" v-else>
      <Task v-for="currentTask in currentTasks" :key="currentTask.id" :task="currentTask"></Task>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import taskStore from "@/stores/tasks";

import Search from "@/components/Search.vue";
import Task from "@/components/Task.vue";

export default {
  name: "TaskTracker",
  computed: {
    ...mapState(taskStore, ["tasks"]),
  },
  data() {
    return {
      selected: new Set([]),
      currentTasks: null,
      todoName: "",
      sort: 0,
    };
  },
  beforeMount() {
    if (this.task) {
      this.currentTasks = this.task.subtasks;
    } else {
      this.currentTasks = this.tasks;
    }
  },
  methods: {
    ...mapActions(taskStore, ["bulkDelete", "filterData", "create"]),
    updateValue(value) {
      this.todoName = value;
    },
    addTask() {
      this.create(this.todoName, this.task);
      this.todoName = "";
      this.filterTasks();
    },
    select(id) {
      this.selected.add(id);
    },
    deselect(id) {
      this.selected.delete(id);
    },
    deleteSelected() {
      this.bulkDelete(this.selected, this.task);
    },
    filterTasks() {
      let tasks;
      if (this.task) {
        tasks = this.task.subtasks;
      } else {
        tasks = this.tasks;
      }
      this.currentTasks = tasks.filter((task) => {
        return task.todo.includes(this.todoName);
      });
      if (this.sort > 0) {
        this.currentTasks = this.currentTasks.filter((task) => {
          return this.sort == 1
            ? task.completed == true
            : task.completed == false;
        });
      }
      console.log("filterd:", this.currentTasks);
    },
  },
  components: {
    Search,
    Task,
  },
  props: ["task"],
};
</script>
<style lang="scss" scoped>
.task-tracker {
  padding: 20px;
  background-color: white;

  .btn {
    margin-top: 10px;
  }
}
</style>
