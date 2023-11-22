class BinaryInput extends HTMLElement {
  static observedAttributes = ["bits"];

  bits = [];

  constructor() {
    super();
  }

  connectedCallback() {
    this.className = "block";
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "bits") {
      const bits = Number.parseInt(newValue);
      if (isNaN(bits)) return;

      for (let i = 0; i < bits; i++) {
        const bit = document.createElement("button", { is: "bit-input" });
        bit.setAttribute("value", "0");
        this.bits.push(bit);
        this.appendChild(bit);
      }
    }
  }
}

customElements.define("binary-input", BinaryInput);
