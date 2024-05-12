import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faPlus,
  faXmark,
  faAngleLeft,
  faAngleRight,
  faEllipsis,
  faCircleExclamation,
  faArrowRight,
  faArrowLeft,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.component("font-awesome-icon", FontAwesomeIcon);

library.add(
  faXmark,
  faPlus,
  faAngleLeft,
  faAngleRight,
  faArrowRight,
  faArrowLeft,
  faEllipsis,
  faCircleExclamation,
  faCircleCheck
);