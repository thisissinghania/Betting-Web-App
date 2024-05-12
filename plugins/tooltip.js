import Vue from "vue"
import { VTooltip, VPopover, VClosePopover } from "v-tooltip";
import '@/assets/css/tooltip.css'

VTooltip.options.defaultClass = 'my-tooltip';
Vue.directive("tooltip", VTooltip);
Vue.directive("close-popover", VClosePopover)
Vue.component("v-popover", VPopover)