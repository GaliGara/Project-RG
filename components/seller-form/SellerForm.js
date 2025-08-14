import { LitElement, html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import '../input-select/InputSelect.js';

export class SellerForm extends LitElement {
  static get properties() {
    return {
      /**
       * Boolean to show form.
       * @type {Boolean}
       * @default false
       */
      showForm: { type: Boolean },
      /**
       * Array of branch options.
       * @type {Array}
       * @default []
       */
      selectDataBranch: {
        type: Array,
      },
      /**
       * Array of seller options.
       * @type {Array}
       * @default []
       */
      selectDataSeller: {
        type: Array,
      },
      /**
       * Array of payment method options.
       * @type {Array}
       * @default []
       */
      selectDataPaymentMethod: {
        type: Array,
      },
      /**
       * Array of seller rows.
       * @type {Array}
       * @default []
       */
      sellerRows: {
        type: Array,
      },
      /**
       * Array of seller rows.
       * @type {Number}
       * @default 0
       */
      currentAmount: {
        type: Number,
      },
      /**
       * Current seller ID.
       * @type {String}
       * @default ""
       */
      currentSellerId: {
        type: String,
      },
      /**
       * Current seller name.
       * @type {String}
       * @default ""
       */
      currentSellerName: {
        type: String,
      },
      /**
       * Array of payment rows.
       * @type {Array}
       * @default []
       */
      paymentRows: {
        type: Array,
      },
      /**
       * Current payment amount.
       * @type {Number}
       * @default 0
       */
      currentPaymentAmount: {
        type: Number,
      },
      /**
       * Current payment method ID.
       * @type {String}
       * @default ""
       */
      currentPaymentMethodId: {
        type: String,
      },
      /**
       * Current payment method name.
       * @type {String}
       * @default ""
       */
      currentPaymentMethodName: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.showForm = false;
    this.selectDataBranch = [];
    this.selectDataSeller = [];
    this.selectDataPaymentMethod = [];
    this.sellerRows = [];
    this.currentAmount = 0;
    this.currentSellerId = '';
    this.currentSellerName = '';
    this.paymentRows = [];
    this.currentPaymentAmount = 0;
    this.currentPaymentMethodId = '';
    this.currentPaymentMethodName = '';
  }

  createRenderRoot() {
    return this;
  }

  /**
   * Formats a number as currency.
   * @private
   * @param {Number} n
   * @returns {String}
   */
  static _formatMoney(n) {
    return `$${Number(n || 0).toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  /**
   * Gets the total amount of all seller rows.
   * @private
   * @returns {Number}
   */
  get _totalAmount() {
    return this.sellerRows.reduce((s, r) => s + Number(r.amount || 0), 0);
  }

  /**
   * Gets the total payment amount of all payment rows.
   * @private
   * @returns {Number}
   */
  get _totalPaymentAmount() {
    return this.paymentRows.reduce((s, r) => s + Number(r.amount || 0), 0);
  }

  /**
   * Creates a new row for the seller table.
   * @private
   * @param {String} sellerId
   * @param {String} sellerName
   * @param {Number} amount
   */
  static _newRow(sellerId, sellerName, amount) {
    return { id: `${Date.now()}-${Math.random()}`, sellerId, sellerName, amount };
  }

  /**
   * Removes a row from the seller table.
   * @private
   * @param {String} id
   */
  _removeRow(id) {
    this.sellerRows = this.sellerRows.filter(r => r.id !== id);
  }

  /**
   * Handles changes in the seller select input.
   * @private
   * @param {Event} e
   */
  _onSellerChange(e) {
    if (e.detail && (e.detail.id || e.detail.value)) {
      this.currentSellerId = e.detail.id ?? e.detail.value ?? '';
      this.currentSellerName = e.detail.name ?? e.detail.label ?? '';
      return;
    }
    const el = e.target;
    this.currentSellerId = el?.value || '';
    this.currentSellerName = el?.options?.[el.selectedIndex]?.text || '';
  }

  /**
   * Handles the addition of a new seller row.
   * @private
   * @param {Event} e
   */
  _onAddRowSeller(e) {
    e.preventDefault();
    if (!this.currentSellerId || !(this.currentAmount > 0)) {
      alert('Selecciona un vendedor y una cantidad antes de agregar.');
      return;
    }
    this.sellerRows = [
      ...this.sellerRows,
      SellerForm._newRow(this.currentSellerId, this.currentSellerName, this.currentAmount),
    ];
    this.currentSellerId = '';
    this.currentSellerName = '';
    this.currentAmount = 0;
  }

  /**
   * Creates a new row for the payment methods table.
   * @private
   * @param {String} methodId
   * @param {String} methodName
   * @param {Number} amount
   */
  static _newPaymentRow(methodId, methodName, amount) {
    return { id: `${Date.now()}-pay-${Math.random()}`, methodId, methodName, amount };
  }

  /**
   * Removes a row from the payment methods table.
   * @private
   * @param {String} id
   */
  _removePaymentRow(id) {
    this.paymentRows = this.paymentRows.filter(r => r.id !== id);
  }

  /**
   * Handles changes in the payment method select input.
   * @private
   * @param {Event} e
   */
  _onPaymentMethodChange(e) {
    if (e.detail && (e.detail.id || e.detail.value)) {
      this.currentPaymentMethodId = e.detail.id ?? e.detail.value ?? '';
      this.currentPaymentMethodName = e.detail.name ?? e.detail.label ?? '';
      return;
    }
    const el = e.target;
    this.currentPaymentMethodId = el?.value || '';
    this.currentPaymentMethodName = el?.options?.[el.selectedIndex]?.text || '';
  }

  /**
   * Handles the addition of a new payment row.
   * @private
   * @param {Event} e
   */
  _onAddRowPayment(e) {
    e.preventDefault();
    if (!this.currentPaymentMethodId || !(this.currentPaymentAmount > 0)) {
      alert('Selecciona un método de pago y una cantidad antes de agregar.');
      return;
    }
    this.paymentRows = [
      ...this.paymentRows,
      SellerForm._newPaymentRow(
        this.currentPaymentMethodId,
        this.currentPaymentMethodName,
        this.currentPaymentAmount,
      ),
    ];
    this.currentPaymentMethodId = '';
    this.currentPaymentMethodName = '';
    this.currentPaymentAmount = 0;
  }

  /**
   * Renders the button for opening the sale form modal.
   * @private
   * @returns {TemplateResult}
   */
  _tplButtonModal() {
    return html`
      <button
        class="new-form-btn"
        @click=${() => {
          this.showForm = !this.showForm;
        }}
      >
        AGREGAR
      </button>
    `;
  }

  /**
   * Renders the modal form for adding a new sale.
   * @private
   * @returns {TemplateResult}
   */
  _tplSaleFormModal() {
    return html`
      <div id="card-sell" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div class="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
          <h2 class="mb-4 text-2xl font-semibold">Registro nuevo</h2>

          <form class="space-y-4">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="flex flex-col">
                <label class="mb-1 text-sm font-medium text-gray-700">Sucursal:</label>
                <input-select
                  select-type="branch"
                  .optionValue=${this.selectDataBranch}
                ></input-select>
              </div>

              <div class="flex flex-col">
                <label class="mb-1 text-sm font-medium text-gray-700">Fecha:</label>
                <input
                  type="date"
                  name="date"
                  class="rounded-lg border border-gray-300 px-3 py-1.5 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="flex flex-col col-span-2">
                <label class="mb-1 text-sm font-medium text-gray-700">Vendedor:</label>
                <input-select
                  select-type="seller"
                  .optionValue=${this.selectDataSeller}
                  @change=${this._onSellerChange}
                  @input-select-change=${this._onSellerChange}
                  .value=${this.currentSellerId || ''}
                ></input-select>
              </div>
              <div class="col-span-2 -mt-1">
                <div class="flex h-10 w-full overflow-hidden rounded-xl border border-gray-300">
                  <span
                    class="flex items-center justify-center px-3 min-w-10 border-r border-gray-200 bg-gray-100 text-gray-600"
                  >
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step=".01"
                    placeholder="VENTA"
                    class="flex-1 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 border-0"
                    .value=${this.currentAmount ? String(this.currentAmount) : ''}
                    @input=${e => {
                      this.currentAmount = parseFloat(e.target.value) || 0;
                    }}
                  />
                  <button
                    id="addRowSeller"
                    type="button"
                    class="flex aspect-square h-full items-center justify-center bg-green-800 text-white"
                    @click=${this._onAddRowSeller}
                  >
                    +
                  </button>
                </div>
              </div>

              ${repeat(
                this.sellerRows,
                r => r.id,
                (row, i) => this._tplRowSeller(i, row),
              )}

              <div class="col-span-2 -mt-2">
                <div
                  class="flex h-9 w-full items-center rounded-lg border border-gray-300 bg-gray-200"
                >
                  <input
                    type="text"
                    placeholder="TOTAL VENDEDORES"
                    class="flex-1 px-3 text-gray-500"
                    .value=${`TOTAL VENDEDORES`}
                    readonly
                  />
                  <input
                    type="text"
                    placeholder="$"
                    class="w-40 px-3 text-right text-gray-500"
                    .value=${SellerForm._formatMoney(this._totalAmount)}
                    readonly
                  />
                  <button
                    type="button"
                    class="h-full px-3 rounded-r-lg bg-black text-white"
                    title="Eliminar fila"
                    disabled
                  >
                    =
                  </button>
                </div>
              </div>

              <div class="col-span-3">
                <label class="mb-1 block text-sm font-medium text-gray-700">TIPO DE PAGO</label>
                <div class="flex items-center gap-2">
                  <input-select
                    select-type="paymentMethod"
                    .optionValue=${this.selectDataPaymentMethod}
                    class="flex-1"
                    .value=${this.currentPaymentMethodId || ''}
                    @change=${this._onPaymentMethodChange}
                    @input-select-change=${this._onPaymentMethodChange}
                  ></input-select>
                  <input
                    type="number"
                    min="0"
                    step=".01"
                    placeholder="CANTIDAD"
                    class="w-32 rounded-l-lg border border-gray-300 px-3 py-1.5 text-gray-700 shadow-sm"
                    .value=${this.currentPaymentAmount ? String(this.currentPaymentAmount) : ''}
                    @input=${e => {
                      this.currentPaymentAmount = parseFloat(e.target.value) || 0;
                    }}
                  />
                  <button
                    type="button"
                    class="-ml-2 h-10 w-10 rounded-r-lg bg-green-800 text-white"
                    @click=${this._onAddRowPayment}
                  >
                    +
                  </button>
                </div>
              </div>

              ${repeat(
                this.paymentRows,
                r => r.id,
                (row, i) => this._tplRowPayment(i, row),
              )}
              <div class="col-span-2 -mt-2">
                <div
                  class="flex h-9 w-full items-center rounded-lg border border-gray-300 bg-gray-200"
                >
                  <input
                    type="text"
                    class="flex-1 px-3 text-gray-600"
                    .value=${`MÉTODOS DE PAGO: ${this.paymentRows.length}`}
                    readonly
                  />
                  <input
                    type="text"
                    class="w-40 px-3 text-right text-gray-600"
                    .value=${SellerForm._formatMoney(this._totalPaymentAmount)}
                    readonly
                  />
                  <button
                    type="button"
                    class="h-full px-3 rounded-r-lg bg-black text-white"
                    disabled
                  >
                    =
                  </button>
                </div>
              </div>

              <div class="col-span-1 md:col-span-2 flex flex-col">
                <label class="mb-1 text-sm font-medium text-gray-700">Notas:</label>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="Escribe una observación..."
                  class="rounded-lg border border-gray-300 px-3 py-1.5 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>

            <div class="flex justify-end gap-2 pt-2">
              <button
                type="button"
                class="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100"
                @click=${() => {
                  this.showForm = false;
                }}
              >
                Cerrar
              </button>
              <button
                type="submit"
                class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  /**
   * Template for new row seller.
   * @returns {TemplateResult}
   * @private
   */
  _tplRowSeller(index, row) {
    return html`
      <div class="col-span-2 -mt-2">
        <div class="flex h-9 w-full items-center rounded-lg border border-gray-300 bg-gray-200">
          <input type="hidden" name="seller_id_${index}" .value=${row?.sellerId ?? ''} />
          <input
            type="text"
            name="seller_total_${index}"
            class="flex-1 px-3 text-gray-500"
            .value=${row?.sellerName ?? ''}
            readonly
          />
          <input
            type="text"
            name="seller_amount_${index}"
            class="w-40 px-3 text-right text-gray-500"
            .value=${SellerForm._formatMoney(row?.amount)}
            readonly
          />
          <button
            type="button"
            class="h-full px-3 bg-red-800 rounded-r-lg text-white"
            @click=${() => this._removeRow(row.id)}
          >
            ✕
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Template for new row payment method.
   * @returns {TemplateResult}
   * @private
   */
  _tplRowPayment(index, row) {
    return html`
      <div class="col-span-2 -mt-2">
        <div class="flex h-9 w-full items-center rounded-lg border border-gray-300 bg-gray-200">
          <input type="hidden" name="payment_method_id_${index}" .value=${row?.methodId ?? ''} />
          <input
            type="text"
            name="payment_method_name_${index}"
            class="flex-1 px-3 text-gray-600"
            .value=${row?.methodName ?? ''}
            readonly
          />
          <input
            type="text"
            name="payment_amount_${index}"
            class="w-40 px-3 text-right text-gray-600"
            .value=${SellerForm._formatMoney(row?.amount)}
            readonly
          />
          <button
            type="button"
            class="h-full px-3 bg-red-800 rounded-r-lg text-white"
            @click=${() => this._removePaymentRow(row.id)}
          >
            ✕
          </button>
        </div>
      </div>
    `;
  }

  render() {
    return html`${this._tplButtonModal()} ${this.showForm ? this._tplSaleFormModal() : nothing}`;
  }
}
customElements.define('seller-form', SellerForm);
