import { LitElement, html } from 'lit';
import Chart from 'chart.js/auto';

export class KeysarChart extends LitElement {
  static get properties() {
    return {
      /**
       * Set of colors for the chart.
       * @type {Array}
       * @default []
       */
      colors: {
        type: Array,
      },
      /**
       * Type of chart to display.
       * @type {String}
       * @default ''
       */
      chartType: {
        type: String,
      },
      /**
       * Data for the bar chart.
       * @type {Array}
       * @default []
       */
      dataBarChart: {
        type: Array,
      },
      /**
       * Set of labels for the pie chart.
       * @type {Array}
       * @default []
       */
      labels: {
        type: Array,
      },
      /**
       * Set of sales data for the pie chart.
       * @type {Array}
       * @default []
       */
      sales: {
        type: Array,
      },
    };
  }

  constructor() {
    super();
    this.colors = [];
    this.chartType = '';
    this.dataBarChart = [];
    this.labels = [];
    this.sales = [];
  }

  createRenderRoot() {
    return this;
  }

  updated() {
    if (this.chart) {
      this.chart.destroy();
    }

    const canvas = this.querySelector('canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const chartData = this._formatChartData(this.chartType);

    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: chartData,
    });
  }

  /**
   * Formats the chart data based on the type.
   * @param {String} type
   * @private
   */
  _formatChartData(type) {
    const dataTypes = {
      bar: {
        labels: ['Ventas'],
        datasets: this?.dataBarChart,
      },
      pie: {
        labels: this?.labels,
        datasets: [
          {
            data: this?.sales,
            backgroundColor: this?.colors?.slice(0, this?.sales.length),
            borderWidth: 1,
          },
        ],
      },
    };
    return dataTypes[type];
  }

  render() {
    return html` <canvas></canvas> `;
  }
}
customElements.define('keysar-chart', KeysarChart);
