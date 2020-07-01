<template>
  <div class="row">
    <div class="col-md-9 col-9">
      <div class="row" v-if="!editable">
        <div class="col-9">
          <div class="row">
            <div class="col-4 email-button">
              <button
                type="submit"
                class="btn mr-2 btn-primary"
                :class="{
                  'btn-info': !this.entry.initialized && !this.selected,
                  'btn-primary': this.entry.initialized && !this.selected,
                  'btn-success': this.selected,
                }"
                v-on:click="toggleEmailSelect"
              >
                <b-icon-envelope></b-icon-envelope>
              </button>
            </div>
            <div class="col-8 text-right credit">{{ entry.credit }}€</div>
            <div class="col">
              <div class="row">
                <div class="col-12 bon-name">
                  <strong>{{ entry.name }}</strong>
                </div>
                <div class="col-12">{{ entry.email }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 qr-code-wrapper d-none d-md-block">
          <img id="main-img" :src="newQRCode" class="img-fluid" />
        </div>
      </div>
      <div class="col">
        <bon-edit :bonId="this.entry.id" v-if="editable" v-on:saved="toggleEditable()"></bon-edit>
      </div>
    </div>
    <div class="col-md-3 col-3">
      <list-entry-menu
        @delete-request="deleteRequest"
        @edit-request="toggleEditable"
      ></list-entry-menu>
    </div>
  </div>
</template>

<script>
import QRious from 'qrious';
import { mapActions } from 'vuex';
import { BIconEnvelope } from 'bootstrap-vue';
import BonEdit from './BonEdit.vue';
import ListEntryMenu from './ListEntryMenu.vue';
import listEntryMenuLogic from '../mixins/listEntryHelper';

export default {
  name: 'BonListEntry',
  components: {
    BonEdit,
    ListEntryMenu,
    BIconEnvelope,
  },
  mixins: [listEntryMenuLogic],
  data() {
    return {
      selected: false,
    };
  },
  props: {
    entry: Object,
  },
  computed: {
    newQRCode() {
      const qrcode = new QRious();
      qrcode.size = 150;
      qrcode.background = '#fff';
      qrcode.value = this.entry.authKey;
      return qrcode.toDataURL();
    },
  },
  methods: {
    ...mapActions(['bonToggleSelection']),
    toggleEmailSelect() {
      this.bonToggleSelection(this.entry);
      this.selected = !this.selected;
    },
  },
  created() {},
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

.overlay {
  position: relative;
  top: 0;
  background: #cacaca;
  width: 100%;
  padding: 0 2rem;
}

.email-button {
  max-width: 80px;
}

.bon-name {
  font-size: 1.3rem;
}

.credit {
  font-size: 2rem;
}

.qr-code-wrapper {
  padding: 0 auto;
  text-align: right;
  img {
    max-width: 3.6rem;
    max-height: 3.6rem;
  }
}
</style>
