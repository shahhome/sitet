public with sharing class IceCreamSalesController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getIceCreamSales(String city) {

        //It might be a better idea to only get Opportunities that are in Closed Won Stage. 
        //Here, I am getting all OPP so that we can check for pagination.
        //If needed, we can also introduce other filters, like current fiscal/calendar year, etc.

        String query = 'SELECT Id, Amount, CloseDate, Store__r.Name FROM Opportunity WHERE Store__c !=  NULL ';
        if (String.isNotBlank(city)) {
            query += ' AND Store__r.City__c = :city';
        }
        return Database.query(query);
        }

        @AuraEnabled(cacheable=true)
        public static List<String> getUniqueCities() {
            List<String> uniqueCities = new List<String>();
            
            List<Store__c> stores = [SELECT City__c FROM Store__c];
            for (Store__c store : stores) {
                if (store.City__c != null && !uniqueCities.contains(store.City__c)) {
                    uniqueCities.add(store.City__c);
                }
            }
            
            return uniqueCities;
        }
  }