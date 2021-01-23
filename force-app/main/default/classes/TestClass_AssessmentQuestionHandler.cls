@isTest
private class TestClass_AssessmentQuestionHandler{
    static testMethod void testUnitMethod(){
        Account testAccount = new Account(name='Test Company Name123');
        insert testAccount;
        Contact con = new Contact(LastName = 'Test',firstname='Test12345',email='test@test12345.com',accountid=testAccount.id);
        insert con;
        ICP__c testICP = new ICP__c(Name='Test ICP',Account__c=testAccount.Id);
        insert testICP;
        Assessment__c testSurvey = new Assessment__c(Name = 'Test Assessment',ICP__c = testICP.Id);
        insert testSurvey;
        //Create Assessment
        Id RecordTypeIdAssessment1 = Schema.SObjectType.Assessment_Question__c.getRecordTypeInfosByName().get('Questions').getRecordTypeId();
        Assessment_Question__c testQuestion = new Assessment_Question__c(Assessment__c = testSurvey.Id,recordtypeid = RecordTypeIdAssessment1,OrderNumber__c = 1,
        Type__c = 'Free Text',Question__c = 'What is your Name?');
        insert testQuestion;
        
        delete testQuestion;
    }

}