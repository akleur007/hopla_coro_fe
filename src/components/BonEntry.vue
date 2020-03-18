<template>
    <div class="row">
        <div class="col-lg-3 col-sm-12">
          {{ entry.email }}
        </div>
        <div class="col-lg-3 col-sm-12">
          {{ entry.name }}
        </div>
        <div class="col-lg-3 col-sm-12">
            <button type="submit" class="btn btn-primary mr-2">Ändern</button>
        </div>
  </div>
</template>

<script>
export default {
  name: 'BonEntry',
  props: {
    msg: String,
    entry: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
