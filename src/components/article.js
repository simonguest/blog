const template = document.createElement("template");
template.innerHTML = /*html*/ `
      <slot name="article-title">No Article Title</slot>
      <slot name="article-date">No Article Date</slot>
      <slot name="article-body" id="article-body">No Article Body</slot>
      <slot name="back-button" id="back-button"></p>
    `;

customElements.define(
  "blog-article",
  class ArticleComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      this.shadowRoot.append(template.content.cloneNode(true));

      this.shadowRoot.querySelector("#back-button").onclick = (e) => {
        e.preventDefault();
        window.history.back();
      };
    }

    connectedCallback() {}
  }
);
