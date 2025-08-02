import { LitElement, html, nothing } from "lit";
import '../branch-form/BranchForm'
import '../employer-form/EmployerForm'
import '../seller-form/SellerForm'

export class NavBar extends LitElement {
  static get properties() {
    return {
      /**
       * Boolean that indicates if the menu is open 
       * @type {Boolean}
       */
      menuOpen: {type: Boolean},
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

  handleNavigation(){
    this.dispatchEvent(new CustomEvent('crud-sales-visible', {
       detail: 'hola desde el navbar'
      }));
  }

  handleEmployee(){
    this.dispatchEvent(new CustomEvent('crud-employee-visible', {
       detail: 'hola desde el navbar employee'
      }));
  }

  handleBranches(){
    this.dispatchEvent(new CustomEvent('crud-branches-visible', {
       detail: 'hola desde el navbar branches'
      }));
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

        <a
          class="menu-buttons"
          @click=${this.handleNavigation}
        >
          Ventas
        </a>
        <a
          class="menu-buttons"
          @click=${this.handleEmployee}
        >
          Empleados
        </a>
        <a
          class="menu-buttons"
          @click=${this.handleBranches}
        >
          Sucursales
        </a>
      </nav>

    `;
  }
}

customElements.define("nav-bar", NavBar);
