import { LitElement, html, nothing } from 'lit';

export class BranchForm extends LitElement {
  static get properties() {
    return {
      /**
       * branche name
       * @type {String}
       * @default ''
       */
      branchName: { type: String },

      /**
       * Boolean to show form
       * @type {Boolean}
       * @default 'false'
       */
      showForm: { type: Boolean },
      inputBranch: { type: Object },
    };
  }

  constructor() {
    super();
    this.branchName = '';
    this.showForm = false;
    this.inputBranch = {};
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
          <h2 class="card-title">
            ${this.inputBranch?.id ? 'Editar Sucursal:' : 'Agregar Sucursal:'}
          </h2>
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
        detail: {
          id: this.inputBranch?.id ?? null,
          branchName: this.branchName,
          action: this.inputBranch?.id ? 'update' : 'create',
        },
        bubbles: true,
        composed: true,
      }),
    );
    event.target.reset();
    this.showForm = false;
    this.inputBranch = {};
    this.branchName = '';
  }

  updated(changedProps) {
    if (
      changedProps.has('inputBranch') &&
      this.inputBranch &&
      Object.keys(this.inputBranch).length > 0
    ) {
      this.showForm = true;
      this.branchName = this.inputBranch.name || '';
    }
  }

  render() {
    return html`
      <button
        class="new-form-btn"
        @click=${() => {
          this.showForm = true;
          this.paymentMethod = {};
          this.internalValue = '';
        }}
      >
        Agregar Sucursal
      </button>

      ${this.showForm ? this._tplBranchFormModal() : nothing}
    `;
  }
}

customElements.define('branch-form', BranchForm);
