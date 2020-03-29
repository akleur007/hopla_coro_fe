<template>
  <div class="container">
    <form class="ng-pristine" @submit="doSplitText()">
          <div class="form-group row justify-content-between">
              <div class="col-lg-12 col-sm-12 col-input">
                  <textarea id="split-text" rows="6" cols="50" v-model="splitText" class="form-control" placeholder="paypal Textblock">
                  </textarea>
              </div>
              <div class="col-lg-2 col-sm-12 col-input text-right">
                  <button id="submit-it" type="submit" class="btn btn-primary">Separieren</button>
              </div>
          </div>
      </form>
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
          <li class="bon-list-entry list-group-item" v-for="(entry) in entrys" :key="entry.id">
            <BonListEntry :entry="entry" @deleteEntry="deleteEntry" @sendEmail="sendEntryEmail"></BonListEntry>
          </li>
      </ul>
  </div>
</template>

<script>
import crypto from 'crypto';
import {
  getBonList,
  createBon,
  deleteBon,
  sendBonEmail,
} from '../services/bonService';
import BonListEntry from '../components/BonListEntry.vue';

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
      entrys: [],
      errors: [],
      name: '',
      email: '',
      credit: '',
      splitText: '',
    };
  },
  created() {
    this.listEntries();
  },
  methods: {
    listEntries() {
      getBonList()
        .then((response) => {
          this.entrys = response.data.data.items;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    postEntry() {
      const label = 'Bon';
      const params = {
        name: this.name,
        email: this.email,
        credit: parseFloat(this.credit, 10),
        authKey: createRandomHash(),
      };
      createBon(params)
        .then(() => {
          this.flashMessage.show({
            title: 'Bon angelegt',
            message: '',
            wrapperClass: 'msg alert-success',
          });
          this.listEntries();
        })
        .catch((e) => {
          const serverError = e.response.data;
          let msg = '';
          switch (serverError.data.code) {
            case 'ER_DUP_ENTRY':
              msg = `${label} schon vergeben!`;
              break;
            default:
              msg = `Fehler beim ${label} Anlegen`;
              break;
          }
          this.errors.push(e);
          this.flashMessage.show({
            title: 'Bon konnte nicht angelegt werden',
            message: `${msg}`,
            wrapperClass: 'msg alert-warning',
          });
        });
    },
    deleteEntry(id) {
      deleteBon(id)
        .then(() => {
          this.listEntries();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    sendEntryEmail(id) {
      sendBonEmail(id)
        .then(() => {
          console.log('email sent fe');
          this.flashMessage.show({
            title: 'Email gesendet',
            message: '',
            wrapperClass: 'msg alert-success',
          });
          this.listEntries();
        })
        .catch((e) => {
          this.errors.push(e);
          this.flashMessage.show({
            title: 'Email konnte nicht gesendet werden',
            message: '',
            wrapperClass: 'msg alert-warning',
          });
        });
    },
    doSplitText() {
      const t = this.splitText;
      const name = t.split(' hat Ihnen ')[0];
      const credit = t.split(' hat Ihnen ')[1].split(' EUR')[0];
      const email = t.split('quote')[1].replace(/\s/g, '');
      this.name = name;
      this.email = email;
      this.credit = parseFloat(credit.replace(',', '.'), 10);
      console.log(name);
      console.log(credit);
      console.log(email);
    },
  },
  components: {
    BonListEntry,
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
</style>
