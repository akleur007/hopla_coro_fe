<template>
  <div id="app">
    <div id="logo">
      <img alt="Vue logo" src="./assets/hopla_kalk_logo_2020.png">
    </div>
    <ViewBons msg="Hallo Resul"/>
  </div>
</template>

<script>
import ViewBons from './views/ViewBons.vue';

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
  text-align: left;
  color: #2c3e50;
  margin-top: 0;
}

#logo {
  text-align: center;
  margin-bottom: 20px;
  height: 209px;
  background-color:#000;
}

.form-control-label {
  text-align: right;
}

  @import 'assets/style.css';
</style>
