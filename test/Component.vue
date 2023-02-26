<template>
  <div class="element"
    v-sortable="sortableOptions"
    @ready="onEvent"
    @start="onEvent"
    @add="onEvent"
    @remove="onEvent"
    @update="onEvent"
    @end="onEvent"
    @choose="onEvent"
    @unchoose="onEvent"
    @sort="onEvent"
    @filter="onEvent"
    @clone="onEvent"
  >
    <div data-id="1">a</div>
    <div data-id="2">b</div>
    <div data-id="3">c</div>
  </div>
</template>

<script>
export default {
  props: {
    sortableOptions: {
      type: Object,

      default: () => {
        return {};
      }
    }
  },

  methods: {
    onEvent(event) {
      this.$emit(event.type, event);
    },
  }
}
</script>
