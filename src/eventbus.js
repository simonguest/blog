export const events = {
  LOAD_INDEX: "LOAD_INDEX",
  INDEX_LOADED: "CONTENT_LOADED",
  CHANGE_ROUTE: "CHANGE_ROUTE",
  ROUTE_CHANGED: "ROUTE_CHANGED"
}

export const dispatch = (event, detail = {}) => {
  console.log(`Dispatch: [${event}]` + JSON.stringify(detail));
  document.dispatchEvent(new CustomEvent(event, { detail: detail }));
}