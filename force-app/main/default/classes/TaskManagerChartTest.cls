@isTest
public class TaskManagerChartTest {
    
    static testMethod void SubmitCaseController()
    {    
        Account testAccount = new Account(name='Test Company Name');
        insert testAccount;
        Contact testContact = new Contact(lastname= 'Doe',accountid = testAccount.id);
        insert testContact;
        Case testCase = new Case(Subject = 'Cannot login',accountid = testAccount.id,contactid = testContact.id);
        insert testCase; 
        TaskManagerChart.getAllTasksByStatus();
    }

}