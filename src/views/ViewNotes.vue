<template>
  <div class="container">
    <div v-if="addNewNote" class="mb-4">
      <form class="ng-pristine" @submit="postEntry()">
        <div class="form-group row justify-content-between">
          <div class="col-lg-5 col-sm-12 col-input">
            <label for="to-user">An:</label>
            <select name="to-user" v-model="newNoteContent.toId" class="form-control">
              <option selected value="0">Alle</option>
              <option v-for="user in allUsers" :key="user.id" :value="user.id">{{
                user.username
              }}</option>
            </select>
          </div>
          <div class="col-12 col-input">
            <input type="text" v-model="newNoteContent.text" placeholder="Text" />
          </div>
          <div class="col-lg-2 text-lg-right col-6 col-input">
            <button class="btn btn-secondary" v-on:click="toggleNewForm()">
              Abbrechen
            </button>
          </div>
          <div class="col-lg-2 col-6 text-right col-input offset-lg-10">
            <button id="submit-it" type="submit" class="btn btn-primary">
              Eintragen
            </button>
          </div>
        </div>
      </form>
    </div>
    <div v-if="seeFilter" class="mb-4">ToDo</div>
    <div class="row mb-5">
      <div class="col-4">
        <button class="btn btn-primary" v-if="!addNewNote" v-on:click="toggleSeeFilter()">
          <b-icon-people></b-icon-people> Filter
        </button>
      </div>
      <div class="text-right col-8">
        <button class="btn btn-primary" v-if="!addNewNote" v-on:click="toggleNewForm()">
          <b-icon-plus-square class="mr-2"></b-icon-plus-square>
          <b-icon-credit-card></b-icon-credit-card>
        </button>
      </div>
    </div>
    <ul id="noteList" class="list-group-striped">
      <li class="note-list-entry list-group-item" v-for="note in filteredNotes" :key="note.id">
        <NoteListEntry :note="note" @addDeleteRequest="addDeleteRequest"></NoteListEntry>
      </li>
    </ul>
    <div>
      <b-modal id="delete-request" @ok="deleteEntry" @hidden="deleteId = ''">
        <h2>Note löschen?</h2>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { BIconPlusSquare, BIconCreditCard, BIconPeople } from 'bootstrap-vue';
import NoteListEntry from '../components/NoteListEntry.vue';
import showMessage from '../mixins/messages';
import errorHandler from '../mixins/errors';

export default {
  name: 'ViewNotes',
  components: {
    NoteListEntry,
    BIconPlusSquare,
    BIconCreditCard,
    BIconPeople,
  },
  mixins: [showMessage, errorHandler],
  props: {
    searchString: String,
  },
  data() {
    return {
      notes: [],
      errors: [],
      addNewNote: false,
      seeFilter: false,
      deleteId: '',
      newNoteContent: {
        fromId: 0,
        toId: 0,
        text: '',
        status: 'active',
      },
    };
  },
  async created() {
    try {
      await this.fetchUsers();
      await this.fetchNotes();
      this.handleApiError();
    } catch (err) {
      this.handleApiError(err);
    }
    this.deselectAllNotes();
  },
  methods: {
    ...mapActions('notes', [
      'fetchNotes',
      'addNote',
      'changeNote',
      'removeNote',
      'deselectAllNotes',
    ]),
    ...mapActions('users', ['fetchUsers']),
    async postEntry() {
      this.newNoteContent.fromId = this.getUser.id;
      try {
        await this.addNote(this.newNoteContent);
        this.toggleNewForm();
        this.showSimpleMessage('Note angelegt', 'success');
        this.fetchNotes();
      } catch (err) {
        this.errors.push(err);
        this.showSimpleMessage(err.response.data.message, 'warning');
      }
    },
    addDeleteRequest(id) {
      this.deleteId = id;
      this.$bvModal.show('delete-request');
    },
    async deleteEntry() {
      try {
        await this.removeNote(this.deleteId);
        this.deleteId = '';
        this.fetchNotes();
        this.showSimpleMessage('Note gelöscht', 'success');
      } catch (err) {
        this.errors.push(err);
        this.showSimpleMessage(err.response.data.message, 'warning');
      }
    },
    toggleNewForm() {
      this.addNewNote = !this.addNewNote;
    },
    toggleSeeFilter() {
      this.seeFilter = !this.seeFilter;
    },
  },
  computed: {
    ...mapGetters('notes', ['allNotes', 'selectedNotes']),
    ...mapGetters('users', ['getUser', 'allUsers']),
    filteredNotes() {
      return this.allNotes.filter((note) => {
        return note.text.toLowerCase().match(this.searchString.toLowerCase());
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  padding-left: 0;
}
#noteList {
  list-style-type: none;
}

#subject {
  margin-bottom: 20px;
}
</style>
