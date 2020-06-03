<template>
  <div class="row">
    <div class="col-md-9">
      <div class="row" v-if="!editable">
        <div class="col-4 email-button">
          <button
            type="submit"
            class="btn mr-2 btn-primary"
            :class="{
              'btn-success': this.selected,
              'btn-primary': !this.selected,
            }"
            v-on:click="selectForEmail"
          >
            <b-icon-envelope></b-icon-envelope>
          </button>
        </div>
        Content
        <!-- <div class="col">
          <div class="row">
            <div class="col-8">
              {{ entry.username }}
            </div>
            <div class="col-4">
              {{ entry.role }}
            </div>
            <div class="col">
              {{ entry.email }}
            </div>
          </div>
        </div> -->
      </div>
      <div class="col">
        <user-edit :user="this.entry" v-if="editable" v-on:saved="toggleEditable()"></user-edit>
      </div>
    </div>
    <div class="col-md-3">
      <div class="row">
        <div class="col-md-12 col-4">
          <button type="submit" class="btn btn-danger mr-2" v-on:click="addDeleteRequest">
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
    </div>
  </div>
</template>

<script>
import { BIconEnvelope, BIconPencil } from 'bootstrap-vue';
import { mapActions } from 'vuex';
import UserEdit from './UserEdit.vue';

export default {
  name: 'UserListEntry',
  components: {
    UserEdit,
    BIconPencil,
    BIconEnvelope,
  },
  props: {
    entry: Object,
  },
  data() {
    return {
      editable: false,
      editButtonText: 'Ändern',
      selected: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions('users', ['userToggleSelection']),
    sendEmail() {
      this.$emit('sendEmail', this.entry.id);
    },
    selectForEmail() {
      this.userToggleSelection(this.entry);
      this.selected = !this.selected;
    },
    addDeleteRequest() {
      this.$emit('addDeleteRequest', this.entry.id);
    },
    toggleEditable() {
      this.editable = !this.editable;
      this.editButtonText = this.editable ? 'Abbrechen' : 'Ändern';
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
