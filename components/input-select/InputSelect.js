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
      this._requestOptions();
    }
  }

  /**
   * Requests options for the select input.
   * @private
   * @event input-select-request-data
   */
  _requestOptions() {
    this.dispatchEvent(
      new CustomEvent('input-select-request-data', {
        composed: true,
        bubbles: true,
      }),
    );
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
        ${this._mapOptions(this.selectType)}
      </select>
    `;
  }

  /**
   * Maps options based on the select type.
   * @private
   * @param {String} selectType
   */
  _mapOptions(selectType) {
    const dictionary = {
      paymentMethod: () =>
        this.optionValue.map(
          item => html`<option value=${item.idPaymentMethod}>${item.paymentMethodName}</option>`,
        ),
      branch: () =>
        this.optionValue.map(
          item => html`<option value=${item.idBranch}>${item.branchName}</option>`,
        ),
      seller: () =>
        this.optionValue.map(
          item =>
            html`<option value=${item.idEmployee}>${`${item.firstName} ${item.lastName}`}</option>`,
        ),
    };
    const dispatchDictionary = dictionary[selectType];
    return dispatchDictionary();
  }

  render() {
    return html`${this._tplSelect()}`;
  }
}
customElements.define('input-select', InputSelect);
