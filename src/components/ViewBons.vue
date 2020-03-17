<template>
  <div class="container">
      <h1>{{ msg }}</h1>
      <form class="ng-pristine" onsubmit="sendMessage(event.preventDefault())">
          <div class="form-group row">
              <label class="col-md-2 col-form-label form-control-label">E-mail Adresse</label>
              <div class="col-md-3">
                  <input type="text" id="email-input" class="form-control" placeholder="E-mail Adresse">
              </div>
              <label class="col-md-1 col-form-label form-control-label">Betrag</label>
              <div class="col-md-3">
                  <input type="number" class="form-control" id="credit-input" placeholder="Betrag in €">
              </div>
              <div class="col-md-3">
                  <button type="submit" class="btn btn-primary mr-2">Eintragen</button>
              </div>
          </div>
      </form>
      <h2>Angelegte Bons:</h2>
  </div>
</template>

<script>
export default {
  name: 'ViewBons',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
