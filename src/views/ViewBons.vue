<template>
  <div class="container">
      <form class="ng-pristine" @submit="postEntry()">
          <div class="form-group row">
              <label class="col-lg-2 col-sm-12 col-form-label form-control-label">E-Mail Adresse</label>
              <div class="col-lg-3 col-sm-12">
                  <input type="text" id="email-input" v-model="email" class="form-control" placeholder="E-Mail Adresse">
              </div>
              <label class="col-lg-1 col-sm-12 col-form-label form-control-label">Betrag</label>
              <div class="col-lg-3 col-sm-12">
                  <input type="number" step="0.01" id="credit-input" v-model="credit" class="form-control" placeholder="Betrag in €">
              </div>
              <div class="col-lg-3 col-sm-12">
                  <button type="submit" class="btn btn-primary mr-2">Eintragen</button>
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

const creatRandomHash = () => {
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
      parentMessage: 'Parent',
      entrys: [],
      errors: [],
      email: '',
      credit: '',
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
      const params = {
        email: this.email,
        credit: parseFloat(this.credit, 10),
        authKey: creatRandomHash(),
      };
      createBon(params)
        .then(() => {
          this.listEntries();
        })
        .catch((e) => {
          this.errors.push(e);
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
          this.listEntries();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  components: {
    BonListEntry,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #bonList {
    list-style-type: none;
  }
  .bon-list-entry {
    margin-bottom: 0;
  }
  ul.list-group-striped li:nth-of-type(even) {
    background: #e4e4e4;
  }
</style>
