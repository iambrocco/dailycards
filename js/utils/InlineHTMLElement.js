export default class InlineHTMLElement extends HTMLElement {
  static observedAttributes = ["src"];

  #cache = new Map();
  async attributeChangedCallback(name, oldValue, newValue) {
    if (name !== "src") return;

    const src = newValue;

    if (src && this.#cache.has(src)) {
      this.innerHTML = this.#cache.get(src);
      return;
    }

    if (!src) {
      this.innerHTML = "";
      return;
    }

    const result = await fetch(src).then((response) => response.text());
    this.#cache.set(src, result);

    this.innerHTML = result;

    const rootNode = this.children[0];
    if (rootNode) {
      const attributesToCopy = Object.keys(this.dataset).filter((key) =>
        /^attr[A-Z0-9]/.test(key)
      );
      for (const attribute of attributesToCopy) {
        let attributeName = attribute.replace(/^attr/, "");
        attributeName =
          attributeName.charAt(0).toLowerCase() + attributeName.slice(1);

        rootNode.setAttribute(attributeName, this.dataset[attribute]);
      }
    }
  }
}

customElements.define("inline-html", InlineHTMLElement);
