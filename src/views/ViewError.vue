<template>
  <div class="container">
      <h1>{{ this.activeError.status }}</h1>
      <p>{{ this.activeError.message  }}</p>
      <!-- <ul id="errorList"  class="list-group-striped">
          <li class="error-list-entry list-group-item" v-for="(error) in allErrors" :key="error.id">
            {{ error.message }}
          </li>
      </ul> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import showMessage from '../mixins/messages';

export default {
  name: 'ViewError',
  props: {
  },
  data() {
    return {
    };
  },
  created() {
  },
  components: {
  },
  methods: {
    ...mapActions('errors', ['addError', 'setActiveError']),
  },
  computed: mapGetters('errors', ['allErrors', 'activeError']),
  mixins: [showMessage],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
