public class Case_Controller {
    private static final String mainUniversity = 'DC Master University';
	@AuraEnabled
    public static List<Account> getSchoolList(){
        return [Select Id,Name,BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry from Account where Type='Institution' and name like '%Test%'];
    }
    
    @AuraEnabled
    public static List<Contact> fetchContacts(){
        return [Select id,MyCAA__c,Title,FirstName,LastName,Service_Affiliation__c,Service_Status__c,Branch__c,Pay_Grade__c,Age__c,MailingStreet,MailingCity,MailingState,MailingCountry,MailingPostalCode,Phone,Email from Contact Limit 5];
    }
    
    @AuraEnabled
    public static Id createContactObject(Contact contactObj){
        if(contactObj!=null){
            try{
                insert contactObj;
                if(contactObj.Id!=null)
                    return contactObj.Id;
            }
            catch(Exception e){
                System.debug(e.getMessage());
            }
        }
        return null;
    }
    
    @AuraEnabled
    public static Id createCase(Case caseObj, Contact contactObj, String schoolId){
        if(caseObj!=null && contactObj!=null && String.isNotBlank(schoolId)){
            try{
                Account accObj = [Select Id from Account where Type='Institution' and Name=:mainUniversity LIMIT 1];
                if(accObj!=null){
                    contactObj.AccountId = accObj.id;
                	upsert contactObj Email_Upsert_Field__c;
                    if(contactObj.Id!=null){
                        caseObj.Category__c ='Complaint';
                        caseObj.Subcategory__c = 'Base Access';
                        caseObj.ContactId = contactObj.Id;
                        caseObj.AccountId = schoolId;
                        insert caseObj;
                        if(caseObj.Id!=null)
                            return caseObj.Id;
                        return null;
                    }
                }
            }
            catch(Exception e){
                System.debug(e.getMessage());
            }
        }
        return null;
    }
}