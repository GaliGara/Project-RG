import { LitElement, html, nothing } from 'lit';
import '../grid-table/GridTable';

export class SellerForm extends LitElement {
  static get properties() {
    return {
      configSell: { type: Object },
      newFormBtn: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.configSell = {};
    this.newFormBtn = false;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const configSell = {
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

    return html`

    <button
    @click=${()=> this.newFormBtn = !this.newFormBtn}
    class="new-form-btn"
    >Agregar Venta
    </button>

    ${this.newFormBtn ? html`
      <div
        id="card-sell"
        class="modal-seller"
      >
        <div class="card-div">
          <h2 class="card-title">Registro de Venta</h2>
          <form>
            <div class="grid-div">
              <div>
                <label class="card-label">Sucursal</label>
                <select
                  name="sucursal"
                  class="card-select"
                >
                  <option>Seleccionar</option>
                  <option>Mitika</option>
                </select>
              </div>
              <div>
                <label class="card-label">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  class="card-input"
                />
              </div>
              <div class="col-span-1">
                <label class="card-label">Vendedor</label>

                <select
                  name="vendedor"
                  class="card-select"
                >
                  <option>Seleccionar</option>
                  <option>Enrique</option>
                </select>
              </div>
              <div class="col-span-1">
                <!-- <label class="block text-sm font-medium mb-1">Venta</label>  -->
                <input
                  id="ventas"
                  placeholder="Venta"
                  type="number"
                  step=".01"
                  class="card-input mt-6 text-right"
                />
              </div>
              <div class="col-span-1">
                <label class="card-label"
                  >Tipo de pago</label
                >

                <select
                  name="vendedor"
                  class="card-select"
                >
                  <option>Seleccionar</option>
                  <option>Efectivo</option>
                  <option>Tarjeta</option>
                </select>
              </div>
              <div class="col-span-1">
                <!-- <label class="block text-sm font-medium mb-1">Cantidad</label>    -->

                <input
                  id="ventas"
                  placeholder="Cantidad"
                  type="number"
                  step=".01"
                  class="card-input mt-6 text-right"
                />
              </div>
              <div class="col-span-2">
                <label class="card-label">Notas:</label>

                <textarea
                  name="notas"
                  rows="3"
                  placeholder="Escribe alguna observación..."
                  class="card-textarea"
                ></textarea>
              </div>
            </div>

            <!-- Buttons -->
            <div class="card-buttons">
              <button
                class="close-btn"
                type="button"
                @click=${()=> this.newFormBtn = !this.newFormBtn}
              >
                Cerrar
              </button>
              <button
                class="agree-btn"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
        `
        :nothing}
      <grid-table .config=${configSell}></grid-table>
    `;
  }
}
customElements.define("seller-form", SellerForm);