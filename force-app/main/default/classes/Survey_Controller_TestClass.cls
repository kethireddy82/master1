@isTest
private class Survey_Controller_TestClass {
    @testSetup 
    static void setup() {
    
    Account testAccount = new Account(name='Test Company Name123');
    insert testAccount;
    Contact con = new Contact(LastName = 'Test',firstname='Test12345',email='test@test12345.com',accountid=testAccount.id);
    insert con;
    ICP__c testICP = new ICP__c(Name='Test ICP',Account__c=testAccount.Id);
    insert testICP;
    Assessment__c testSurvey = new Assessment__c(Name = 'Test Assessment',ICP__c = testICP.Id);
    insert testSurvey;
    Survey_Taker__c  testSurveyTaker = new Survey_Taker__c(Contact__c = con.Id,Assessment__c = testSurvey.Id);
    insert testSurveyTaker;
    
    //Create Assessment
    Id RecordTypeIdAssessment1 = Schema.SObjectType.Assessment_Question__c.getRecordTypeInfosByName().get('Questions').getRecordTypeId();
    Id RecordTypeIdAssessment2 = Schema.SObjectType.Assessment_Question__c.getRecordTypeInfosByName().get('Static Text').getRecordTypeId();
    Assessment_Question__c testQuestion = new Assessment_Question__c(Assessment__c = testSurvey.Id,recordtypeid = RecordTypeIdAssessment1,OrderNumber__c = 1,
    Type__c = 'Free Text',Question__c = 'What is your Name?');
    insert testQuestion;
    Assessment_Question__c testQuestion2 = new Assessment_Question__c(Assessment__c = testSurvey.Id,recordtypeid = RecordTypeIdAssessment1,OrderNumber__c = 2,
    Type__c = 'Single Select- Radio Button',Question__c = 'All institutions engaging?',Choices__c= 'He\r\nOk');
    insert testQuestion2;
    
    Assessment_Response__c testAssessmentReponse = [SELECT Id FROM Assessment_Response__c LIMIT 1];
    testAssessmentReponse.Response__c = 'Yes';
    update testAssessmentReponse;
    
    //Create Files
    ContentVersion contentVersion = new ContentVersion(
          Title = 'Penguins',
          PathOnClient = 'Penguins.jpg',
          VersionData = Blob.valueOf('Test Content'),
          IsMajorVersion = true
    );
    insert contentVersion;
    ContentVersion contentVersion2 = new ContentVersion(
          Title = 'Penguins',
          PathOnClient = 'Penguins1.jpg',
          VersionData = Blob.valueOf('a'.repeat(5242880)),
          IsMajorVersion = true
    );
    insert contentVersion2;    
    List<ContentDocument> documents = [SELECT Id, Title, LatestPublishedVersionId FROM ContentDocument];
    //create ContentDocumentLink  record 
    ContentDocumentLink cdl = New ContentDocumentLink();
    cdl.LinkedEntityId = testAssessmentReponse.id;
    cdl.ContentDocumentId = documents[0].Id;
    cdl.shareType = 'I';
    insert cdl;
    ContentDocumentLink cd2 = New ContentDocumentLink();
    cd2.LinkedEntityId = testSurvey.id;
    cd2.ContentDocumentId = documents[1].Id;
    cd2.shareType = 'I';
    insert cd2;  
        
    Profile p = [SELECT Id FROM Profile WHERE Name='Community User Assessment2']; 
    User u = new User(alias = 'standt', email = 'testuser@testorg.com', emailencodingkey = 'UTF-8', lastname = 'Testing', languagelocalekey = 'en_US' , 
    localesidkey = 'en_US', timezonesidkey = 'America/Los_Angeles', username = 'superUser@testorg.com', 
    profileid = p.Id, ContactId = con.id);
    insert u;
        
    }
    static testMethod void Survey_Controller_Method1() {
        User testUser = [SELECT Id FROM User WHERE lastname = 'Testing' LIMIT 1];
        Assessment__c testAssessment = [SELECT Id FROM Assessment__c LIMIT 1];
        Survey_Taker__c testSurveyTaker = [SELECT Id FROM Survey_Taker__c LIMIT 1];
        ContentDocument testContentDocument = [SELECT Id FROM ContentDocument LIMIT 1];
        System.runAs(testUser) { 
        Survey_Controller.initMethod();
        }
        Test.startTest();
        Survey_Controller.getSurveyInformation(testAssessment.Id);
        Survey_Controller.submitSurvey(testAssessment,testSurveyTaker.Id);       
        Survey_Controller.fetchUser();  
        Survey_Controller.deleteContentDoc(testContentDocument.Id);
        Test.stopTest();
    } 
}