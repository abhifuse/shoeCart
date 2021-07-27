import { LightningElement, track, wire, api } from 'lwc';
import getCartItems from '@salesforce/apex/LS_SaveToCart.getCartItems';
import addOrder from '@salesforce/apex/LS_SaveToCart.addOrder';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
    
export default class LS_ViewCartLwc extends LightningElement {
    isDisable=true;
    @track  totalPrice=0;
    @track cartList;
    columns = [{
        label: 'Product Name',
        fieldName: 'Product_Name__c',
        type: 'text'
    },
    {
        label: 'Size',
        fieldName: 'Selected_Size__c',
        type: 'number'
    },
    {
        label: 'Quantity',
        fieldName: 'Quantity__c',
        type: 'number'
    },
    {
        label: 'Price',
        fieldName: 'Price__c',
        type: 'text'
    },
    ];
    connectedCallback() {
        getCartItems()               
                  .then(result => {
                    console.log('TestingCart..',result);
                    if(result){                      
                      this.cartList = result;
                      this.cartList.forEach(element => {
                        this.totalPrice = parseInt(this.totalPrice) + parseInt(element.Price__c);
                        console.log('element.Price__c..',element.Price__c);
                      });
                      console.log('totalPrice..',totalPrice);
                    }
                  })
                  .catch((error) => {
                      this.error = error;
                  }
                  )
                }
    handleRowSelected(event){
        const selectedRows=event.detail.selectedRows;
        if(selectedRows && selectedRows.length>0)
        {
            this.isDisable = false;
        }
        else{
            this.isDisable = true;
        }

    }
    handleRefresh(event) {
        window.location.reload();
    }

    handleSave(event){
        let orderLineItems = [];
        let selectedRecords = this.template.querySelector("lightning-datatable").getSelectedRows();
        console.log('selectedRecords===>>', selectedRecords);
        if (selectedRecords) {
            for (const key in selectedRecords) {
                const element = selectedRecords[key];
                orderLineItems.push({
                    'Product_Name__c': element['Product_Name__c'] ? element['Product_Name__c']: null,
                    'Quantity__c': element['Quantity__c'] ? element['Quantity__c']: null,
                    'Selected_Size__c' : element['Selected_Size__c'] ? element['Selected_Size__c']: null,
                    'Price__c' : element['Price__c'] ? element['Price__c']: null
                });
                console.log('orderLineItems===>>', orderLineItems);
            
            }
        
            if(orderLineItems){
                this.loaded = false;
                addOrder({
                       "strOrder" : JSON.stringify(orderLineItems)
                       
                    }).then((result) => {
                        this.loaded = true;
                        const evt = new ShowToastEvent({
                            title: '',
                            message: 'Order Placed',
                            variant: 'success',
                            mode: 'pester'
                            });
                        this.dispatchEvent(evt);
                        window.location.reload();

                    })
                    .catch((error) => {
                        this.loaded = true;
                        console.log(error);
                        this.showTosterMsg('An error has occured ', 'error', 'error');
                        this.error = error;
                    });

            }

        }
        else{
            this.loaded = true;
            this.showTosterMsg('Please select the Product', 'error', 'error');
            
        }

    }
}