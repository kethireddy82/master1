public without sharing class UpdateContactController {
    @AuraEnabled 
    public static string getContactDetails(){
        list<user> u = [select id,contactid from user where id =: userinfo.getUserId() and lastmodifieddate !=today];
        if(!u.isEmpty()){
            system.debug('Inside bug'+u);
            Contact ct = new Contact();
            if(u[0].ContactId !=null){
                ct = [select id, firstname, lastname, phone from contact where id =: u[0].ContactId];
                return JSON.serialize(ct);
            }
        }
       return '';
        
    }
    
    @AuraEnabled 
    public static string updateSessionDetails(){
        user u = new user();
        u.id = userinfo.getUserId();
        u.SessionId__c = userinfo.getSessionId();
        update u;
        return '';
    }
    @AuraEnabled 
    public static boolean updateContactDetails(string ContactDetails){
        if(ContactDetails!=null){
            try{
            Contact ct = (Contact)JSON.deserialize(ContactDetails, Contact.class);
            update ct;
            
            	user u = new user();
            u.id = userinfo.getUserId();
            u.SessionId__c = userinfo.getSessionId();
            update u;    
            } catch(exception ex){
                system.debug(ex.getMessage()+'Debug line');
            }
            
            return true;
        } else{
            return false;
        }
    }
    
}