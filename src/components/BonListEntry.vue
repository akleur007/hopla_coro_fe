<template>
    <div class="row">
        <div class="col-lg-3 col-sm-12">
          {{ entry.email }}
        </div>
        <div class="col-lg-3 col-sm-12">
          {{ entry.credit }}
        </div>
        <div class="col-lg-3 col-sm-12">
          <img id="main-img" :src='newQRCode'/>
        </div>
        <div class="col-lg-3 col-sm-12">
          <div class="row">
            <div class="col-lg-12">
              <button type="submit" class="btn btn-primary mr-2">Ändern</button>
            </div>
            <div class="col-lg-12">
              <button type="submit" class="btn btn-info mr-2">E-Mail</button>
            </div>
             <div class="col-lg-12">
              <button type="submit" class="btn btn-danger mr-2">Löschen</button>
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
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .btn {
    margin-bottom: 10px;
    width: 100%;
  }
</style>
