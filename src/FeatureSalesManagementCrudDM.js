import { LitElement, html, nothing } from "lit";
import "../components/sales-api-dm/SalesApiDm";
import "../components/employee-api-dm/EmployeeApiDm";
import "../components/branches-api-dm/BranchesApiDm";
import "../components/payment-method-api-dm/PaymentMethodApiDm";

export class FeatureSalesManagementCrudDM extends LitElement {
  static get properties() {
    return {
      dataSalesBranch: { type: Array },
      dataEmployee: { type: Array },
      dataBranches: { type: Array },
      dataPaymentMethod: { type: Array },
    };
  }

  constructor() {
    super();
    this.dataSalesBranch = [];
    this.dataEmployee = [];
    this.dataBranches = [];
    this.dataPaymentMethod = [];
  }

  get _salesDm() {
    return this.shadowRoot.querySelector("sales-api-dm");
  }

  get _employeeDm() {
    return this.shadowRoot.querySelector("employee-api-dm");
  }

  get _branchesDm() {
    return this.shadowRoot.querySelector("branches-api-dm");
  }

  get _paymentMethodDm() {
    return this.shadowRoot.querySelector("payment-method-api-dm");
  }

  getEmployee() {
    console.log("_getEmployee");
    this._employeeDm.getEmployee();

  }

  getSalesBranch() {
    console.log("_getSalesBranch");
    this._salesDm.getSalesBranch();

  }

  getBranches() {
    console.log("_getBranches");
    this._branchesDm.getBranches();

  }

  getPaymentMethod() {
    console.log("_getPaymentMethod");
    this._paymentMethodDm.getPaymentMethod();

  }

  _setDataSalesBranch(e) {
    console.log("_setDataSalesBranch", e);
    this.dataSalesBranch = e.detail;
    this.dispatchEvent(
      new CustomEvent("set-data-sales-branch", {
        detail: this.dataSalesBranch,
      })
    );
  }

  _setDataEmployee(e) {
    console.log("_setDataEmployee", e);
    this.dataEmployee = e.detail;
    this.dispatchEvent(
      new CustomEvent("set-data-employee", {
        detail: this.dataEmployee,
      })
    );
  }

  _setDataBranches(e) {
    console.log("_setDataBranches", e);
    this.dataBranches = e.detail;
    this.dispatchEvent(
      new CustomEvent("set-data-branches", {
        detail: this.dataBranches,
      })
    );
  }

  _setDataPaymentMethod(e) {
    console.log("_setDataPaymentMethod", e);
    this.dataPaymentMethod = e.detail;
    this.dispatchEvent(
      new CustomEvent("set-data-payment-method", {
        detail: this.dataPaymentMethod,
      })
    );
  }


  render() {
    return html`
      <sales-api-dm
        @sales-api-dm-error=${(e) => console.log('error', e.detail)}
        @sales-api-dm-fetch-error=${(e) => console.log('error', e.detail)}
        @sales-api-dm-fetch=${(e) => this._setDataSalesBranch(e)}
      ></sales-api-dm>
      <employee-api-dm
        @employee-api-dm-error=${(e) => console.log('error', e.detail)}
        @employee-api-dm-fetch-error=${(e) => console.log('error', e.detail)}
        @employee-api-dm-fetch=${(e) => this._setDataEmployee(e)}
      > 
      </employee-api-dm>
      <branches-api-dm
        @branches-api-dm-error=${(e) => console.log('error', e.detail)}
        @branches-api-dm-fetch-error=${(e) => console.log('error', e.detail)}
        @branches-api-dm-fetch=${(e) => this._setDataBranches(e)}
      > 
      </branches-api-dm>
      <payment-method-api-dm
        @payment-method-api-dm-error=${(e) => console.log('error', e.detail)}
        @payment-method-api-dm-fetch-error=${(e) => console.log('error', e.detail)}
        @payment-method-api-dm-fetch=${(e) => this._setDataPaymentMethod(e)}
      > 
      </payment-method-api-dm>

      <h1>hola dm</h1>
    `;
  }
}
customElements.define("feature-sales-management-crud-dm",FeatureSalesManagementCrudDM);
