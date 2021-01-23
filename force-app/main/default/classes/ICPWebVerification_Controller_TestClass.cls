@isTest
public class ICPWebVerification_Controller_TestClass {
    @testSetup 
    static void setup() {
        
        Account testAccount = new Account(name='Test Company Name123',OPE_ID__c='12345567');
        insert testAccount;
        Contact con = new Contact(LastName = 'Test',firstname='Test12345',email='test@test12345.com',accountid=testAccount.id);
        insert con;
        
        List<ICP__c> listOfICPs = new List<ICP__c>();
        ICP__c testICP1 = new ICP__c(Name='Test ICP 1',Account__c=testAccount.Id);
        listOfICPs.add(testICP1);
        insert listOfICPs;
        
		List<Assessment__c> listOfAssessments = new List<Assessment__c>();
		Assessment__c assessmentObject1 = new Assessment__C(Name='Test 1',ICP__c=listOfICPs[0].Id);
		listOfAssessments.add(assessmentObject1);
		Assessment__c assessmentObject2 = new Assessment__c(Name='Test 2',ICP__c=listOfICPs[0].Id);
		listOfAssessments.add(assessmentObject2);
		insert listOfAssessments;
		
        ICP_Web_Verification__c icpWebVerificationObj = new ICP_Web_Verification__c();
        icpWebVerificationObj.Name = 'Test';
		icpWebVerificationObj.Assessment__c = listOfAssessments[0].id;
        insert icpWebVerificationObj;
        
        List<ICP_Web_Verification_Response__c> responses = new List<ICP_Web_Verification_Response__c>();
        ICP_Web_Verification_Response__c question1 = new ICP_Web_Verification_Response__c();
        question1.Name = '1';
        question1.ICP_Web_Verification__c = icpWebVerificationObj.Id;
        responses.add(question1);
        
        ICP_Web_Verification_Response__c question2a = new ICP_Web_Verification_Response__c();
        question2a.Name = '2a';
        question2a.ICP_Web_Verification__c = icpWebVerificationObj.Id;
        responses.add(question2a);
        
        insert responses;
        
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
        cdl.LinkedEntityId = responses[0].id;
        cdl.ContentDocumentId = documents[0].Id;
        cdl.shareType = 'I';
        insert cdl;
        ContentDocumentLink cd2 = New ContentDocumentLink();
        cd2.LinkedEntityId = responses[0].id;
        cd2.ContentDocumentId = documents[1].Id;
        cd2.shareType = 'I';
        insert cd2;  
    }
    
	@isTest
    public static void getCheckListValues(){
        Test.startTest();
        try{
        List<ICP_Web_Verification_Response__c> listOfWebVerificationResponse = [Select Id from ICP_Web_Verification_Response__c];
        if(!listOfWebVerificationResponse.isEmpty()){
            ICPWebVerification_Controller.saveWebVerificationResponses(listOfWebVerificationResponse,null,false);
			ICP_Web_Verification__c icpWebVerificationObj = [Select Id from ICP_Web_Verification__c];
			if(icpWebVerificationObj!=null)
				ICPWebVerification_Controller.saveWebVerificationResponses(listOfWebVerificationResponse,icpWebVerificationObj,true);
            ICPWebVerification_Controller.saveWebVerificationResponses(null,null,true);
        }
        
    	List<Assessment__c> listOfICPs = [Select Id from Assessment__c];
        if(!listOfICPs.isEmpty()){
            ICPWebVerification_Controller.getCheckListValues(listOfICPs[0].id);
            ICPWebVerification_Controller.getCheckListValues(listOfICPs[1].id);
			ICPWebVerification_Controller.getICPObject(listOfICPs[0].id);
			ICPWebVerification_Controller.getICPObject(listOfICPs[1].id);
            ICPWebVerification_Controller.getCheckListValues(null);
           
            ICPWebVerification_Controller.getWebVerificationResponseObjects(listOfICPs[0].id);
            ICPWebVerification_Controller.getWebVerificationResponseObjects(listOfICPs[1].id);
        }
        }
        catch(Exception e){
            
        }
        Test.stopTest();
    }
}