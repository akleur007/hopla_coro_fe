<template lang="html">
  <b-nav-item :to="route.path">{{ route.name }}</b-nav-item>
  <!-- <router-link :to="route.path" class="nav-link">{{ route.name }}</router-link> -->
</template>

<script>
export default {};
</script>

<style></style>

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

<style scoped lang="scss"></style>
