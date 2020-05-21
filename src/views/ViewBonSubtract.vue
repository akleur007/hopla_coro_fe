<template>
  <div class="container">
    <form class="ng-pristine" @submit="updateEntry()">
      <div class="form-group">
        <div class="row">
          <div class="col-lg-2 col-sm-12 col-input">
            <label for="credit-input">Rechnungsbetrag</label>
            <input
              type="number"
              step="0.01"
              id="credit-input"
              name="credit-input"
              v-model="credit"
              class="form-control"
            />
          </div>
          <div class="col-lg-2 col-sm-12 col-input text-right">
            <button id="submit" type="submit" class="btn btn-primary">Speichern</button>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-sm-6 bon-name">
            {{ bon.name }}
          </div>
          <div class="col-lg-4 col-sm-6 bon-credit text-right">Guthaben: {{ bon.credit }}</div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import showMessage from '../mixins/messages';

export default {
  name: 'ViewBonSubtract',
  props: {
    bonId: Number,
    returnPath: String,
  },
  data() {
    return {
      errors: [],
      credit: '',
    };
  },
  computed: {
    itemId() {
      if (this.bonId) {
        return this.bonId;
      }
      return parseInt(this.$route.params.id, 10);
    },
    bon() {
      return this.$store.getters.getBonById(this.itemId)[0];
    },
  },
  mounted() {},
  methods: {
    ...mapActions(['fetchBon', 'subtractBon']),
    async updateEntry() {
      try {
        await this.subtractBon({ bon: this.bon, credit: this.credit });
        this.bon.credit -= Math.abs(this.credit);
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
<style scoped lang="scss">
#submit {
  width: 100%;
  height: 3.5rem;
}
.bon-name {
  font-size: 1.5rem;
}
.bon-credit {
  font-size: 1.5rem;
}
#credit-input {
  font-size: 3.5rem;
}
</style>
