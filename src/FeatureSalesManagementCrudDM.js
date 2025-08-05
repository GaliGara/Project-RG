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
       * Set of data for the charts
       * @type Object
       * @default {}
       */
      _dataSalesBranchChartReport: {
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
    this._dataSalesBranchChartReport = {};
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
    console.log('_getEmployee');
    this._employeeDm.getEmployee();
  }

  getSalesBranch() {
    console.log('_getSalesBranch');
    this._salesDm.getSalesBranch();
  }

  getBranches() {
    console.log('_getBranches');
    this._branchesDm.getBranches();
  }

  getPaymentMethod() {
    console.log('_getPaymentMethod');
    this._paymentMethodDm.getPaymentMethod();
  }

  getSalesBranchChartReport() {
    this._reportApiDm.getSalesBranchChartReport();
  }

  _setDataSalesBranch(e) {
    console.log('_setDataSalesBranch', e);
    this.dataSalesBranch = e.detail;
    this.dispatchEvent(
      new CustomEvent('set-data-sales-branch', {
        detail: this.dataSalesBranch,
      }),
    );
  }

  _setDataEmployee(e) {
    console.log('_setDataEmployee', e);
    this.dataEmployee = e.detail;
    this.dispatchEvent(
      new CustomEvent('set-data-employee', {
        detail: this.dataEmployee,
      }),
    );
  }

  _setDataBranches(e) {
    console.log('_setDataBranches', e);
    this.dataBranches = e.detail;
    this.dispatchEvent(
      new CustomEvent('set-data-branches', {
        detail: this.dataBranches,
      }),
    );
  }

  _setDataPaymentMethod(e) {
    console.log('_setDataPaymentMethod', e);
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
   * @event 'feature-sales-management-crud-dm-set-data-branch-chart'
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

    this._dataSalesBranchChartReport = {
      labels,
      sales,
      dataBarChart,
      colors: chatColors,
    };

    this.dispatchEvent(
      new CustomEvent('feature-sales-management-crud-dm-set-data-branch-chart', {
        detail: this._dataSalesBranchChartReport,
      }),
    );
  }

  createBranch(body) {
    this._branchesDm.createBranch(body);
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
      >
      </report-api-dm>
      <h1>hola dm</h1>
    `;
  }
}
customElements.define('feature-sales-management-crud-dm', FeatureSalesManagementCrudDM);
