<template>
<div class="container">
  <div class="row">
    <form class="ng-pristine" @submit="updateEntry()">
      <div class="form-group row">
        <div class="col-lg-5 col-sm-12">
          <div class="row">
            <div class="col-lg-12 col-input">
              <input type="text" id="email-input" v-model="activeUser.email" class="form-control" placeholder="E-Mail Adresse">
            </div>
            <div class="col-lg-12 col-input">
              <input type="password"  id="password-input" v-model="activeUser.password" class="form-control" placeholder="Passwort">
            </div>
          </div>
        </div>
        <div class="col-lg-5 col-sm-12 col-input">
          <div class="row">
            <div class="col-lg-12 col-input">
              <input type="text"  id="name-input" v-model="activeUser.username" class="form-control" placeholder="Name">
            </div>
            <div class="col-lg-12">
              <select id="role-input col-input" v-model="activeUser.role" class="form-control">
                  <option selected>Choose...</option>
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
            </div>
          </div>
        </div>
        <div class="col-lg-2 col-sm-12 col-input">
          <div class="row">
            <div class="col-lg-12 col-6 col-input">
              <button class="btn btn-info float-lg-right float-md-left float-left">
                <router-link :to="`/userlist`">
                  Abbrechen
                </router-link>
              </button>
            </div>
            <div class="col-lg-12 col-6 col-input">
              <button type="submit" class="btn btn-primary float-right">Eintragen</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import showMessage from '../mixins/messages';

const label = 'User';

export default {
  name: 'ViewUserEdit',
  data() {
    return {
      entry: {},
      errors: [],
    };
  },
  computed: {
    itemId() {
      return this.$route.params.id;
    },
    activeUser: {
      get() {
        return this.$store.state.users.activeUser;
      },
      set(params) {
        this.$store.commit('updateUser', params);
      },
    },
  },
  mounted() {
    this.fetchUser(this.itemId);
  },
  methods: {
    ...mapActions(['fetchUser', 'updateUser']),
    async updateEntry() {
      try {
        await this.updateUser(this.activeUser);
        // await this.activeUser.set(this.activeUser);
        // this.$router.push({ path: '/userlist' });
        this.showSimpleMessage(`${label} geändert`, 'success');
      } catch (e) {
        console.log(`E: ${e}`);
        this.errors.push(e);
        this.showSimpleMessage(`${label} konnte nicht geändert werden`, 'warning');
      }
    },
  },
  mixins: [showMessage],
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
