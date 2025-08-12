import { LitElement, html } from 'lit';

export class InputSelect extends LitElement {
  static get properties() {
    return {
      /**
       * Type of the select input.
       * @type {String}
       * @default ''
       */
      selectType: {
        type: String,
        attribute: 'select-type',
      },
      /**
       * Options for the select input.
       * @type {Array}
       * @default []
       */
      optionValue: {
        type: Array,
      },
    };
  }

  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this.selectType = '';
    this.optionValue = [];
  }

  updated(changedProperties) {
    if (changedProperties.has('selectType')) {
      this._requestOptions(this.selectType);
    }
  }

  /**
   * Requests options for the select input.
   * @private
   * @event input-select-request-data
   */
  _requestOptions(type) {
    if (type === 'paymentMethod') {
      this.dispatchEvent(
        new CustomEvent('input-select-request-data', {
          composed: true,
          bubbles: true,
        }),
      );
    }
  }

  /**
   * Dispatch selected date.
   * @private
   * @event input-select-changed
   */
  _onChange(event) {
    const selectedValue = event.target.value;
    this.dispatchEvent(
      new CustomEvent('input-select-changed', {
        detail: selectedValue,
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Template for select.
   * @returns {TemplateResult}
   * @private
   */
  _tplSelect() {
    return html`
      <select
        @change="${e => this._onChange(e)}"
        class="border border-gray-300 rounded-lg px-3 py-1.5 shadow-xl text-gray-700"
      >
        <option value="" selected disabled hidden>SELECCIONA</option>
        ${this?.optionValue?.map(
          option =>
            html` <option value="${option.idPaymentMethod}">${option.paymentMethodName}</option>`,
        )}
      </select>
    `;
  }

  render() {
    return html`${this._tplSelect()}`;
  }
}
customElements.define('input-select', InputSelect);
