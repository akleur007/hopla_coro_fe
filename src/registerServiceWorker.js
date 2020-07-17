import { Workbox } from 'workbox-window';

let wbTmp = null;
if ('serviceWorker' in navigator) {
  wbTmp = new Workbox(`${process.env.BASE_URL}service-worker.js`);
  wbTmp.addEventListener('controlling', () => {
    window.location.reload();
  });
  wbTmp.register();
}

// Not allowed to export let so...
const wb = wbTmp;

export default wb;
