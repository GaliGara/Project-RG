import { LitElement, html, nothing } from 'lit';
import '../../../components/seller-form/SellerForm.js';
import '../../../components/grid-table/GridTable.js';

export class FeatureSalesManagementCrudSales extends LitElement {
  static get properties() {
    return {
      dataGridSales: { type: Object },
    };
  }

  constructor() {
    super();
    this.dataGridSales = {};
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      ${Object.keys(this.dataGridSales || {}).length
        ? html` <seller-form .salesTableConfig="${this.dataGridSales}"></seller-form>`
        : nothing}
    `;
  }
}
customElements.define('feature-sales-management-crud-sales', FeatureSalesManagementCrudSales);
