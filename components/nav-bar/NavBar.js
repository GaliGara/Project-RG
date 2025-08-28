import { LitElement, html, nothing } from 'lit';
import '../branch-form/BranchForm.js';
import '../employer-form/EmployerForm.js';
import '../seller-form/SellerForm.js';

export class NavBar extends LitElement {
  static get properties() {
    return {
      /**
       * Boolean that indicates if the menu is open
       * @type {Boolean}
       */
      _menuOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this._menuOpen = false;
  }

  /**
   * Overrides LitElement's default behavior to render into the light DOM.
   * @returns {NavBar} This component without shadow DOM.
   */
  createRenderRoot() {
    return this;
  }

  /**
   * Toggles the sidebar menu open or closed.
   * @private
   */
  _toggleMenu() {
    this._menuOpen = !this._menuOpen;
  }

  _handleLogout() {
    this.dispatchEvent(new CustomEvent('nav-bar-logout', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      ${this._menuOpen
        ? html`<div class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>`
        : nothing}

      <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
        <button
          class="text-2xl border border-white rounded px-3 py-1 hover:bg-gray-700 hover:border-gray-400 transition"
          @click=${this._toggleMenu}
        >
          ☰
        </button>
        <h1 class="ml-auto text-xl font-semibold">KEYSAR COSMETICS</h1>
      </header>

      <nav
        class=${`fixed top-0 left-0 h-screen w-100 bg-gray-800 text-white flex flex-col gap-6 p-6 shadow-xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out ${this._menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button
          class="text-white text-3xl hover:text-gray-400 self-end transition"
          @click=${() => {
            this._menuOpen = false;
          }}
          aria-label="Cerrar menú"
        >
          &times;
        </button>

        <div class="border-b border-y-sky-500"></div>
        <p class="text-gray-400 italic text-sm uppercase font-bold">formularios</p>
        <a
          href="/"
          class="hover:bg-gray-600 rounded uppercase font-bold text-gray-300 text-left tracking-wide transition-colors"
          @click=${this._toggleMenu}
        >
          Inicio
        </a>
        <a
          href="/formularios/ventas"
          class="hover:bg-gray-600 rounded uppercase font-bold text-gray-300 text-left tracking-wide transition-colors"
          @click=${this._toggleMenu}
        >
          Ventas
        </a>
        <a
          href="/formularios/empleados"
          class="hover:bg-gray-600 rounded uppercase font-bold text-gray-300 text-left tracking-wide transition-colors"
          @click=${this._toggleMenu}
        >
          Empleados
        </a>
        <a
          href="/formularios/sucursales"
          class="hover:bg-gray-600 rounded uppercase font-bold text-gray-300 text-left tracking-wide transition-colors"
          @click=${this._toggleMenu}
        >
          Sucursales
        </a>
        <a
          href="/formularios/metodos-pago"
          class="hover:bg-gray-600 rounded uppercase font-bold text-gray-300 text-left tracking-wide transition-colors"
          @click=${this._toggleMenu}
        >
          Metodos de Pago
        </a>
        <div class="border-b border-y-sky-500"></div>
        <p class="text-gray-400 italic text-sm uppercase font-bold">reportes</p>
        <a
          href="/reportes/metodo-pago"
          class="hover:bg-gray-600 rounded uppercase font-bold text-gray-300 text-left tracking-wide transition-colors"
          @click=${this._toggleMenu}
        >
          Detalle método de pago
        </a>
        <a
          href="/reportes/metodo-pago-diario"
          class="hover:bg-gray-600 rounded uppercase font-bold text-gray-300 text-left tracking-wide transition-colors"
          @click=${this._toggleMenu}
        >
          Método de pago por día
        </a>
        <a
          href="/reportes/ventas-vendedor"
          class="hover:bg-gray-600 rounded uppercase font-bold text-gray-300 text-left tracking-wide transition-colors"
          @click=${this._toggleMenu}
        >
          Ventas por vendedor
        </a>
        <a
          href="/reportes/ventas-vendedor-diario"
          class="hover:bg-gray-600 rounded uppercase font-bold text-gray-300 text-left tracking-wide transition-colors"
          @click=${this._toggleMenu}
        >
          Ventas vendedor por día
        </a>
        <a
          href="/reportes/total-general-ventas"
          class="hover:bg-gray-600 rounded uppercase font-bold text-gray-300 text-left tracking-wide transition-colors"
          @click=${this._toggleMenu}
        >
          Total general Ventas
        </a>
        <a
          href="/reportes/dashboard"
          class="hover:bg-gray-600 rounded uppercase font-bold text-gray-300 text-left tracking-wide transition-colors"
          @click=${this._toggleMenu}
        >
          Dashboard
        </a>
        <div class="border-b border-y-sky-500"></div>
        <button
          class="hover:bg-gray-600 rounded uppercase font-bold text-gray-300 text-left tracking-wide transition-colors"
          @click=${this._handleLogout}
        >
          Cerrar sesión
        </button>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);
