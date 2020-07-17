<template>
  <div class="d-flex justify-content-between">
    <div class="">
      <div class="row" v-if="!editable">
        <div class="col-12 note-name">
          <strong>{{ fromUser }} -> {{ toUser }}</strong>
        </div>
        <div class="col-12">{{ entry.text }}</div>
      </div>
      <div class="col">
        <note-edit :note="entry" v-if="editable" v-on:saved="toggleEditable()"></note-edit>
      </div>
    </div>
    <div class="">
      <list-entry-menu
        @delete-request="deleteRequest({ id: entry.id, title: toUser })"
        @edit-request="toggleEditable"
      ></list-entry-menu>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import NoteEdit from './NoteEdit.vue';
import ListEntryMenu from './ListEntryMenu.vue';
import listEntryMenuLogic from '../mixins/listEntryHelper';

export default {
  name: 'NoteListEntry',
  components: {
    NoteEdit,
    ListEntryMenu,
  },
  mixins: [listEntryMenuLogic],
  data() {
    return {
      editable: false,
      editButtonText: 'Ändern',
      selected: false,
    };
  },
  props: {
    entry: Object,
  },
  computed: {
    fromUser() {
      const user = this.$store.getters['users/getUserById'](this.entry.fromId)[0];
      if (user) {
        return user.username;
      }
      return 'Unbekannt';
    },
    toUser() {
      const user = this.$store.getters['users/getUserById'](this.entry.toId)[0];
      if (user) {
        return user.username;
      }
      if (this.entry.toId === 0) {
        return 'Alle';
      }
      return 'Unbekannt';
    },
  },
  methods: {
    ...mapActions('notes', ['noteToggleSelection']),
  },
  mounted() {},
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
