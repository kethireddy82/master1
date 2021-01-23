public class AccountInformationController {
	@AuraEnabled 
    public static string getAccountInfo(){
        user u = [select id,accountid,contactId,contact.Accountid,contact.Account.name,contact.Account.Type,
                  contact.Account.OPE_ID__c,contact.Account.Site,contact.Account.Description,
                  contact.Account.Status__c from user where id =: userinfo.getUserId() ];
        Account acc = new Account();
        if(u.contact.Accountid !=null){     

        	 acc = [select id,name,type,OPE_ID__c,BillingAddress,Compliance_POC__c,DoD_MOU_POC__c,Signing_Authority__c,
                   Signing_Authority__r.name,Tuition_Rate_POC__c,BillingStreet,BillingCity,BillingState,BillingPostalCode,Site,Description,Status__c from Account where id=:u.contact.Accountid];    
        }
        wrapperclass wrap = new wrapperclass();
        wrap.userAccount = acc;
        wrap.userSignAuthority = acc.Signing_Authority__r.name;
        return JSON.serialize(wrap);
    }
    public class wrapperclass{
        @AuraEnabled public Account userAccount{get;set;} 
        @AuraEnabled public string userSignAuthority{get;set;} 
    }
}