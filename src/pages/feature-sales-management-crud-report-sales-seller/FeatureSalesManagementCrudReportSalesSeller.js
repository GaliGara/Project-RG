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
   * Dispatch request to get sales seller report.
   * @param {Object} data
   * @private
   */
  _sendDate(data) {
    const { startDate, endDate } = data;
    this.dispatchEvent(
      new CustomEvent('feature-sales-management-crud-report-sales-seller-date-range', {
        detail: { startDate, endDate },
      }),
    );
  }

  /**
   * Template for grid table.
   * @returns {TemplateResult}
   * @private
   */
  _tplGridTable() {
    return html` <grid-table .config=${this.salesSellerData}></grid-table> `;
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

  render() {
    return html`
      ${this._tplInputDate()}
      ${Object.keys(this.salesSellerData || {}).length ? this._tplGridTable() : nothing}
    `;
  }
}
customElements.define(
  'feature-sales-management-crud-report-sales-seller',
  FeatureSalesManagementCrudReportSalesSeller,
);
