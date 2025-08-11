import { LitElement, html, nothing } from 'lit';
import '../../../components/keysar-chart/KeysarChart.js';
import '../../../components/summary-card/SummaryCard.js';

export class FeatureSalesManagementCrudReportDashboard extends LitElement {
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
          .salesTotal="${this.data?.card?.total?.day?.total}"
        ></summary-card>
        <summary-card
          title-card="VENTAS DEL MES"
          .dataBranch="${this.data?.card?.month}"
          .salesTotal="${this.data?.card?.total?.month?.total}"
        ></summary-card>
        <summary-card
          title-card="VENTAS DEL AÑO"
          .dataBranch="${this.data?.card?.year}"
          .salesTotal="${this.data?.card?.total?.year?.total}"
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
          chart-type="bar"
          title-chart="TOTAL MENSUAL GENERAL"
        ></keysar-chart>
        <keysar-chart
          .labels="${this.data?.chart?.labels}"
          .sales="${this.data?.chart?.sales}"
          .dataBarChart="${this.data?.chart?.dataBarChart}"
          .colors="${this.data?.chart?.colors}"
          chart-type="pie"
          title-chart="VENTAS POR VENDEDOR MENSUAL"
        ></keysar-chart>
      </div>
    `;
  }

  /**
   * Template for input date.
   * @returns {TemplateResult}
   * @private
   */
  static _tplInputDate() {
    return html`<input-date type-date="unique"></input-date>`;
  }

  render() {
    return html`
      ${FeatureSalesManagementCrudReportDashboard._tplInputDate()}
      ${Object.keys(this.data || {}).length
        ? html` <div class="flex flex-col gap-6">${this._tplCards()} ${this._tplCharts()}</div> `
        : nothing}
    `;
  }
}
customElements.define(
  'feature-sales-management-crud-report-dashboard',
  FeatureSalesManagementCrudReportDashboard,
);
