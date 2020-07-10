<template>
  <div class="d-flex">
    <div class="flex-grow-1 mr-3">
      <div class="d-flex justify-content-between" v-if="!editable">
        <button
          class="btn btn-primary email-button"
          :class="{
            'btn-success': this.selected,
            'btn-primary': !this.selected,
          }"
          v-on:click="toggleEmailSelect"
        >
          <b-icon-envelope></b-icon-envelope>
        </button>
        <div class="flex-grow-1 ml-3">
          <div class="d-flex justify-content-between">
            <div class="">
              {{ entry.username }}
            </div>
            <div class="">
              {{ entry.role }}
            </div>
          </div>
          <div class="">
            {{ entry.email }}
          </div>
        </div>
      </div>
      <div class="mb-5" v-if="editable">
        <user-edit :user="this.entry" v-on:saved="toggleEditable()"></user-edit>
        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Datei hochladen"
          drop-placeholder="Datei hier hin ziehen"
        ></b-form-file>
        <div class="mt-3 row" v-if="files.length > 0">
          <div class="col-lg-10 col-sm-9">Ausgewählte Datei: {{ files ? files.name : '' }}</div>
          <div class="col-lg-2 col-sm-3 col-input text-right">
            <button id="upload" class="btn btn-primary">Upload</button>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <list-entry-menu
        @delete-request="deleteRequest"
        @edit-request="toggleEditable"
      ></list-entry-menu>
    </div>
  </div>
</template>

<script>
import { BIconEnvelope, BFormFile } from 'bootstrap-vue';
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
    BFormFile,
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
      files: [],
    };
  },
  computed: {},
  methods: {
    ...mapActions('users', ['userToggleSelection', 'uploadFile']),
    toggleEmailSelect() {
      this.userToggleSelection(this.entry);
      this.selected = !this.selected;
    },
    uploadFiles() {
      this.uploadFile(this.files);
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
  max-width: 50px;
}
</style>
