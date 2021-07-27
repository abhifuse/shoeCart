public with sharing class ProductController {
    
  @AuraEnabled(Cacheable=true)
    public static List<Product2> getProducts() {
        return [
            SELECT Id, Name,ProductCode FROM Product2
            ORDER BY Name LIMIT 10
        ];
      
    }

    
}