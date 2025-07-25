import { LitElement, html, nothing } from 'lit';
import '@components/seller-form/SellerForm';
import '@components/employer-form/EmployerForm';
import '@components/branch-form/BranchForm';
import '@components/nav-bar/NavBar';
import '@components/sales-api-dm/SalesApiDm';
import './FeatureSalesManagementCrud.css'; 
import './feature-sales-management-crud-sales/FeatureSalesManagementCrudSales'
import './FeatureSalesManagementCrudDM'

export class FeatureSalesManagementCrud extends LitElement {
  static get properties() {
    return {
      crudSalesIsVisible: { type: Boolean },
      dataSalesBranch: { type: Array },

    };
  }

  constructor() {
    super();
    this.crudSalesIsVisible = false;
    this.dataSalesBranch = [];
  }

  createRenderRoot() {
    return this;
  }
  
  handlePages(e){
    this.crudSalesIsVisible = true
    console.log(e)
  }

  render() {
    return html`
      <sales-api-dm></sales-api-dm>

      <nav-bar @crud-sales-visible=${(e) => this.handlePages(e.detail)}></nav-bar>
      
      ${this.crudSalesIsVisible ? 
        html`
        <feature-sales-management-crud-sales
        .data='${this.dataSalesBranch}'
        ></feature-sales-management-crud-sales>
        `
        :nothing}

      <feature-sales-management-crud-dm
       .dispatchFetchCrudSales='${this.crudSalesIsVisible}'
       @set-data-sales-branch='${(e) => this.dataSalesBranch = e.detail}'
       >
      </feature-sales-management-crud-dm>

      <!-- <seller-form></seller-form> -->
      <!-- <employer-form></employer-form> -->
      <!-- <branch-form></branch-form> -->
    `;
  }
}

customElements.define("feature-sales-management-crud", FeatureSalesManagementCrud);
