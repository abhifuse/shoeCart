import { LightningElement, wire } from 'lwc';
import getProducts from '@salesforce/apex/fetchUserRecord.getProducts';
import { publish, subscribe, MessageContext } from 'lightning/messageService';
import PRODUCTS_FILTERED_MESSAGE from '@salesforce/messageChannel/ProdFilter__c';

export default class ShowUserRecord extends LightningElement {
     
      filters = {};
      productFilterSubscription=null;
      @wire(MessageContext) messageContext;
      @wire(getProducts, {filters: '$filters'}) contacts;
      connectedCallback() {
        // Subscribe to ProductsFiltered message
        this.productFilterSubscription = subscribe(
            this.messageContext,
            PRODUCTS_FILTERED_MESSAGE,
            (message) => this.handleFilterChange(message)
        );
    }
    
   
    handleFilterChange(message) {
        this.filters = { ...message.filters };
        console.log('this.filters '+ this.filters );
    }
}