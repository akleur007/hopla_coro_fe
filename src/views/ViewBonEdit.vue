<template>
  <div class="container">
    <div class="row">
      <form class="ng-pristine" @submit="updateEntry()">
        <div class="form-group row justify-content-between">
          <div class="col-lg-4 col-sm-12 col-input">
            <input
              type="text"
              id="name-input"
              v-model="bon.name"
              class="form-control"
              placeholder="Name"
            />
          </div>
          <div class="col-lg-4 col-sm-12 col-input">
            <input
              type="text"
              id="email-input"
              v-model="bon.email"
              class="form-control"
              placeholder="E-Mail Adresse"
            />
          </div>
          <div class="col-lg-2 col-sm-12 col-input">
            <input
              type="number"
              step="0.01"
              id="credit-input"
              v-model="bon.credit"
              class="form-control"
              placeholder="Betrag in €"
            />
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
import { mapActions } from 'vuex';
import showMessage from '../mixins/messages';

export default {
  name: 'ViewBonEdit',
  props: {
    bonId: Number,
    returnPath: String,
  },
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    itemId() {
      if (this.bonId) {
        return this.bonId;
      }
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
    bon() {
      return this.$store.getters.getBonById(this.itemId)[0];
    },
  },
  mounted() {},
  methods: {
    ...mapActions(['fetchBon', 'updateBon']),
    async updateEntry() {
      try {
        await this.updateBon(this.bon);
        // this.$router.push({ path: '/bonlist' });
        this.showSimpleMessage('Bon geändert', 'success');
      } catch (err) {
        this.errors.push(err);
        console.log(`Err: ${err.response.data.message}`);
        this.showSimpleMessage('Bon konnte nicht geändert werden', 'warning');
      }
    },
  },
  mixins: [showMessage],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
