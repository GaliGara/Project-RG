import { LitElement, html } from 'lit';
import '@components/seller-form/SellerForm';
import '@components/employer-form/EmployerForm';
import '@components/branch-form/BranchForm';
import '@components/nav-bar/NavBar';
import './index.css'; 

export class SellerApp extends LitElement {
  static get properties() {
    return {
      step: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.step = false;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav-bar></nav-bar>
      <!-- <seller-form></seller-form> -->
      <!-- <employer-form></employer-form> -->
      <!-- <branch-form></branch-form> -->
    `;
  }
}

customElements.define("seller-app", SellerApp);
