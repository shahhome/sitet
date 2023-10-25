@isTest
private class IceCreamSalesControllerTest {

    @TestSetup
    static void makeData(){

        Store__C store = new Store__c(  
                Name='Test Parlor', 
                City__c='Anaheim', 
                State__c='CA');
        insert store;
        
        Opportunity sale = new Opportunity(
                Name = 'Opp 1',
                Amount=10, 
                CloseDate=Date.today(), 
                StageName = 'Closed Won',
                Store__c=store.Id);
        insert sale;
        
    }

    @isTest
    static void testGetIceCreamSales() {

        Test.startTest();
        List<Opportunity> sales = IceCreamSalesController.getIceCreamSales('Anaheim');
        Test.stopTest();

        Store__C store = [SELECT Id, Name FROM Store__c LIMIT 1];
        System.assertEquals(1, sales.size());
        Opportunity retrievedSale = sales[0];
        System.assertEquals(10, retrievedSale.Amount);
        System.assertEquals(Date.today(), retrievedSale.CloseDate);
        System.assertEquals(store.Name, retrievedSale.Store__r.Name);
    }

    @isTest  
    static void testGetUniqueCities() {
        List<String> cityNames = IceCreamSalesController.getUniqueCities();
        System.assertEquals(1, cityNames.size());
    }
}