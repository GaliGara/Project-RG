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

    async getInitialData() {
        const [salesRes, employeeRes, branchesRes] = await Promise.all([
            fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/sales/branch'),
            fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/employees'),
            fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/branches'),
        ])

        this.salesData = await salesRes.json();
        this.employeeData = await employeeRes.json();
        this.branchesData = await branchesRes.json();

        this.dispatchEvent(new CustomEvent('handelData', { 
            detail:{salesData: this.salesData, employeeData: this.employeeData, branchesData: this.branchesData}
         }));

        console.log(this.branchesData)
        console.log(this.salesData)
        console.log(this.employeeData)

    }
    
    connectedCallback(){
        super.connectedCallback();
        this.getInitialData();
    }
    
    render() {
        return html`

        
        `;
    }

}

customElements.define('sales-api-dm', SalesApiDm);