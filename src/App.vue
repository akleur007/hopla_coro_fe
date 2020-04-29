<template>
  <div id="app">
    <div id="logo">
      <img alt="Vue logo"  class="img-fluid" src="./assets/hopla_kalk_logo_2020.png">
    </div>
    <b-navbar toggleable="sm" type="dark" variant="success" class="navbar-dark bg-dark">
      <b-container>
        <b-navbar-brand href="/">Home</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav class="navbar-nav">
          <menu-item v-for="(route, i) in mainMenu" :key="i" :route="route"></menu-item>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
            </form> -->
            <router-link to="/login" v-if="this.getUser.loggedIn" class="nav-link">Logout</router-link>
            <router-link to="/login" v-else class="nav-link">Login</router-link>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
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
    ...mapGetters('users', ['getUser', 'mainMenu']),
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

.navbar-collapse {
  align-items: start;
}

.list-group-item {
  padding: 5px;
}

.col-input {
   margin-bottom: 15px;
}

// [class*="col-"] {
//   margin-bottom: 15px;
// }

  @import 'assets/style.css';
</style>
