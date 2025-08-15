import { LitElement, html, nothing } from 'lit';

export class PaymentMethodForm extends LitElement {
  static get properties() {
    return {
      /**
       * Payment Method
       * @type {Object}
       * @default ''
       */
      inputPaymentMethod: { type: Object },

      /**
       * Boolean to show form
       * @type {Boolean}
       * @default 'false'
       */
      showForm: { type: Boolean },
      inputPaymentMethodName: { type: String },
    };
  }

  constructor() {
    super();
    this.inputPaymentMethod = {};
    this.showForm = false;
    this.inputPaymentMethodName = '';
  }

  /**
   * Overrides LitElement's default behavior to render into the light DOM.
   * @returns {BranchForm} This component without shadow DOM.
   */
  createRenderRoot() {
    return this;
  }

  /**
   * Renders the modal form to register a new payment method.
   * @returns {import('lit-html').TemplateResult}
   */
  _tplPaymentMethodFormModal() {
    return html`
      <div class="modal-branch">
        <div class="card-div">
          <h2 class="card-title">
            ${this.inputPaymentMethod?.id ? 'Editar Forma de Pago:' : 'Agregar Forma de Pago:'}
          </h2>
          <form id="payment-method-form" @submit="${this.submit}">
            <div class="grid-div">
              <div class="grid-cols-2">
                <label class="card-label">Nombre del Tipo de Pago:</label>
                <input
                  class="card-input"
                  type="text"
                  name="branch"
                  .value=${this.inputPaymentMethodName}
                  @input=${e => {
                    this.inputPaymentMethodName = e.target.value;
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
        detail: {
          id: this.inputPaymentMethod?.id ?? null,
          paymentMethodName: this.inputPaymentMethodName,
          action: this.inputPaymentMethod?.id ? 'update' : 'create',
        },
        bubbles: true,
        composed: true,
      }),
    );
    event.target.reset();
    this.showForm = false;
    this.inputPaymentMethod = {};
    this.inputPaymentMethodName = '';
  }

  updated(changedProps) {
    if (
      changedProps.has('inputPaymentMethod') &&
      this.inputPaymentMethod &&
      Object.keys(this.inputPaymentMethod).length > 0
    ) {
      this.showForm = true;
      this.inputPaymentMethodName = this.inputPaymentMethod.name || '';
    }
  }

  render() {
    return html`
      <button
        class="new-form-btn"
        @click=${() => {
          this.showForm = true;
          this.inputPaymentMethod = {}; // Limpiar datos anteriores
          this.inputPaymentMethodName = ''; // Limpiar input
        }}
      >
        Agregar
      </button>

      ${this.showForm ? this._tplPaymentMethodFormModal() : nothing}
    `;
  }
}

customElements.define('payment-method-form', PaymentMethodForm);
