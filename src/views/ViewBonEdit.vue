<template>
<div class="container">
  <div class="row">
    <form class="ng-pristine" @submit="updateEntry()">
        <div class="form-group row justify-content-between">
            <div class="col-lg-4 col-sm-12 col-input">
                <input type="text" id="name-input" v-model="activeBon.name" class="form-control" placeholder="Name">
            </div>
            <div class="col-lg-4 col-sm-12 col-input">
                <input type="text" id="email-input" v-model="activeBon.email" class="form-control" placeholder="E-Mail Adresse">
            </div>
            <div class="col-lg-2 col-sm-12 col-input">
                <input type="number" step="0.01" id="credit-input" v-model="activeBon.credit" class="form-control" placeholder="Betrag in €">
            </div>
            <div class="col-lg-2 col-sm-12 col-input text-right">
                <button id="submit" type="submit" class="btn btn-primary">Speichern</button>
            </div>
        </div>
    </form>
  </div>
</div>
</template>

<script>
import { /* mapState, */ mapActions } from 'vuex';
import showMessage from '../mixins/messages';
// import { getBon, updateBon } from '../services/bonService';

export default {
  name: 'ViewBonEdit',
  data() {
    return {
      bon: {},
      errors: [],
    };
  },
  computed: {
    itemId() {
      return parseInt(this.$route.params.id, 10);
    },
    activeBon: {
      get() {
        return this.$store.state.bons.activeBon;
      },
      set(params) {
        this.$store.commit('updateBon', params);
      },
    },
  },
  mounted() {
    this.fetchBon(this.itemId);
  },
  methods: {
    ...mapActions(['fetchBon', 'updateBon']),
    async updateEntry() {
      try {
        await this.updateBon(this.activeBon);
        this.$router.push({ path: '/bonlist' });
        this.showSimpleMessage('Bon geändert', 'success');
      } catch (e) {
        this.errors.push(e);
        console.log(`E: ${e}`);
        this.showSimpleMessage('Bon konnte nicht geändert werden', 'warning');
      }
    },
  },
  mixins: [showMessage],
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
