import { LitElement, html } from 'lit';
import { Grid } from "https://unpkg.com/gridjs?module";

export class GridTable extends LitElement {
  static get properties() {
    return {
      
      /**
       * Configuration object passed into Grid.js
       */
      config: { type: Object },
    };
  }

  constructor() {
    super();
    this.config = {};
  }

  /**
   * Lifecycle method triggered after the component is rendered for the first time.
   * Initializes Grid.js and injects its CSS.
   */
  firstUpdated() {
    this._injectGridCSS();

    new Grid(this.config).render(
      this.shadowRoot.querySelector("#grid-container")
    );
  }

  /**
   * Injects Grid.js theme stylesheet into Shadow DOM if it hasn't been added yet.
   * Prevents duplicate stylesheets on multiple instances.
   * @private
   */
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