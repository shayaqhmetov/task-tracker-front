<template>
  <div class="task-tracker">
    <TextField></TextField>

    <button v-if="this.selected.size > 0" @click="deleteSelected">
      Удалить выбранные
    </button>
    <Task v-for="task in tasks" :key="task.id" :task="task"></Task>
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import taskStore from "@/stores/tasks";

import TextField from "@/components/TextField.vue";
import Task from "@/components/Task.vue";
export default {
  name: "TaskTracker",
  computed: {
    ...mapState(taskStore, ["tasks"]),
  },
  data() {
    return {
      selected: new Set([]),
    };
  },
  methods: {
    ...mapActions(taskStore, ["bulkDelete"]),
    select(id) {
      console.log(id);
      this.selected.add(id);
    },
    deselect(id) {
      this.selected.delete(id);
    },
    deleteSelected() {
      this.bulkDelete(this.selected);
    },
  },
  components: {
    TextField,
    Task,
  },
};
</script>
<style>
.task-tracker {
  background: white;
  padding: 20px;
}
</style>
