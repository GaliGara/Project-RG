import { LitElement, html, nothing } from 'lit';
import '../components/seller-form/SellerForm.js';
import '../components/employer-form/EmployerForm.js';
import '../components/branch-form/BranchForm.js';
import '../components/nav-bar/NavBar.js';
import '../components/sales-api-dm/SalesApiDm.js';
import './FeatureSalesManagementCrud.css';
import './pages/feature-sales-management-crud-sales/FeatureSalesManagementCrudSales.js';
import './pages/feature-sales-management-crud-employee/FeatureSalesManagementCrudEmployee.js';
import './pages/feature-sales-management-crud-branch/FeatureSalesManagementCrudBranch.js';
import './pages/feature-sales-management-crud-payment-method/FeatureSalesManagementCrudPaymentMethod.js';
import './FeatureSalesManagementCrudDM.js';
import './pages/feature-sales-management-crud-dashboard/FeatureSalesManagementCrudDashboard.js';
import '../components/loading-spinner/LoadingSpinner.js';

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
    this.dataSalesBranch = {};
    this.dataEmployee = {};
    this.dataBranches = {};
    this.dataPaymentMethod = {};
    this._dashboardData = [];
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
      ${this._crudDashboardIsVisible
        ? html`
            <feature-sales-management-crud-dashboard
              .data="${this._dashboardData}"
              @feature-sales-management-crud-dashboard-date="${e =>
                this._handleGetSalesBranch(e.detail)}"
            ></feature-sales-management-crud-dashboard>
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
