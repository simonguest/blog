import { events, dispatch } from "../eventbus.js";

customElements.define(
  "blog-link",
  class LinkComponent extends HTMLElement {
    constructor() {
      super();

      this.setAttribute("tabindex", "0");
      this.setAttribute("role", "link");
      this.onclick = () => {
        this.blur();
        dispatch(events.CHANGE_ROUTE, { route: this.getAttribute("data-route") });
      };

      this.onkeypress = (e) => {
        if (e.keyCode === 13) {
          this.blur();
          dispatch(events.CHANGE_ROUTE, { route: this.getAttribute("data-route") });
        }
      };
    }

    get selected() {
      return this.getAttribute("selected");
    }

    set selected(value) {
      if (value) {
        this.setAttribute("selected", "");
      } else {
        this.removeAttribute("selected");
      }
    }

    connectedCallback() {
      document.addEventListener(events.ROUTE_CHANGED, (event) => {
        this.selected = event.detail.route.toString().indexOf(this.getAttribute("data-route")) === 0;
      });
    }
  }
);
