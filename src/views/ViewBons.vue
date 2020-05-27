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
    <div v-if="addNewBon" class="mb-4">
      <form class="ng-pristine" @submit="postEntry()">
        <div class="form-group row justify-content-between">
          <div class="col-lg-4 col-sm-12 col-input">
            <input
              type="text"
              id="name-input"
              v-model="name"
              class="form-control"
              placeholder="Name"
            />
          </div>
          <div class="col-lg-4 col-sm-12 col-input">
            <input
              type="text"
              id="email-input"
              v-model="email"
              class="form-control"
              placeholder="E-Mail Adresse"
            />
          </div>
          <div class="col-lg-2 col-sm-12 col-input">
            <input
              type="number"
              step="0.01"
              id="credit-input"
              v-model="credit"
              class="form-control"
              placeholder="Betrag in €"
            />
          </div>
          <div class="col-lg-2 text-lg-right col-6 col-input">
            <button class="btn btn-secondary" v-on:click="toggleNewForm()">
              Abbrechen
            </button>
          </div>
          <div class="col-lg-2 col-6 text-right col-input offset-lg-10">
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
          v-if="!addNewEmail && !addNewBon"
          v-on:click="toggleNewEmail()"
        >
          <b-icon-envelope class="mr-2"></b-icon-envelope>
          <b-icon-pencil></b-icon-pencil>
        </button>
      </div>
      <div class="text-right col-6">
        <button
          class="btn btn-primary"
          v-if="!addNewBon && !addNewEmail"
          v-on:click="toggleNewForm()"
        >
          <b-icon-plus-square class="mr-2"></b-icon-plus-square>
          <b-icon-credit-card></b-icon-credit-card>
        </button>
      </div>
    </div>
    <h2>Angelegte Bons:</h2>
    <ul id="bonList" class="list-group-striped">
      <li class="bon-list-entry list-group-item" v-for="bon in allBons" :key="bon.id">
        <BonListEntry
          :bon="bon"
          @addDeleteRequest="addDeleteRequest"
          @sendEmail="sendEntryEmail"
        ></BonListEntry>
      </li>
    </ul>
    <div>
      <b-modal id="delete-request" @ok="deleteEntry" @hidden="deleteId = ''">
        <h2>Bon löschen?</h2>
      </b-modal>
    </div>
  </div>
</template>

<script>
import crypto from 'crypto';
import { mapGetters, mapActions } from 'vuex';
import { BIconEnvelope, BIconPlusSquare, BIconPencil, BIconCreditCard } from 'bootstrap-vue';
import BonService from '../services/bonService';
import BonListEntry from '../components/BonListEntry.vue';
import TextEditor from '../components/TextEditor.vue';
import showMessage from '../mixins/messages';
import errorHandler from '../mixins/errors';

const createRandomHash = () => {
  const currentDate = new Date().valueOf().toString();
  const random = Math.random().toString();
  const hash = crypto
    .createHash('sha1')
    .update(currentDate + random)
    .digest('hex');
  return hash;
};

export default {
  name: 'ViewBons',
  components: {
    BonListEntry,
    TextEditor,
    BIconEnvelope,
    BIconPlusSquare,
    BIconPencil,
    BIconCreditCard,
  },
  mixins: [showMessage, errorHandler],
  props: {},
  data() {
    return {
      bons: [],
      errors: [],
      name: '',
      email: '',
      credit: '',
      addNewBon: false,
      addNewEmail: false,
      deleteId: '',
      emailContent: {
        subject: '',
        text: '',
        attachment: 'bon',
      },
    };
  },
  async created() {
    try {
      await this.fetchBons();
      this.handleApiError();
    } catch (err) {
      this.handleApiError(err);
    }
    this.deselectAllBons();
  },
  methods: {
    ...mapActions(['fetchBons', 'addBon', 'changeBon', 'removeBon', 'deselectAllBons']),
    async postEntry() {
      const params = {
        name: this.name,
        email: this.email,
        credit: parseFloat(this.credit, 10),
        authKey: createRandomHash(),
      };
      try {
        await this.addBon(params);
        this.toggleNewForm();
        this.showSimpleMessage('Bon angelegt', 'success');
        this.fetchBons();
      } catch (err) {
        this.errors.push(err);
        this.showSimpleMessage(err.response.data.message, 'warning');
      }
    },
    addDeleteRequest(id) {
      this.deleteId = id;
      this.$bvModal.show('delete-request');
    },
    async deleteEntry() {
      try {
        await this.removeBon(this.deleteId);
        this.deleteId = '';
        this.fetchBons();
        this.showSimpleMessage('Bon gelöscht', 'success');
      } catch (err) {
        this.errors.push(err);
        this.showSimpleMessage(err.response.data.message, 'warning');
      }
    },
    async sendEntryEmail(id) {
      try {
        await BonService.sendBonMail(id);
        this.showSimpleMessage('Email gesendet', 'success');
      } catch (e) {
        this.errors.push(e);
        this.showSimpleMessage('Email konnte nicht gesendet werden', 'warning');
      }
    },
    async sendMailBatch() {
      const params = {
        content: this.emailContent,
        ids: this.selectedBons,
      };
      try {
        await BonService.sendMailBatch(params);
        this.showSimpleMessage('Emails gesendet', 'success');
      } catch (e) {
        this.errors.push(e);
        this.showSimpleMessage('Emails konnte nicht gesendet werden', 'warning');
      }
    },
    toggleNewForm() {
      this.addNewBon = !this.addNewBon;
    },
    toggleNewEmail() {
      this.addNewEmail = !this.addNewEmail;
    },
    getEditorHtml(html) {
      this.emailContent.text = html;
    },
  },
  computed: {
    ...mapGetters(['allBons', 'selectedBons']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  padding-left: 0;
}
#bonList {
  list-style-type: none;
}
ul.list-group-striped li:nth-of-type(even) {
  background: #e4e4e4;
}

#subject {
  margin-bottom: 20px;
}
</style>
