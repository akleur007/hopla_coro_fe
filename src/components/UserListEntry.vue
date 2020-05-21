<template>
  <div class="row">
    <div class="col-lg-3 col-sm-12">
      {{ entry.username }}
    </div>
    <div class="col-lg-3 col-sm-12">
      {{ entry.email }}
    </div>
    <div class="col-lg-3 col-sm-12">
      {{ entry.role }}
    </div>
    <div class="col-lg-3 col-sm-12">
      <div class="row">
        <div class="col-lg-12">
          <router-link :to="`/user/${entry.id}`" class="btn btn-primary mr-2">
            Ändern
          </router-link>
        </div>
        <div class="col-lg-12">
          <button type="submit" class="btn btn-info mr-2" v-on:click="sendEmail">E-Mail</button>
        </div>
        <div class="col-lg-12">
          <button type="submit" class="btn btn-danger mr-2" v-on:click="addDeleteRequest">
            Löschen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BonListEntry',
  props: {
    msg: String,
    entry: Object,
  },
  computed: {},
  methods: {
    sendEmail() {
      this.$emit('sendEmail', this.entry.id);
    },
    addDeleteRequest() {
      this.$emit('addDeleteRequest', this.entry.id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn {
  margin-bottom: 10px;
  width: 100%;

  a {
    color: #ffffff;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
