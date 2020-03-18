<template>
  <div id="app">
    <div id="logo">
      <img alt="Vue logo" src="./assets/hopla_kalk_logo_2020.png">
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/bonlist" class="nav-link">Bon Liste</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
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

.navbar {
  margin-bottom: 20px;
}

.form-control-label {
  text-align: right;
}

  @import 'assets/style.css';
</style>
