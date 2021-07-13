import { createApp } from 'vue'
import App from './App.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueClipboard from 'vue3-clipboard'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueHighlightJS from 'vue3-highlightjs'
import 'vue-slider-component/theme/antd.css'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-tomorrow_night'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faGithub, faBook, faInfoCircle)

createApp(App)
  .use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true
  })
  .use(VueHighlightJS)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
