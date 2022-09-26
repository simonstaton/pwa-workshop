export default class Base {
  constructor(template, container) {
    const containerEl =
      typeof container === "string"
        ? window.container.querySelector(container)
        : container;
    this.template = template;
    const clone = this.template.content.cloneNode(true);
    this.rootEl = clone.children[0];
    containerEl.innerHTML = "";
    containerEl.appendChild(clone);
  }
}
