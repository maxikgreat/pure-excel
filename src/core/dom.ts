class Dom {

}

interface $function extends Function {
  create: (tagName: keyof HTMLElementTagNameMap, classes?: string) => HTMLElement,
}

// @ts-expect-error
const $: $function = () => new Dom();

export default $;

Object.defineProperties($, {
  create: {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (tagName: keyof HTMLElementTagNameMap, classes?: string) => {
      const el = document.createElement(tagName);

      if (classes) {
        el.classList.add(classes);
      }

      return el;
    },
  },
});
