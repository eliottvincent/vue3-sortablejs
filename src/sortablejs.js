import { bind, update, unbind } from "./directive";

var sortablejsDirective = {
  beforeMount(element, binding) {
    return bind(element, binding);
  },

  updated(element, binding) {
    return update(element, binding);
  },

  beforeUnmount(element) {
    return unbind(element);
  }
};

var sortablejs = {
  install: function(Vue) {
    Vue.directive("sortable", sortablejsDirective);
  },

  directive: sortablejsDirective
};

export default sortablejs;

export { sortablejs };
