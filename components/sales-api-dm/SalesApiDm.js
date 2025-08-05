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
    console.log('🚀 ~ SalesApiDm ~ getSalesBranch ~ getSalesBranch:');
    try {
      const res = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/sales/branch');

      if (!res.ok) {
        console.log('if');

        const error = await res.json();
        this.dispatchEvent(new CustomEvent('sales-api-dm-fetch-error', { detail: error }));
        return;
      }
      console.log('succes');

      const data = await res.json();
      this.dispatchEvent(new CustomEvent('sales-api-dm-fetch', { detail: data }));
    } catch (error) {
      console.log('error');

      this.dispatchEvent(new CustomEvent('sales-api-dm-error', { detail: error }));
    }
  }

  render() {
    return html``;
  }
}

customElements.define('sales-api-dm', SalesApiDm);
