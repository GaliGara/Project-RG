import { LitElement, html } from "lit";
import '@components/seller-form/SellerForm'

export class FeatureSalesManagementCrudSales extends LitElement{
    static get properties(){
        return{

        }
    }

    constructor(){
        super();

    }
    createRenderRoot(){
        return this;
    }

    render(){
        return html`
        <seller-form></seller-form>        
        `;
    }

}
customElements.define('feature-sales-management-crud-sales', FeatureSalesManagementCrudSales);
