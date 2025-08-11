import { LitElement, html, nothing } from 'lit';
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

  _getElement(selector) {
    return this.renderRoot?.querySelector(selector) ?? this.querySelector(selector);
  }

  /**
   * Dispatch selected date.
   * @param {e}
   * @private
   */
  _sendDate() {
    const startDate = this._getElement('#startDateDashboardReport')?.value ?? '';
    const endDate = this._getElement('#endDateDashboardReport')?.value ?? '';
    if (startDate && endDate) {
      this.dispatchEvent(
        new CustomEvent('feature-sales-management-crud-report-dashboard-date', {
          detail: { startDate, endDate },
        }),
      );
    }
  }

  /**
   * Template for input select.
   * @returns {TemplateResult}
   * @private
   */
  _tplSelect() {
    return html`
      <p class="text-sm text-center font-semibold text-gray-700">
        SELECCIONA UN RANGO DE FECHA PARA MOSTRAR DATOS
      </p>
      <div class="flex justify-center items-center gap-2 mt-3 mb-3">
        <div class="flex flex-col">
          <label for="startDateDashboardReport" class="mb-1 text-xs font-medium text-gray-600">
            Fecha inicial
          </label>
          <input
            type="date"
            name="startDateDashboardReport"
            id="startDateDashboardReport"
            @change=${this._sendDate}
            class="border border-gray-300 rounded-lg px-3 py-1.5 shadow-xl text-gray-700"
          />
        </div>
        <div class="flex flex-col">
          <label for="endDateDashboardReport" class="mb-1 text-xs font-medium text-gray-600">
            Fecha final
          </label>
          <input
            type="date"
            name="endDateDashboardReport"
            id="endDateDashboardReport"
            @change=${this._sendDate}
            class="border border-gray-300 rounded-lg px-3 py-1.5 shadow-xl text-gray-700"
          />
        </div>
      </div>
    `;
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
      ${this._tplSelect()}
      ${Object.keys(this.totalSalesData || {}).length ? this._tplGridTable() : nothing}
    `;
  }
}
customElements.define(
  'feature-sales-management-crud-report-total-sales',
  FeatureSalesManagementCrudReportTotalSales,
);
