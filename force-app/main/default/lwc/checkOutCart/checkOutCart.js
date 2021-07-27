import { LightningElement , track} from 'lwc';
import checkoutFetchItem from '@salesforce/apex/checkoutHelper.checkoutFetchItem';

const columns = [
    {label: 'Product name',fieldName: 'Product_Name__c',type: 'text',sortable: true},
    {label: 'Price',fieldName: 'Price__c',type: 'Number',sortable: true},
    {label: 'Selected Size',fieldName: 'Selected_Size__c',type: 'Number',sortable: true},
    {label: 'Quantity',fieldName: 'Quantity__c',type: 'Number',sortable: true},
];

export default class LightningDatatableLWCExample extends LightningElement {
     
 
   @track data = [];
    @track columns = columns;

    async connectedCallback() {
        const data = await checkoutFetchItem();
        this.data = data;
    }

    handleclick(){
        var el = this.template.querySelector('lightning-datatable');
        console.log(el);
        var selected = el.getSelectedRows();
        console.log(selected);
    }
}