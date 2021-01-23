@isTest
public class PieChartControllerTest {
    
    static testMethod void PieChartController(){ 
        
               Account testAccount = new Account(name='Test Company Name');
        insert testAccount;
        Contact testContact = new Contact(lastname= 'Doe',accountid = testAccount.id);
        insert testContact;
        //Case testCase = new Case(Subject = 'Cannot login',accountid = testAccount.id,contactid = testContact.id,Category__c = 'Complaint',
                               // Subcategory__c = 'Base Access',Status='In Progress');
         Case testCase = new Case(Subject = 'Cannot login',accountid = testAccount.id,contactid = testContact.id,Status='In Progress');
        insert testCase;
        //PieChartController sc = new PieChartController();
        //sc.OpportunityJSON;
       // List<string> DataCollection;
         PieChartController.getOpportunityJSON();
    }
    
}