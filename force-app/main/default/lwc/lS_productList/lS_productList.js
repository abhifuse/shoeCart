import { LightningElement, track, wire, api } from 'lwc';
import getProdList from '@salesforce/apex/LS_ProductDetailList.getProdList';
import saveToCart from '@salesforce/apex/LS_SaveToCart.sendToCart';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LS_productList extends LightningElement {

    @track prodList = [1,2,3];
    @track recomMap = [];
    @track prodMap = [];
    //@track selectedSize = 0;
    newSize;
    size;
    prodRec;
    @track recId;
    connectedCallback() {
        getProdList()               
                  .then(result => {
                    console.log('Testing1..',result);
                    if(result){
                      //this.prodList = result;
                      for(var key in result){
                        this.recomMap.push({value:result[key], key:key});
                        result[key].forEach(element => {
                          this.prodMap.push({value:element, key:element.Id, size:0});
                          //this.prodMap.set(element.Id,element);
                        });
                        
                        //this.recValue = true;
                    }
                    console.log('Testing2..',this.prodMap);
                    }
                  })
                  .catch((error) => {
                      this.error = error;
                  }
                  )
    }
    handleCartClick(event) 
    {
      this.recId = event.target.value;//event.target.dataset.id;
      //this.claimList[event.target.dataset.id].CS_Quantity__c=event.detail.value;
      console.log('Rec 4..',this.recId);
      this.prodMap.forEach(element => {
        if(element.key === this.recId) {
          if(element.size===0) {
          //console.log('Select size');
          const evt = new ShowToastEvent({
            title: 'Toast Warning',
            message: 'Please select size',
            variant: 'warning',
            mode: 'sticky'
            });
            this.dispatchEvent(evt);
          }
          else{
            const evt = new ShowToastEvent({
              title: '',
              message: 'Item is added to cart',
              variant: 'success',
              mode: 'pester'
              });
              this.dispatchEvent(evt);
              this.prodRec = element.value;
              this.size = element.size;
              element.size=0;
              //window.location.reload();
            }
          }
        
      });
      saveToCart({
        prodRec : this.prodRec,
        size : this.size
      })
      //this.selectedSize=size;
    }
    handleSizechange(event) {
      this.newSize= event.detail.value;
      let changeId=event.target.dataset.id;
      console.log('Rec Id..',this.newSize);
      console.log('Size Ids..',changeId);
      this.prodMap.forEach(element => {
        //console.log('Size.....',element.value.Selected_Size__c);
        if(element.key === changeId) {
          if(element.value.Size__c.includes(this.newSize)) {
            element.size=this.newSize;
          }
          else {
            const evt = new ShowToastEvent({
              title: 'Toast Warning',
              message: 'Select available size',
              variant: 'warning',
              mode: 'sticky'
              });
              this.dispatchEvent(evt);
          }
        }
        //console.log('Map..',element.size);
      });
      //console.log('Map..',this.prodMap.key.Name);
    }

}