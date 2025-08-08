import { LitElement, html } from 'lit';
import '../../../components/payment-method-form/PaymentMethodForm.js';
import '../../../components/grid-table/GridTable.js';

export class FeatureSalesManagementCrudPaymentMethod extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
    };
  }

  constructor() {
    super();
    this.data = [];
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
      <h1>hola desde payment method page</h1>
      <payment-method-form @request-submit="${(e) => this.submitPage(e.detail)}"></payment-method-form>
    `;
  }
}
customElements.define(
  'feature-sales-management-crud-payment-method',
  FeatureSalesManagementCrudPaymentMethod,
);
