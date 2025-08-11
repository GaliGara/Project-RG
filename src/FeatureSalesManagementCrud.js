import { LitElement, html, nothing } from 'lit';
import '../components/seller-form/SellerForm.js';
import '../components/employer-form/EmployerForm.js';
import '../components/branch-form/BranchForm.js';
import '../components/nav-bar/NavBar.js';
import '../components/sales-api-dm/SalesApiDm.js';
import '../components/loading-spinner/LoadingSpinner.js';
import './pages/feature-sales-management-crud-sales/FeatureSalesManagementCrudSales.js';
import './pages/feature-sales-management-crud-employee/FeatureSalesManagementCrudEmployee.js';
import './pages/feature-sales-management-crud-branch/FeatureSalesManagementCrudBranch.js';
import './pages/feature-sales-management-crud-payment-method/FeatureSalesManagementCrudPaymentMethod.js';
import './pages/feature-sales-management-crud-report-dashboard/FeatureSalesManagementCrudReportDashboard.js';
import './pages/feature-sales-management-crud-report-total-sales/FeatureSalesManagementCrudReportTotalSales.js';
import './pages/feature-sales-management-crud-report-sales-seller/FeatureSalesManagementCrudReportSalesSeller.js';
import './pages/feature-sales-management-crud-report-payment-method/FeatureSalesManagementCrudReportPaymentMethod.js';
import './FeatureSalesManagementCrud.css';
import './FeatureSalesManagementCrudDM.js';

export class FeatureSalesManagementCrud extends LitElement {
  static get properties() {
    return {
      crudSalesIsVisible: { type: Boolean },
      crudEmployeeIsVisible: { type: Boolean },
      crudBranchesIsVisible: { type: Boolean },
      crudPaymentMethodIsVisible: { type: Boolean },
      /**
       * Show dashboard page.
       * @type {Boolean}
       * @default false
       * @private
       */
      _crudDashboardIsVisible: {
        type: Boolean,
      },
      /**
       * Show total general sales page.
       * @type {Boolean}
       * @default false
       * @private
       */
      _crudTotalSalesIsVisible: {
        type: Boolean,
      },
      /**
       * Show sales by seller page.
       * @type {Boolean}
       * @default false
       * @private
       */
      _crudSalesSellerIsVisible: {
        type: Boolean,
      },
      /**
       * Show payment method report page.
       * @type {Boolean}
       * @default false
       * @private
       */
      _crudPaymentMethodReportIsVisible: {
        type: Boolean,
      },
      dataSalesBranch: { type: Object },
      dataEmployee: { type: Object },
      dataBranches: { type: Object },
      dataPaymentMethod: { type: Object },
      /**
       * Data for dashboard page.
       * @type {Array}
       * @default []
       */
      _dashboardData: {
        type: Array,
      },
      /**
       * Data for total general sales page.
       * @type {Object}
       * @default {}
       */
      _totalSalesData: {
        type: Object,
      },
      /**
       * Data for sales seller page.
       * @type {Array}
       * @default []
       */
      _dataEmployeeReport: {
        type: Array,
      },
      /**
       * Data for payment method report page.
       * @type {Array}
       * @default []
       */
      _dataPaymentMethodReport: {
        type: Array,
      },
      /**
       * Loading counter for tracking concurrent requests.
       * @type {Number}
       * @default 0
       * @private
       */
      _loadingCount: {
        type: Number,
      },
    };
  }

  constructor() {
    super();
    this.crudSalesIsVisible = false;
    this.crudEmployeeIsVisible = false;
    this.crudBranchesIsVisible = false;
    this.crudPaymentMethodIsVisible = false;
    this._crudDashboardIsVisible = false;
    this._crudTotalSalesIsVisible = false;
    this._crudSalesSellerIsVisible = false;
    this._crudPaymentMethodReportIsVisible = false;
    this.dataSalesBranch = {};
    this.dataEmployee = {};
    this.dataBranches = {};
    this.dataPaymentMethod = {};
    this._dashboardData = [];
    this._totalSalesData = {};
    this._dataEmployeeReport = [];
    this._dataPaymentMethodReport = [];
    this._loadingCount = 0;
  }

  createRenderRoot() {
    return this;
  }

  _getElement(selector) {
    return this.renderRoot?.querySelector(selector) ?? this.querySelector(selector);
  }

  get _salesManagementCrudDm() {
    return this._getElement('feature-sales-management-crud-dm');
  }

  handleGetSalesBranch() {
    this.crudSalesIsVisible = true;
    this.crudEmployeeIsVisible = false;
    this.crudBranchesIsVisible = false;
    this.crudPaymentMethodIsVisible = false;
    this._salesManagementCrudDm.getSalesBranch();
  }

  handleGetEmployee() {
    this.crudEmployeeIsVisible = true;
    this.crudSalesIsVisible = false;
    this.crudBranchesIsVisible = false;
    this.crudPaymentMethodIsVisible = false;
    this._salesManagementCrudDm.getEmployee();
  }

  handleGetBranches() {
    this.crudBranchesIsVisible = true;
    this.crudEmployeeIsVisible = false;
    this.crudSalesIsVisible = false;
    this.crudPaymentMethodIsVisible = false;
    this._salesManagementCrudDm.getBranches();
  }

  handleGetPaymentMethod() {
    this.crudPaymentMethodIsVisible = true;
    this.crudBranchesIsVisible = false;
    this.crudEmployeeIsVisible = false;
    this.crudSalesIsVisible = false;
    this._salesManagementCrudDm.getPaymentMethod();
  }

  /**
   * Handles the event to bin detail objetc to dm component
   * @param {Object} detail
   */
  handleBranchSubmit(detail) {
    this._salesManagementCrudDm.createBranch(detail);
  }

  /**
   * Handles the event to bin detail objetc to dm component
   * @param {Object} detail
   */
  handleEmployeeSubmit(detail) {
    this._salesManagementCrudDm.createEmployee(detail);
  }

  /**
   * Handles the event to bin detail objetc to dm component
   * @param {Object} detail
   */
  handlePaymentMethodSubmit(detail) {
    this._salesManagementCrudDm.createPaymentMethod(detail);
  }

  /**
   * Handles the event to get payment method report.
   * @param {String} data
   * @private
   */
  _handleGetPaymentMethodReport(data) {
    const { startDate, endDate } = data;
    this._salesManagementCrudDm.getPaymentMethodReport(startDate, endDate);
  }

  /**
   * Handles the event to get sales seller report.
   * @param {String} data
   * @private
   */
  _handleGetSalesSeller(data) {
    const { startDate, endDate } = data;
    this._salesManagementCrudDm.getEmployeeReport(startDate, endDate);
  }

  /**
   * Handles the event to get total sales report.
   * @param {String} date
   * @private
   */
  _handleGetBranchReport(data) {
    const { startDate, endDate } = data;
    this._salesManagementCrudDm.getBranchReport(startDate, endDate);
  }

  /**
   * Handles the event to get sales branch chart report from api.
   * @param {String} date
   * @private
   */
  _handleGetSalesBranch(date) {
    this._salesManagementCrudDm.getSalesBranchChartReport();
    this._salesManagementCrudDm.getSalesBranchReport(date);
    this._salesManagementCrudDm.getSalesBranchTotal(date);
  }

  /**
   * Sets dashboard pages config.
   * @param {Object} event
   * @private
   */
  _setDashboardConfig(detail) {
    this._dashboardData = detail;
    this.crudPaymentMethodIsVisible = false;
    this.crudBranchesIsVisible = false;
    this.crudEmployeeIsVisible = false;
    this.crudSalesIsVisible = false;
    this._crudDashboardIsVisible = true;
  }

  /**
   * Increments the global loading counter.
   * @private
   */
  _incrementLoading() {
    this._loadingCount += 1;
    this.requestUpdate();
  }

  /**
   * Decrements the global loading counter.
   * @private
   */
  _decrementLoading() {
    this._loadingCount = Math.max(0, this._loadingCount - 1);
    this.requestUpdate();
  }

  render() {
    return html`
      <loading-spinner .isLoading=${this._loadingCount > 0}></loading-spinner>
      <nav-bar
        @crud-sales-visible=${this.handleGetSalesBranch}
        @crud-employee-visible=${this.handleGetEmployee}
        @crud-branches-visible=${this.handleGetBranches}
        @crud-payment-method-visible=${this.handleGetPaymentMethod}
        @set-dashboard-visible=${() => {
          this._crudDashboardIsVisible = true;
        }}
        @set-total-sales-visible=${() => {
          this._crudTotalSalesIsVisible = true;
        }}
        @set-sales-seller-visible=${() => {
          this._crudSalesSellerIsVisible = true;
        }}
        @set-payment-method-report-visible=${() => {
          this._crudPaymentMethodReportIsVisible = true;
        }}
      ></nav-bar>

      ${this.crudSalesIsVisible
        ? html`
            <feature-sales-management-crud-sales
              .dataGridSales="${this?.dataSalesBranch}"
            ></feature-sales-management-crud-sales>
          `
        : nothing}
      ${this.crudEmployeeIsVisible
        ? html`
            <feature-sales-management-crud-employee
              @submit-employee-event="${e => this.handleEmployeeSubmit(e.detail)}"
              .dataGridEmployee="${this?.dataEmployee}"
            ></feature-sales-management-crud-employee>
          `
        : nothing}
      ${this.crudBranchesIsVisible
        ? html`
            <feature-sales-management-crud-branch
              @submit-event="${e => this.handleBranchSubmit(e.detail)}"
              .dataGridBranch="${this.dataBranches}"
            ></feature-sales-management-crud-branch>
          `
        : nothing}
      ${this._crudPaymentMethodReportIsVisible
        ? html`
            <feature-sales-management-crud-report-payment-method
              .paymentReportData="${this._dataPaymentMethodReport}"
              @input-date-between-data="${e => this._handleGetPaymentMethodReport(e.detail)}"
            >
            </feature-sales-management-crud-report-payment-method>
          `
        : nothing}
      ${this._crudSalesSellerIsVisible
        ? html`
            <feature-sales-management-crud-report-sales-seller
              .salesSellerData="${this._dataEmployeeReport}"
              @input-date-between-data="${e => this._handleGetSalesSeller(e.detail)}"
            >
            </feature-sales-management-crud-report-sales-seller>
          `
        : nothing}
      ${this._crudTotalSalesIsVisible
        ? html`
            <feature-sales-management-crud-report-total-sales
              .totalSalesData="${this._totalSalesData}"
              @input-date-between-data="${e => this._handleGetBranchReport(e.detail)}"
            ></feature-sales-management-crud-report-total-sales>
          `
        : nothing}
      ${this._crudDashboardIsVisible
        ? html`
            <feature-sales-management-crud-report-dashboard
              .data="${this._dashboardData}"
              @input-date-unique-data="${e => this._handleGetSalesBranch(e.detail)}"
            ></feature-sales-management-crud-report-dashboard>
          `
        : nothing}
      ${this.crudPaymentMethodIsVisible
        ? html`
            <feature-sales-management-crud-payment-method
              .dataGridPaymentMethod="${this.dataPaymentMethod}"
              @submit-payment-method-event="${e => this.handlePaymentMethodSubmit(e.detail)}"
            ></feature-sales-management-crud-payment-method>
          `
        : nothing}

      <feature-sales-management-crud-dm
        @set-data-sales-branch="${e => {
          this.dataSalesBranch = e.detail;
        }}"
        @set-data-employee="${e => {
          this.dataEmployee = e.detail;
        }}"
        @set-data-branches="${e => {
          this.dataBranches = e.detail;
        }}"
        @set-data-payment-method="${e => {
          this.dataPaymentMethod = e.detail;
        }}"
        @feature-sales-management-crud-dm-set-data-payment-method-report="${e => {
          this._dataPaymentMethodReport = e.detail;
        }}"
        @feature-sales-management-crud-dm-set-data-employee-report="${e => {
          this._dataEmployeeReport = e.detail;
        }}"
        @feature-sales-management-crud-dm-set-data-total-sales="${e => {
          this._totalSalesData = e.detail;
        }}"
        @feature-sales-management-crud-dm-set-dashboard-data="${e => {
          this._setDashboardConfig(e.detail);
        }}"
        @loading-start=${this._incrementLoading}
        @loading-end=${this._decrementLoading}
      >
      </feature-sales-management-crud-dm>
    `;
  }
}

customElements.define('feature-sales-management-crud', FeatureSalesManagementCrud);
