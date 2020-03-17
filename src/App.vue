<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ViewBons msg="Hallo Resul"/>
  </div>
</template>

<script>
import ViewBons from './components/ViewBons.vue';

export default {
  name: 'App',
  components: {
    ViewBons,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  @import 'assets/style.css';
</style>
