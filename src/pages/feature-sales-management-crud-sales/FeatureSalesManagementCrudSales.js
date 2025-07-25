import { LitElement, html } from "lit";
import '@components/seller-form/SellerForm'
import '@components/grid-table/GridTable'


export class FeatureSalesManagementCrudSales extends LitElement{
    static get properties(){
        return{
            data: {type: Array},

        }
    }

    constructor(){
        super();
        this.data = [];

    }
    createRenderRoot(){
        return this;
    }

    render(){
        return html`
        <seller-form></seller-form>        
        <grid-table
        .config='${this.data}'
        ></grid-table>
        `;
    }

}
customElements.define('feature-sales-management-crud-sales', FeatureSalesManagementCrudSales);
