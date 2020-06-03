<template>
  <div class="container">
    <div v-if="addNewEmail" class="mb-4">
      <label for="subject">Betreff</label>
      <b-input type="text" name="subject" id="subject" v-model="emailContent.subject"></b-input>
      <text-editor @getHtml="getEditorHtml"></text-editor>
      <button class="btn btn-secondary" v-on:click="toggleNewEmail()">
        Abbrechen
      </button>
      <button class="btn btn-primary float-right text-right mr-2" v-on:click="sendMailBatch()">
        Senden
      </button>
    </div>
    <div v-if="addNewUser" class="mb-4">
      <form class="ng-pristine" @submit="postEntry()">
        <div class="form-group row">
          <div class="col-lg-4 col-sm-12 col-input">
            <input
              type="text"
              id="email-input"
              v-model="email"
              class="form-control"
              placeholder="E-Mail Adresse"
            />
          </div>
          <div class="col-lg-5 col-sm-12 col-input">
            <input
              type="text"
              id="name-input"
              v-model="username"
              class="form-control"
              placeholder="Name"
            />
          </div>
          <div class="col-lg-4 col-sm-12 col-input">
            <input
              type="password"
              id="password-input"
              v-model="password"
              class="form-control"
              placeholder="Passwort"
            />
          </div>
          <div class="col-lg-5 col-sm-12 col-input">
            <select id="role-input" v-model="role" class="form-control">
              <option selected>Choose...</option>
              <option v-for="role in userRoles" :key="role.id" :value="role.value">{{
                role.name
              }}</option>
            </select>
          </div>
          <div class="col-lg-2 col-sm-6 col-input">
            <button class="btn btn-secondary" v-on:click="toggleNewForm()">
              Abbrechen
            </button>
          </div>
          <div class="col-lg-2 col-sm-6 col-input text-right">
            <button id="submit-it" type="submit" class="btn btn-primary">
              Eintragen
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="row mb-5">
      <div class="col-6">
        <button
          class="btn btn-primary"
          v-if="!addNewEmail && !addNewUser"
          v-on:click="toggleNewEmail()"
        >
          <b-icon-envelope class="mr-2"></b-icon-envelope>
          <b-icon-pencil></b-icon-pencil>
        </button>
      </div>
      <div class="text-right col-6">
        <button
          class="btn btn-primary"
          v-if="!addNewUser && !addNewEmail"
          v-on:click="toggleNewForm()"
        >
          <b-icon-plus-square class="mr-2"></b-icon-plus-square>
          <b-icon-credit-card></b-icon-credit-card>
        </button>
      </div>
    </div>
    <ul id="usersList" class="list-group-striped">
      <li class="users-list-entry list-group-item" v-for="entry in filteredUsers" :key="entry.id">
        <UserListEntry
          :entry="entry"
          @addDeleteRequest="addDeleteRequest"
          @sendEmail="sendEntryEmail"
        ></UserListEntry>
      </li>
    </ul>
    <div>
      <b-modal id="delete-request" @ok="deleteEntry" @hidden="deleteId = ''">
        <h2>User löschen?</h2>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { BIconEnvelope, BIconPlusSquare, BIconPencil, BIconCreditCard } from 'bootstrap-vue';
import UserService from '../services/userService';
import UserListEntry from '../components/UserListEntry.vue';
import TextEditor from '../components/TextEditor.vue';
import showMessage from '../mixins/messages';
import errorHandler from '../mixins/errors';

const label = 'User';

export default {
  name: 'ViewUsers',
  components: {
    UserListEntry,
    TextEditor,
    BIconEnvelope,
    BIconPlusSquare,
    BIconPencil,
    BIconCreditCard,
  },
  props: {
    searchString: String,
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
      addNewUser: false,
      addNewEmail: false,
      deleteId: '',
      emailContent: {
        subject: '',
        text: '',
        attachment: '',
      },
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
        this.toggleNewForm();
        this.showSimpleMessage(`${label} angelegt`, 'success');
        this.fetchUsers();
      } catch (e) {
        this.errors.push(e);
      }
    },
    addDeleteRequest(id) {
      this.deleteId = id;
      this.$bvModal.show('delete-request');
    },
    async deleteEntry() {
      try {
        await this.removeUser(this.deleteId);
        this.deleteId = '';
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
    toggleNewForm() {
      this.addNewUser = !this.addNewUser;
    },
    toggleNewEmail() {
      this.addNewEmail = !this.addNewEmail;
    },
    getEditorHtml(html) {
      this.emailContent.text = html;
    },
    async sendMailBatch() {
      const params = {
        content: this.emailContent,
        ids: this.selectedUsers,
      };
      if (this.selectedUsers.length) {
        try {
          await UserService.sendMailBatch(params);
          this.showSimpleMessage('Emails gesendet', 'success');
        } catch (e) {
          this.errors.push(e);
          this.showSimpleMessage('Emails konnte nicht gesendet werden', 'warning');
        }
      } else {
        this.showSimpleMessage('Bitte erst User auswählen', 'warning');
      }
    },
  },
  computed: {
    ...mapGetters('users', ['allUsers', 'userRoles', 'selectedUsers']),
    filteredUsers() {
      return this.allUsers.filter((user) => {
        const nameFit = user.username.toLowerCase().match(this.searchString.toLowerCase());
        const emailFit = user.email.toLowerCase().match(this.searchString.toLowerCase());
        const roleFit = user.role.toLowerCase().match(this.searchString.toLowerCase());
        if (nameFit || emailFit || roleFit) {
          return true;
        }
        return false;
      });
    },
  },
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
</style>
