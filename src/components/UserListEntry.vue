<template>
  <div class="row">
    <div class="col-md-9">
      <div class="row" v-if="!editable">
        <div class="col-4 email-button">
          <button
            type="submit"
            class="btn mr-2 btn-primary email-buttonres"
            :class="{
              'btn-success': this.selected,
              'btn-primary': !this.selected,
            }"
            v-on:click="toggleEmailSelect"
          >
            <b-icon-envelope></b-icon-envelope>
          </button>
        </div>
        <div class="col">
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
        </div>
      </div>
      <div class="col">
        <user-edit :user="this.entry" v-if="editable" v-on:saved="toggleEditable()"></user-edit>
      </div>
    </div>
    <div class="col-md-3">
      <list-entry-menu
        @delete-request="deleteRequest"
        @edit-request="toggleEditable"
      ></list-entry-menu>
    </div>
  </div>
</template>

<script>
import { BIconEnvelope } from 'bootstrap-vue';
import { mapActions } from 'vuex';
import UserEdit from './UserEdit.vue';
import ListEntryMenu from './ListEntryMenu.vue';
import listEntryMenuLogic from '../mixins/listEntryHelper';

export default {
  name: 'UserListEntry',
  components: {
    UserEdit,
    ListEntryMenu,
    BIconEnvelope,
  },
  mixins: [listEntryMenuLogic],
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
    toggleEmailSelect() {
      this.userToggleSelection(this.entry);
      this.selected = !this.selected;
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

.email-button {
  max-width: 80px;
}
</style>
