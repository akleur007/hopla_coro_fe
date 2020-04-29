<template>
    <div class="row">
      <div class="col-md-10">
        <div class="row">
          <div class="col-lg-9 col-8">
            <div class="row">
              <div class="col-lg-12">
                {{ bon.name }}
              </div>
              <div class="col-lg-12">
                {{ bon.email }}
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-4 credit">
            {{ bon.credit }}€
          </div>
        </div>
      </div>
      <div class="col-md-2">
       <button type="submit" class="btn btn-primary mr-2">
          <router-link :to="`/bon/${bon.id}`">
            Ändern
          </router-link>
        </button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'BonimportEntry',
  props: {
    bon: Object,
  },
  computed: {
  },
  methods: {

  },
  created() {
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

  .credit {
    font-size: 2.0em;
    text-align: right;
  }
</style>
