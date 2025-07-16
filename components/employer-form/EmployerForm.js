import { LitElement, html } from 'lit';
import '../grid-table/GridTable';

export class EmployerForm extends LitElement {
  static get properties() {
    return {
      employer: { type: Array },
      nombre: { type: String },
      apellidoPaterno: { type: String },
      apellidoMaterno: { type: String },
      configEmployers: { type: Object },
    };
  }

  constructor() {
    super();
    this.employer = [];
    this.nombre = "";
    this.apellidoMaterno = "";
    this.apellidoPaterno = "";
    this.configEmployers = {};
  }

  createRenderRoot() {
    return this;
  }

  handleFullName(e) {
    const campo = e.target.name;
    const valor = e.target.value.trim();
    this[campo] = valor;
    this.requestUpdate();
  }

  get nombreCompleto() {
    return [this.nombre, this.apellidoPaterno, this.apellidoMaterno]
      .filter(Boolean)
      .join(" ");
  }

  render() {
    const configEmployers = {
      columns: [
        "ID",
        "Nombre Completo",
        "Apellido Paterno",
        "Apellido Materno",
        "Nombres",
        "Banco",
        "Numero de Cuenta",
        "Puesto",
        "Acciones",
      ],
      data: [
        [
          "1",
          "Enrique Galicia Garatachia",
          "Galicia",
          "Garatachia",
          "Enrique",
          "BBVA",
          "xxx xxx x33",
          "Vendedor",
          "btn",
        ],
        [
          "2",
          "Emanuel Rangel",
          "Rangel",
          "No.",
          "Emanuel",
          "Santander",
          "xxx xxx x12",
          "Director",
          "btn",
        ],
        [
          "3",
          "Brandon Galicia Garatachia",
          "Galicia",
          "Garatachia",
          "Brandon",
          "Azteca",
          "xxx xxx x99",
          "Cosmetologa",
          "btn",
        ],
      ],
      search: true,
      pagination: { limit: 3 },
    };

    return html`
      <div
        id="card-sell"
        class="modal-employer"
      >
        <div class="card-div">
          <h2 class="card-title">Registro de Empleados</h2>
          <form>
            <div class="grid-div">
              <div class="col-span-2">
                <label class="card-label"
                  >Nombre Completo:</label
                >
                <input
                  type="text"
                  name="nombreCompleto"
                  class="card-input"
                  .value=${this.nombreCompleto}
                  readonly
                />
              </div>
              <div>
                <label class="card-label">Nombres:</label>
                <input
                  type="text"
                  class="card-input"
                  name="nombre"
                  .value=${this.nombre}
                  @input=${this.handleFullName}
                />
              </div>
              <div>
                <label class="card-label"
                  >Apellido Paterno:</label
                >
                <input
                  type="text"
                  class="card-input"
                  name="apellidoPaterno"
                  .value=${this.apellidoPaterno}
                  @input=${this.handleFullName}
                />
              </div>
              <div class="col-span-1">
                <label class="card-label"
                  >Apellido Materno:</label
                >

                <input
                  type="text"
                  class="card-input"
                  name="apellidoMaterno"
                  .value=${this.apellidoMaterno}
                  @input=${this.handleFullName}
                />
              </div>
              <div class="col-span-1">
                <label class="card-label">Banco:</label>
                <input
                  id="ventas"
                  type="text"
                  class="card-input"
                />
              </div>
              <div class="col-span-2">
                <label class="card-label"
                  >Numero de cuenta:</label
                >

                <input
                  id="ventas"
                  type="number"
                  step="1"
                  class="card-input"
                />
              </div>
              <div class="col-span-2">
                <label class="card-label">Puesto:</label>

                <select
                  name="puesto"
                  class="card-select"
                >
                  <option>Vendedor</option>
                  <option>Gerente</option>
                  <option>Director</option>
                </select>
              </div>
            </div>

            <!-- Buttons -->
            <div class="card-buttons">
              <button
                class="close-btn"
                type="button"
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
      <grid-table .config=${configEmployers}></grid-table>
    `;
  }
}

customElements.define("employer-form", EmployerForm);