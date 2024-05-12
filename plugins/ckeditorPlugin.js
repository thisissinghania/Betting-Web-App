import Vue from "vue";
import browserDetect from "vue-browser-detect-plugin";
import CKEditor from "ckeditor4-vue";

Vue.use(browserDetect);
Vue.use(CKEditor);

Vue.config.productionTip = false;