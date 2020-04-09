<template>
  <div class="container">
      <form class="ng-pristine" @submit="loginUser()">
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
import showMessage from '../mixins/messages';
import UserService from '../services/userService';
import TokenService from '../services/tokenService';

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
  components: {
  },
  methods: {
    async loginUser() {
      const params = {
        username: this.user.username,
        password: this.user.password,
      };
      try {
        const res = await UserService.authUser(params);
        localStorage.setItem('user', res.data.data.user);
        TokenService.saveToken(res.data.data.token);
        this.showSimpleMessage(`Hallo ${res.data.data.user.username}`, 'success');
        this.$router.push({ path: '/userlist' });
      } catch (e) {
        this.errors.push(e);
        this.showSimpleMessage('Name oder Passwort falsch', 'warning');
      }
    },
  },
  mixins: [showMessage],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
