import { LitElement } from 'lit';

export class ReportApiDm extends LitElement {
  /**
   * Fetch sales branch chart report data from the endpoint.
   * @public
   */
  async getSalesBranchChartReport() {
    try {
      const res = await fetch(
        'https://keysarcosmetics.fly.dev/keysarCosmetics/dashboard/sales/branch/chart?month=2025-07',
        {
          method: 'GET',
          credentials: 'include',
        },
      );

      if (!res.ok) {
        const error = await res.json();
        this.dispatchEvent(
          new CustomEvent('branch-chart-report-api-dm-fetch-error', { detail: error }),
        );
        return;
      }

      const data = await res.json();
      this.dispatchEvent(new CustomEvent('branch-chart-report-api-dm-fetch', { detail: data }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('branch-chart-report-api-dm-error', { detail: error }));
    }
  }

  /**
   * Fetch sales branch card report data from the endpoint.
   * @public
   */
  async getSalesBranchReport() {
    try {
      const res = await fetch(
        'https://keysarcosmetics.fly.dev/keysarCosmetics/dashboard/sales/branch?date=2025-07',
        {
          method: 'GET',
          credentials: 'include',
        },
      );

      if (!res.ok) {
        const error = await res.json();
        this.dispatchEvent(new CustomEvent('branch-report-api-dm-fetch-error', { detail: error }));
        return;
      }

      const data = await res.json();
      this.dispatchEvent(new CustomEvent('branch-report-api-dm-fetch', { detail: data }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('branch-report-api-dm-error', { detail: error }));
    }
  }
}
customElements.define('report-api-dm', ReportApiDm);
