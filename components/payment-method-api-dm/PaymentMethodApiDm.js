import { LitElement } from 'lit';

export class PaymentMethodApiDm extends LitElement {
  static get properties() {
    return {};
  }

  async getPaymentMethod() {
    try {
      const res = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/payment-methods');

      if (!res.ok) {
        const error = await res.json();
        this.dispatchEvent(new CustomEvent('payment-method-api-dm-fetch-error', { detail: error }));
        return;
      }
      
      const data = await res.json();
      console.log('succes - data', data);
      this.dispatchEvent(new CustomEvent('payment-method-api-dm-fetch', { detail: data }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('payment-method-api-dm-error', { detail: error }));
    }
  }

    async createPaymentMethod(body) {
    try {
      const res = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/payment-methods', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const error = await res.json();
        this.dispatchEvent(new CustomEvent('payment-method-api-dm-fetch-post-error', { detail: error }));
        return;
      }
      const data = await res.json();
      console.log('POST FINISH', data);
      this.dispatchEvent(new CustomEvent('payment-method-api-dm-post', { detail: data }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('payment-method-api-dm-post-error', { detail: error }));
    }
  }
}

customElements.define('payment-method-api-dm', PaymentMethodApiDm);
