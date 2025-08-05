import { LitElement, html } from 'lit';
import '../../../components/keysar-chart/KeysarChart.js';

export class FeatureSalesManagementCrudDashboard extends LitElement {
  static get properties() {
    return {
      /**
       * Set of data for the charts.
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

  render() {
    return html`
      <keysar-chart
        .labels="${this?.data?.labels}"
        .sales="${this?.data?.sales}"
        .dataBarChart="${this?.data?.dataBarChart}"
        .colors="${this?.data?.colors}"
        .chartType="${'pie'}"
      ></keysar-chart>
      <keysar-chart
        .labels="${this?.data?.labels}"
        .sales="${this?.data?.sales}"
        .dataBarChart="${this?.data?.dataBarChart}"
        .colors="${this?.data?.colors}"
        .chartType="${'bar'}"
      ></keysar-chart>
    `;
  }
}
customElements.define(
  'feature-sales-management-crud-dashboard',
  FeatureSalesManagementCrudDashboard,
);
