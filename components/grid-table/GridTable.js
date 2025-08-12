import { LitElement, html, nothing } from 'lit';
import { Grid, html as ghtml } from 'https://unpkg.com/gridjs?module';

export class GridTable extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
      enableActions: { type: Boolean, attribute: 'enable-actions' },
      actionBuilder: { type: Object }, // function
    };
  }

  constructor() {
    super();
    this.config = {};
    this.enableActions = false;
    this.actionBuilder = null;
    this._grid = null;
    this._onClick = this._onClick?.bind?.(this); // por si el bundler transpila distinto
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    GridTable._injectGridCSS();
    this._renderGrid();
  }

  updated(changed) {
    if (changed.has('config') || changed.has('enableActions') || changed.has('actionBuilder')) {
      this._renderGrid();
    }
  }

  static _injectGridCSS() {
    const href = 'https://unpkg.com/gridjs/dist/theme/mermaid.min.css';
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }

  static _normalizeColumns(columns) {
    return (columns || []).map(c => (typeof c === 'string' ? { name: c } : c));
  }

  _buildColumns(baseColumns) {
    let cols = GridTable._normalizeColumns(baseColumns);
    const hasActions = cols.some(c => (c?.name ?? '') === 'Actions');

    if (this.enableActions) {
      if (!hasActions) cols = cols.concat([{ name: 'Actions' }]);
      cols = cols.map(c => {
        if ((c?.name ?? '') !== 'Actions') return c;
        return {
          ...c,
          sort: false,
          width: '1%',
          formatter: (_, row) => {
            const id = row?.cells?.[0]?.data;
            const htmlStr = this.actionBuilder ? this.actionBuilder(row) : nothing;
            return ghtml(htmlStr);
          },
        };
      });
    } else {
      cols = cols.filter(c => (c?.name ?? '') !== 'Actions');
    }
    return cols;
  }

  _renderGrid() {
    const container = this.querySelector('#grid-container');
    if (!container) return;

    const base = { ...(this.config || {}) };
    base.columns = this._buildColumns(base.columns || []);

    // Si ya existe, actualiza en lugar de destruir
    if (this._grid) {
      try {
        this._grid.updateConfig(base).forceRender();
        return;
      } catch (err) {
        console.log('Grid update falló, re-render completo.', err);
        try {
          this._grid.destroy();
        } catch (e) {
          console.log('Destroy falló:', e);
        }
        this._grid = null;
      }
    }

    this._grid = new Grid(base).render(container);
  }

  _onClick = e => {
    const btn = e.target.closest?.('[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id');

    this.dispatchEvent(
      new CustomEvent('grid-action', {
        detail: { action, id },
        bubbles: true,
        composed: true,
      }),
    );
  };

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onClick);
    if (this._grid) {
      try {
        this._grid.destroy();
      } catch (e) {
        console.log('Destroy falló:', e);
      }
      this._grid = null;
    }
    super.disconnectedCallback();
  }

  render() {
    return html`<div id="grid-container"></div>`;
  }
}

customElements.define('grid-table', GridTable);
