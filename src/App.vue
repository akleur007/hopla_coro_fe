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
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/bonlist" class="nav-link">Bons</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/userlist" class="nav-link">Users</router-link>
          </li>
        </ul>
        <!-- <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
        </form> -->
      </div>
    </nav>
    <router-view />
    <FlashMessage role="alert"></FlashMessage>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
    };
  },
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
  margin-bottom: 10px;
  height: 200px;
  background-color:#1e2b37;
}

.navbar {
  margin-bottom: 20px;
}

.col-input {
   margin-bottom: 15px;
}

// [class*="col-"] {
//   margin-bottom: 15px;
// }

  @import 'assets/style.css';
</style>
