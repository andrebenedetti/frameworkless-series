class BinaryInput extends HTMLElement {
  static observedAttributes = ["bits"];

  bits = [];

  constructor() {
    super();
  }

  connectedCallback() {
    this.className = "block";
  }

  getTotalValue() {
    let totalValue = 0
    for (let i = this.bits.length - 1; i >= 0; i--) {
      const exponent = this.bits.length - 1 - i
      if (this.bits[i].getAttribute("value") === "1") {
        totalValue += 2 ** exponent
      }
    }
    return totalValue
  }

  toggleValue(index) {
    const newVal = this.bits[index].getAttribute("value") === "1" ? "0" : "1"
    this.bits[index].setAttribute("value", newVal)
    console.log(this.getTotalValue())
  }


  attributeChangedCallback(name, _, newValue) {
    if (name === "bits") {
      const bits = Number.parseInt(newValue);
      if (isNaN(bits)) return;

      for (let i = 0; i < bits; i++) {
        const bit = document.createElement("button", { is: "bit-input" });
        this.bits.push(bit);
        bit.setAttribute("value", "0");
        bit.addEventListener("click", () => this.toggleValue(i))
        this.appendChild(bit);
      }
    }
  }
}

customElements.define("binary-input", BinaryInput);
