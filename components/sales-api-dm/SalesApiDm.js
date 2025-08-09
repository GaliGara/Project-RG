import { LitElement, html } from 'lit';

export class SalesApiDm extends LitElement {
  static get properties() {
    return {
      salesData: { type: Array },
      employeeData: { type: Array },
      branchesData: { type: Array },
    };
  }

  constructor() {
    super();
    this.salesData = [];
    this.employeeData = [];
    this.branchesData = [];
  }

  async getSalesBranch() {
    this.dispatchEvent(new CustomEvent('loading-start', { bubbles: true, composed: true }));
    try {
      const res = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/sales/branch');
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

  render() {
    return html``;
  }
}

customElements.define('sales-api-dm', SalesApiDm);
