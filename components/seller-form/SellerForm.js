import { LitElement, html, nothing } from "lit";
import "../grid-table/GridTable";

export class SellerForm extends LitElement {
  static get properties() {
    return {
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
    this.tableConfig = {};
    this.showForm = false;
  }

  /**
   * Overrides LitElement's default behavior to render into the light DOM.
   * @returns {SellerForm} This component without shadow DOM.
   */
  createRenderRoot() {
    return this;
  }

  /**
   * Provides the config object for the grid-table.
   * @returns {Object}
   */
  get salesTableConfig() {
    return {
      columns: [
        "ID",
        "Fecha",
        "Sucursal",
        "Vendedor",
        "Tipo de Pago",
        "Notas",
        "Total Ventas",
        "Acciones",
      ],
      data: [
        [
          "1",
          "25-02-25",
          "Mitika",
          "Enrique",
          "Transferencia",
          "Notas",
          "$100",
          "btn",
        ],
        [
          "1",
          "31-11-25",
          "Delta",
          "Emanuel",
          "Efectivo",
          "Notas2",
          "$200",
          "btn",
        ],
        [
          "1",
          "19-06-25",
          "Opatra",
          "Brandon",
          "Deposito",
          "Notas3",
          "$300",
          "btn",
        ],
      ],
      search: true,
      pagination: { limit: 3 },
    };
  }

  /**
   * Renders the modal form for adding a new sale.
   * @returns {import('lit-html').TemplateResult}
   */
  _tplSaleFormModal() {
    return html`
      <div id="card-sell" class="modal-seller">
        <div class="card-div">
          <h2 class="card-title">Registro de venta</h2>
          <form>
            <div class="grid-div">
              <div>
                <label class="card-label">Sucursal:</label>
                <select name="branch" class="card-select">
                  <option>Select</option>
                  <option>Mitika</option>
                </select>
              </div>

              <div>
                <label class="card-label">Fecha:</label>
                <input type="date" name="date" class="card-input" />
              </div>

              <div class="col-span-1">
                <label class="card-label">Vendedor:</label>
                <select name="seller" class="card-select">
                  <option>Select</option>
                  <option>Enrique</option>
                </select>
              </div>

              <div class="col-span-1">
                <input
                  type="number"
                  step=".01"
                  placeholder="Venta"
                  class="card-input mt-6 text-right"
                />
              </div>

              <div class="col-span-1">
                <label class="card-label">Metodo de Pago:</label>
                <select name="paymentType" class="card-select">
                  <option>Select</option>
                  <option>Cash</option>
                  <option>Card</option>
                </select>
              </div>

              <div class="col-span-1">
                <input
                  type="number"
                  step=".01"
                  placeholder="Cantidad"
                  class="card-input mt-6 text-right"
                />
              </div>

              <div class="col-span-2">
                <label class="card-label">Notas:</label>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="Escribe una observacion..."
                  class="card-textarea"
                ></textarea>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="card-buttons">
              <button
                type="button"
                class="close-btn"
                @click=${() => (this.showForm = false)}
              >
                Cerrar
              </button>
              <button class="agree-btn">Agregar</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <button
        class="new-form-btn"
        @click=${() => (this.showForm = !this.showForm)}
      >
        Agregar Venta
      </button>

      ${this.showForm ? this._tplSaleFormModal() : nothing}

      <grid-table .config=${this.salesTableConfig}></grid-table>
    `;
  }
}
customElements.define("seller-form", SellerForm);
