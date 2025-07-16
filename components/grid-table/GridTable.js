import { LitElement, html } from 'lit';
import { Grid } from "https://unpkg.com/gridjs?module";

export class GridTable extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
    };
  }

  constructor() {
    super();
    this.config = {};
  }

  firstUpdated() {
    this._injectGridCSS();

    new Grid(this.config).render(
      this.shadowRoot.querySelector("#grid-container")
    );
  }

  _injectGridCSS() {
    const alreadyInjected = Array.from(
      this.shadowRoot.querySelectorAll("link")
    ).some((link) => link.href.includes("gridjs"));

    if (!alreadyInjected) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/gridjs/dist/theme/mermaid.min.css";
      this.shadowRoot.appendChild(link);
    }
  }

  render() {
    return html` <div id="grid-container"></div> `;
  }
}
customElements.define("grid-table", GridTable);