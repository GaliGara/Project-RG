import { LitElement, html, nothing } from 'lit';
import '../../../components/input-date/InputDate.js';
import '../../../components/grid-table/GridTable.js';

export class FeatureSalesManagementCrudReportDailyPaymentMethod extends LitElement {
  static get properties() {
    return {
      paymentReportDailyData: { type: Array },
    };
  }

  constructor() {
    super();
    this.paymentReportDailyData = [];
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
    return html` <grid-table .config=${this.paymentReportDailyData}></grid-table> `;
  }

  render() {
    return html`
      <input-date type-date="unique"></input-date>
      ${Object.keys(this.paymentReportDailyData || {}).length ? this._tplGridTable() : nothing}
    `;
  }
}
customElements.define(
  'feature-sales-management-crud-report-daily-payment-method',
  FeatureSalesManagementCrudReportDailyPaymentMethod,
);
