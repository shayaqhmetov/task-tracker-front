<template>
  <div class="task row" :class="{ done: task.completed }">
    <div class="task-check col-1">
      <input type="checkbox" v-model="isChecked" v-on:change="choose" />
    </div>
    <div class="task-todo col-10">
      <h4>{{ task.todo }}</h4>
    </div>

    <div class="task-actions col-1">
      <div v-if="isEditable">
        <input type="text" v-model="newTodo" @keydown.enter="saveTask" />
        <button @click="saveTask" class="btn">Сохранить</button>
        <button @click="closeEdit" class="btn">Закрыть</button>
      </div>
      <div v-else>
        <button @click="done" class="btn">
          <span v-if="!task.completed">Готово</span>
          <span v-else>Не готово</span>
        </button>
        <button @click="editTask" class="btn">Изменить</button>
        <button @click="deleteTask" class="btn">Удалить</button>
        <router-link v-if="!parentTask" class="btn"
          :to="{ params: { id: task.id }, name: 'task' }">Подробнее</router-link>
      </div>
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
      this.update(this.task, this.newTodo, this.task.completed);
      this.$parent.filterTasks();
    },
    deleteTask() {
      this.delete(this.task, this.parentTask);
      this.$parent.filterTasks();
    },
    done() {
      this.update(this.task, this.task.todo, !this.task.completed);
    },
    choose() {
      if (this.isChecked) {
        this.$parent.select(this.task.id);
      } else {
        this.$parent.deselect(this.task.id);
      }
    },
  },
  props: ["task", "parentTask"],
};
</script>
<style lang="scss" scoped>
.task {
  text-align: left;
  border: 1px solid black;
  padding: 20px;
  margin-top: 10px;

  h4 {
    margin: 10px 0px;
  }

  &.done {
    background-color: #71b871;
  }

  .task-check,
  .task-todo,
  .task-actions {
    height: 100%;
  }

  .task-check {
    display: inline-block;
  }

  .task-todo {}

  .task-actions {
    text-align: right;
  }

  .btn:not(:first-child) {
    margin-top: 10px !important;
  }

  .btn {
    width: 100%;
  }
}
</style>
