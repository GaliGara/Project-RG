import { LitElement, html, nothing } from 'lit';
import '../../../components/employer-form/EmployerForm.js';

export class FeatureSalesManagementCrudEmployee extends LitElement {
  static get properties() {
    return {
      dataGridEmployee: { type: Object },
    };
  }

  constructor() {
    super();
    this.dataGridEmployee = {};
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
      ${Object.keys(this.dataGridEmployee || {}).length
        ? html`
            <employer-form
              .dataTable="${this?.dataGridEmployee}"
              @request-submit=${e => this.submitPage(e.detail)}
            ></employer-form>
          `
        : nothing}
    `;
  }
}
customElements.define('feature-sales-management-crud-employee', FeatureSalesManagementCrudEmployee);
