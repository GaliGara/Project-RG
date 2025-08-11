import { LitElement, html, nothing } from 'lit';
import '../../../components/input-date/InputDate.js';
import '../../../components/grid-table/GridTable.js';

export class FeatureSalesManagementCrudReportTotalSales extends LitElement {
  static get properties() {
    return {
      totalSalesData: { type: Object },
    };
  }

  constructor() {
    super();
    this.totalSalesData = {};
  }

  createRenderRoot() {
    return this;
  }

  /**
   * Dispatch selected date.
   * @private
   */
  _sendDate(data) {
    const { startDate, endDate } = data;
    this.dispatchEvent(
      new CustomEvent('feature-sales-management-crud-report-dashboard-date', {
        detail: { startDate, endDate },
      }),
    );
  }

  /**
   * Template for input date.
   * @returns {TemplateResult}
   * @private
   */
  _tplInputDate() {
    return html`<input-date
      type-date="between"
      @input-date-between-data="${e => this._sendDate(e.detail)}"
    ></input-date>`;
  }

  /**
   * Template for grid table.
   * @returns {TemplateResult}
   * @private
   */
  _tplGridTable() {
    return html` <grid-table .config=${this.totalSalesData}></grid-table> `;
  }

  render() {
    return html`
      ${this._tplInputDate()}
      ${Object.keys(this.totalSalesData || {}).length ? this._tplGridTable() : nothing}
    `;
  }
}
customElements.define(
  'feature-sales-management-crud-report-total-sales',
  FeatureSalesManagementCrudReportTotalSales,
);
