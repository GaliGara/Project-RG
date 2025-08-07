import { LitElement, html, nothing } from 'lit';
import '../../../components/keysar-chart/KeysarChart.js';
import '../../../components/summary-card/SummaryCard.js';

export class FeatureSalesManagementCrudDashboard extends LitElement {
  static get properties() {
    return {
      /**
       * Set of data for charts and cards.
       * @type {Object}
       * @default {}
       */
      data: {
        type: Object,
      },
      /**
       * Set date.
       * @type {String}
       * @default ''
       */
      _date: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.data = {};
    this._date = '';
  }

  createRenderRoot() {
    return this;
  }

  /**
   * Dispatch selected date.
   * @param {e}
   * @private
   */
  _sendDate(e) {
    this._date = e.target.value;
    this.dispatchEvent(
      new CustomEvent('feature-sales-management-crud-dashboard-date', { detail: this._date }),
    );
  }

  /**
   * Template for the summary cards.
   * @returns {TemplateResult}
   * @private
   */
  _tplCards() {
    return html`
      <div class="flex flex-wrap justify-center gap-x-30">
        <summary-card
          title-card="VENTAS DEL DÍA"
          .dataBranch="${this.data?.card?.day}"
        ></summary-card>
        <summary-card
          title-card="VENTAS DEL MES"
          .dataBranch="${this.data?.card?.month}"
        ></summary-card>
        <summary-card
          title-card="VENTAS DEL AÑO"
          .dataBranch="${this.data?.card?.year}"
        ></summary-card>
      </div>
    `;
  }

  /**
   * Template for the charts.
   * @returns {TemplateResult}
   * @private
   */
  _tplCharts() {
    return html`
      <div class="flex flex-wrap justify-center gap-x-30">
        <keysar-chart
          .labels="${this.data?.chart?.labels}"
          .sales="${this.data?.chart?.sales}"
          .dataBarChart="${this.data?.chart?.dataBarChart}"
          .colors="${this.data?.chart?.colors}"
          .chartType="${'bar'}"
        ></keysar-chart>
        <keysar-chart
          .labels="${this.data?.chart?.labels}"
          .sales="${this.data?.chart?.sales}"
          .dataBarChart="${this.data?.chart?.dataBarChart}"
          .colors="${this.data?.chart?.colors}"
          .chartType="${'pie'}"
        ></keysar-chart>
      </div>
    `;
  }

  /**
   * Template for input select.
   * @returns {TemplateResult}
   * @private
   */
  _tplSelect() {
    return html`
      <div class="flex flex-col items-center gap-2 mt-3 mb-3">
        <p class="text-sm font-semibold text-gray-700">SELECCIONA FECHA PARA MOSTRAR DATOS</p>
        <input
          type="date"
          name="dateDashboardReport"
          id="dateDashboardReport"
          .value=${this._date}
          @change=${e => this._sendDate(e)}
          class="border border-gray-300 rounded-lg px-3 py-1.5 shadow-xl text-gray-700"
        />
      </div>
    `;
  }

  render() {
    return html`
      ${this._tplSelect()}
      ${Object.keys(this.data || {}).length
        ? html` <div class="flex flex-col gap-6">${this._tplCards()} ${this._tplCharts()}</div> `
        : nothing}
    `;
  }
}
customElements.define(
  'feature-sales-management-crud-dashboard',
  FeatureSalesManagementCrudDashboard,
);
