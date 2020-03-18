<template>
  <div class="container">
      <form class="ng-pristine" onsubmit="sendMessage(event.preventDefault())">
          <div class="form-group row">
              <label class="col-lg-2 col-sm-12 col-form-label form-control-label">E-mail Adresse</label>
              <div class="col-lg-3 col-sm-12">
                  <input type="text" id="email-input" class="form-control" placeholder="E-mail Adresse">
              </div>
              <label class="col-lg-1 col-sm-12 col-form-label form-control-label">Betrag</label>
              <div class="col-lg-3 col-sm-12">
                  <input type="number" class="form-control" id="credit-input" placeholder="Betrag in €">
              </div>
              <div class="col-lg-3 col-sm-12">
                  <button type="submit" class="btn btn-primary mr-2">Eintragen</button>
              </div>
          </div>
      </form>
      <h2>Angelegte Bons:</h2>
      <ul id="bonList">
          <li v-for="(entry) in entrys" :key="entry.id">
            <BonEntry :entry="entry"></BonEntry>
          </li>
      </ul>
  </div>
</template>

<script>
import BonEntry from './BonEntry.vue';

export default {
  name: 'ViewBons',
  props: {
    msg: String,
  },
  data() {
    return {
      parentMessage: 'Parent',
      entrys: [
        { email: 'mail@mail.de', name: 'Resul' },
        { email: 'return@return.com', name: 'Günni' },
      ],
    };
  },
  components: {
    BonEntry,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
