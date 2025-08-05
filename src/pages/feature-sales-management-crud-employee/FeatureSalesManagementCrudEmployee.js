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

  render() {
    console.log('data', this?.data);

    return html`
      <h1>hola desde employee page</h1>
      <employer-form></employer-form>
    `;
  }
}
customElements.define('feature-sales-management-crud-employee', FeatureSalesManagementCrudEmployee);
