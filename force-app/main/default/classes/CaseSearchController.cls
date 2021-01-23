public class CaseSearchController {
	@AuraEnabled
    public static Case getCaseDetails(String caseNumber, String emailId){
        Case caseObj = null;
        if(String.isNotBlank(caseNumber) && String.isNotBlank(emailId)){
            caseObj = [Select Id,Subject,CaseNumber,Contact.Email,Contact.Email_Personal__c,Status from case where CaseNumber=:caseNumber LIMIT 1];
            if(caseObj!=null){
                if(emailId.equals(caseObj.Contact.Email) || emailId.equals(caseObj.Contact.Email_Personal__c)){
                    return caseObj;
                }
                else
                    return null;
            }
        }
        return caseObj;
    }
}