public class CaseViewController {
    @AuraEnabled
    public static string CaseInfo(id recordId){
        Case cs = [select id,casenumber,subject,description,Status,Priority,Type,createddate,createdbyid,createdby.name,
                   lastmodifiedDate,lastmodifiedby.name,lastmodifiedbyid,AccountId,Account.Name, ContactId, Contact.name,
                  Recordtypeid,recordtype.Name,Category__c,Subcategory__c,Origin from case where id=:recordId];
        return JSON.serialize(cs);
        
    }

}