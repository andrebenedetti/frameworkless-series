class BinaryInput extends HTMLElement {
  static observedAttributes = ["bits", "display-value-id"];

  bits = [];
  valueDisplay = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.className = "block";
  }

  getTotalValue() {
    let totalValue = 0;
    for (let i = this.bits.length - 1; i >= 0; i--) {
      const exponent = this.bits.length - 1 - i;
      if (this.bits[i].getAttribute("value") === "1") {
        totalValue += 2 ** exponent;
      }
    }
    return totalValue;
  }

  toggleValue(index) {
    const newVal = this.bits[index].getAttribute("value") === "1" ? "0" : "1";
    this.bits[index].setAttribute("value", newVal);

    if (this.valueDisplay) {
      this.valueDisplay.innerHTML = this.getTotalValue();
    }
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "bits") {
      const bits = Number.parseInt(newValue);
      if (isNaN(bits)) return;

      for (let i = 0; i < bits; i++) {
        const bit = document.createElement("button", { is: "bit-input" });
        this.bits.push(bit);
        bit.setAttribute("value", "0");
        bit.addEventListener("click", () => this.toggleValue(i));
        this.appendChild(bit);
      }
    } else if (name === "display-value-id") {
      this.valueDisplay = document.getElementById(newValue);
    }
  }
}

customElements.define("binary-input", BinaryInput);
