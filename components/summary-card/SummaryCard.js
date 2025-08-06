import { LitElement, html } from 'lit';

export class SummaryCard extends LitElement {
  static get properties() {
    return {
      /**
       * The title of the card.
       * @type {String}
       * @default ''
       */
      titleCard: {
        type: String,
        attribute: 'title-card',
      },
      /**
       * The data for the items in the card.
       * @type {Array}
       * @default []
       */
      dataBranch: {
        type: Array,
      },
      /**
       * The total sales amount.
       * @type {Number}
       * @default 0
       */
      salesTotal: {
        type: Number,
      },
    };
  }

  constructor() {
    super();
    this.titleCard = '';
    this.dataBranch = [];
    this.salesTotal = 0;
  }

  createRenderRoot() {
    return this;
  }

  /**
   * Template for the summary card.
   * @returns {TemplateResult}
   * @private
   */
  _tplCard() {
    return html`
      <div class="bg-white rounded-2xl shadow-md p-4 w-full max-w-md">
        <div class="flex items-center justify-between border-b pb-3 mb-3">
          <h2 class="text-2xl font-bold">${this.titleCard}</h2>
        </div>
        <ul>
          ${this?.dataBranch?.map(
            item => html`
              <li class="flex justify-between items-center py-2 border-b last:border-b-0">
                <span class="text-gray-800">${item.branch}</span>
                <span class="font-bold text-gray-900">$${item.sales.toFixed(2)}</span>
              </li>
            `,
          )}
        </ul>
        <div class="rounded-b-2xl -mx-4 mt-4 px-4 py-4 flex justify-center">
          <span class="text-3xl font-bold text-gray-900">$${this.salesTotal.toFixed(2)}</span>
        </div>
      </div>
    `;
  }

  render() {
    return html` ${this._tplCard()} `;
  }
}
customElements.define('summary-card', SummaryCard);
