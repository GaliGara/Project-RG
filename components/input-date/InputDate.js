import { LitElement, html, nothing } from 'lit';

export class InputDate extends LitElement {
  static get properties() {
    return {
      typeDate: {
        type: String,
        attribute: 'type-date',
      },
    };
  }

  constructor() {
    super();
    this.typeDate = '';
  }

  createRenderRoot() {
    return this;
  }

  /**
   * Get element from the shadow DOM or light DOM.
   * @param {String} selector
   * @private
   */
  _getElement(selector) {
    return this.renderRoot?.querySelector(selector) ?? this.querySelector(selector);
  }

  /**
   * Dispatch selected date.
   * @private
   * @event input-date-between-data
   * @event input-date-unique-data
   */
  _sendDate() {
    const startDate = this._getElement('#startDateDashboardReport')?.value ?? '';
    const endDate = this._getElement('#endDateDashboardReport')?.value ?? '';
    if (this.typeDate === 'between') {
      if (startDate && endDate) {
        this.dispatchEvent(
          new CustomEvent('input-date-between-data', {
            detail: { startDate, endDate },
          }),
        );
      }
    }
    if (this.typeDate === 'unique') {
      if (startDate) {
        this.dispatchEvent(
          new CustomEvent('input-date-unique-data', {
            detail: { startDate },
          }),
        );
      }
    }
  }

  /**
   * Template for input date.
   * @returns {TemplateResult}
   * @private
   */
  _tplDate() {
    return html`
      <p class="text-sm text-center font-semibold text-gray-700 uppercase">
        ${this.typeDate === 'between'
          ? 'Selecciona un rango de fecha para mostrar datos'
          : 'Selecciona fecha para mostrar datos'}
      </p>
      <div class="flex justify-center items-center gap-2 mt-3 mb-3">
        <div class="flex flex-col">
          <label for="startDateDashboardReport" class="mb-1 text-xs font-medium text-gray-600">
            ${this.typeDate === 'between' ? 'Fecha inicial' : 'Fecha'}
          </label>
          <input
            type="date"
            name="startDateDashboardReport"
            id="startDateDashboardReport"
            @change=${this._sendDate}
            class="border border-gray-300 rounded-lg px-3 py-1.5 shadow-xl text-gray-700"
          />
        </div>
        ${this.typeDate === 'between'
          ? html`<div class="flex flex-col">
              <label for="endDateDashboardReport" class="mb-1 text-xs font-medium text-gray-600">
                Fecha final
              </label>
              <input
                type="date"
                name="endDateDashboardReport"
                id="endDateDashboardReport"
                @change=${this._sendDate}
                class="border border-gray-300 rounded-lg px-3 py-1.5 shadow-xl text-gray-700"
              />
            </div>`
          : nothing}
      </div>
    `;
  }

  render() {
    return html`${this._tplDate()}`;
  }
}
customElements.define('input-date', InputDate);
