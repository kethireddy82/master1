public class getAccountInfoForPortalUser {    
    @AuraEnabled
    Public list<Account> getaccounts() {
        id userId = UserInfo.getUserId();
        User u = [select id, contactId from User where id = : userId];
        id getContactId = u.contactId;
        system.debug('getContactId' + getContactId);
        list<Account> lstAccount = [SELECT Name FROM Account];// WHERE Id =: getContactId];
        return lstAccount;
    }
}