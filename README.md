# Vue 3 Sortable

[![Build Status](https://github.com/eliottvincent/vue3-sortablejs/actions/workflows/test.yml/badge.svg)](https://github.com/eliottvincent/vue3-sortablejs/actions) [![Version](https://img.shields.io/npm/v/vue3-sortablejs.svg)](https://www.npmjs.com/package/vue3-sortablejs) [![Downloads](https://img.shields.io/npm/dt/vue3-sortablejs.svg)](https://www.npmjs.com/package/vue3-sortablejs)

Re-orderable drag-and-drop lists, via a **Vue directive**. Based on and offering all features of [Sortable](https://github.com/SortableJS/Sortable).

[[view demo]](https://sortablejs.github.io/Sortable/)


### Yet another Sortable wrapper

Several Vue wrappers for Sortable exist out there, yet I decided to build another one.

The goal was to have a wrapper that:
* supports Vue 3
* is **light** and easy to maintain
* works as a **directive**, for example to conditionally enable / disable the drag-and-drop feature without having to change the whole component
* doesn't iterate on the data by itself
* doesn't update the underlying data model (see [Order mutation](#order-mutation))

As a reference, here are other Sortable wrappers:
* [`vuedraggable`](https://www.npmjs.com/package/vuedraggable) only supports Vue 2
* [`vuedraggable@next`](https://www.npmjs.com/package/vuedraggable) supports Vue 3, but adds a lot of overhead on top of Sortable
* [`vue-sortable`](https://www.npmjs.com/package/vue-sortable) is totally outdated (last update is from 2016)
* [`sortablejs-vue3`](https://www.npmjs.com/package/sortablejs-vue3) is the best wrapper I found, but only works as a component


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

Vue 3 Sortable is also available through npm as the [`vue3-sortablejs`](https://www.npmjs.com/package/vue3-sortablejs) package.

Install the package:
```sh
npm install --save vue3-sortablejs
```

Register the plugin in `App.vue`:
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


## Options

You can pass an object of options, in order to affect the behavior of the directive:
* `disabled` whether to disable the drag-and-drop behavior
* `options` an object containing any [Sortable option](https://github.com/SortableJS/Sortable#options)

```html
<template>
  <div v-sortable="{ disabled: false, options: { animation: 250, easing: 'cubic-bezier(1, 0, 0, 1)' } }">
    <div>a</div>
    <div>b</div>
    <div>c</div>
  </div>
</template>
```


## Events

A custom `ready` event will be triggered as soon as Sortable is registered on the component. You can use it to access the underlying Sortable instance.
As well, you can listen to any native Sortable event.

* `@ready`: Sortable is ready and attached to the component
* `@choose`: element is chosen
* `@unchoose`: element is unchosen
* `@start`: element dragging started
* `@end`: element dragging ended
* `@add`: element is dropped into the list from another list
* `@update`: changed sorting within list
* `@sort`: called by any change to the list (add / update / remove)
* `@remove`: element is removed from the list into another list
* `@filter`: attempt to drag a filtered element
* `@move`: event when you move an item in the list or between lists
* `@clone`: called when creating a clone of element
* `@change`: called when dragging element changes position

```html
<template>
  <div v-sortable @ready="onReady" @end="onOrderChange">
    <div>a</div>
    <div>b</div>
    <div>c</div>
  </div>
</template>

<script>
export default {
  methods: {
    onReady(event) {
      console.log(event.sortable);
    },

    onOrderChange(event) {
      console.log(event.oldIndex);
      console.log(event.newIndex);
    }
  }
};
</script>
```


## Order mutation

This wrapper only impacts the actual DOM order, **it does not mutate the data order**.
This avoids a lot of overhead in the code, and gives you the full control on your data.

It is really simple to change the order in your data after an item is dropped:
```html
<template>
  <div v-sortable @end="onOrderChange">
    <div v-for="item in items">
      {{ item }}
    </div>
  </div>

  <span>Items data: {{ items }}</span>
</template>

<script>
export default {
  data() {
    return {
      items: [ "a", "b", "c" ]
    }
  },

  methods: {
    onOrderChange(event) {
      // Remove item from old index
      let item = this.items.splice(event.oldIndex, 1)[0];

      // Insert it at new index
      this.items.splice(event.newIndex, 0, item);
    }
  }
};
</script>
```


## Notes

It is highly recommended to set a **key on the children items**, to help Sortable track the DOM:

```html
<template>
  <div v-sortable>
    <div key="a">a</div>
    <div key="b">b</div>
    <div key="c">c</div>
  </div>
</template>
```

In the same way, if you use the `group` option, it is highly recommended to set a **key on the parent** itself. Otherwise the DOM managed by Sortable can become out-of-sync with the actual data state. I have noticed this helps a lot when using Sortable with complex components.

The key must be based on the number of items the parent contains. This will force a re-render when an item is added / removed, and make Sortable re-initialize and start from a clean state every time. This may seem a bit hacky, but it's the only way to keep a consistant behavior.

```html
<template>
  <h1>Foo</h1>

  <div v-sortable="{ options: { group: 'items' } }" @end="onOrderChange" :key="fooItems.length">
    <div v-for="item in fooItems" :key="item">
      {{ item }}
    </div>
  </div>

  <h1>Bar</h1>

  <div v-sortable="{ options: { group: 'items' } }" @end="onOrderChange" :key="barItems.length">
    <div v-for="item in barItems" :key="item">
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onOrderChange(event) {
      // Mutate fooItems and barItems
    }
  }
};
</script>
```


## License

vue3-sortablejs is released under the MIT License. See the bundled LICENSE file for details.
