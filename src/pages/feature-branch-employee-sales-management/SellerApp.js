import { LitElement, html } from 'lit';
import '@components/seller-form/SellerForm';
import '@components/employer-form/EmployerForm';
import '@components/branch-form/BranchForm';
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
      <seller-form></seller-form>
      <!-- <employer-form></employer-form> -->
      <!-- <branch-form></branch-form> -->
    `;
  }
}

customElements.define("seller-app", SellerApp);
