import { LitElement } from 'lit';

export class ReportApiDm extends LitElement {
  /**
   * Fetch sales branch chart report data from the endpoint.
   * @public
   * @event 'loading-start'
   * @event 'loading-end'
   * @event 'branch-chart-report-api-dm-fetch'
   * @event 'branch-chart-report-api-dm-fetch-error'
   * @event 'branch-chart-report-api-dm-error'
   */
  async getSalesBranchChartReport() {
    this.dispatchEvent(new CustomEvent('loading-start', { bubbles: true, composed: true }));
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
    } finally {
      this.dispatchEvent(new CustomEvent('loading-end', { bubbles: true, composed: true }));
    }
  }

  /**
   * Fetch sales branch card report data from dynamic date for day, month and year the endpoint.
   * @param {String} date
   * @param {String} period
   * @public
   * @event 'loading-start'
   * @event 'loading-end'
   * @event 'branch-report-api-dm-fetch'
   * @event 'branch-report-api-dm-fetch-error'
   * @event 'branch-report-api-dm-error'
   */
  async getSalesBranchReport(date, period) {
    this.dispatchEvent(new CustomEvent('loading-start', { bubbles: true, composed: true }));
    try {
      const res = await fetch(
        `https://keysarcosmetics.fly.dev/keysarCosmetics/dashboard/sales/branch?date=${date}`,
        {
          method: 'GET',
          credentials: 'include',
        },
      );

      if (!res.ok) {
        const error = await res.json();
        this.dispatchEvent(
          new CustomEvent('branch-report-api-dm-fetch-error', { detail: { error, period } }),
        );
        return;
      }

      const data = await res.json();
      this.dispatchEvent(
        new CustomEvent('branch-report-api-dm-fetch', { detail: { data, period } }),
      );
    } catch (error) {
      this.dispatchEvent(
        new CustomEvent('branch-report-api-dm-error', { detail: { error, period } }),
      );
    } finally {
      this.dispatchEvent(new CustomEvent('loading-end', { bubbles: true, composed: true }));
    }
  }

  /**
   * Fetch total sales branch card report data from dynamic date for day, month and year.
   * @param {String} date
   * @param {String} period
   * @public
   * @event 'loading-start'
   * @event 'loading-end'
   * @event 'branch-total-api-dm-fetch'
   * @event 'branch-total-api-dm-fetch-error'
   * @event 'branch-total-api-dm-error'
   */
  async getSalesBranchTotalReport(date, period) {
    this.dispatchEvent(new CustomEvent('loading-start', { bubbles: true, composed: true }));
    try {
      const res = await fetch(
        `https://keysarcosmetics.fly.dev/keysarCosmetics/dashboard/sales/branch/total?date=${date}`,
        {
          method: 'GET',
          credentials: 'include',
        },
      );

      if (!res.ok) {
        const error = await res.json();
        this.dispatchEvent(
          new CustomEvent('branch-total-api-dm-fetch-error', { detail: { error, period } }),
        );
        return;
      }

      const data = await res.json();
      this.dispatchEvent(
        new CustomEvent('branch-total-api-dm-fetch', { detail: { data, period } }),
      );
    } catch (error) {
      this.dispatchEvent(
        new CustomEvent('branch-total-api-dm-error', { detail: { error, period } }),
      );
    } finally {
      this.dispatchEvent(new CustomEvent('loading-end', { bubbles: true, composed: true }));
    }
  }
}
customElements.define('report-api-dm', ReportApiDm);
