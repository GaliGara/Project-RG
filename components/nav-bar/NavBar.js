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
      menuOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.menuOpen = false;
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
   * @public
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  handleNavigation() {
    this.toggleMenu();
    this.dispatchEvent(
      new CustomEvent('crud-sales-visible', {
        detail: 'hola desde el navbar',
      }),
    );
  }

  handleEmployee() {
    this.toggleMenu();
    this.dispatchEvent(
      new CustomEvent('crud-employee-visible', {
        detail: 'hola desde el navbar employee',
      }),
    );
  }

  handleBranches() {
    this.toggleMenu();
    this.dispatchEvent(
      new CustomEvent('crud-branches-visible', {
        detail: 'hola desde el navbar branches',
      }),
    );
  }

  handlePaymentMethod() {
    this.toggleMenu();
    this.dispatchEvent(
      new CustomEvent('crud-payment-method-visible', {
        detail: 'hola desde el navbar payment method',
      }),
    );
  }

  /**
   * Handles the sales seller visibility event.
   * @private
   * @event set-sales-seller-visible
   */
  _handleSalesSeller() {
    this.toggleMenu();
    this.dispatchEvent(new CustomEvent('set-sales-seller-visible'));
  }

  /**
   * Handles the total sales visibility event.
   * @private
   * @event set-total-sales-visible
   */
  _handleTotalSales() {
    this.toggleMenu();
    this.dispatchEvent(new CustomEvent('set-total-sales-visible'));
  }

  /**
   * Handles the dashboard visibility event.
   * @private
   * @event set-dashboard-visible
   */
  _handleDashboard() {
    this.toggleMenu();
    this.dispatchEvent(new CustomEvent('set-dashboard-visible'));
  }

  render() {
    return html`
      ${this.menuOpen ? html`<div class="overlay"></div>` : nothing}

      <header class="header-nav">
        <button class="header-btn" @click=${() => this.toggleMenu()}>☰</button>
        <h1 class="nav-title">KEYSAR COSMETICS</h1>
      </header>

      <nav class=${`nav-animation ${this.menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button
          class="close-menu-btn"
          @click=${() => {
            this.menuOpen = false;
          }}
          aria-label="Cerrar menú"
        >
          &times;
        </button>

        <div class="border-b border-y-sky-500"></div>
        <p class="text-gray-400 italic text-sm uppercase font-bold">formularios</p>
        <button class="menu-buttons" @click=${this.handleNavigation}>Ventas</button>
        <button class="menu-buttons" @click=${this.handleEmployee}>Empleados</button>
        <button class="menu-buttons" @click=${this.handleBranches}>Sucursales</button>
        <button class="menu-buttons" @click=${this.handlePaymentMethod}>Metodos de Pago</button>
        <div class="border-b border-y-sky-500"></div>
        <p class="text-gray-400 italic text-sm uppercase font-bold">reportes</p>
        <button class="menu-buttons" @click=${this._handleSalesSeller}>Ventas por vendedor</button>
        <button class="menu-buttons" @click=${this._handleTotalSales}>Total general Ventas</button>
        <button class="menu-buttons" @click=${this._handleDashboard}>Dashboard</button>
        <div class="border-b border-y-sky-500"></div>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);
