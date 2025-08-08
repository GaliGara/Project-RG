import { LitElement } from 'lit';

export class EmployeeApiDm extends LitElement {
  static get properties() {
    return {};
  }

  async getEmployee() {
    try {
      const res = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/employees');

      if (!res.ok) {
        const error = await res.json();
        this.dispatchEvent(new CustomEvent('employee-api-dm-fetch-error', { detail: error }));
        return;
      }
      console.log('succes');

      const data = await res.json();
      console.log('data', data)
      this.dispatchEvent(new CustomEvent('employee-api-dm-fetch', { detail: data }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('employee-api-dm-error', { detail: error }));
    }
  }

  async createEmployee(body) {
    try {
      const res = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/employees', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const error = await res.json();
        this.dispatchEvent(new CustomEvent('employee-api-dm-fetch-post-error', { detail: error }));
        return;
      }
      const data = await res.json();
      console.log('POST FINISH');
      this.dispatchEvent(new CustomEvent('employee-api-dm-post', { detail: data }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('employee-api-dm-post-error', { detail: error }));
    }
  }
}

customElements.define('employee-api-dm', EmployeeApiDm);
