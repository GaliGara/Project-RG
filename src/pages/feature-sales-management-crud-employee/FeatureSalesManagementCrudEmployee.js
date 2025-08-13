import { LitElement, html, nothing } from 'lit';
import '../../../components/employer-form/EmployerForm.js';
import '../../../components/grid-table/GridTable.js';

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

  static _actionButtons = row => {
    const id = row?.cells?.[0]?.data; // asumiendo que "ID" es la 1a columna
    return `
    <div class="flex items-center gap-2">
      <button class="px-2 py-1 rounded-md border text-xs hover:bg-gray-50" data-action="view" data-id="${id}">View</button>
      <button class="px-2 py-1 rounded-md border text-xs hover:bg-gray-50" data-action="edit" data-id="${id}">Edit</button>
      <button class="px-2 py-1 rounded-md border text-xs hover:bg-red-50 text-red-600 border-red-200" data-action="delete" data-id="${id}">Delete</button>
    </div>
    `;
  };

  static _onGridAction(e) {
    const { action, id } = e.detail;
    // Aquí conectas con tu lógica (abrir modal, navegar, etc.)
    if (action === 'view') {
      console.log('Ver perfil de', id);
    } else if (action === 'delete') {
      console.log('Eliminar empleado', id);
    } else if (action === 'edit') {
      console.log('Editar empleado', id);
    }
  }

  get hasValidGridConfig() {
    return (
      Array.isArray(this.dataGridEmployee?.data) &&
      this.dataGridEmployee.data.length > 0 &&
      Array.isArray(this.dataGridEmployee?.columns) &&
      this.dataGridEmployee.columns.length > 0
    );
  }

  render() {
    return html`
      ${Object.keys(this.dataGridEmployee || {}).length
        ? html`
            <employer-form
              .dataTable="${this?.dataGridEmployee}"
              @request-submit=${e => this.submitPage(e.detail)}
            ></employer-form>
            ${this.hasValidGridConfig
              ? html` <grid-table
                  .config=${this.dataGridEmployee}
                  enable-actions
                  .actionBuilder=${FeatureSalesManagementCrudEmployee._actionButtons}
                  @grid-action=${FeatureSalesManagementCrudEmployee._onGridAction}
                ></grid-table>`
              : nothing}
          `
        : nothing}
    `;
  }
}
customElements.define('feature-sales-management-crud-employee', FeatureSalesManagementCrudEmployee);
