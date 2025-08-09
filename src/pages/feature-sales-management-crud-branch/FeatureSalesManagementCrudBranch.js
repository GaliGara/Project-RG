import { LitElement, html, nothing } from 'lit';
import '../../../components/branch-form/BranchForm.js';

export class FeatureSalesManagementCrudBranch extends LitElement {
  static get properties() {
    return {
      dataGridBranch: { type: Object },
    };
  }

  constructor() {
    super();
    this.dataGridBranch = {};
  }

  createRenderRoot() {
    return this;
  }

  /**
   * Set Object data on CustomEvent
   * @param {Object} data
   */
  submitPage(data) {
    this.dispatchEvent(new CustomEvent('submit-event', { detail: data }));
  }

  render() {
    return html`
      ${Object.keys(this.dataGridBranch || {}).length
        ? html`<branch-form
            .tableConfig="${this.dataGridBranch}"
            @request-submit=${e => this.submitPage(e.detail)}
          ></branch-form>`
        : nothing}
    `;
  }
}
customElements.define('feature-sales-management-crud-branch', FeatureSalesManagementCrudBranch);
