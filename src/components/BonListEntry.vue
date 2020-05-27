<template>
  <div class="row">
    <div class="col-md-9">
      <div class="row">
        <div class="col-9">
          <div class="row">
            <div class="col-4 email-button">
              <button
                type="submit"
                class="btn mr-2 btn-primary"
                :class="{
                  'btn-info': this.bon.initialized && !this.selected,
                  'btn-light': !this.bon.initialized && !this.selected,
                  'btn-success': this.selected,
                }"
                v-on:click="selectForEmail"
              >
                <b-icon-envelope></b-icon-envelope>
              </button>
            </div>
            <div class="col-8 text-right credit">{{ bon.credit }}€</div>
            <div class="col">
              <div class="row">
                <div class="col-12 bon-name">
                  <strong>{{ bon.name }}</strong>
                </div>
                <div class="col-12">{{ bon.email }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 qr-code-wrapper">
          <img id="main-img" :src="newQRCode" class="img-fluid" />
        </div>
      </div>
      <div class="col">
        <view-bon-edit
          :bonId="this.bon.id"
          v-if="editable"
          v-on:saved="toggleEditable()"
        ></view-bon-edit>
      </div>
    </div>
    <div class="col-md-3">
      <div class="row">
        <div class="col-md-12 col-6">
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
        <div class="col-md-12 col-6">
          <button type="submit" class="btn btn-danger mr-2" v-on:click="addDeleteRequest">
            Löschen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRious from 'qrious';
import { mapActions } from 'vuex';
import { BIconEnvelope, BIconPencil } from 'bootstrap-vue';
import ViewBonEdit from '../views/ViewBonEdit.vue';

export default {
  name: 'BonListEntry',
  components: {
    ViewBonEdit,
    BIconPencil,
    BIconEnvelope,
  },
  data() {
    return {
      editable: false,
      editButtonText: 'Ändern',
      selected: false,
    };
  },
  props: {
    bon: Object,
  },
  computed: {
    newQRCode() {
      const qrcode = new QRious();
      qrcode.size = 150;
      qrcode.background = '#fff';
      qrcode.value = this.bon.authKey;
      return qrcode.toDataURL();
    },
  },
  methods: {
    ...mapActions(['bonToggleSelection']),
    sendEmail() {
      this.$emit('sendEmail', this.bon.id);
    },
    selectForEmail() {
      this.bonToggleSelection(this.bon);
      this.selected = !this.selected;
    },
    addDeleteRequest() {
      this.$emit('addDeleteRequest', this.bon.id);
    },
    toggleEditable() {
      this.editable = !this.editable;
      this.editButtonText = this.editable ? 'Abbrechen' : 'Ändern';
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
