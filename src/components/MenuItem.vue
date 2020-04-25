<template lang="html">

  <li class="nav-item">
    <router-link :to="route.path" class="nav-link">{{ route.name }}</router-link>
  </li>

</template>

<script>
export default {

};

</script>

<style>

</style>

<script lang="js">

export default {
  name: 'menu-item',
  props: {
    route: {
      type: Object,
    },
  },
  mounted() {
  },
  data() {
    return {
    };
  },
  methods: {

  },
};


</script>

<style scoped lang="scss">
  .menu-item {

  }
</style>
