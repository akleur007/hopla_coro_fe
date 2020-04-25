<template>
  <div class="container">
      <form class="ng-pristine" @submit="login()">
          <div class="form-group row">
              <label class="col-lg-2 col-sm-12 col-form-label form-control-label">Name</label>
              <div class="col-lg-3 col-sm-12">
                  <input type="test" id="email-input" class="form-control" v-model="user.username" placeholder="Name">
              </div>
          </div>
          <div class="form-group row">
              <label class="col-lg-2 col-sm-12 col-form-label form-control-label">Passwort</label>
              <div class="col-lg-3 col-sm-12">
                  <input type="password" id="credit-input" class="form-control" v-model="user.password" placeholder="Passwort">
              </div>
              <div class="col-lg-5 col-sm-12">
                  <button type="submit" class="btn btn-primary mr-2">Einloggen</button>
              </div>
          </div>
      </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import showMessage from '../mixins/messages';

export default {
  name: 'ViewLogin',
  props: {
  },
  data() {
    return {
      user: {},
      errors: [],
    };
  },
  created() {
    this.logout();
  },
  components: {
  },
  computed: mapGetters('users', ['getUser']),
  methods: {
    ...mapActions('users', ['loginUser', 'logoutUser', 'setMainMenu']),
    async login() {
      const params = {
        username: this.user.username,
        password: this.user.password,
      };
      try {
        await this.loginUser(params);
        this.setMainMenu();
        this.showSimpleMessage(`Hallo ${this.getUser.username}`, 'success');
      } catch (e) {
        this.errors.push(e);
        console.log(`Err: ${e}`);
        this.showSimpleMessage('Name oder Passwort falsch', 'warning');
      }
    },
    async logout() {
      if (this.getUser.loggedIn) {
        this.showSimpleMessage('Tschö', 'warning');
      }
      await this.logoutUser();
      this.setMainMenu();
    },
  },
  mixins: [showMessage],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
