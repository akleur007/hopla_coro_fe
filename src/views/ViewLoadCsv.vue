<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <vue-csv-import
          v-model="csv"
          :map-fields="['email', 'credit']"
          url=""
          headers="true">
          <template slot="next" slot-scope="{load}">
            <button @click.prevent="load" class="btn btn-primary">Go</button>
          </template>
          <template slot="submit" slot-scope="{submit}">
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
        <button @click="this.processEntries" class="btn btn-primary float-right">Eintragen</button>
      </div>
    </div>
    <ul id="bonList"  class="list-group-striped">
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

export default {
  name: 'ViewLoadCsv',
  props: {
  },
  data() {
    return {
      csv: [],
      csvClean: [],
      newBons: [],
      updateBons: [],
      dublicates: [],
    };
  },
  created() {
    this.fetchBons();
  },
  methods: {
    ...mapActions(['fetchBons', 'addBon', 'changeBon', 'removeBon']),
    processEntries() {
      this.cleanCsv();
      this.checkDublicates();
      this.combineDublicates();
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
    checkDublicates() {
      this.csvClean.forEach((newItem) => {
        const copyItem = { ...newItem };
        const dub = this.allBons.find((oldItem) => oldItem.email === newItem.email);
        if (dub) {
          this.dublicates.push(copyItem);
        } else {
          this.newBons.push(copyItem);
        }
      });
    },
    combineDublicates() {
      this.updateBons = this.dublicates.map((item) => {
        const copyItem = { ...item };
        const dub = this.dublicates.find((key) => key.email === item.email);
        copyItem.credit = this.addCredits(dub.credit, item.credit);
        return copyItem;
      });
    },
    addCredits(c1, c2) {
      return parseFloat(String(c1).replace(',', '.')) + parseFloat(String(c2).replace(',', '.'));
    },
  },
  components: {
    VueCsvImport,
    BonImportEntry,
  },
  computed: mapGetters(['allBons']),
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
