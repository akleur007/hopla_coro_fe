<template>
<div class="container">
  <div class="row">
    <form class="ng-pristine" @submit="updateEntry()">
        <div class="form-group row">
            <label class="col-lg-2 col-sm-12 col-form-label form-control-label">E-Mail Adresse</label>
            <div class="col-lg-3 col-sm-12">
                {{ entry.email }}
            </div>
            <label class="col-lg-1 col-sm-12 col-form-label form-control-label">Betrag</label>
            <div class="col-lg-3 col-sm-12">
                <input type="number" step="0.01" id="credit-input" v-model="entry.credit" class="form-control" placeholder="Betrag in €">
            </div>
            <div class="col-lg-3 col-sm-12">
                <button type="submit" class="btn btn-primary mr-2">Speichern</button>
            </div>
        </div>
    </form>
  </div>
</div>
</template>

<script>
import { getBon, updateBon } from '../services/bonService';

export default {
  name: 'ViewBonEdit',
  data() {
    return {
      entry: {},
      errors: [],
    };
  },
  computed: {
    itemId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    getBon(this.itemId)
      .then((response) => {
        this.entry = response.data.data.resource;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  methods: {
    updateEntry() {
      const params = {
        id: this.entry.id,
        email: this.entry.email,
        credit: parseFloat(this.entry.credit, 10),
      };
      updateBon(params)
        .then(() => {
          this.$router.push({ path: '/bonlist' });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
