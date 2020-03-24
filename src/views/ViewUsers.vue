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
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
              </div>
              <div class="col-lg-3 col-sm-12 text-right">
                  <button type="submit" class="btn btn-primary">Eintragen</button>
              </div>
          </div>
      </form>
      <h2>Angelegte User:</h2>
      <ul id="usersList"  class="list-group-striped">
          <li class="users-list-entry list-group-item" v-for="(entry) in entrys" :key="entry.id">
            <UserListEntry :entry="entry" @deleteEntry="deleteEntry" @sendEmail="sendUserEmail"></UserListEntry>
          </li>
      </ul>
  </div>
</template>

<script>
import crypto from 'crypto';
import {
  getUserList,
  createUser,
  deleteUser,
  sendUserEmail,
} from '../services/userService';
import UserListEntry from '../components/UserListEntry.vue';

export default {
  name: 'ViewUserUsers',
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
    };
  },
  created() {
    this.listUsers();
  },
  methods: {
    listUsers() {
      getUserList()
        .then((response) => {
          this.entrys = response.data.data.items;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    postEntry() {
      const params = {
        email: this.email,
        username: this.username,
        role: this.role,
        password: crypto
          .createHash('sha1')
          .update(this.password)
          .digest('base64'),
      };
      createUser(params)
        .then(() => {
          this.listUsers();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    deleteEntry(id) {
      deleteUser(id)
        .then(() => {
          this.listUsers();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    sendUserEmail(id) {
      sendUserEmail(id)
        .then(() => {
          console.log('email sent');
          this.listEntries();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  components: {
    UserListEntry,
  },
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
