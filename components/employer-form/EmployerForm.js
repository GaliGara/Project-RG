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

      dataTable: { type: Object },
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
    this.dataTable = {};
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
      data: [
        [
          6,
          'PAULA GARCIA MENDEZ',
          'PAULA',
          'GARCIA',
          'MENDEZ',
          'NU',
          '8493029384756102938',
          'VENDEDOR',
          '400000',
        ],
        [
          7,
          'VICTOR HUGO FERNANDEZ CRUZ',
          'VICTOR HUGO',
          'FERNANDEZ',
          'CRUZ',
          'BBVA',
          '5647382910293847561',
          'VENDEDOR',
          '30000',
        ],
        [
          8,
          'SUSANA HERRERA SALAS',
          'SUSANA',
          'HERRERA',
          'SALAS',
          'HSBC',
          '1827364557382910293',
          'VENDEDOR',
          '7000',
        ],
        [
          9,
          'PEDRO ALONSO REYES PEREZ',
          'PEDRO ALONSO',
          'REYES',
          'PEREZ',
          'SANTANDER',
          '1293847560192837465',
          'CALL CENTER',
          '20000',
        ],
        [
          10,
          'ANDREA LIZETH LOPEZ FUENTES',
          'ANDREA LIZETH',
          'LOPEZ',
          'FUENTES',
          'BBVA',
          '6758493029384756102',
          'VENDEDOR',
          '3000',
        ],
        [
          11,
          'RAFAEL CARRILLO SOLIS',
          'RAFAEL',
          'CARRILLO',
          'SOLIS',
          'BANAMEX',
          '2938475610293847561',
          'VENDEDOR',
          '500',
        ],
        [
          12,
          'MONICA IVETTE ROSALES MORA',
          'MONICA IVETTE',
          'ROSALES',
          'MORA',
          'HSBC',
          '4756102938475610293',
          'GERENTE',
          '2000',
        ],
        [
          5,
          'JORGE ALBERTO VAZQUEZ LEON',
          'JORGE ALBERTO',
          'VAZQUEZ',
          'LEON',
          'BANCO AZTECA',
          '0192837465819203847',
          'VENDEDOR',
          '130000',
        ],
        [
          4,
          'ANA LUCIA TORRES MARTINEZ',
          'ANA LUCIA',
          'TORRES',
          'MARTINEZ',
          'SANTANDER',
          '1029384756102938475',
          'VENDEDOR',
          '120000',
        ],
        [
          3,
          'MARIO SANTOS PEREZ',
          'MARIO',
          'SANTOS',
          'PEREZ',
          'HSBC',
          '5647382910111213141',
          'VENDEDOR',
          '320000',
        ],
        [
          2,
          'LAURA MORALES DIAZ',
          'LAURA',
          'MORALES',
          'DIAZ',
          'BANAMEX',
          '9876543210987654321',
          'VENDEDOR',
          '150000',
        ],
        [
          1,
          'CARLOS RAMIREZ GOMEZ',
          'CARLOS',
          'RAMIREZ',
          'GOMEZ',
          'BBVA',
          '1234567890123456789',
          'VENDEDOR',
          '500000',
        ],
        [13, 'PRUEBA 2', 'PRUEBA', '2', '', 'nu', '1111111111111', 'VENDEDOR', '250000'],
        [
          14,
          'ANDREA MARIA ROLIS CASI',
          'ANDREA MARIA',
          'ROLIS',
          'CASI',
          'BBVA',
          '11111111111111',
          'VENDEDOR',
          '100000',
        ],
        [
          15,
          'ANDREA MORNI DALI MENDEZ',
          'ANDREA MORNI',
          'DALI',
          'MENDEZ',
          'BBVA',
          '7777777777777',
          'VENDEDOR',
          '200000',
        ],
        [
          16,
          'ANDREA MARIA MENDEZ SOTANO',
          'ANDREA MARIA',
          'MENDEZ',
          'SOTANO',
          '',
          '',
          '',
          '300000',
        ],
        [
          17,
          'JOSE ENRIQUE GALICIA ROJAS',
          'JOSE ENRIQUE',
          'GALICIA',
          'ROJAS',
          '',
          '',
          'VENDEDOR',
          '10000',
        ],
        [18, 'JUAN PÉREZ', 'JUAN', 'PÉREZ', '', 'BBVA', '12345678901234567890', 'VENDEDOR', '0'],
        [
          19,
          'Juanito Pérez Martínez',
          'Juanito',
          'Pérez',
          'Martínez',
          'BBVA',
          '0123456789',
          'Vendedor',
          '0',
        ],
        [
          21,
          'JUANA PEREZ MAR',
          'JUANA',
          'PEREZ',
          'MAR',
          'BBVA',
          '0123456789',
          'Vendedor',
          '120000',
        ],
        [22, '', '', '', '', '', '', '', '0'],
        [23, '', '', '', '', '', '', '', '0'],
        [
          24,
          'Brandon Galicia Garatachia',
          'Brandon',
          'Galicia',
          'Garatachia',
          'poi',
          '123455',
          'Vendedor',
          '0',
        ],
      ],
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
      search: true,
      pagination: {
        limit: 3,
      },
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

      <grid-table .config=${this?.dataTable}></grid-table>
    `;
  }
}

customElements.define('employer-form', EmployerForm);
