<template>
  <div class="row">
    <div class="col-12">
      <input class="text-field" type="text" v-bind:value="todoName" v-on:keyup="updateValue($event.target.value)" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {};
  },
  methods: {
    updateValue: function (value) {
      this.$parent.updateValue(value);
    },
  },
  props: ["todoName"],
};
</script>

<style lang="scss" scoped>
.text-field {
  width: 100%;

  .btn {
    display: inline-block;
  }

  /* For mobile phones: */
  [class*="col-"] {
    border: 1px solid red;
  }
}
</style>
