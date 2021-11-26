import { dispatch, events } from "../eventbus.js";

import "./summary.js";
import "./article.js";

customElements.define(
  "blog-content",
  class ContentComponent extends HTMLElement {
    constructor() {
      super();
    }

    displaySummaries(articles) {
      this.innerHTML = "";
      let sortedArticles = articles.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );

      // Only show articles that don't have a date in the future
      let filteredArticles = sortedArticles.filter(
        a => new Date(a.created) < new Date()
      );

      filteredArticles.forEach((article) => {
        let fullDate = new Date(article.created).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        this.innerHTML +=
          /*html*/
          `<blog-summary>
            <a slot="summary-title" data-route="${article.url}" class="summary-title" tabindex="0" role="link" href="#">${article.title}</a>
            <p slot="summary-date" class="summary-date">${fullDate}</p>
            <p slot="summary-synopsis" class="summary-synopsis">${article.synopsis}</p>
            <a slot="summary-readmore" data-route="${article.url}" class="summary-readmore">Read more...</a>
           </blog-summary>
             `;
      });
    }

    async displayArticle(article, path) {
      const response = await fetch(article.file);
      const responseText = await response.text();
      const markdown = responseText.substring(
        responseText.lastIndexOf("\n---\n") + 4
      );

      let fullDate = article.created
        ? new Date(article.created).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "";

      let updatedDate = "";
      if (article.updated) {
        updatedDate = `(Updated on ${new Date(article.updated).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })})`;
      }

      let backButtonText =
        article.noBackButton === true ? `` : `Back to ${path}...`;

      const template = document.createElement("template");
      template.innerHTML = /*html*/ `
        <blog-article>
          <p slot="article-title" id="article-title">${article.title}</p>
          <p slot="article-date" id="article-date">${fullDate} <span class="updated-date">${updatedDate}<span></p>
          <p slot="article-body" id="article-body">Loading...</p>
          <a slot="back-button" id="back-button" tabindex="0" href="#">${backButtonText}</a>
        </blog-article>
      `;
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
      this.append(template.content.cloneNode(true));

      // Run the markdown parser to generate the content
      marked(markdown, {}, (err, output) => {
        this.querySelector("blog-article").querySelector(
          "#article-body"
        ).innerHTML = output;

        // Run highlight.js to pretty any code blocks
        hljs.highlightAll();
      });
    }

    displayNotFound() {
      this.innerHTML = `<p>Content not found</p>`;
    }

    async connectedCallback() {
      document.addEventListener(events.LOAD_INDEX, (event) => {
        if (event.detail.index) {
          this.index = event.detail.index;
          dispatch(events.INDEX_LOADED);
        }
      });

      document.addEventListener(
        events.ROUTE_CHANGED,
        async (event) => {
          let content = this.index[event.detail.route.path];
          if (content) {
            let match = content.find(
              (c) => c.url === event.detail.route.toString()
            );
            if (match) {
              await this.displayArticle(match, event.detail.route.path);
            } else {
              this.displaySummaries(content);
            }
          } else {
            this.displayNotFound();
          }
        },
        false
      );
    }
  }
);
