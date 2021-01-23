public class RetreiveAccountDetails {    
    @AuraEnabled
    Public static list<Account> getaccounts() {
        id userId = UserInfo.getUserId();
        User u = [select id, contactId from User where id = : userId];
        id ContactId = u.contactId;        
        List<Contact> accID = [SELECT id,AccountId FROM Contact WHERE Id = :ContactId LIMIT 1];        
        System.debug('<!-- Account Id -->'   +  accID[0].AccountId);
        id accountID = accID[0].AccountId;
        //system.debug('getContactId' + getContactId); 
        list<Account> lstAccount = [SELECT Name FROM Account where id =: accountID];// where contactid =: ContactId];// WHERE Id =: getContactId];
        return lstAccount;
    }    
}