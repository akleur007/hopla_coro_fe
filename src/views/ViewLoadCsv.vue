<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <vue-csv-import
          v-model="csv"
          :map-fields="['name', 'email', 'credit', 'lastUsed', 'authKey']"
          url=""
          headers="true"
        >
          <template slot="next" slot-scope="{ load }">
            <button @click.prevent="load" class="btn btn-primary">Map fields</button>
          </template>
          <template slot="submit" slot-scope="{ submit }">
            <button @click.prevent="submit" class="btn btn-primary">send!</button>
          </template>
          <template slot="thead">
            <tr>
              <th>DB Field</th>
              <th>CSV Column</th>
            </tr>
          </template>
        </vue-csv-import>
      </div>
      <div class="col-4">
        <button
          @click="this.processEntries"
          v-if="!this.isProcessed"
          class="btn btn-secondary float-right"
        >
          Berechnen
        </button>
        <button
          @click="this.saveEntries"
          v-if="this.isProcessed"
          class="btn btn-primary float-right"
        >
          Speichern
        </button>
      </div>
    </div>
    <div v-if="this.isProcessed">
      <h2>Bons update</h2>
      <ul id="updateBonList" class="list-group-striped">
        <li class="bon-list-entry list-group-item" v-for="(bon, i) in updateBons" :key="i">
          <BonImportEntry :bon="bon"></BonImportEntry>
        </li>
      </ul>
      <h2>Bons neu</h2>
      <ul id="newBonList" class="list-group-striped">
        <li class="bon-list-entry list-group-item" v-for="(bon, i) in newBons" :key="i">
          <BonImportEntry :bon="bon"></BonImportEntry>
        </li>
      </ul>
    </div>
    <h2 v-if="this.isProcessed">Alle Bons in CSV</h2>
    <ul id="bonUpdateList" class="list-group-striped">
      <li class="bon-list-entry list-group-item" v-for="(bon, i) in csv" :key="i">
        <BonImportEntry :bon="bon"></BonImportEntry>
      </li>
    </ul>
  </div>
</template>

<script>
// :map-fields="['name', 'email', 'credit', 'lastUsed', 'authKey']"

import { VueCsvImport } from 'vue-csv-import';
import { mapGetters, mapActions } from 'vuex';
import BonImportEntry from '../components/BonImportEntry.vue';
import BonService from '../services/bonService';
import showMessage from '../mixins/messages';
import errorHandler from '../mixins/errors';

export default {
  name: 'ViewLoadCsv',
  props: {},
  data() {
    return {
      csv: [],
      csvClean: [],
      newBons: [],
      updateBons: [],
      duplicates: [],
      isProcessed: false,
    };
  },
  async created() {
    try {
      await this.fetchBons();
      this.handleApiError();
    } catch (err) {
      this.handleApiError(err);
    }
  },
  methods: {
    ...mapActions(['fetchBons', 'addBon', 'changeBon', 'removeBon']),
    processEntries() {
      this.cleanCsv();
      this.checkduplicates();
      this.combineDuplicates();
      this.isProcessed = true;
    },
    async saveEntries() {
      try {
        const saveBons = [...this.newBons, ...this.updateBons];
        const response = await BonService.updateBons(saveBons);
        this.showSimpleMessage(response.data.message, 'success');
      } catch (err) {
        this.showSimpleMessage('Fehler beim Bon speichern', 'warning');
        console.log('ERR --> ', err);
      }
    },
    cleanCsv() {
      this.csv.forEach((item) => {
        const copyItem = { ...item };
        const dub = this.csvClean.find((entry) => entry.email === item.email);
        if (dub) {
          dub.credit = this.addCredits(dub.credit, item.credit);
        } else {
          this.csvClean.push(copyItem);
        }
      });
    },
    checkduplicates() {
      this.csvClean.forEach((newItem) => {
        const copyItem = { ...newItem };
        const dub = this.allBons.find((oldItem) => oldItem.email === newItem.email);
        if (dub) {
          this.duplicates.push(copyItem);
        } else {
          copyItem.credit = copyItem.credit.replace(',', '.');
          this.newBons.push(copyItem);
        }
      });
    },
    combineDuplicates() {
      this.updateBons = this.duplicates.map((item) => {
        const dub = this.allBons.find((key) => key.email === item.email);
        const updateItem = { ...dub };
        updateItem.credit = this.addCredits(dub.credit, item.credit);
        return updateItem;
      });
    },
    addCredits(c1, c2) {
      const res =
        parseFloat(String(c1).replace(',', '.')) + parseFloat(String(c2).replace(',', '.'));
      return res.toFixed(2);
    },
  },
  components: {
    VueCsvImport,
    BonImportEntry,
  },
  computed: mapGetters(['allBons']),
  mixins: [showMessage, errorHandler],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#bonList {
  padding: 0;
  li {
    margin: 5px;
  }
}
</style>
