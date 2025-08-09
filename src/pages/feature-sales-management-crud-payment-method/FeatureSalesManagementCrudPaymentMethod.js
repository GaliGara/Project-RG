import { LitElement, html, nothing } from 'lit';
import '../../../components/payment-method-form/PaymentMethodForm.js';
import '../../../components/grid-table/GridTable.js';

export class FeatureSalesManagementCrudPaymentMethod extends LitElement {
  static get properties() {
    return {
      dataGridPaymentMethod: { type: Object },
    };
  }

  constructor() {
    super();
    this.dataGridPaymentMethod = {};
  }

  createRenderRoot() {
    return this;
  }

  /**
   * Set Object data on CustomEvent
   * @param {Object} data
   */
  submitPage(data) {
    this.dispatchEvent(new CustomEvent('submit-payment-method-event', { detail: data }));
  }

  render() {
    return html`
      ${Object.keys(this.dataGridPaymentMethod || {}).length
        ? html` <payment-method-form
            .tableConfig="${this.dataGridPaymentMethod}"
            @request-submit="${e => this.submitPage(e.detail)}"
          ></payment-method-form>`
        : nothing}
    `;
  }
}
customElements.define(
  'feature-sales-management-crud-payment-method',
  FeatureSalesManagementCrudPaymentMethod,
);
