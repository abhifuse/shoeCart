public with sharing class LS_SaveToCart {
    @AuraEnabled
    public static void sendToCart(Product2 prodRec, Integer size){
        system.debug('Cart details...'+prodRec);
        Cart__c cartEntry = new Cart__c();
        cartEntry.Product_Name__c = prodRec.Name;
        cartEntry.Quantity__c = 1;
        cartEntry.Selected_Size__c = size;
        cartEntry.Price__c = prodRec.Price__c;
        cartEntry.Product__c = prodRec.Id;
        insert cartEntry;
    }
    
    @AuraEnabled
    public static List<Cart__c> getCartItems(){
        //system.debug('Cart details...'+prodRec);
        List<Cart__c> cartList = new List<Cart__c>([
            SELECT Id,Product_Name__c,Selected_Size__c,Price__c,Product__c,Quantity__c FROM Cart__c
        ]); //user specific cart 
        
        return cartList;
    }
    
    @AuraEnabled
    public static String addOrder (String strOrder){
        try{
            if(String.isNotBlank(strOrder)){
                Order newOrder = new Order(ContractId = '8005g0000000cz9AAA',
                                           AccountId = '0015g00000L1wvQAAR',
                                           EffectiveDate = system.today(),
                                           Status = 'Draft');
                insert newOrder;
                list<OrderLineItem__c> lstOrderItem =  (list<OrderLineItem__c>)JSON.deserializeStrict(strOrder,list<OrderLineItem__c>.class);
                list<SObject> lstSobject = new list<SObject>();
                //caseEstimateValue(lstClaimItem);
                if(lstOrderItem != null && lstOrderItem.size()>0)
                {
                    for (OrderLineItem__c orLine: lstOrderItem) {
                        orLine.Order__c = newOrder.Id;
                        lstSobject.add(orLine);
                    }
                    insert lstSobject;                   
                }
            }
            List<Cart__c> cartList=getCartItems();
            delete cartList;
        }
        catch(Exception ex){
            system.debug('Error..'+ex);
        }
        return 'true';
    }

}