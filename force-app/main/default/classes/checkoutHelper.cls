public with sharing class checkoutHelper {
    
        @AuraEnabled(cacheable=true)
        public static List<Cart__c> checkoutFetchItem() {
            return [SELECT Id, Product_Name__c, Price__c, Quantity__c,
            Selected_Size__c, Product__c 
                FROM Cart__c];
        
    }
}