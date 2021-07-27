import { LightningElement, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

// Product schema
import PRODUCTFAMILY_FIELD from '@salesforce/schema/Product2.Family';


// Lightning Message Service and a message channel
import { publish, MessageContext } from 'lightning/messageService';
import PRODUCTS_FILTERED_MESSAGE from '@salesforce/messageChannel/ProdFilter__c';

// The delay used when debouncing event handlers before firing the event
const DELAY = 350;


export default class ShoeFilter extends LightningElement {

    filters = {
     
    };

    @wire(MessageContext) messageContext;

    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: PRODUCTFAMILY_FIELD
    })
    categories;

    handleCheckboxChange(event) {
        if (!this.filters.categories) {
            // Lazy initialize filters with all values initially set
            this.filters.categories = this.categories.data.values.map(
                (item) => item.value
            );
            
        }
        const value = event.target.dataset.value;
        console.log(value);
        const filterArray = this.filters[event.target.dataset.filter];
        console.log(filterArray);
        if (event.target.checked) {
            if (!filterArray.includes(value)) {
                filterArray.push(value);
            }
        } else {
            this.filters[event.target.dataset.filter] = filterArray.filter(
                (item) => item !== value
            );
        }
        console.log('this.filters'+ JSON.stringify(this.filters));
        // Published ProductsFiltered message
       publish(this.messageContext, PRODUCTS_FILTERED_MESSAGE, {
            filters: this.filters
        });
    }
}