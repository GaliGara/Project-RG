import { LitElement, html, nothing } from 'lit';
import '../../../components/input-date/InputDate.js';
import '../../../components/grid-table/GridTable.js';

export class FeatureSalesManagementCrudReportPaymentMethod extends LitElement {
  static get properties() {
    return {
      paymentReportData: { type: Array },
    };
  }

  constructor() {
    super();
    this.paymentReportData = [];
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
    return html` <grid-table .config=${this.paymentReportData}></grid-table> `;
  }

  render() {
    return html`
      <input-date type-date="between"></input-date>
      ${Object.keys(this.paymentReportData || {}).length ? this._tplGridTable() : nothing}
    `;
  }
}
customElements.define(
  'feature-sales-management-crud-report-payment-method',
  FeatureSalesManagementCrudReportPaymentMethod,
);
