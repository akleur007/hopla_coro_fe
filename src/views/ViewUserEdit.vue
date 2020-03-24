<template>
<div class="container">
  <div class="row">
    <form class="ng-pristine" @submit="updateEntry()">
        <div class="form-group row">
              <div class="col-lg-4 col-sm-12 col-input">
                  <input type="text" id="email-input" v-model="entry.email" class="form-control" placeholder="E-Mail Adresse">
              </div>
              <div class="col-lg-5 col-sm-12 col-input">
                  <input type="text"  id="name-input" v-model="entry.username" class="form-control" placeholder="Name">
              </div>
              <div class="col-lg-4 col-sm-12 col-input">
                  <input type="password"  id="password-input" v-model="entry.password" class="form-control" placeholder="Passwort">
              </div>
              <div class="col-lg-5 col-sm-12 col-input">
                  <select id="role-input" v-model="entry.role" class="form-control">
                    <option selected>Choose...</option>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
              </div>
              <div class="col-lg-3 col-sm-12">
                  <button type="submit" class="btn btn-primary mr-2">Eintragen</button>
              </div>
          </div>
    </form>
  </div>
</div>
</template>

<script>
import { getUser, updateUser } from '../services/userService';

export default {
  name: 'ViewUserEdit',
  data() {
    return {
      entry: {},
      errors: [],
      email: '',
      username: '',
      password: '',
      role: '',
    };
  },
  computed: {
    itemId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    getUser(this.itemId)
      .then((response) => {
        this.entry = response.data.data.resource;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  methods: {
    updateEntry() {
      const params = {
        id: this.entry.id,
        email: this.entry.email,
        username: this.entry.username,
        role: this.entry.role,
      };
      updateUser(params)
        .then(() => {
          this.$router.push({ path: '/userlist' });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
