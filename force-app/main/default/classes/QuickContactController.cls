/*
This controller is invoked from the Lightning Component when the Call Center Agent has to associate the contact to an account, when a web2case comes in the for a new contact the 
association is not out of the box ,we need to manually associate the records.
*/ 

public with sharing class QuickContactController {
    @AuraEnabled
    public static Contact saveContactWithAccount(Contact contact) {
        system.debug('===contact==='+contact);
        upsert contact Contact.fields.Email;
        return contact;
    }
    @AuraEnabled
    public static Contact getContactDetails(string caseId) {
        List<Case> lstCase = new List<Case>([Select Id,casenumber,SuppliedName,SuppliedEmail from Case where Id =: caseId limit 1]);
        System.debug(lstCase+'===='+caseId);
        Contact cont = new Contact();
        if(lstCase.size() > 0){
            cont.FirstName = lstCase[0].SuppliedName.substringBeforeLast(' ');
            cont.LastName = lstCase[0].SuppliedName.substringAfterLast(' ');
            cont.Email = lstCase[0].SuppliedEmail;
        }
        return cont;
    }
    @AuraEnabled
    public static List < sObject > fetchLookUpValues(String searchKeyWord, String ObjectName) {
        system.debug('ObjectName-->' + ObjectName);
        String searchKey = searchKeyWord + '%';
        List < sObject > returnList = new List < sObject > ();
        String sQuery =  'select id, Name from ' +ObjectName + ' where Name LIKE: searchKey order by createdDate DESC limit 5';
        system.debug(sQuery+'sOjectQuery');
        List < sObject > lstOfRecords = Database.query(sQuery);
        for (sObject obj: lstOfRecords) {
            returnList.add(obj);
        }
        return returnList;
    }
    
}