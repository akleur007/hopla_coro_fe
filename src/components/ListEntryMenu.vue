<template>
  <div>
    <div class="row d-none d-md-block">
      <div class="col-md-12 col-4">
        <button type="submit" class="btn btn-danger mr-2" v-on:click="deleteRequest">
          Löschen
        </button>
      </div>
      <div class="col-md-12 col-8">
        <button
          type="submit"
          class="btn btn-primary mr-2"
          v-on:click="toggleEditable()"
          :class="{
            'btn-primary': !editable,
            'btn-light': editable,
          }"
        >
          <b-icon-pencil></b-icon-pencil>
          {{ editButtonText }}
        </button>
      </div>
    </div>
    <div class="d-md-none list-menu">
      <button class="btn btn-secondary" v-if="editable" v-on:click="toggleEditable()">
        Abbrechen
      </button>
      <b-dropdown text="..." dropright no-caret class="m-md-2 list-item-menu" v-if="!editable">
        <b-dropdown-item
          class="btn-primary"
          v-on:click="toggleEditable()"
          :class="{
            'btn-primary': !editable,
            'btn-light': editable,
          }"
          ><b-icon-pencil></b-icon-pencil> Edit</b-dropdown-item
        >
        <b-dropdown-item class="btn-danger" v-on:click="deleteRequest">X Delete</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { BIconPencil } from 'bootstrap-vue';

export default {
  name: 'ListEntryMenu',
  components: {
    BIconPencil,
  },
  props: {
    entry: Object,
  },
  data() {
    return {
      editable: false,
      editButtonText: 'Ändern',
    };
  },
  methods: {
    deleteRequest() {
      this.$emit('delete-request');
    },
    toggleEditable() {
      this.editable = !this.editable;
      this.editButtonText = this.editable ? 'Abbrechen' : 'Ändern';
      this.$emit('edit-request');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/colors.scss';
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

.dropdown-item {
  color: #ffffff;
}

ul.list-group-striped .btn-danger {
  background: $danger;
}
</style>
