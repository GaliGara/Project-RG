import { LitElement, html, nothing } from 'lit';
import '../../../components/seller-form/SellerForm.js';
import '../../../components/grid-table/GridTable.js';

export class FeatureSalesManagementCrudSales extends LitElement {
  static get properties() {
    return {
      dataGridSales: { type: Object },
    };
  }

  constructor() {
    super();
    this.dataGridSales = {};
  }

  createRenderRoot() {
    return this;
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
      Array.isArray(this.dataGridSales?.data) &&
      this.dataGridSales.data.length > 0 &&
      Array.isArray(this.dataGridSales?.columns) &&
      this.dataGridSales.columns.length > 0
    );
  }

  render() {
    return html`
      ${Object.keys(this.dataGridSales || {}).length
        ? html` <seller-form></seller-form>`
        : nothing}
      ${this.hasValidGridConfig
        ? html` <grid-table
            .config=${this.dataGridSales}
            enable-actions
            .actionBuilder=${FeatureSalesManagementCrudSales._actionButtons}
            @grid-action=${FeatureSalesManagementCrudSales._onGridAction}
          ></grid-table>`
        : nothing}
    `;
  }
}
customElements.define('feature-sales-management-crud-sales', FeatureSalesManagementCrudSales);
