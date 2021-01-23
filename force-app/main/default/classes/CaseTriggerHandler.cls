/*
 This is a helper class which gets invoked by the Case Trigger , basically when a new case comes in and its not associated to any contact , we create a new contact from the WebName
 field by splitting it onto first name and last name and populate this on the form, the Call Center Agent later associates the Account Name and the life cycle is finished at this time.
*/

public with sharing class CaseTriggerHandler{
    public CaseTriggerHandler(){}    
    public void OnAfterInsert(List<Case> newCaseList){      
        List<Contact> lstContact = new List<Contact>();
        List<Case> lstCaseUpdate = new List<Case>();
        for(Case cse : newCaseList){          
            if(cse.ContactId == null && (cse.SuppliedName != null && cse.SuppliedEmail!= null)){
                Contact newContact= new Contact();                
                if (cse.SuppliedName.contains(' '))
                {
                    newContact.FirstName = cse.SuppliedName.Substring(0,cse.SuppliedName.indexOf(' '));
                    newContact.LastName = cse.SuppliedName.Substring(cse.SuppliedName.indexOf(' '),cse.SuppliedName.length());
                }
                else
                {
                    newContact.FirstName =cse.SuppliedName;
                    newContact.LastName =  cse.SuppliedName;
                } 
                newContact.Email= cse.SuppliedEmail;
                lstContact.add(newContact);
            }
        }
        Map<string,Contact> mapContactNameContact = new Map<string,Contact>();
        if(lstContact.size() > 0){
            upsert lstContact Email;
            for(Contact cont : lstContact){
                mapContactNameContact.put(cont.Email,cont);
            }
        }
        if(mapContactNameContact.keySet().size() > 0){
            for(Case cse : newCaseList){
                if(cse.ContactId == null && (cse.SuppliedName != null && cse.SuppliedEmail!= null)){
                    Case newCse = new Case();
                    newCse.ContactId = mapContactNameContact.get(cse.SuppliedEmail).Id;
                    newCse.Id = cse.Id;
                    lstCaseUpdate.add(newCse);
                }
            }
        }
        if(lstCaseUpdate.size() > 0)
            update lstCaseUpdate;
    }
}