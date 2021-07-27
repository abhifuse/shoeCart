import { LightningElement, api } from 'lwc';

/**
 * A presentation component to display a Product__c sObject. The provided
 * Product__c data must contain all fields used by this component.
 */
export default class ProductTile extends LightningElement {
    /** Whether the tile is draggable. */
   

    _product;
    /** Product__c to display. */
    @api
    get product() {
        return this._product;
    }
    set product(value) {
        this._product = value;
        /**this.pictureUrl = value.Picture_URL__c;*/
        this.name = value.Name;
        this.msrp = value.ProductCode;
    }

    /** Product__c field values to display. */
   
    name;
    msrp;

  

   
}