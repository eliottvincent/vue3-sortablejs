import Sortable from "sortablejs";

/**
 * Triggers on bind
 * @public
 * @param  {object} element
 * @param  {object} binding
 * @return {undefined}
 */
var bind = function(element, binding) {
  if ((binding.value || {}).disabled === true) {
    __reset(element);

    return;
  }

  // Initialize private state ($vue3-sortablejs)
  element.$vs = {};
  element.$vs.sortable = null;
  element.$vs.options = (binding.value || {}).options || null;

  // Initialize Sortable
  element.$vs.sortable = new Sortable(element, {
    ...element.$vs.options
  });

  // Forward Sortable instance
  __emitEvent(element, "ready", {
    sortable: element.$vs.sortable
  });
};

/**
 * Triggers on update
 * @public
 * @param  {object} element
 * @param  {object} binding
 * @return {undefined}
 */
var update = function(element, binding) {
  if (binding.value !== binding.oldValue) {
    bind(element, binding);
  }
};

/**
 * Triggers on unbind
 * @public
 * @param  {object} element
 * @return {undefined}
 */
var unbind = function(element) {
  __reset(element);
};

/**
 * Emits event
 * @private
 * @param  {object} element
 * @param  {string} type
 * @param  {object} data
 * @return {undefined}
 */
var __emitEvent = function(element, type, data) {
  const event = new CustomEvent(type);

  for (let key in data) {
    event[key] = data[key];
  }

  element.dispatchEvent(event);
};

/**
 * Resets
 * @private
 * @param  {object} element
 * @return {undefined}
 */
var __reset = function(element) {
  // Reset Sortable
  if ((element.$vs || {}).sortable) {
    element.$vs.sortable.destroy();
    element.$vs.sortable = null;
  }

  // Reset private state
  element.$vs = {};
};

export { bind, update, unbind };
