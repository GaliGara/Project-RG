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
      this.dispatchEvent(new CustomEvent('branches-api-dm-post', { detail: data }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('branches-api-dm-post-error', { detail: error }));
    }
  }

  async getBranches() {
    this.dispatchEvent(new CustomEvent('loading-start', { bubbles: true, composed: true }));
    try {
      const res = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/branches');
      if (!res.ok) {
        const error = await res.json();
        this.dispatchEvent(new CustomEvent('branches-api-dm-fetch-error', { detail: error }));
        return;
      }
      const data = await res.json();
      this.dispatchEvent(new CustomEvent('branches-api-dm-fetch', { detail: data }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('branches-api-dm-error', { detail: error }));
    } finally {
      this.dispatchEvent(new CustomEvent('loading-end', { bubbles: true, composed: true }));
    }
  }
}

customElements.define('branches-api-dm', BranchesApiDm);
