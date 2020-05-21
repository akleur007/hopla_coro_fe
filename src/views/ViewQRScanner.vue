<template>
  <div class="container">
    <p class="error">{{ error }}</p>
    <view-bon-subtract v-if="!activeScan" :bonId="this.bonId"></view-bon-subtract>
    <button v-if="!this.activeScan" v-on:click="resetResult()" class="btn btn-secondary scanner">
      neuer Scan
    </button>
    <qrcode-stream @decode="onDecode" @init="onInit" v-if="activeScan" />

    <!-- <qrcode-drop-zone></qrcode-drop-zone>
    <qrcode-capture></qrcode-capture> -->
  </div>
</template>

<script>
// import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';
import { mapGetters, mapActions } from 'vuex';
import { QrcodeStream } from 'vue-qrcode-reader';
import ViewBonSubtract from './ViewBonSubtract.vue';

export default {
  name: 'QRScanner',
  components: {
    QrcodeStream,
    ViewBonSubtract,
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

<style>
.scanner {
  width: 100%;
  height: 3.5rem;
  margin-top: 10rem;
}
.qrcode-stream__camera,
.qrcode-stream__pause-frame {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  background-size: cover;
  max-width: inherit !important;
  max-height: inherit !important;
}
.qrcode-stream__inner-wrapper {
  position: inherit !important;
  max-width: inherit !important;
  max-height: inherit !important;
  z-index: inherit !important;
}
</style>
