<template>
  <div id="app">
    <div id="logo">
      <img alt="Vue logo"  class="img-fluid" src="./assets/hopla_kalk_logo_2020.png">
    </div>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mrl-auto">
          <menu-item v-for="(route, i) in mainMenu" :key="i" :route="route"></menu-item>
        </ul>
        <!-- <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
        </form> -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/login" v-if="this.getUser.loggedIn" class="nav-link">Logout</router-link>
            <router-link to="/login" v-else class="nav-link">Login</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
    <FlashMessage role="alert"></FlashMessage>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MenuItem from './components/MenuItem.vue';
import errorHandler from './mixins/errors';
import ApiService from './services/apiService';

export default {
  name: 'App',
  data() {
    return {
    };
  },
  async mounted() {
    try {
      await ApiService.setHeader();
      await this.getUserRoles();
      await this.setMainMenu();
      this.handleApiError();
    } catch (err) {
      this.handleApiError(err);
    }
  },
  methods: {
    ...mapActions('users', ['setMainMenu', 'getUserRoles']),
  },
  computed: {
    ...mapGetters('users', ['loggedIn', 'getUser', 'userRoles', 'mainMenu']),
  },
  components: {
    MenuItem,
  },
  mixins: [errorHandler],
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
