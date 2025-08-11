import { LitElement, html, nothing } from 'lit';
import '../../../components/input-date/InputDate.js';
import '../../../components/grid-table/GridTable.js';

export class FeatureSalesManagementCrudReportSalesSeller extends LitElement {
  static get properties() {
    return {
      salesSellerData: { type: Array },
    };
  }

  constructor() {
    super();
    this.salesSellerData = [];
  }

  createRenderRoot() {
    return this;
  }

  /**
   * Template for grid table.
   * @returns {TemplateResult}
   * @private
   */
  _tplGridTable() {
    return html` <grid-table .config=${this.salesSellerData}></grid-table> `;
  }

  render() {
    return html`
      <input-date type-date="between"></input-date>
      ${Object.keys(this.salesSellerData || {}).length ? this._tplGridTable() : nothing}
    `;
  }
}
customElements.define(
  'feature-sales-management-crud-report-sales-seller',
  FeatureSalesManagementCrudReportSalesSeller,
);
