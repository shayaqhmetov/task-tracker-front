<template>
  <div class="task" :class="{ done: task.completed }">
    <input type="checkbox" v-model="isChecked" v-on:change="choose" />
    <h4>{{ task.todo }}</h4>
    <div v-if="isEditable">
      <input type="text" v-model="newTodo" @keydown.enter="saveTask" />
      <button @click="saveTask">Сохранить</button>
      <button @click="closeEdit">Закрыть</button>
    </div>
    <div v-else>
      <button @click="editTask">Изменить</button>
      <button @click="deleteTask">Удалить</button>
      <button @click="done">
        <span v-if="!task.completed">Готово</span>
        <span v-else>Не готово</span>
      </button>
      <router-link :to="{ params: { id: task.id }, name: 'task' }">Подробнее</router-link>
    </div>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import taskStore from "@/stores/tasks";

export default {
  name: "Task",
  data() {
    return {
      isEditable: false,
      newTodo: "",
      isChecked: false,
    };
  },
  methods: {
    ...mapActions(taskStore, ["update", "delete"]),
    editTask() {
      this.isEditable = true;
      this.newTodo = this.task.todo;
    },
    closeEdit() {
      this.isEditable = false;
    },
    saveTask() {
      this.update(this.task.id, this.newTodo, this.task.completed);
    },
    deleteTask() {
      this.delete(this.task.id);
    },
    done() {
      this.update(this.task.id, this.task.todo, !this.task.completed);
    },
    choose() {
      console.log(this.isChecked);
      if (this.isChecked) {
        this.$parent.select(this.task.id);
      } else {
        this.$parent.deselect(this.task.id);
      }
    },
  },
  props: ["task"],
};
</script>
<style lang="scss">
.task {
  border: 1px solid black;
  padding: 20px;
  margin-top: 10px;

  h4 {
    margin: 10px 0px;
  }

  &.done {
    background-color: green;
  }
}
</style>
