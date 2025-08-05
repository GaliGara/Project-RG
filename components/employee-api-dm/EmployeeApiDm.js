import { LitElement } from 'lit';

export class EmployeeApiDm extends LitElement {
  static get properties() {
    return {};
  }

  async getEmployee() {
    console.log('🚀 ~ SalesApiDm ~ getSalesBranch ~ getSalesBranch:');
    try {
      const res = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/employees');

      if (!res.ok) {
        console.log('if');

        const error = await res.json();
        this.dispatchEvent(new CustomEvent('employee-api-dm-fetch-error', { detail: error }));
        return;
      }
      console.log('succes');

      const data = await res.json();
      this.dispatchEvent(new CustomEvent('employee-api-dm-fetch', { detail: data }));
    } catch (error) {
      console.log('error');

      this.dispatchEvent(new CustomEvent('employee-api-dm-error', { detail: error }));
    }
  }
}

customElements.define('employee-api-dm', EmployeeApiDm);
