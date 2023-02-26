import { nextTick } from "vue";
import { mount, createLocalVue } from "@vue/test-utils";

import Sortablejs from "./../src/";
import Component from "./Component.vue";

const global = {
  directives: {
    sortable: Sortablejs.directive
  }
};

describe("initialization", () => {
  it("should be created with no options", () => {
    const wrapper = mount(Component, {
      global: global
    });

    const element = wrapper.get(".element");

    expect(element.exists()).toBe(true);

    // '$s' private store should be attached to element
    expect(element.wrapperElement.$s).toBeDefined();
    expect(element.wrapperElement.$s.options).toBe(null);
    expect(element.wrapperElement.$s.sortable).toBeDefined();

    // Sortable instance should be returned via 'ready' event
    expect(wrapper.emitted()).toHaveProperty("ready");
    expect(wrapper.emitted().ready).toHaveLength(1);
    expect(wrapper.emitted().ready[0][0]).toMatchObject({
      sortable: element.wrapperElement.$s.sortable
    });

    // Order should be correct
    expect(element.wrapperElement.$s.sortable.toArray()).toMatchObject([
      "1", "2", "3"
    ]);
  });

  it("should be created with options", () => {
    const options = {
      animation: 200,
      easing: "cubic-bezier(0.26, 0, 0, 1.05)",
      ghostClass: "element__item--ghost",
      handle: ".element__item-handle"
    };

    const wrapper = mount(Component, {
      props: {
        sortableOptions: {
          options: options
        }
      },

      global: global
    });

    const element = wrapper.get(".element");
    const storeOptions = element.wrapperElement.$s.options;
    const instanceOptions = element.wrapperElement.$s.sortable.options;

    // Store should have correct options
    expect(storeOptions).toStrictEqual(options);

    // Sortable instance should have correct options
    expect(instanceOptions.animation).toStrictEqual(options.animation);
    expect(instanceOptions.easing).toStrictEqual(options.easing);
    expect(instanceOptions.ghostClass).toStrictEqual(options.ghostClass);
    expect(instanceOptions.handle).toStrictEqual(options.handle);
  });

  it("should be created then disabled", async () => {
    const wrapper = mount(Component, {
      props: {
        sortableOptions: {
          disabled: false
        }
      },

      global: global
    });

    const element = wrapper.get(".element");
    expect(element.wrapperElement.$s.sortable).toBeDefined();

    await wrapper.setProps({
      sortableOptions: {
        disabled: true
      }
    });

    expect(element.wrapperElement.$s.sortable).toBeUndefined();
  });
});

describe("basic behavior", () => {
  const chosenClass = "item-chosen";

  const wrapper = mount(Component, {
    props: {
      sortableOptions: {
        options: {
          chosenClass: chosenClass
        }
      }
    },

    global: global
  });

  const itemA = wrapper.get("[data-id=\"1\"]");

  it("should set correct 'chosen' class", async () => {
    const element = wrapper.get(".element");

    await itemA.trigger("mousedown");

    expect(wrapper.emitted()).toHaveProperty("choose");
    expect(itemA.classes()).toContain(chosenClass);
  });

  it("should remove 'chosen' class", async () => {
    document.dispatchEvent(new Event("mouseup"))

    expect(wrapper.emitted()).toHaveProperty("unchoose");
    expect(itemA.classes()).not.toContain(chosenClass);
  });
});
