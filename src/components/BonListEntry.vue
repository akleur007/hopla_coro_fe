<template>
    <div class="row">
      <div class="col-md-8">
        <div class="row">
          <div class="col-lg-6 col-6 col1">
            <div class="row">
              <div class="col-lg-12">
                {{ bon.name }}
              </div>
              <div class="col-lg-12">
                {{ bon.email }}
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-4 credit col2">
            {{ bon.credit }}€
          </div>
          <div class="col-lg-3 col-2 qr-code-wrapper col3">
            <img id="main-img" :src='newQRCode'/>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="row">
          <div class="col-lg-12">
            <button type="submit" class="btn btn-primary mr-2">
              <router-link :to="`/bon/${bon.id}`">
                Ändern
              </router-link>
            </button>
          </div>
          <div class="col-lg-12">
            <button type="submit" class="btn btn-info mr-2" v-on:click="sendEmail">E-Mail</button>
          </div>
          <div class="col-lg-12">
            <button type="submit" class="btn btn-danger mr-2" v-on:click="deleteEntry">Löschen</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import QRious from 'qrious';

export default {
  name: 'BonListEntry',
  props: {
    msg: String,
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
    sendEmail() {
      this.$emit('sendEmail', this.bon.id);
    },
    deleteEntry() {
      this.$emit('deleteEntry', this.bon.id);
    },
  },
  created() {
    // this.listEntries();
    // this.fetchBons();
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

  .credit {
    font-size: 2.5rem;
  }

  /* .col1 {
    background: #5c8f94;
  }

  .col2 {
    border: 1px solid #5c8f94;
  }

  .col3 {
    background: #5c8f94;
  } */

  .qr-code-wrapper {

    text-align: right;;
    img {
      width: 60px;
      height: 60px;
    }
  }
</style>
