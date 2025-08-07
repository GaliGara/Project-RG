import { LitElement, html } from 'lit';
import '../../../components/employer-form/EmployerForm.js';

export class FeatureSalesManagementCrudEmployee extends LitElement {
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

  /**
   * Set Object data on CustomEvent
   * @param {Object} data
   */
  submitPage(data) {
    this.dispatchEvent(new CustomEvent('submit-employee-event', { detail: data }));
  }

  render() {
    return html`
      <h1>hola desde employee page</h1>
      <employer-form @request-submit=${e => this.submitPage(e.detail)}></employer-form>
    `;
  }
}
customElements.define('feature-sales-management-crud-employee', FeatureSalesManagementCrudEmployee);
