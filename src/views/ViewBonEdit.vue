<template>
<div class="container">
  <div class="row">
    <form class="ng-pristine" @submit="updateEntry()">
        <div class="form-group row justify-content-between">
            <div class="col-lg-4 col-sm-12 col-input">
                <input type="text" id="name-input" v-model="entry.name" class="form-control" placeholder="Name">
            </div>
            <div class="col-lg-4 col-sm-12 col-input">
                <input type="text" id="email-input" v-model="entry.email" class="form-control" placeholder="E-Mail Adresse">
            </div>
            <div class="col-lg-2 col-sm-12 col-input">
                <input type="number" step="0.01" id="credit-input" v-model="entry.credit" class="form-control" placeholder="Betrag in €">
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
// import { getBon, updateBon } from '../services/bonService';

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
    console.log(`rrr: ${this.store.state}`);
    // mapActions(['fetchBon']);
    // getBon(this.itemId)
    /* this.fetchBon(this.itemId)
      .then((response) => {
        console.log(`rrr: ${this.store.state}`);
        this.entry = response.data.data.resource;
      })
      .catch((e) => {
        this.errors.push(e);
      }); */
  },
  methods: {
    ...mapActions(['changeBon']),
    updateEntry() {
      const params = {
        id: this.entry.id,
        name: this.entry.name,
        email: this.entry.email,
        credit: parseFloat(this.entry.credit, 10),
      };
      // updateBon(params)
      this.changeBon(params)
        .then(() => {
          this.$router.push({ path: '/bonlist' });
          this.flashMessage.show({
            title: 'Bon geändert',
            message: '',
            wrapperClass: 'msg alert-success',
          });
        })
        .catch((e) => {
          this.errors.push(e);
          this.flashMessage.show({
            title: 'Bon konnte nicht geändert werden',
            message: '',
            wrapperClass: 'msg alert-warning',
          });
        });
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
