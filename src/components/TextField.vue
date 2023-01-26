<template>
  <div>
    <input type="text" v-model="name" v-on:keydown.enter="addTask" />
    <button @click="addTask">Создать</button>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import taskStore from "@/stores/tasks";
export default {
  name: "TextField",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    ...mapActions(taskStore, {
      createTask: "create",
    }),
    addTask() {
      this.createTask(this.name);
      this.name = "";
    },
  },
};
</script>
