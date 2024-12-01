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
  }
}

customElements.define("inline-html", InlineHTMLElement);
