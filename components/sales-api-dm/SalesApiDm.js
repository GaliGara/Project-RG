import { LitElement } from 'lit';

export class SalesApiDm extends LitElement {
  /**
   * Fetch get sales branch data from the endpoint.
   * @public
   * @event loading-start
   * @event loading-end
   * @event sales-api-dm-fetch
   * @event sales-api-dm-fetch-error
   * @event sales-api-dm-error
   */
  async getSalesBranch() {
    this.dispatchEvent(new CustomEvent('loading-start', { bubbles: true, composed: true }));
    try {
      const res = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/sales/branch', {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'cache-control': 'no-store',
          pragma: 'no-cache',
        },
      });
      if (!res.ok) {
        const error = await res.json();
        this.dispatchEvent(new CustomEvent('sales-api-dm-fetch-error', { detail: error }));
        return;
      }
      const data = await res.json();
      this.dispatchEvent(new CustomEvent('sales-api-dm-fetch', { detail: data }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('sales-api-dm-error', { detail: error }));
    } finally {
      this.dispatchEvent(new CustomEvent('loading-end', { bubbles: true, composed: true }));
    }
  }

  /**
   * Create a new sale and insert on branch, employee and payment table.
   * @public
   * @param {Object} body
   * @event loading-start
   * @event loading-end
   * @event create-sales-api-dm-fetch
   * @event create-sales-api-dm-fetch-error
   * @event create-sales-api-dm-error
   */
  async createSale(body) {
    this.dispatchEvent(new CustomEvent('loading-start', { bubbles: true, composed: true }));
    try {
      const res = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/sales', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const error = await res.json();
        this.dispatchEvent(new CustomEvent('create-sales-api-dm-fetch-error', { detail: error }));
        return;
      }
      const data = await res.json();
      this.dispatchEvent(
        new CustomEvent('create-sales-api-dm-fetch', {
          detail: data,
        }),
      );
    } catch (error) {
      this.dispatchEvent(new CustomEvent('create-sales-api-dm-error', { detail: error }));
    } finally {
      this.dispatchEvent(new CustomEvent('loading-end', { bubbles: true, composed: true }));
    }
  }
}

customElements.define('sales-api-dm', SalesApiDm);
