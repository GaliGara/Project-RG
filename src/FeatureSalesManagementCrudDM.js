import { LitElement, html } from 'lit';
import '../components/sales-api-dm/SalesApiDm.js';
import '../components/employee-api-dm/EmployeeApiDm.js';
import '../components/branches-api-dm/BranchesApiDm.js';
import '../components/payment-method-api-dm/PaymentMethodApiDm.js';
import '../components/report-api-dm/ReportApiDm.js';
import { chatColors } from './utils/configPages.js';

export class FeatureSalesManagementCrudDM extends LitElement {
  static get properties() {
    return {
      dataSalesBranch: { type: Array },
      dataEmployee: { type: Array },
      dataBranches: { type: Array },
      dataPaymentMethod: { type: Array },
      /**
       * Set of data for dashboard charts and cards.
       * @type {Object}
       * @default {}
       * @private
       */
      _dataSalesBranchReport: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this.dataSalesBranch = [];
    this.dataEmployee = [];
    this.dataBranches = [];
    this.dataPaymentMethod = [];
    this._dataSalesBranchReport = {};
  }

  get _salesDm() {
    return this.shadowRoot.querySelector('sales-api-dm');
  }

  get _employeeDm() {
    return this.shadowRoot.querySelector('employee-api-dm');
  }

  get _branchesDm() {
    return this.shadowRoot.querySelector('branches-api-dm');
  }

  get _paymentMethodDm() {
    return this.shadowRoot.querySelector('payment-method-api-dm');
  }

  get _reportApiDm() {
    return this.shadowRoot.querySelector('report-api-dm');
  }

  getEmployee() {
    this._employeeDm.getEmployee();
  }

  getSalesBranch() {
    this._salesDm.getSalesBranch();
  }

  getBranches() {
    this._branchesDm.getBranches();
  }

  getPaymentMethod() {
    this._paymentMethodDm.getPaymentMethod();
  }

  /**
   * Dispatch request to get sales branch chart report.
   * @public
   */
  getSalesBranchChartReport() {
    this._reportApiDm.getSalesBranchChartReport();
  }

  /**
   * Dispatch request to get sales branch card report from a date of day, month and year.
   * @param {String} date
   * @public
   */
  getSalesBranchReport(date) {
    const formatDates = {
      month: date.slice(0, 7),
      year: date.slice(0, 4),
    };
    this._reportApiDm.getSalesBranchReport(date, 'day');
    this._reportApiDm.getSalesBranchReport(formatDates.month, 'month');
    this._reportApiDm.getSalesBranchReport(formatDates.year, 'year');
  }

  _setDataSalesBranch(e) {
    this.dataSalesBranch = e.detail;
    this.dispatchEvent(
      new CustomEvent('set-data-sales-branch', {
        detail: this.dataSalesBranch,
      }),
    );
  }

  _setDataEmployee(e) {
    this.dataEmployee = e.detail;
    this.dispatchEvent(
      new CustomEvent('set-data-employee', {
        detail: this.dataEmployee,
      }),
    );
  }

  _setDataBranches(e) {
    this.dataBranches = e.detail;
    this.dispatchEvent(
      new CustomEvent('set-data-branches', {
        detail: this.dataBranches,
      }),
    );
  }

  _setDataPaymentMethod(e) {
    this.dataPaymentMethod = e.detail;
    this.dispatchEvent(
      new CustomEvent('set-data-payment-method', {
        detail: this.dataPaymentMethod,
      }),
    );
  }

  /**
   * Format and set data for the sales branch chart report.
   * @param {Array} data
   * @private
   */
  _setDataSalesBranchChartReport(data) {
    const labels = data.map(row => row.branch);
    const sales = data.map(row => row.sales);

    const dataBarChart = data.map((row, i) => ({
      label: row.branch,
      data: [row.sales],
      backgroundColor: chatColors[i % chatColors.length],
      borderWidth: 1,
    }));

    this._dataSalesBranchReport = {
      ...this._dataSalesBranchReport,
      chart: {
        labels,
        sales,
        dataBarChart,
        colors: chatColors,
      },
    };

    this._setDashboardData();
  }

  /**
   * Set data for the sales branch card report.
   * @param {Array} detail
   * @private
   */
  _setDataSalesBranchCardReport(detail) {
    const { period, data } = detail;
    this._dataSalesBranchReport = {
      ...this._dataSalesBranchReport,
      card: {
        ...(this._dataSalesBranchReport.card || {}),
        [period]: data,
      },
    };
    this._setDashboardData();
  }

  /**
   * Sincronize data of cards and. charts.
   * @event 'feature-sales-management-crud-dm-set-dashboard-data'
   * @private
   */
  _setDashboardData() {
    if (this._dataSalesBranchReport.chart && this._dataSalesBranchReport.card) {
      this.dispatchEvent(
        new CustomEvent('feature-sales-management-crud-dm-set-dashboard-data', {
          detail: this._dataSalesBranchReport,
        }),
      );
    }
  }

  /**
   * Create the api post data key - value from body object
   * @param {Object} body
   */
  createEmployee(body) {
    const data = {};
    for (const [key, value] of body.entries()) {
      data[key] = value;
    }
    this._employeeDm.createEmployee(data);
  }

  createBranch(body) {
    this._branchesDm.createBranch(body);
  }

  createPaymentMethod(body) {
    this._paymentMethodDm.createPaymentMethod(body);
  }

  render() {
    return html`
      <sales-api-dm
        @sales-api-dm-error=${e => console.log('error', e.detail)}
        @sales-api-dm-fetch-error=${e => console.log('error', e.detail)}
        @sales-api-dm-fetch=${e => this._setDataSalesBranch(e)}
      ></sales-api-dm>
      <employee-api-dm
        @employee-api-dm-error=${e => console.log('error', e.detail)}
        @employee-api-dm-fetch-error=${e => console.log('error', e.detail)}
        @employee-api-dm-fetch=${e => this._setDataEmployee(e)}
      >
      </employee-api-dm>
      <branches-api-dm
        @branches-api-dm-error=${e => console.log('error', e.detail)}
        @branches-api-dm-fetch-error=${e => console.log('error', e.detail)}
        @branches-api-dm-fetch=${e => this._setDataBranches(e)}
      >
      </branches-api-dm>
      <payment-method-api-dm
        @payment-method-api-dm-error=${e => console.log('error', e.detail)}
        @payment-method-api-dm-fetch-error=${e => console.log('error', e.detail)}
        @payment-method-api-dm-fetch=${e => this._setDataPaymentMethod(e)}
      >
      </payment-method-api-dm>
      <report-api-dm
        @branch-chart-report-api-dm-fetch=${e => this._setDataSalesBranchChartReport(e.detail)}
        @branch-report-api-dm-fetch=${e => this._setDataSalesBranchCardReport(e.detail)}
      >
      </report-api-dm>
    `;
  }
}
customElements.define('feature-sales-management-crud-dm', FeatureSalesManagementCrudDM);
