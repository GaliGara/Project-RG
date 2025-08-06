import { LitElement, html } from 'lit';
import '../../../components/keysar-chart/KeysarChart.js';
import '../../../components/summary-card/SummaryCard.js';

export class FeatureSalesManagementCrudDashboard extends LitElement {
  static get properties() {
    return {
      /**
       * Set of data for charts and cards.
       * @type Object
       * @default {}
       */
      data: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this.data = {};
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
      <summary-card title-card="VENTAS DEL DÍA" .dataBranch="${this.data?.card}"></summary-card>
    `;
  }

  /**
   * Template for the charts.
   * @returns {TemplateResult}
   * @private
   */
  _tplCharts() {
    return html`
      <keysar-chart
        .labels="${this.data?.chart?.labels}"
        .sales="${this.data?.chart?.sales}"
        .dataBarChart="${this.data?.chart?.dataBarChart}"
        .colors="${this.data?.chart?.colors}"
        .chartType="${'pie'}"
      ></keysar-chart>
      <keysar-chart
        .labels="${this.data?.chart?.labels}"
        .sales="${this.data?.chart?.sales}"
        .dataBarChart="${this.data?.chart?.dataBarChart}"
        .colors="${this.data?.chart?.colors}"
        .chartType="${'bar'}"
      ></keysar-chart>
    `;
  }

  render() {
    return html` ${this._tplCards()} ${this._tplCharts()} `;
  }
}
customElements.define(
  'feature-sales-management-crud-dashboard',
  FeatureSalesManagementCrudDashboard,
);
