# Vue 3 Sortable

[![Build Status](https://github.com/eliottvincent/vue3-sortablejs/actions/workflows/test.yml/badge.svg)](https://github.com/eliottvincent/vue3-sortablejs/actions) [![Version](https://img.shields.io/npm/v/vue3-sortablejs.svg)](https://www.npmjs.com/package/vue3-sortablejs) [![Downloads](https://img.shields.io/npm/dt/vue3-sortablejs.svg)](https://www.npmjs.com/package/vue3-sortablejs)

Re-orderable drag-and-drop lists, via a **Vue directive**. Based on and offering all features of [Sortable](https://github.com/SortableJS/Sortable).

[[view demo]](https://sortablejs.github.io/Sortable/)


#### Yet another Sortable wrapper

Several Vue wrappers for Sortable exist out there, yet I decided to build another one.

The goal was to have a wrapper that:
* supports Vue 3
* is **light** and easy to maintain
* works as a **directive**, for example to conditionally enable / disable the drag-and-drop feature without having to change the whole component
* doesn't update the underlying data model (more on that later)

As a reference, here are the wrappers that I tested:
* `[vuedraggable](https://www.npmjs.com/package/vuedraggable)` only supports Vue 2
* `[vuedraggable@next](https://www.npmjs.com/package/vuedraggable)` supports Vue 3, but adds a lot of overhead on top of Sortable
* `[vue-sortable](https://www.npmjs.com/package/vue-sortable)` is totally outdated (last update is from 2016)
* `[sortablejs-vue3](https://www.npmjs.com/package/sortablejs-vue3)` is the best wrapper I found, but only works as a component


## Usage

Get Vue 3 Sortable from [jsDelivr](https://cdn.jsdelivr.net/npm/vue3-sortablejs/dist/vue3-sortablejs.global.js) or [UNPKG](https://unpkg.com/vue3-sortablejs/dist/vue3-sortablejs.global.js) and use it like this:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
<script src="https://unpkg.com/vue3-sortablejs/dist/vue3-sortablejs.global.js"></script>

<div id="app">
  <div v-sortable>
    <div>a</div>
    <div>b</div>
    <div>c</div>
  </div>
</div>

<script>
  const { createApp } = Vue;

  const app = createApp();

  app.use(sortablejs);

  app.mount("#app");
</script>
```

Vue 3 Sortable is also available through npm as the `[vue3-sortablejs](https://www.npmjs.com/package/vue3-sortablejs)` package.

Install the package:
```sh
npm install --save vue3-sortablejs
```

Register the plugin in your `App.vue` file:
```js
import VueSortable from "vue3-sortablejs";

app.use(VueSortable);
```

And then use it like this in `MyComponent.vue`:
```html
<template>
  <h1>My Component</h1>

  <div v-sortable>
    <div>a</div>
    <div>b</div>
    <div>c</div>
  </div>
</template>
```
