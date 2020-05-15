<template>
  <div class="container">
    <button v-if="!this.activeScan" v-on:click="resetResult()" class="btn btn-primary">
      Scan
    </button>
    <p class="error">{{ error }}</p>
    <view-bon-edit v-if="!activeScan" :bonId="this.bonId"></view-bon-edit>
    <qrcode-stream @decode="onDecode" @init="onInit" v-if="activeScan" />

    <!-- <qrcode-drop-zone></qrcode-drop-zone>
    <qrcode-capture></qrcode-capture> -->
  </div>
</template>

<script>
// import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';
import { mapGetters, mapActions } from 'vuex';
import { QrcodeStream } from 'vue-qrcode-reader';
import ViewBonEdit from './ViewBonEdit.vue';

export default {
  name: 'QRScanner',
  components: {
    QrcodeStream,
    ViewBonEdit,
    // QrcodeDropZone,
    // QrcodeCapture,
  },
  data() {
    return {
      result: '',
      error: '',
      activeScan: true,
      bonId: '',
    };
  },

  methods: {
    ...mapActions(['fetchBon']),
    async onDecode(result) {
      this.activeScan = false;
      this.result = result;
      const bon = this.allBons.find((item) => item.authKey === result);
      this.bonId = bon.id;
    },
    resetResult() {
      this.activeScan = true;
      this.result = '';
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson';
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device';
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)';
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?';
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable';
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser';
        }
      }
    },
  },
  computed: mapGetters(['allBons', 'activeBon']),
};
</script>

<style></style>
