import { LitElement, html, nothing } from 'lit';
import '../grid-table/GridTable.js';

export class BranchForm extends LitElement {
  static get properties() {
    return {
      /**
       * List of branches
       * @type {String}
       * @default ''
       */
      branchName: { type: String },

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
    this.branchName = '';
    this.tableConfig = {};
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
   * Renders the modal form to register a new branch.
   * @returns {import('lit-html').TemplateResult}
   */
  _tplBranchFormModal() {
    return html`
      <div class="modal-branch">
        <div class="card-div">
          <h2 class="card-title">Registrar Sucursal</h2>
          <form id="branch-form" @submit=${this.submit}>
            <div class="grid-div">
              <div class="grid-cols-2">
                <label class="card-label">Nombre de Sucursal:</label>
                <input
                  class="card-input"
                  type="text"
                  name="branch"
                  .value=${this.branchName}
                  @input=${e => {
                    this.branchName = e.target.value;
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
        detail: { branchName: this.branchName },
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
        Agregar Sucursal
      </button>

      ${this.showForm ? this._tplBranchFormModal() : nothing}

      <grid-table .config=${this.tableConfig}></grid-table>
    `;
  }
}

customElements.define('branch-form', BranchForm);
