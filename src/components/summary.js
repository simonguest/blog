const template = document.createElement("template");
template.innerHTML = /*html*/ `
      <slot name="summary-title">No Article Title</slot>
      <slot name="summary-date">No Article Date</slot>
      <slot name="summary-synopsis">No Article Synopsis</slot>
      <slot name="summary-readmore">Read more...</slot>
    `;

customElements.define(
  "blog-summary",
  class SummaryComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.append(template.content.cloneNode(true));
    }

    connectedCallback() {}
  }
);
