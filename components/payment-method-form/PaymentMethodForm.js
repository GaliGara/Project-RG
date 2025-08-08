import { LitElement, html, nothing } from 'lit';
import '../grid-table/GridTable.js';

export class PaymentMethodForm extends LitElement {
  static get properties() {
    return {
      /**
       * Payment Method
       * @type {String}
       * @default ''
       */
      paymentMethod: { type: String },

      /**
       * Object of table config
       * @type {Object}
       * @default '{}'
       */
      tableConfig: { type: Object },

      /**
       * Boolean to show form
       * @type {Boolean}
       * @default 'false'
       */
      showForm: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.paymentMethod = '';
    this.configBranch = {};
    this.showForm = false;
  }

  /**
   * Overrides LitElement's default behavior to render into the light DOM.
   * @returns {BranchForm} This component without shadow DOM.
   */
  createRenderRoot() {
    return this;
  }

  /**
   * Provides the config object for the grid-table.
   * @returns {Object}
   */
  get tableConfig() {
    return {
      columns: ['ID', 'Tipo de Pago', 'Acciones'],
      data: [
        ['1', 'Efectivo', 'btn'],
        ['2', 'Tarjeta', 'btn'],
        ['3', 'Transferencia', 'btn'],
      ],
      search: true,
      pagination: { limit: 3 },
    };
  }

  /**
   * Renders the modal form to register a new payment method.
   * @returns {import('lit-html').TemplateResult}
   */
  _tplPaymentMethodFormModal() {
    return html`
      <div class="modal-branch">
        <div class="card-div">
          <h2 class="card-title">Agregar Forma de Pago:</h2>
          <form id="branch-form" @submit="${this.submit}">
            <div class="grid-div">
              <div class="grid-cols-2">
                <label class="card-label">Nombre del Tipo de Pago:</label>
                <input
                  class="card-input"
                  type="text"
                  name="branch"
                  .value=${this.paymentMethod}
                  @input=${e => {
                    this.paymentMethod = e.target.value;
                  }}
                />
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="card-buttons">
              <button
                class="close-btn"
                type="button"
                @click=${() => {
                  this.showForm = false;
                }}
              >
                Cerrar
              </button>
              <button class="agree-btn" type="submit">Agregar</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  /**
   * Handle form submit event and dispatch custom event
   * @param {Event} event
   */
  submit(event) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent('request-submit', {
        detail: { paymentMethodName: this.paymentMethod },
        bubbles: true,
        composed: true,
      }),
    );
    event.target.reset();
    this.showForm = false;
  }

  render() {
    return html`
      <button
        class="new-form-btn"
        @click=${() => {
          this.showForm = !this.showForm;
        }}
      >
        Agregar
      </button>

      ${this.showForm ? this._tplPaymentMethodFormModal() : nothing}

      <grid-table .config=${this.tableConfig}></grid-table>
    `;
  }
}

customElements.define('payment-method-form', PaymentMethodForm);
