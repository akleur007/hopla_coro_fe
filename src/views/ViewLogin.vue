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
    loginUser() {
      const params = {
        username: this.user.username,
        password: this.user.password,
      };
      UserService.authUser(params)
        .then((res) => {
          localStorage.setItem('user', res.data.data.user);
          TokenService.saveToken(res.data.data.token);
          this.flashMessage.show({
            title: `Hallo ${this.user.username}`,
            message: '',
            wrapperClass: 'msg alert-success',
          });
        })
        .catch((e) => {
          this.errors.push(e);
          this.flashMessage.show({
            title: 'Name oder Passwort falsch',
            message: e,
            wrapperClass: 'msg alert-warning',
          });
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
