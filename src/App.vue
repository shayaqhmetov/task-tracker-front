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

.container {
  border: 1px solid red;
}
</style>
