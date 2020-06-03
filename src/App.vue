<template>
  <div id="app">
    <div id="logo" class="d-none d-sm-block">
      <img alt="Hopla BG" class="img-fluid filler" src="./assets/hopla_kalk_filler_2020.svg" />
      <img alt="Hopla logo" class="img-fluid" src="./assets/hopla_kalk_logo_2020.svg" />
    </div>
    <b-navbar toggleable="sm" type="dark" variant="success" class="navbar-dark bg-dark">
      <b-navbar-brand href="/"
        ><img
          alt="Vue logo"
          class="img-fluid d-sm-none"
          src="./assets/hopla_kalk_logo_2020.svg"
        /><span class="d-none d-sm-block">Home</span></b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse v-model="showCollapse" id="nav-collapse" is-nav class="navbar-nav">
        <menu-item v-for="(route, i) in mainMenu" :key="i" :route="route"></menu-item>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <form class="form-inline">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              v-model="searchString"
            />
            <!-- <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button> -->
          </form>
          <router-link to="/login" v-if="this.getUser.loggedIn" class="nav-link"
            >Logout</router-link
          >
          <router-link to="/login" v-else class="nav-link">Login</router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view :searchString="searchString" />
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
      showCollapse: false,
      searchString: '',
    };
  },
  watch: {
    $route() {
      this.showCollapse = false;
    },
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
  // color: #2c3e50;
  margin-top: 0;
}

#logo {
  text-align: center;
  margin-bottom: 10px;
  height: 100px;
  background-color: #1e2b37;
  img {
    height: 100px;
  }
}

.navbar {
  margin-bottom: 20px;
  img {
    height: 40px;
  }
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
