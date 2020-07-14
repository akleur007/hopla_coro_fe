<template>
  <div>
    <li class="list-group-item">
      {{ filename }}
      <b-input
        type="text"
        v-model="showname"
        v-on:keyup="emitShowname"
        placeholder="Anzeigename ändern?"
      ></b-input>
    </li>
  </div>
</template>

<script>
export default {
  name: 'UploadDocumentEntry',
  props: {
    filename: String,
    index: Number,
  },
  data() {
    return {
      showname: '',
    };
  },
  methods: {
    emitShowname() {
      const resp = {
        showname: this.showname,
        index: this.index,
      };
      this.$emit('getShowname', resp);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
