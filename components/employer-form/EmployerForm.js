import { LitElement, html, nothing } from 'lit';

export class EmployerForm extends LitElement {
  static get properties() {
    return {
      /**
       * Name of employe
       * @type {String}
       * @default ''
       */
      firstName: { type: String },

      /**
       * Last name of employe
       * @type {String}
       * @default ''
       */
      lastName: { type: String },

      /**
       * middle name of employe
       * @type {String}
       * @default ''
       */
      middleName: { type: String },

      bank: { type: String },

      accountNumber: { type: Number },

      position: { type: String },

      /**
       * Boolean to show form template
       * @type {Boolean}
       * @default 'false'
       */
      showForm: { type: Boolean },

      /**
       * Object to contain labels form values
       * @type {Object}
       * @default '{}'
       */
      formData: { type: Object },

      inputEmployee: { type: Object },
    };
  }

  constructor() {
    super();
    this.employees = [];
    this.firstName = '';
    this.lastName = '';
    this.middleName = '';
    this.showForm = false;
    this.formData = {};
    this.inputEmployee = {};
    this.bank = '';
    this.accountNumber = null;
  }

  /**
   * Overrides LitElement's default behavior to render into the light DOM.
   * @returns {EmployerForm} This component without shadow DOM.
   */
  createRenderRoot() {
    return this;
  }

  /**
   * Handles name input fields and updates the associated property.
   * @param {InputEvent} e - The input event from name fields.
   */
  handleNameInput(e) {
    const field = e.target.name;
    let value = e.target.value;
    if (field !== 'position') value = value.trim();

    if (field === 'accountNumber') {
      value = value ? Number(value) : null;
    }
    this[field] = value;
  }

  /**
   * Computes the full name based on input fields.
   * @returns {string}
   */
  get fullName() {
    return [this.firstName, this.lastName, this.middleName].filter(Boolean).join(' ');
  }

  /**
   * Renders the employee form modal.
   * @returns {import('lit-html').TemplateResult}
   * @private
   */
  _tplFormModal() {
    return html`
      <div id="card-sell" class="modal-employer">
        <div class="card-div">
          <h2 class="card-title">
            ${this.inputEmployee?.id ? 'Editar datos de Empleado' : 'Registar Empleado'}
          </h2>
          <form @submit=${this.submit}>
            <div class="grid-div">
              <div class="col-span-2">
                <label class="card-label">Nombre Completo:</label>
                <input
                  type="text"
                  name="fullName"
                  class="card-input"
                  .value=${this.fullName}
                  readonly
                />
              </div>

              <div>
                <label class="card-label">Nombre:</label>
                <input
                  type="text"
                  class="card-input"
                  name="firstName"
                  .value=${this.firstName}
                  @input=${this.handleNameInput}
                />
              </div>

              <div>
                <label class="card-label">Apellido Paterno:</label>
                <input
                  type="text"
                  class="card-input"
                  name="lastName"
                  .value=${this.lastName}
                  @input=${this.handleNameInput}
                />
              </div>

              <div class="col-span-1">
                <label class="card-label">Apellido Materno:</label>
                <input
                  type="text"
                  class="card-input"
                  name="middleName"
                  .value=${this.middleName}
                  @input=${this.handleNameInput}
                />
              </div>

              <div class="col-span-1">
                <label class="card-label">Banco:</label>
                <input
                  type="text"
                  name="bank"
                  class="card-input"
                  .value=${this.bank}
                  @input=${this.handleNameInput}
                />
              </div>

              <div class="col-span-2">
                <label class="card-label">Nuemero de Cuenta:</label>
                <input
                  type="number"
                  step="1"
                  name="accountNumber"
                  class="card-input"
                  .value=${this.accountNumber ?? ''}
                  @input=${this.handleNameInput}
                />
              </div>

              <div class="col-span-2">
                <label class="card-label">Puesto:</label>
                <select
                  name="position"
                  class="card-select"
                  .value=${this.position}
                  @change=${this.handleNameInput}
                >
                  <option value="Vendedor">Vendedor</option>
                  <option value="Manager">Manager</option>
                  <option value="Director">Director</option>
                </select>
              </div>
            </div>

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
   * Handles the form submission event. Collects
   * the form data using the FormData
   *
   * @param {Event} event - The form submission event.
   */
  submit(event) {
    event.preventDefault();
    this.formData = new FormData(event.target);

    // const isUpdate = !!this.inputEmployee?.id;
    // const action = isUpdate ? 'update' : 'create';

    // // Convertir formData a objeto plano
    // const plainData = Object.fromEntries(this.formData.entries());
    // if (isUpdate) {
    //   plainData.id = this.inputEmployee.id;
    // }

    this.dispatchEvent(
      new CustomEvent('request-submit', {
        detail: {
          id: this.inputEmployee?.id ?? null,
          formData: this.formData,
          action: this.inputEmployee?.id ? 'update' : 'create',
        },
        bubbles: true,
        composed: true,
      }),
    );
    event.target.reset();
    this.showForm = false;
    this.firstName = '';
    this.lastName = '';
    this.middleName = '';
    this.bank = '';
    this.accountNumber = null;
    this.position = '';
    this.inputEmployee = {};
  }

  updated(changedProps) {
    if (
      changedProps.has('inputEmployee') &&
      this.inputEmployee &&
      Object.keys(this.inputEmployee).length > 0
    ) {
      this.showForm = true;

      const {
        firstName = '',
        lastName = '',
        middleName = '',
        bank = '',
        accountNumber = null,
        position = '',
      } = this.inputEmployee;

      this.firstName = firstName;
      this.lastName = lastName;
      this.middleName = middleName;
      this.bank = bank;
      this.accountNumber = accountNumber;
      this.position = position;
    }
  }

  render() {
    return html`
      <button
        class="new-form-btn"
        @click=${() => {
          this.inputEmployee = {};
          this.firstName = '';
          this.lastName = '';
          this.middleName = '';
          this.bank = '';
          this.accountNumber = null;
          this.position = '';
          this.showForm = true;
        }}
      >
        Agregar Empleado
      </button>
      ${this.showForm ? this._tplFormModal() : nothing}
    `;
  }
}

customElements.define('employer-form', EmployerForm);
