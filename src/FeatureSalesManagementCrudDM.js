import { LitElement, html } from 'lit';
import '../components/sales-api-dm/SalesApiDm.js';
import '../components/employee-api-dm/EmployeeApiDm.js';
import '../components/branches-api-dm/BranchesApiDm.js';
import '../components/payment-method-api-dm/PaymentMethodApiDm.js';
import '../components/report-api-dm/ReportApiDm.js';
import {
  chatColors,
  columnsBranch,
  columnsEmployee,
  columnsPaymentMethod,
  columnsSalesBranch,
  columnTotalSales,
  columnsSalesSeller,
  columnsPaymentMethodReport,
} from './utils/configPages.js';

export class FeatureSalesManagementCrudDM extends LitElement {
  static get properties() {
    return {
      dataSalesBranch: { type: Object },
      dataEmployee: { type: Object },
      dataBranches: { type: Object },
      dataPaymentMethod: { type: Object },
      /**
       * Set of data for payment method report.
       * @type {Array}
       * @default []
       * @private
       */
      _dataPaymentMethodReport: {
        type: Array,
      },
      /**
       * Set of data for employee report.
       * @type {Array}
       * @default []
       * @private
       */
      _dataEmployeeReport: {
        type: Array,
      },
      /**
       * Set of data for total general sales report.
       * @type {Object}
       * @default {}
       * @private
       */
      _dataTotalSalesReport: {
        type: Object,
      },
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
    this.dataSalesBranch = {};
    this.dataEmployee = {};
    this.dataBranches = {};
    this.dataPaymentMethod = {};
    this._dataPaymentMethodReport = [];
    this._dataEmployeeReport = [];
    this._dataTotalSalesReport = {};
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
    const formatDate = FeatureSalesManagementCrudDM._getFormatDate(date);
    this._reportApiDm.getSalesBranchReport(date, 'day');
    this._reportApiDm.getSalesBranchReport(formatDate.month, 'month');
    this._reportApiDm.getSalesBranchReport(formatDate.year, 'year');
  }

  /**
   * Dispatch request to get total sales branch.
   * @param {String} date
   * @public
   */
  getSalesBranchTotal(date) {
    const formatDate = FeatureSalesManagementCrudDM._getFormatDate(date);
    this._reportApiDm.getSalesBranchTotalReport(date, 'day');
    this._reportApiDm.getSalesBranchTotalReport(formatDate.month, 'month');
    this._reportApiDm.getSalesBranchTotalReport(formatDate.year, 'year');
  }

  /**
   * Dispatch request to get payment method report.
   * @param {String} date
   * @public
   */
  getPaymentMethodReport(startDate, endDate) {
    this._reportApiDm.getPaymentMethodReport(startDate, endDate);
  }

  /**
   * Dispatch request to get sales employee report.
   * @param {String} date
   * @public
   */
  getEmployeeReport(startDate, endDate) {
    this._reportApiDm.getEmployeeReport(startDate, endDate);
  }

  /**
   * Dispatch request to get total general sales branch.
   * @param {String} date
   * @public
   */
  getBranchReport(startDate, endDate) {
    this._reportApiDm.getBranchReport(startDate, endDate);
  }

  /**
   * Get formatted date for sales branch report.
   * @param {String} date
   * @private
   */
  static _getFormatDate(date) {
    return {
      month: date.slice(0, 7),
      year: date.slice(0, 4),
    };
  }

  _setDataSalesBranch(e) {
    this.dataSalesBranch = e.detail;
    this.dataSalesBranch = {
      data: this.dataSalesBranch.map(item => [
        item.idSalesBranch,
        item.branchName,
        item.dateSalesBranch,
        item.salesBranchTotal,
        item.notes,
      ]),
    };
    this.dataSalesBranch = {
      ...this.dataSalesBranch,
      columns: columnsSalesBranch,
      search: true,
      pagination: { limit: 9 },
    };
    this.dispatchEvent(
      new CustomEvent('set-data-sales-branch', {
        detail: this.dataSalesBranch,
      }),
    );
  }

  _setDataEmployee(e) {
    this.dataEmployee = e.detail;
    this.dataEmployee = {
      data: this.dataEmployee.map(item => [
        item.idEmployee,
        item.fullName,
        item.firstName,
        item.lastName,
        item.middleName,
        item.bank,
        item.accountNumber,
        item.position,
        item.personalTarget,
      ]),
    };
    this.dataEmployee = {
      ...this.dataEmployee,
      columns: columnsEmployee,
      search: true,
      pagination: { limit: 9 },
    };
    this.dispatchEvent(
      new CustomEvent('set-data-employee', {
        detail: this.dataEmployee,
      }),
    );
  }

  _setDataBranches(e) {
    this.dataBranches = e.detail;
    this.dataBranches = {
      data: this.dataBranches.map(item => [item.idBranch, item.branchName]),
    };
    this.dataBranches = {
      ...this.dataBranches,
      columns: columnsBranch,
      search: true,
      pagination: { limit: 6 },
    };
    this.dispatchEvent(
      new CustomEvent('set-data-branches', {
        detail: this.dataBranches,
      }),
    );
  }

  _setDataPaymentMethod(e) {
    this.dataPaymentMethod = e.detail;
    this.dataPaymentMethod = {
      data: this.dataPaymentMethod.map(item => [item.idPaymentMethod, item.paymentMethodName]),
    };
    this.dataPaymentMethod = {
      ...this.dataPaymentMethod,
      columns: columnsPaymentMethod,
      search: true,
      pagination: { limit: 6 },
    };
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

  _setDataSalesBranchTotalReport(detail) {
    const { period, data } = detail;
    this._dataSalesBranchReport = {
      ...this._dataSalesBranchReport,
      card: {
        ...(this._dataSalesBranchReport?.card ?? {}),
        total: {
          ...(this._dataSalesBranchReport?.card?.total ?? {}),
          [period]: data,
        },
      },
    };

    this._setDashboardData();
  }

  /**
   * Sincronize data of cards and charts.
   * @event 'feature-sales-management-crud-dm-set-dashboard-data'
   * @private
   */
  _setDashboardData() {
    if (
      this._dataSalesBranchReport?.chart &&
      this._dataSalesBranchReport?.card &&
      ['day', 'month', 'year'].every(prop => this._dataSalesBranchReport.card[prop]) &&
      this._dataSalesBranchReport.card.total &&
      ['day', 'month', 'year'].every(prop => this._dataSalesBranchReport.card.total[prop])
    ) {
      this.dispatchEvent(
        new CustomEvent('feature-sales-management-crud-dm-set-dashboard-data', {
          detail: this._dataSalesBranchReport,
        }),
      );
    }
  }

  /**
   * Set data for total general sales report.
   * @param {Array} data
   * @event 'feature-sales-management-crud-dm-set-data-total-sales'
   * @private
   */
  _setDataBranchTotalSalesReport(data) {
    this._dataTotalSalesReport = data;
    this._dataTotalSalesReport = {
      data: this._dataTotalSalesReport.map(item => [
        item.DATE,
        item.GALERIAS_INSURGENTES,
        item.OPATRA,
        item.MITIKAH,
        item.DELTA,
        item.MITIKAH_2,
        item.MIYANA,
        item.MASARYK,
        item.NEW_BRANCH,
        item.PRUEBA_POST,
        item.POST,
        item.POSTZZZ,
        item.TOTAL,
      ]),
    };
    this._dataTotalSalesReport = {
      ...this._dataTotalSalesReport,
      columns: columnTotalSales,
      search: true,
      pagination: { limit: 9 },
    };
    this.dispatchEvent(
      new CustomEvent('feature-sales-management-crud-dm-set-data-total-sales', {
        detail: this._dataTotalSalesReport,
      }),
    );
  }

  /**
   * Set data for employee report.
   * @param {Array} data
   * @event 'feature-sales-management-crud-dm-set-data-employee-report'
   * @private
   */
  _setDataEmployeeReport(data) {
    this._dataEmployeeReport = data;
    this._dataEmployeeReport = {
      data: this._dataEmployeeReport.map(item => [
        item.EMPLOYEE,
        item.GALERIAS_INSURGENTES,
        item.OPATRA,
        item.MITIKAH,
        item.DELTA,
        item.MITIKAH_2,
        item.MIYANA,
        item.MASARYK,
        item.NEW_BRANCH,
        item.PRUEBA_POST,
        item.POST,
        item.POSTZZZ,
        item.TOTAL,
        item.MONTHLY_TARGET,
        item.TO_GO,
        item.PERCENTAGE,
      ]),
    };
    this._dataEmployeeReport = {
      ...this._dataEmployeeReport,
      columns: columnsSalesSeller,
      search: true,
      pagination: { limit: 9 },
    };
    this.dispatchEvent(
      new CustomEvent('feature-sales-management-crud-dm-set-data-employee-report', {
        detail: this._dataEmployeeReport,
      }),
    );
  }

  /**
   * Set data for payment method report.
   * @param {Array} data
   * @event 'feature-sales-management-crud-dm-set-data-payment-method-report'
   * @private
   */
  _setDataPaymentMethodReport(data) {
    this._dataPaymentMethodReport = data;
    this._dataPaymentMethodReport = {
      data: this._dataPaymentMethodReport.map(item => [
        item.branch,
        item.EFECTIVO,
        item.TARJETA,
        item['NETPAY LINK'],
        item.TRANSFERENCIA,
        item['NEW METHOD'],
        item['PRUEBA POST'],
        item.POSTZZZ,
        item.TOTAL,
      ]),
    };
    this._dataPaymentMethodReport = {
      ...this._dataPaymentMethodReport,
      columns: columnsPaymentMethodReport,
      search: true,
      pagination: { limit: 9 },
    };
    this.dispatchEvent(
      new CustomEvent('feature-sales-management-crud-dm-set-data-payment-method-report', {
        detail: this._dataPaymentMethodReport,
      }),
    );
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

  static _catchError(detail) {
    console.error('Error:', detail);
  }

  render() {
    return html`
      <sales-api-dm
        @sales-api-dm-error=${e => FeatureSalesManagementCrudDM._catchError(e.detail)}
        @sales-api-dm-fetch-error=${e => FeatureSalesManagementCrudDM._catchError(e.detail)}
        @sales-api-dm-fetch=${e => this._setDataSalesBranch(e)}
      ></sales-api-dm>
      <employee-api-dm
        @employee-api-dm-error=${e => FeatureSalesManagementCrudDM._catchError(e.detail)}
        @employee-api-dm-fetch-error=${e => FeatureSalesManagementCrudDM._catchError(e.detail)}
        @employee-api-dm-fetch=${e => this._setDataEmployee(e)}
      >
      </employee-api-dm>
      <branches-api-dm
        @branches-api-dm-error=${e => FeatureSalesManagementCrudDM._catchError(e.detail)}
        @branches-api-dm-fetch-error=${e => FeatureSalesManagementCrudDM._catchError(e.detail)}
        @branches-api-dm-fetch=${e => this._setDataBranches(e)}
      >
      </branches-api-dm>
      <payment-method-api-dm
        @payment-method-api-dm-error=${e => FeatureSalesManagementCrudDM._catchError(e.detail)}
        @payment-method-api-dm-fetch-error=${e =>
          FeatureSalesManagementCrudDM._catchError(e.detail)}
        @payment-method-api-dm-fetch=${e => this._setDataPaymentMethod(e)}
      >
      </payment-method-api-dm>
      <report-api-dm
        @branch-chart-report-api-dm-fetch=${e => this._setDataSalesBranchChartReport(e.detail)}
        @branch-report-api-dm-fetch=${e => this._setDataSalesBranchCardReport(e.detail)}
        @branch-total-api-dm-fetch=${e => this._setDataSalesBranchTotalReport(e.detail)}
        @branch-total-sales-report-api-dm-fetch=${e =>
          this._setDataBranchTotalSalesReport(e.detail)}
        @employee-report-api-dm-fetch=${e => this._setDataEmployeeReport(e.detail)}
        @payment-method-report-api-dm-fetch=${e => this._setDataPaymentMethodReport(e.detail)}
      >
      </report-api-dm>
    `;
  }
}
customElements.define('feature-sales-management-crud-dm', FeatureSalesManagementCrudDM);
