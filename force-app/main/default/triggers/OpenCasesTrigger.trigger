/*
 * This case trigger is basically used to handle 
 A) When a web2Case comes in and there is no contact associated to that emailAddress , we create a brand new contact which gets associated to the case
 B) There is a field called Open Cases on the account and contact , this is used to know how many cases are associated to them , we use this trigger to associate to populate the field
 */
trigger OpenCasesTrigger on Case (after insert, after update) {   
    CaseTriggerHandler handler = new CaseTriggerHandler ();   
    if( Trigger.isInsert){       
            if(Trigger.isAfter){         
                handler.OnAfterInsert(trigger.New);
            }      
    }
    List<Case> lstCase = [select id, AccountId,contactid from Case where id in: trigger.newmap.keyset() and status != 'Closed'];
    set<Id> sAccId = new set<Id>();
    set<Id> sConId = new set<Id>();
    for(Case cs: lstCase){
        if(cs.AccountId != null){
            sAccId.add(cs.AccountId);
        }
    }
     for(Case cs: lstCase){
        if(cs.contactid != null){
            sConId.add(cs.contactid);
        }
    }
    if(sAccId != null && sAccId.size() > 0){
        List<Account> lstAccount = [select id, Open_Cases__c, (select id from Cases) from Account where id in: sAccId];
        if(lstAccount.size() > 0){
            for(Account acc: lstAccount){
                acc.Open_Cases__c = acc.Cases.size();
            }            
            update lstAccount;
        }
    }
     if(sConId != null && sConId.size() > 0){
        List<contact> lstContact = [select id,Account.Open_Cases__c, Contact_Cases__c, (select id from Cases) from contact where id in: sConId];
         Integer count;
         Integer i=1;
        if(lstContact.size() > 0){ 
            for(Contact cont: lstContact){ 
                count = cont.Cases.size();
                {
                    cont.Contact_Cases__c =  cont.Contact_Cases__c + i;
                    i++;
                }
            }            
            update lstContact;
        }
    }
}