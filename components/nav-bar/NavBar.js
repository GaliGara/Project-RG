import { LitElement, html, nothing } from "lit";
import '../branch-form/BranchForm'
import '../employer-form/EmployerForm'
import '../seller-form/SellerForm'

export class NavBar extends LitElement {
  static get properties() {
    return {
      /**
       * Current view component
       * @type {String}
       * 
       */
      currentView: { type: String },

      /**
       * Boolean that indicates if the menu is open 
       * @type {Boolean}
       */
      menuOpen: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.currentView = '';
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

  /**
   * Handles menu item selection:
   * - Sets the current view
   * - Closes the sidebar menu
   * @public
   * @param {string} view - The view to activate
   */
  handleNavigation(view) {
    this.currentView = view;
    this.menuOpen = false;
  }

   /**
   * Returns the component associated with the currently selected view.
   * @public
   */
  getCurrentComponent() {
    switch (this.currentView) {
      case 'ventas':
        return html`<seller-form></seller-form>`;
      case 'empleados':
        return html`<employer-form></employer-form>`;
      case 'sucursales':
        return html`<branch-form></branch-form>`;
      default:
        return html``;
    }
  }  

  render() {
    return html`
  ${this.menuOpen
        ? html`
            <div class="overlay" @click=${() => (this.menuOpen = false)}></div>
          `
        : nothing}

      <header class="header-nav">
        <button class="header-btn" @click=${() => this.toggleMenu()}>☰</button>
        <h1 class="nav-title">KEYSAR COSMETICS</h1>
      </header>

      <nav
        class=${`
          nav-animation
          ${this.menuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <button
          class="close-menu-btn"
          @click=${() => (this.menuOpen = false)}
          aria-label="Cerrar menú"
        >
          &times;
        </button>

        <button
          class="menu-buttons"
          @click=${() => this.handleNavigation('ventas')}
        >
          Ventas
        </button>
        <button
          class="menu-buttons"
          @click=${() => this.handleNavigation('empleados')}
        >
          Empleados
        </button>
        <button
          class="menu-buttons"
          @click=${() => this.handleNavigation('sucursales')}
        >
          Sucursales
        </button>
      </nav>

      <section class="view mt-4">
        ${this.getCurrentComponent()}
      </section>
    `;
  }
}

customElements.define("nav-bar", NavBar);
