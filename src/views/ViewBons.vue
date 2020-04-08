<template>
  <div class="container">
      <form class="ng-pristine" @submit="postEntry()">
          <div class="form-group row justify-content-between">
              <div class="col-lg-4 col-sm-12 col-input">
                  <input type="text" id="name-input" v-model="name" class="form-control" placeholder="Name">
              </div>
              <div class="col-lg-4 col-sm-12 col-input">
                  <input type="text" id="email-input" v-model="email" class="form-control" placeholder="E-Mail Adresse">
              </div>
              <div class="col-lg-2 col-sm-12 col-input">
                  <input type="number" step="0.01" id="credit-input" v-model="credit" class="form-control" placeholder="Betrag in €">
              </div>
              <div class="col-lg-2 col-sm-12 col-input text-right">
                  <button id="submit-it" type="submit" class="btn btn-primary">Eintragen</button>
              </div>
          </div>
      </form>
      <h2>Angelegte Bons:</h2>
      <ul id="bonList"  class="list-group-striped">
          <li class="bon-list-entry list-group-item" v-for="(bon) in allBons" :key="bon.id">
            <BonListEntry :bon="bon" @deleteEntry="deleteEntry" @sendEmail="sendEntryEmail"></BonListEntry>
          </li>
      </ul>
  </div>
</template>

<script>
import crypto from 'crypto';
import { mapGetters, mapActions } from 'vuex';
import BonService from '../services/bonService';
import BonListEntry from '../components/BonListEntry.vue';
import showMessage from '../mixins/messages';

const createRandomHash = () => {
  const currentDate = (new Date()).valueOf().toString();
  const random = Math.random().toString();
  const hash = crypto.createHash('sha1').update(currentDate + random).digest('hex');
  return hash;
};

export default {
  name: 'ViewBons',
  props: {
    msg: String,
  },
  data() {
    return {
      bons: [],
      errors: [],
      name: '',
      email: '',
      credit: '',
    };
  },
  created() {
    this.fetchBons();
  },
  components: {
    BonListEntry,
  },
  methods: {
    ...mapActions(['fetchBons', 'addBon', 'changeBon', 'removeBon']),
    async postEntry() {
      const label = 'Bon';
      const params = {
        name: this.name,
        email: this.email,
        credit: parseFloat(this.credit, 10),
        authKey: createRandomHash(),
      };
      try {
        await this.addBon(params);
        this.showSimpleMessage('Bon angelegt', 'success');
        this.fetchBons();
      } catch (e) {
        this.errors.push(e);
        const serverError = e.response.data;
        const msg = (serverError.data.code === 'ER_DUP_ENTRY') ? `${label} schon vergeben!` : `Fehler beim ${label} anlegen`;
        this.showSimpleMessage(msg, 'warning');
      }
    },
    async deleteEntry(id) {
      try {
        await this.removeBon(id);
        this.fetchBons();
        this.showSimpleMessage('Bon gelöscht', 'success');
      } catch (e) {
        this.errors.push(e);
        this.showSimpleMessage('Bon konnte nicht gelöscht werden', 'warning');
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
  },
  computed: mapGetters(['allBons']),
  mixins: [showMessage],
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
</style>
