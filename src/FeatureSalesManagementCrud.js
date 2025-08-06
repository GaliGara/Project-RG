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
      dataSalesBranch: { type: Array },
      dataEmployee: { type: Array },
      dataBranches: { type: Array },
      dataPaymentMethod: { type: Array },
      /**
       * Data for dashboard page.
       * @type Array
       * @default []
       */
      _dashboardData: {
        type: Array,
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
    this.dataSalesBranch = [];
    this.dataEmployee = [];
    this.dataBranches = [];
    this.dataPaymentMethod = [];
    this._dashboardData = [];
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
    console.log('handleGetSalesBranch');
    this.crudSalesIsVisible = true;
    this.crudEmployeeIsVisible = false;
    this.crudBranchesIsVisible = false;
    this._salesManagementCrudDm.getSalesBranch();
  }

  handleGetEmployee() {
    console.log('handleGetEmployee');
    this.crudEmployeeIsVisible = true;
    this.crudSalesIsVisible = false;
    this.crudBranchesIsVisible = false;
    this._salesManagementCrudDm.getEmployee();
  }

  handleGetBranches() {
    console.log('handleGetBranches');
    this.crudBranchesIsVisible = true;
    this.crudEmployeeIsVisible = false;
    this.crudSalesIsVisible = false;
    this._salesManagementCrudDm.getBranches();
  }

  handleGetPaymentMethod() {
    console.log('handleGetPaymentMethod');
    this.crudPaymentMethodIsVisible = true;
    this.crudBranchesIsVisible = false;
    this.crudEmployeeIsVisible = false;
    this.crudSalesIsVisible = false;
    this._salesManagementCrudDm.getPaymentMethod();
  }

  handleSummit(detail) {
    this._salesManagementCrudDm.createBranch(detail);
  }

  /**
   * Handles the event to get sales branch chart report from api.
   * @private
   */
  _handleGetSalesBranch() {
    this._salesManagementCrudDm.getSalesBranchChartReport();
    this._salesManagementCrudDm.getSalesBranchReport();
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

  render() {
    return html`
      <sales-api-dm></sales-api-dm>

      <nav-bar
        @crud-sales-visible=${this.handleGetSalesBranch}
        @crud-employee-visible=${this.handleGetEmployee}
        @crud-branches-visible=${this.handleGetBranches}
        @crud-payment-method-visible=${this.handleGetPaymentMethod}
        @set-dashboard-visible=${this._handleGetSalesBranch}
      ></nav-bar>

      ${this.crudSalesIsVisible
        ? html`
            <feature-sales-management-crud-sales
              .data="${this.dataSalesBranch}"
            ></feature-sales-management-crud-sales>
          `
        : nothing}
      ${this.crudEmployeeIsVisible
        ? html`
            <feature-sales-management-crud-employee
              .data="${this.dataEmployee}"
            ></feature-sales-management-crud-employee>
          `
        : nothing}
      ${this.crudBranchesIsVisible
        ? html`
            <feature-sales-management-crud-branch
              @submit-event="${e => this.handleSummit(e.detail)}"
              .data="${this.dataBranches}"
            ></feature-sales-management-crud-branch>
          `
        : nothing}
      ${this._crudDashboardIsVisible
        ? html`
            <feature-sales-management-crud-dashboard
              .data="${this._dashboardData}"
            ></feature-sales-management-crud-dashboard>
          `
        : nothing}
      ${this.crudPaymentMethodIsVisible
        ? html`
            <feature-sales-management-crud-payment-method
              .data="${this.dataPaymentMethod}"
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
        @feature-sales-management-crud-dm-set-data-branch-chart="${e => {
          this._setDashboardConfig(e.detail);
        }}"
        @feature-sales-management-crud-dm-set-data-branch-card="${e => {
          this._setDashboardConfig(e.detail);
        }}"
      >
      </feature-sales-management-crud-dm>
    `;
  }
}

customElements.define('feature-sales-management-crud', FeatureSalesManagementCrud);
