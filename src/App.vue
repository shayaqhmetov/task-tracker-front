<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
body {
  background-color: #d8d8d8;
  margin: 0px;
}

.container {}

.btn {
  cursor: pointer;
  background-color: black;
  color: white;
  display: inline-block;
  padding: 5px;
  text-align: center;
  font-size: 14px;
  border-radius: 3px;
  border: none;
  transition: background-color 0.2s;
}

.btn:hover {
  color: white;
  background-color: red;
}
</style>
