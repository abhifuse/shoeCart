import { LightningElement, wire } from 'lwc';


/** getProducts() method in ProductController Apex class */
import getProducts from '@salesforce/apex/ProductController.getProducts';



/**
 * Container component that loads and displays a list of Product__c records.
 */
export default class ProductTileList extends LightningElement {
    


    /**
     * Load the list of available products.
     */
     connectedCallback(){
        getProducts()
        .then(result => {
            this.contacts = result;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.contacts = undefined;
        });
   }
   
    



    
}