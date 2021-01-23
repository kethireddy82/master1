@isTest
public class UpdateContactControllerTest {
	static testMethod void UpdateContact_Method1() {
        String uniqueUserName = 'standarduser' + DateTime.now().getTime() + '@testorg.com';
   		Account ac = new Account();
        ac.name='abhishek';
        insert ac;
        contact ct = new Contact(LastName ='testCon',AccountId = ac.Id);
        insert ct;
        
        // This code runs as the system user
        Profile p = [SELECT Id FROM Profile WHERE Name='Community User Assessment2'];
        User u = new User(Alias = 'standt', Email='standarduser@testorg.com',
        EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
        LocaleSidKey='en_US', ProfileId = p.Id,
        TimeZoneSidKey='America/Los_Angeles',contactid=ct.id,
         UserName=uniqueUserName);
 
        System.runAs(u) {
              // The following code runs as user 'u'
             UpdateContactController.getContactDetails();
           AccountInformationController.getAccountInfo();
          }
        UpdateContactController.updateSessionDetails();
        UpdateContactController.updateContactDetails(JSON.serialize(ct));
        
    }
}