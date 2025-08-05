import { LitElement } from 'lit';

export class PaymentMethodApiDm extends LitElement {
  static get properties() {
    return {};
  }

  async getPaymentMethod() {
    console.log('🚀 ~ SalesApiDm ~ getSalesBranch ~ getSalesBranch:');
    try {
      const res = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/payment-methods');

      if (!res.ok) {
        console.log('if');

        const error = await res.json();
        this.dispatchEvent(new CustomEvent('payment-method-api-dm-fetch-error', { detail: error }));
        return;
      }
      console.log('succes');

      const data = await res.json();
      this.dispatchEvent(new CustomEvent('payment-method-api-dm-fetch', { detail: data }));
    } catch (error) {
      console.log('error');

      this.dispatchEvent(new CustomEvent('payment-method-api-dm-error', { detail: error }));
    }
  }
}

customElements.define('payment-method-api-dm', PaymentMethodApiDm);
