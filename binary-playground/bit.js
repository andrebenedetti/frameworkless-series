class BitInput extends HTMLButtonElement {
  static observedAttributes = ["value"];

  constructor() {
    super();
  }

  connectedCallback() {
    this.className = "text-4xl text-white mr-1";
    this.type = "button";
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "value") {
      this.innerHTML = newValue;
    }
  }
}

customElements.define("bit-input", BitInput, { extends: "button" });
