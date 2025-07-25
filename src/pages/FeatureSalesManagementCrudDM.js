import { LitElement, html } from "lit";
import '@components/sales-api-dm/SalesApiDm'

export class FeatureSalesManagementCrudDM extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  get _salesDm() {
    return this.shadowRoot.querySelector("sales-api-dm")
  }

  _getSalesBranch(){
    this._salesDm.getSalesBranch()
  }


  render() {
    return html`
      <sales-api-dm></sales-api-dm>
      <h1>hola dm</h1> `;

  }
}
customElements.define(
  "feature-sales-management-crud-dm",
  FeatureSalesManagementCrudDM
);
