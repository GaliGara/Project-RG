import { LitElement, html, nothing } from "lit";
import "../grid-table/GridTable";

export class BranchForm extends LitElement {
  static get properties() {
    return {
      /**
       * List of branches
       * @type {Array}
       * @default '[]'
       */
      branchNames: { type: Array },

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
    this.branchNames = [];
    this.configBranch = {};
    this.newFormBtn = false;
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
      columns: ["ID", "Sucursal", "Acciones"],
      data: [
        ["1", "Mitika", "btn"],
        ["2", "Delta", "btn"],
        ["3", "Zona", "btn"],
      ],
      search: true,
      pagination: { limit: 3 },
    };
  }

  /**
   * Renders the modal form to register a new branch.
   * @returns {import('lit-html').TemplateResult}
   */
  _tplBranchFormModal() {
    return html`
      <div class="modal-branch">
        <div class="card-div">
          <h2 class="card-title">Registrar Sucursal</h2>
          <form>
            <div class="grid-div">
              <div class="grid-cols-2">
                <label class="card-label">Nombre de Sucursal:</label>
                <input class="card-input" type="text" name="branch" />
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="card-buttons">
              <button
                class="close-btn"
                type="button"
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
        Agregar Sucursal
      </button>

      ${this.showForm ? this._tplBranchFormModal() : nothing}

      <grid-table .config=${this.tableConfig}></grid-table>
    `;
  }
}

customElements.define("branch-form", BranchForm);
