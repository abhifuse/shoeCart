public with sharing class LS_ProductDetailList {
	
    @AuraEnabled
    public static Map<Integer,List<Product2>> getProdList(){
        List<Product2> prodList = ([SELECT Id, Name, ProductCode, Description, IsActive, Category__c, Size__c,
                                    Image2__c, Image__c, Selected_Size__c,Family, Price__c
                FROM Product2
                WHERE Size__c!=NULL]);
        system.debug('prodlist...'+prodList);
        Map<Integer,List<Product2>> rowProdMap = new Map<Integer,List<Product2>>();
        Integer row = 1;
        Integer item = 0;
        for(Product2 prod : prodList){
            if(math.mod(item,3) == 0) {
                row++;
            }
            if (!rowProdMap.containsKey(row)) {
                    rowProdMap.put(row, new List<Product2>());
                }
            rowProdMap.get(row).add(prod);
            item++;
        }
        system.debug('prodlist...'+rowProdMap);
        return rowProdMap;
    }
}