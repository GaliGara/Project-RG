import { LitElement, html, nothing } from "lit";
import '../branch-form/BranchForm'
import '../employer-form/EmployerForm'
import '../seller-form/SellerForm'

export class NavBar extends LitElement {
  static get properties() {
    return {
      currentView: { type: String },
      menuOpen: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.currentView = '';
    this.menuOpen = false;
  }

  createRenderRoot() {
    return this;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  render() {
    return html`
    ${this.menuOpen
  ? html`
      <!-- Overlay semitransparente -->
      <div
        class="fixed inset-0 bg-black/30 z-40"
        @click=${() => (this.menuOpen = false)}
      ></div>`:nothing}
    
      <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
        <button
        class="text-2xl border border-white rounded px-3 py-1 hover:bg-gray-700 hover:border-gray-400 transition"
        @click=${() => this.menuOpen = !this.menuOpen}
        >
        ☰
      </button>
      <h1 class="ml-auto text-xl font-semibold">KEYSAR COSMETICS</h1>
      </header>

      ${this.menuOpen
        ? html`
            <nav class="fixed top-0 left-0 h-screen w-1/3 bg-gray-700 text-white flex flex-col gap-4 p-6 shadow-lg z-50">
              <button
                class="self-end text-2xl font-bold mb-4 hover:text-gray-300"
                @click=${() => (this.menuOpen = false)}
                aria-label="Cerrar menú"
              >
                ×
              </button>              
            
              <button
                class="hover:bg-gray-600 px-2 py-1 text-left"
                @click=${() => (this.currentView = 'ventas')}
              >
                Ventas
              </button>
              <button
                class="hover:bg-gray-600 px-2 py-1 text-left"
                @click=${() => (this.currentView = 'empleados')}
              >
                Empleados
              </button>
              <button
                class="hover:bg-gray-600 px-2 py-1 text-left"
                @click=${() => (this.currentView = 'sucursales')}
              >
                Sucursales
              </button>
            </nav>
          `
        : nothing}

      <section class="view mt-4">
        ${this.currentView === 'ventas'
          ? html`<seller-form></seller-form>`
          : this.currentView === 'empleados'
          ? html`<employer-form></employer-form>`
          : html`<branch-form></branch-form>`}
      </section>
    `;
  }
}

customElements.define("nav-bar", NavBar);
