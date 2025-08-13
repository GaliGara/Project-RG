import { LitElement, html, nothing } from 'lit';

export class PaymentMethodForm extends LitElement {
  static get properties() {
    return {
      /**
       * Payment Method
       * @type {Object}
       * @default ''
       */
      paymentMethod: { type: Object },

      /**
       * Boolean to show form
       * @type {Boolean}
       * @default 'false'
       */
      showForm: { type: Boolean },
      internalValue: { type: String },
    };
  }

  constructor() {
    super();
    this.paymentMethod = {};
    this.showForm = false;
    this.internalValue = '';
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
            ${this.paymentMethod?.id ? 'Editar Forma de Pago:' : 'Agregar Forma de Pago:'}
          </h2>
          <form id="branch-form" @submit="${this.submit}">
            <div class="grid-div">
              <div class="grid-cols-2">
                <label class="card-label">Nombre del Tipo de Pago:</label>
                <input
                  class="card-input"
                  type="text"
                  name="branch"
                  .value=${this.internalValue}
                  @input=${e => {
                    this.internalValue = e.target.value;
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
          id: this.paymentMethod?.id ?? null,
          paymentMethodName: this.internalValue,
        },
        bubbles: true,
        composed: true,
      }),
    );
    event.target.reset();
    this.showForm = false;
    this.paymentMethod = {};
    this.internalValue = '';
  }

  updated(changedProps) {
    if (
      changedProps.has('paymentMethod') &&
      this.paymentMethod &&
      Object.keys(this.paymentMethod).length > 0
    ) {
      this.showForm = true;
      this.internalValue = this.paymentMethod.name || '';
    }
  }

  render() {
    return html`
      <button
        class="new-form-btn"
        @click=${() => {
          this.showForm = true;
          this.paymentMethod = {}; // Limpiar datos anteriores
          this.internalValue = ''; // Limpiar input
        }}
      >
        Agregar
      </button>

      ${this.showForm ? this._tplPaymentMethodFormModal() : nothing}
    `;
  }
}

customElements.define('payment-method-form', PaymentMethodForm);
