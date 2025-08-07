import { LitElement, html, nothing } from 'lit';
import '../grid-table/GridTable.js';

export class EmployerForm extends LitElement {
  static get properties() {
    return {
      /**
       * List of employees
       * @type {Array}
       * @default '[]'
       */
      employees: { type: Array },

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
    const value = e.target.value.trim();
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
   * Configuration for the employee table component.
   * @returns {Object}
   */
  get tableConfig() {
    return {
      columns: [
        'ID',
        'Nombre Completo',
        'Apellido Paterno',
        'Apellido Materno',
        'Nombre',
        'Banco',
        'Numero de Cuenta',
        'Puesto',
        'Actions',
      ],
      data: [
        [
          '1',
          'Enrique Galicia Garatachia',
          'Galicia',
          'Garatachia',
          'Enrique',
          'BBVA',
          'xxx xxx x33',
          'Sales',
          'btn',
        ],
        [
          '2',
          'Emanuel Rangel',
          'Rangel',
          'No.',
          'Emanuel',
          'Santander',
          'xxx xxx x12',
          'Director',
          'btn',
        ],
        [
          '3',
          'Brandon Galicia Garatachia',
          'Galicia',
          'Garatachia',
          'Brandon',
          'Azteca',
          'xxx xxx x99',
          'Cosmetologist',
          'btn',
        ],
      ],
      search: true,
      pagination: { limit: 3 },
    };
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
          <h2 class="card-title">Registro de Empleados</h2>
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
                <input type="text" name="bank" class="card-input" />
              </div>

              <div class="col-span-2">
                <label class="card-label">Nuemero de Cuenta:</label>
                <input type="number" step="1" name="accountNumber" class="card-input" />
              </div>

              <div class="col-span-2">
                <label class="card-label">Puesto:</label>
                <select name="position" class="card-select">
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
    this.dispatchEvent(
      new CustomEvent('request-submit', {
        detail: this.formData,
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
        Agregar Empleado
      </button>
      ${this.showForm ? this._tplFormModal() : nothing}

      <grid-table .config=${this.tableConfig}></grid-table>
    `;
  }
}

customElements.define('employer-form', EmployerForm);
