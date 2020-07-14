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
        <h5>Dokumente</h5>
        <div>
          <ul class="list-group-striped">
            <li class="list-group-item" v-for="file in this.entry.files" :key="file.id">
              {{ file.showname }}
            </li>
          </ul>
        </div>
        <b-form-file
          class="mt-5"
          multiple
          v-model="files"
          ref="file-input"
          placeholder="Datei hochladen"
          drop-placeholder="Datei hier hin ziehen"
        >
          <template slot="file-name" slot-scope="{ names }" variant="dark">
            <b-badge variant="dark">{{ names[0] }}</b-badge>
            <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
              + {{ names.length - 1 }} More files
            </b-badge>
          </template>
        </b-form-file>
        <div class="mt-3" v-if="files.length > 0">
          <div class="">
            <h5 v-if="files.length > 1">Ausgewählte Dateien:</h5>
            <h5 v-else>Ausgewählte Datei:</h5>
            <ul class="list-group-striped mb-3">
              <upload-document-entry
                v-for="(file, index) in files"
                :key="index"
                :filename="file.name"
                :index="index"
                v-on:getShowname="changeShowname"
              ></upload-document-entry>
            </ul>
          </div>
          <div class="d-flex justify-content-between">
            <div>
              <button class="btn btn-secondary" @click="clearFiles">
                Auswahl löschen
              </button>
            </div>
            <div>
              <button class="btn btn-primary flex-shrink" v-on:click="doUploadFiles">Upload</button>
            </div>
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
import UploadDocumentEntry from './UploadDocumentEntry.vue';

export default {
  name: 'UserListEntry',
  components: {
    UserEdit,
    ListEntryMenu,
    BIconEnvelope,
    BFormFile,
    UploadDocumentEntry,
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
  async created() {
    await this.fetchFiles(this.entry.id);
  },
  async mounted() {
    await this.fetchFiles(this.entry.id);
  },
  methods: {
    ...mapActions('users', ['userToggleSelection', 'uploadFiles', 'fetchFiles']),
    toggleEmailSelect() {
      this.userToggleSelection(this.entry);
      this.selected = !this.selected;
    },
    doUploadFiles() {
      const formData = new FormData();
      const filesData = [];
      this.files.forEach((file, i) => {
        const fileData = {
          filename: file.name,
          showname: file.showname,
        };
        formData.append(`files[${i}]`, file);
        filesData.push(fileData);
      });
      formData.append(`filesData`, JSON.stringify(filesData));
      formData.append(`userId`, this.entry.id);
      this.uploadFiles(formData);
    },
    changeShowname(resp) {
      this.files[resp.index].showname = resp.showname;
    },
    clearFiles() {
      this.$refs['file-input'].reset();
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

ul {
  padding-left: 0;
}
</style>
