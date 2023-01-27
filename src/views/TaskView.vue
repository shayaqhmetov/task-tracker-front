<template>
  <div class="task-details" v-if="task">
    <span class="breadcrumps">
      <router-link to="/">Задачи</router-link><span>/{{ this.$route.params.id }}</span>
    </span>
    <h1>{{ task.todo }}</h1>
    <h2>
      Статус: <span v-if="task.completed">Готово</span><span v-else>Не готово</span>
    </h2>
    <h2>Подзадачи:</h2>
    <TaskTracker :task="task"></TaskTracker>
    <!-- <div class="row" v-if="task.subtasks.length">
      <h3>Подзадачи:</h3>
      <Task v-for="task in tasks" :key="task.subtasks" :task="task"></Task>
    </div>
    <h2 v-else>Подзадачь не найденно</h2> -->
  </div>
</template>
<script>
import { mapActions } from "pinia";
import tasksStore from "@/stores/tasks";

import TaskTracker from "../components/TaskTracker.vue";

export default {
  name: "TaskView",
  data() {
    return {
      task: null,
    };
  },
  components: {
    TaskTracker,
  },
  methods: {
    ...mapActions(tasksStore, ["getTask"]),
  },
  mounted() {
    this.task = this.getTask(this.$route.params.id);
  },
};
</script>

<style lang="scss">
.task-details {
  background-color: white;
  padding: 20px;
}
</style>
