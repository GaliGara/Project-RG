import { LitElement, html} from 'lit';
import '../grid-table/GridTable';

export class BranchForm extends LitElement {
  static get properties() {
    return {
      branchNames: { type: Array },
      configBranch: { type: Object },
    };
  }
    
  constructor() {
    super();
    this.branchNames = [];
    this.configBranch = {};
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const configBranch = {
      columns: ["ID", "Sucursal", "Acciones"],
      data: [
        ["1", "Mitika", "btn"],
        ["2", "Delta", "btn"],
        ["3", "Zona", "btn"],
      ],
      search: true,
      pagination: { limit: 3 },
    };

    return html`
      <div
        class="modal-branch"
      >
        <div class="card-div">
          <h2 class="card-title">Registro de Sucursal</h2>
          <form>
            <div class="grid-div">
              <div class="grid-cols-2">
                <label class="card-label"
                  >Nombre de Sucursal:</label
                >
                <input
                  class="card-input"
                  type="text"
                  name="sucursales"
                />
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

      <grid-table .config=${configBranch}></grid-table>
    `;
  }
}

customElements.define("branch-form", BranchForm);