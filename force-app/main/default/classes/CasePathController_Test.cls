@isTest
public class CasePathController_Test {
    
    static testMethod void SubmitCaseController()
    {    
        Account testAccount = new Account(name='Test Company Name');
        insert testAccount;
        Contact testContact = new Contact(lastname= 'Doe',accountid = testAccount.id);
        insert testContact;
        Case testCase = new Case(Subject = 'Cannot login',accountid = testAccount.id,contactid = testContact.id);
        insert testCase;
      //  CasePathController caseController = new CasePathController();
      //  caseController.getCaseDetails(testCase.id);
        CasePathController.getCaseDetails(testCase.id);
         CasePathController.getPicklistValues('Case', 'Category__c');
    }
}