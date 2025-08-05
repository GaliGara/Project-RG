import { LitElement, html } from "lit";
import '../../../components/seller-form/SellerForm'
import '../../../components/grid-table/GridTable'


export class FeatureSalesManagementCrudPaymentMethod extends LitElement{
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
        console.log('data', this.data);
        
        return html`
        <h1>hola desde payment method page</h1>
        <seller-form></seller-form>        
        `;
    }

}
customElements.define('feature-sales-management-crud-payment-method', FeatureSalesManagementCrudPaymentMethod);
