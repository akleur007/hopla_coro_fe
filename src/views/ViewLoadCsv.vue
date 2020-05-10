<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <vue-csv-import v-model="csv" :map-fields="['email', 'credit']" url="" headers="true">
          <template slot="next" slot-scope="{ load }">
            <button @click.prevent="load" class="btn btn-primary">Go</button>
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
          Eintragen
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
    <ul id="bonList" class="list-group-striped" v-if="this.isProcessed">
      <li class="bon-list-entry list-group-item" v-for="(bon, i) in updateBons" :key="i">
        <BonImportEntry :bon="bon"></BonImportEntry>
      </li>
    </ul>
    <ul id="bonList" class="list-group-striped" v-if="this.isProcessed">
      <li class="bon-list-entry list-group-item" v-for="(bon, i) in newBons" :key="i">
        <BonImportEntry :bon="bon"></BonImportEntry>
      </li>
    </ul>
    <ul id="bonUpdateList" class="list-group-striped">
      <li class="bon-list-entry list-group-item" v-for="(bon, i) in csv" :key="i">
        <BonImportEntry :bon="bon"></BonImportEntry>
      </li>
    </ul>
  </div>
</template>

<script>
// :map-fields="['name', 'email', 'credit', 'lastUsed']"

import { VueCsvImport } from 'vue-csv-import';
import { mapGetters, mapActions } from 'vuex';
import BonImportEntry from '../components/BonImportEntry.vue';
import BonService from '../services/bonService';
import showMessage from '../mixins/messages';

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
  created() {
    this.fetchBons();
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
        const response = await BonService.updateBons(this.updateBons);
        this.showSimpleMessage(response.data.data.message, 'success');
        console.log(response);
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
          this.newBons.push(copyItem);
        }
      });
    },
    combineDuplicates() {
      this.updateBons = this.duplicates.map((item) => {
        const copyItem = { ...item };
        const dub = this.allBons.find((key) => key.email === item.email);
        copyItem.credit = this.addCredits(dub.credit, item.credit);
        copyItem.id = dub.id;
        return copyItem;
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
  mixins: [showMessage],
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
