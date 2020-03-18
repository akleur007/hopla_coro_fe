<template>
    <div class="row">
        <div class="col-lg-3 col-sm-12">
          {{ entry.email }}
        </div>
        <div class="col-lg-3 col-sm-12">
          {{ entry.name }}
        </div>
        <div class="col-lg-3 col-sm-12">
          <img id="main-img" :src='newQRCode'/>
        </div>
        <div class="col-lg-3 col-sm-12">
            <button type="submit" class="btn btn-primary mr-2">Ändern</button>
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
      qrcode.value = this.entry.qrCodeContent;
      return qrcode.toDataURL();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
