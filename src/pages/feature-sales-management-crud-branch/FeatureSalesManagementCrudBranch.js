import { LitElement, html } from 'lit';
import '../../../components/branch-form/BranchForm.js';

export class FeatureSalesManagementCrudBranch extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
    };
  }

  constructor() {
    super();
    this.data = [];
  }

  createRenderRoot() {
    return this;
  }

  submitPage(data) {
    this.dispatchEvent(new CustomEvent('submit-event', { detail: data }));
  }

  render() {
    console.log('data', this?.data);

    return html`
      <h1>hola desde branch page</h1>
      <branch-form @request-submit=${e => this.submitPage(e.detail)}></branch-form>
    `;
  }
}
customElements.define('feature-sales-management-crud-branch', FeatureSalesManagementCrudBranch);
