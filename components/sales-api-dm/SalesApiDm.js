import { LitElement, html } from "lit";

export class SalesApiDm extends LitElement{

    static get properties() {
        return {
            salesData: {type : Array},
            employeeData: {type : Array},
            branchesData: {type : Array},

        }
    }

    constructor() {
        super();
        this.salesData = [];
        this.employeeData = [];
        this.branchesData = [];

    }

    async getSalesBranch() {
        const [salesRes, employeeRes, branchesRes] = await Promise.all([
            fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/sales/branch'),
            fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/employees'),
            fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/branches'),
        ])

        this.salesData = await salesRes.json();
        this.employeeData = await employeeRes.json();
        this.branchesData = await branchesRes.json();

        this.dispatchEvent(new CustomEvent('get-sales-branch', { 
           detail: this.salesData
         }));

         console.log(this.salesData);
         console.log(this.employeeData);
         console.log(this.branchesData);

    }
    
    
    render() {
        return html`

        
        `;
    }

}

customElements.define('sales-api-dm', SalesApiDm);