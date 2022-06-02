import { events, dispatch } from "./eventbus.js";

export class Route {
  constructor(path, slug) {
    this.path = path;
    this.slug = slug;
  }

  static parse(pathname) {
    let parts = pathname.split("/");
    if (parts.length === 2) {
      return new Route(parts[1], undefined);
    }
    if (parts.length === 3) {
      return new Route(parts[1], parts[2]);
    }
  }

  toString() {
    if (this.slug) {
      return `/${this.path}/${this.slug}`;
    } else {
      return `/${this.path}`;
    }
  }
}

customElements.define(
  "blog-router",
  class RouterComponent extends HTMLElement {
    constructor() {
      super();
    }

    get defaultRoute() {
      return this.getAttribute("defaultRoute") || "/";
    }

    set defaultRoute(value) {
      this.setAttribute("defaultRoute", value);
    }

    connectedCallback() {
      document.addEventListener(events.INDEX_LOADED, () => {
        let route = Route.parse(window.location.pathname);
        if (window.location.pathname === "/") {
          dispatch(events.CHANGE_ROUTE, { route: this.defaultRoute });
        } else {
          dispatch(events.ROUTE_CHANGED, { route: route });
        }
      });

      document.addEventListener(events.CHANGE_ROUTE, (ev) => {
        if (ev.detail.route) {
          history.pushState("", "", ev.detail.route);
          dispatch(events.ROUTE_CHANGED, {
            route: Route.parse(ev.detail.route),
          });
        }
        if (ev.detail.windowTitle) {
          document.title = `${ev.detail.windowTitle} - simonguest.com`;
        } else {
          document.title = 'simonguest.com'
        }
      });

      window.addEventListener("popstate", () => {
        let route = Route.parse(window.location.pathname);
        if (route) {
          dispatch(events.ROUTE_CHANGED, { route: route });
        }
      });
    }
  }
);
