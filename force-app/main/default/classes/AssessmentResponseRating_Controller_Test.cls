@isTest


private class AssessmentResponseRating_Controller_Test {
	@testSetup 
    static void setup() {
    
    Account testAccount = new Account(name='Test Company Name123');
    insert testAccount;
    Contact con = new Contact(LastName = 'Test',firstname='Test12345',email='test@test12345.com',accountid=testAccount.id);
    insert con;
    ICP__c testICP = new ICP__c(Name='Test ICP',Account__c=testAccount.Id);
    insert testICP;
    Assessment__c testSurvey = new Assessment__c(Name = 'Test Assessment',ICP__c = testICP.Id,Status__c='Completed');
    insert testSurvey;
    Survey_Taker__c  testSurveyTaker = new Survey_Taker__c(Contact__c = con.Id,Assessment__c = testSurvey.Id);
    insert testSurveyTaker;
    
    //Create Assessment
    Id RecordTypeIdAssessment1 = Schema.SObjectType.Assessment_Question__c.getRecordTypeInfosByName().get('Questions').getRecordTypeId();
    Id RecordTypeIdAssessment2 = Schema.SObjectType.Assessment_Question__c.getRecordTypeInfosByName().get('Static Text').getRecordTypeId();
    List<Assessment_Question__c> listOfQuestions = new List<Assessment_Question__c>();
    Assessment_Question__c testQuestion = new Assessment_Question__c(Assessment__c = testSurvey.Id,recordtypeid = RecordTypeIdAssessment1,OrderNumber__c = 1,
    Type__c = 'Free Text',Question__c = 'What is your Name?');
    listOfQuestions.add(testQuestion);
    Assessment_Question__c testQuestion2 = new Assessment_Question__c(Assessment__c = testSurvey.Id,recordtypeid = RecordTypeIdAssessment1,OrderNumber__c = 2,
    Type__c = 'Single Select- Radio Button',Question__c = 'All institutions engaging?',Choices__c= 'Yes\r\nNo');
    listOfQuestions.add(testQuestion2);
    insert listOfQuestions;
    
    List<Assessment_Response__c> listOfResponses = new List<Assessment_Response__c>();
    Assessment_Response__c testResponse1 = new Assessment_Response__c(Assessment_Question__c= listOfQuestions[0].Id,Response__c='This is a test response');
    listOfResponses.add(testResponse1);
    Assessment_Response__c testResponse2 = new Assessment_Response__c(Assessment_Question__c= listOfQuestions[1].Id,Response__c='Yes');
    listOfResponses.add(testResponse2);
    insert listOfResponses;
       
    AssessmentResponseRating__c responseRating = new AssessmentResponseRating__c(AssessmentQuestion__c=listOfQuestions[1].Id,AssessmentResponse__c=listOfResponses[1].id,Rating__c='2');
    insert responseRating; 
        
    Profile p = [SELECT Id FROM Profile WHERE Name='Community User Assessment2']; 
    User u = new User(alias = 'standt', email = 'testuser@testorg.com', emailencodingkey = 'UTF-8', lastname = 'Testing', languagelocalekey = 'en_US' , 
    localesidkey = 'en_US', timezonesidkey = 'America/Los_Angeles', username = 'superUser@testorg.com', 
    profileid = p.Id, ContactId = con.id);
    insert u;
        
    }
    
    @isTest
    public static void getAssessmentQuestionsAndResponseTest(){
        User testUser = [SELECT Id FROM User WHERE lastname = 'Testing' LIMIT 1];
        Test.startTest();
        Assessment__c testAssessment = [SELECT Id FROM Assessment__c  LIMIT 1];
        Id responseRatingId;
        AssessmentResponseRating_Controller.MainRatingsWrapper mainWrapperObj = new AssessmentResponseRating_Controller.MainRatingsWrapper();
        List<AssessmentResponseRating_Controller.ratingsWrapper> listOfRatingsWrapper = new List<AssessmentResponseRating_Controller.ratingsWrapper>();
        AssessmentResponseRating_Controller.ratingsWrapper ratingsWrapperObj;
        for(Assessment_Question__c assessmentQuestion : [Select Id,(Select Id from AssessmentResponseRatings__r),(Select Id from Assessment_Responses__r) from Assessment_Question__c where Assessment__c =:testAssessment.Id]){
			System.debug('assessmentQuestion'+JSON.serialize(assessmentQuestion));            
            if(!assessmentQuestion.AssessmentResponseRatings__r.isEmpty()){
                ratingsWrapperObj = new AssessmentResponseRating_Controller.ratingsWrapper();
                ratingsWrapperObj.questionId = assessmentQuestion.id;
                ratingsWrapperObj.responseId = assessmentQuestion.Assessment_Responses__r[0].id;
                ratingsWrapperObj.ratingsId = assessmentQuestion.AssessmentResponseRatings__r[0].Id;
                responseRatingId = assessmentQuestion.AssessmentResponseRatings__r[0].Id;
                ratingsWrapperObj.rating = '1';
                listOfRatingsWrapper.add(ratingsWrapperObj); 
            }
            else{
                ratingsWrapperObj = new AssessmentResponseRating_Controller.ratingsWrapper();
                ratingsWrapperObj.questionId = assessmentQuestion.id;
                ratingsWrapperObj.responseId = assessmentQuestion.Assessment_Responses__r[0].Id;
                ratingsWrapperObj.rating = '2';
                listOfRatingsWrapper.add(ratingsWrapperObj);
            }
        }
        mainWrapperObj.ratingResponse = listOfRatingsWrapper;
        String responseData = JSON.serialize(mainWrapperObj);
        System.runAs(testUser){
            AssessmentResponseRating_Controller.getAssessmentQuestionsAndResponse(testAssessment.Id);
			//AssessmentResponseRating_Controller.saveRatings(responseData);  
            AssessmentResponseRating__c assessmentRating = [Select Id,Rating__c from AssessmentResponseRating__c where id=:responseRatingId LIMIT 1];
            System.assertEquals('1', assessmentRating.Rating__c);
        }
        Test.stopTest();
    }
}