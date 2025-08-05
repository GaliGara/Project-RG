import { LitElement, html } from "lit";
import Chart from "chart.js/auto";

export class KeysarChart extends LitElement {
  static get properties() {
    return {
      colors: { type: Array },
      chartType: { type: String },
      dataBarChart: { type: Array },
      labels: { type: Array },
      sales: { type: Array },
    };
  }

  constructor() {
    super();
    this.colors = [];
    this.chartType = "";
    this.dataBarChart = [];
    this.labels = [];
    this.sales = [];
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    const ctx = this.querySelector("#myChart").getContext("2d");
    const chartData = this.getChartData(this.chartType);

    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: chartData,
    });
  }

  getChartData(type) {
    const dataTypes = {
      bar: {
        labels: ["Ventas"],
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
    return html` <canvas id="myChart"></canvas> `;
  }
}
customElements.define("keysar-chart", KeysarChart);
