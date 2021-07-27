public without sharing class fetchUserRecord {

    public class Filters {
      
        @AuraEnabled
        public String[] categories { get; set; }
        
    }

    @AuraEnabled(cacheable=true)
    public static List <Product2> getProducts(Filters filters){
        System.debug(filters);

        String[] categories = new List<String>();
         String whereClause = '';
        
            if (filters != null) {
                
                if (filters.categories != null) {
                    categories = filters.categories;
                 
                    System.debug('categories'+ categories);
                   }
                  
                
            }

            return [SELECT Id, Name FROM Product2 WHERE Family IN :categories ];
                
    }
    
}