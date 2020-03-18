<template>
  <div class="container">
      <form class="ng-pristine" onsubmit="sendMessage(event.preventDefault())">
          <div class="form-group row">
              <label class="col-lg-2 col-sm-12 col-form-label form-control-label">E-mail Adresse</label>
              <div class="col-lg-3 col-sm-12">
                  <input type="text" id="email-input" class="form-control" placeholder="E-mail Adresse">
              </div>
              <label class="col-lg-1 col-sm-12 col-form-label form-control-label">Passwort</label>
              <div class="col-lg-3 col-sm-12">
                  <input type="password" class="form-control" id="credit-input" placeholder="Passwort">
              </div>
              <div class="col-lg-3 col-sm-12">
                  <button type="submit" class="btn btn-primary mr-2">Einloggen</button>
              </div>
          </div>
      </form>
  </div>
</template>

<script>
import BonListEntry from '../components/BonListEntry.vue';

export default {
  name: 'ViewLogin',
  props: {
    
  },
  data() {
    return {
      parentMessage: 'Parent',
    };
  },
  components: {
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
