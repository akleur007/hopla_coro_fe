<template>
  <div class="container">
      <form class="ng-pristine" @submit="postEntry()">
          <div class="form-group row">
              <div class="col-lg-4 col-sm-12 col-input">
                  <input type="text" id="email-input" v-model="email" class="form-control" placeholder="E-Mail Adresse">
              </div>
              <div class="col-lg-5 col-sm-12 col-input">
                  <input type="text"  id="name-input" v-model="username" class="form-control" placeholder="Name">
              </div>
              <div class="col-lg-4 col-sm-12 col-input">
                  <input type="password"  id="password-input" v-model="password" class="form-control" placeholder="Passwort">
              </div>
              <div class="col-lg-5 col-sm-12 col-input">
                  <select id="role-input" v-model="role" class="form-control">
                    <option selected>Choose...</option>
                    <option v-for="(role) in userRoles" :key="role.id" :value="role.value">{{ role.name }}</option>
                  </select>
              </div>
              <div class="col-lg-3 col-sm-12 text-right">
                  <button type="submit" class="btn btn-primary">Eintragen</button>
              </div>
          </div>
      </form>
      <h2>Angelegte User:</h2>
      <ul id="usersList"  class="list-group-striped">
          <li class="users-list-entry list-group-item" v-for="(entry) in allUsers" :key="entry.id">
            <UserListEntry :entry="entry" @deleteEntry="deleteEntry" @sendEmail="sendEntryEmail"></UserListEntry>
          </li>
      </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UserService from '../services/userService';
import UserListEntry from '../components/UserListEntry.vue';
import showMessage from '../mixins/messages';
import errorHandler from '../mixins/errors';

const label = 'User';

export default {
  name: 'ViewUsers',
  props: {
    msg: String,
  },
  data() {
    return {
      entrys: [],
      errors: [],
      email: '',
      username: '',
      password: '',
      role: 'user',
      userRole: [],
    };
  },
  async created() {
    try {
      await this.fetchUsers();
      this.handleApiError();
    } catch (err) {
      this.handleApiError(err);
    }
  },
  components: {
    UserListEntry,
  },
  methods: {
    ...mapActions('users', ['fetchUsers', 'addUser', 'changeUser', 'removeUser']),
    async postEntry() {
      const params = {
        email: this.email,
        username: this.username,
        role: this.role,
        password: this.password,
      };
      try {
        await this.addUser(params);
        this.showSimpleMessage(`${label} angelegt`, 'success');
        this.fetchUsers();
      } catch (e) {
        this.errors.push(e);
      }
    },
    async deleteEntry(id) {
      try {
        await this.removeUser(id);
        this.fetchUsers();
        this.showSimpleMessage(`${label} gelöscht`, 'success');
      } catch (e) {
        this.errors.push(e);
      }
    },
    async sendEntryEmail(id) {
      try {
        await UserService.sendUserEmail(id);
        this.showSimpleMessage(`Email an ${label} gesendet`, 'success');
      } catch (e) {
        this.errors.push(e);
      }
    },
  },
  computed: mapGetters('users', ['allUsers', 'userRoles']),
  mixins: [showMessage, errorHandler],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  ul {
    padding-left: 0;
  }
  #userList {
    list-style-type: none;
  }
  ul.list-group-striped li:nth-of-type(even) {
    background: #e4e4e4;
  }
</style>
