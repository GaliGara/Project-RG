import { LitElement, html, nothing } from "lit";
import '@components/sales-api-dm/SalesApiDm'

export class FeatureSalesManagementCrudDM extends LitElement {
  static get properties() {
    return {
      dispatchFetchCrudSales: {type: Boolean},
      dataSalesBranch: {type: Array},
    };
  }

  constructor() {
    super();
    this.dispatchFetchCrudSales = false;
    this.dataSalesBranch = [];
  }

  get _salesDm() {
    return this.shadowRoot.querySelector("sales-api-dm")
  }

  _getSalesBranch(){
    console.log('_getSalesBranch')
    this._salesDm.getSalesBranch()
    this.dispatchEvent(new CustomEvent('get-data-sales-branch', {
       detail: data}));
  }

  _setDataSalesBranch(e){
    console.log('_setDataSalesBranch', e)
    this.dataSalesBranch = e.detail
    this.dispatchEvent(new CustomEvent('set-data-sales-branch', {
       detail: this.dataSalesBranch
      }));
  }


  render() {
    return html`
      ${this.dispatchFetchCrudSales?
        this._getSalesBranch()
        :nothing}
      <sales-api-dm @get-sales-branch=${(e) => this._setDataSalesBranch(e)}></sales-api-dm>
      <h1>hola dm</h1> `;

  }
}
customElements.define(
  "feature-sales-management-crud-dm",
  FeatureSalesManagementCrudDM
);
