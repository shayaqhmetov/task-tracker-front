<template>
  <router-link to="/">Назад</router-link>
  <div v-if="task">
    <h1>{{ task.todo }}</h1>
    <h1>{{ task.completed }}</h1>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import tasksStore from "@/stores/tasks";

export default {
  name: "TaskView",
  data() {
    return {
      task: null,
    };
  },
  components: {},
  methods: {
    ...mapActions(tasksStore, ["getTask"]),
  },
  mounted() {
    this.task = this.getTask(this.$route.params.id);
  },
};
</script>
