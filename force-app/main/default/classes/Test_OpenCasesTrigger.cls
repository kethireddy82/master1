@isTest
public class Test_OpenCasesTrigger {    
    static testMethod void SubmitCaseController(){
        Account testAccount = new Account(name='Test Company Name');
        insert testAccount;
        Contact con = new Contact(LastName = 'Test',firstname='Test1',email='test@test.com',accountid=testAccount.id);
        insert con;
        Case testCase = new Case(Subject='Test Controller Acct Case',Status='New',Category__c = 'General',Accountid = testAccount.id,contactid = con.id,SuppliedName ='Test12',SuppliedEmail='test123@ttt.com');
        insert testCase; 
    } 
    
    static testMethod void SubmitCaseController1(){
        Account testAccount = new Account(name='Test Company Name');
        insert testAccount;
        Contact con = new Contact(LastName = 'Test',firstname='Test1',email='test@test.com',accountid=testAccount.id);
        insert con; 
        Case testCase1 = new Case(Subject='Test Controller Acct Case',Status='New',Category__c = 'General',Accountid = testAccount.id,SuppliedName ='Test123',SuppliedEmail='test1234@ttt.com');
        insert testCase1;
    }


 static testMethod void SubmitCaseController2(){
        Account testAccount = new Account(name='Test Company Name');
        insert testAccount;
        Contact con = new Contact(LastName = 'Test',firstname='Test1',email='test@test.com',accountid=testAccount.id);
        insert con; 
        Case testCase1 = new Case(Subject='Test Controller Acct Case',Status='New',Category__c = 'General',Accountid = testAccount.id,SuppliedName ='dr.Test123 Test234',SuppliedEmail='test1234@ttt.com');
        insert testCase1;
    }    
}