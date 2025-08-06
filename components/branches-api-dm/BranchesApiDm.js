import { LitElement } from 'lit';

export class BranchesApiDm extends LitElement {
  static get properties() {
    return {};
  }

  async createBranch(body) {
    try {
    const res = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/branches', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

      if (!res.ok) {
        const error = await res.json();
        this.dispatchEvent(new CustomEvent('branches-api-dm-fetch-post-error', { detail: error }));
        return;
      }
      const data = await res.json();
      console.log('POST FINISH')
      this.dispatchEvent(new CustomEvent('branches-api-dm-post', { detail: data }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('branches-api-dm-post-error', { detail: error }));
    }
  }

  async getBranches() {
    console.log('🚀 ~ SalesApiDm ~ getSalesBranch ~ getSalesBranch:');
    try {
      const res = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/branches');

      if (!res.ok) {
        console.log('if');

        const error = await res.json();
        this.dispatchEvent(new CustomEvent('branches-api-dm-fetch-error', { detail: error }));
        return;
      }
      console.log('succes');

      const data = await res.json();
      this.dispatchEvent(new CustomEvent('branches-api-dm-fetch', { detail: data }));
    } catch (error) {
      console.log('error');

      this.dispatchEvent(new CustomEvent('branches-api-dm-error', { detail: error }));
    }
  }
}

customElements.define('branches-api-dm', BranchesApiDm);
