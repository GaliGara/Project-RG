import { LitElement, html, nothing } from 'lit';
import '../../../components/payment-method-form/PaymentMethodForm.js';
import '../../../components/grid-table/GridTable.js';

export class FeatureSalesManagementCrudPaymentMethod extends LitElement {
  static get properties() {
    return {
      dataGridPaymentMethod: { type: Object },
    };
  }

  constructor() {
    super();
    this.dataGridPaymentMethod = {};
  }

  createRenderRoot() {
    return this;
  }

  /**
   * Set Object data on CustomEvent
   * @param {Object} data
   */
  submitPage(data) {
    this.dispatchEvent(new CustomEvent('submit-payment-method-event', { detail: data }));
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
      Array.isArray(this.dataGridPaymentMethod?.data) &&
      this.dataGridPaymentMethod.data.length > 0 &&
      Array.isArray(this.dataGridPaymentMethod?.columns) &&
      this.dataGridPaymentMethod.columns.length > 0
    );
  }

  render() {
    return html`
      ${Object.keys(this.dataGridPaymentMethod || {}).length
        ? html` <payment-method-form
            @request-submit="${e => this.submitPage(e.detail)}"
          ></payment-method-form>`
        : nothing}
      ${this.hasValidGridConfig
        ? html` <grid-table
            .config=${this.dataGridPaymentMethod}
            enable-actions
            .actionBuilder=${FeatureSalesManagementCrudPaymentMethod._actionButtons}
            @grid-action=${FeatureSalesManagementCrudPaymentMethod  ._onGridAction}
          ></grid-table>`
        : nothing}
    `;
  }
}
customElements.define(
  'feature-sales-management-crud-payment-method',
  FeatureSalesManagementCrudPaymentMethod,
);
