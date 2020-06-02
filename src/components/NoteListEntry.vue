<template>
  <div class="row">
    <div class="col-md-9">
      <div class="row" v-if="!editable">
        <div class="col-9">
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col-12 note-name">
                  <strong>{{ note.fromId }} -> {{ note.toId }}</strong>
                </div>
                <div class="col-12">{{ note.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <note-edit :note="note" v-if="editable" v-on:saved="toggleEditable()"></note-edit>
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
import { mapActions } from 'vuex';
import { BIconPencil } from 'bootstrap-vue';
import NoteEdit from './NoteEdit.vue';

export default {
  name: 'NoteListEntry',
  components: {
    NoteEdit,
    BIconPencil,
  },
  data() {
    return {
      editable: false,
      editButtonText: 'Ändern',
      selected: false,
    };
  },
  props: {
    note: Object,
  },
  computed: {},
  methods: {
    ...mapActions('notes', ['noteToggleSelection']),
    addDeleteRequest() {
      this.$emit('addDeleteRequest', this.note.id);
    },
    toggleEditable() {
      this.editable = !this.editable;
      this.editButtonText = this.editable ? 'Abbrechen' : 'Ändern';
    },
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
