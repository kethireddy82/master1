/*
This is a helper class which gets invoked from the Contact trigger , this class is used to insert information into the Contact Log Object about any updates to the Roles on the Contact Record.
There is a related list on the Contact Layout , so the user can see what the previous role was.
*/ 

public class ContactLogClass {
    
    Public static void generateLog(List<Contact> conList)
    {        
        List<Contact_Log__c> logList = new List<Contact_Log__c>();
        for(Contact log : conList)
        {
            if(log.Contact_Role_s__c !=null)
            {              
                Contact_Log__c lg = new Contact_Log__c();
                lg.Current_Contact_Role__c = log.Contact_Role_s__c; 
                lg.Contact__c = log.id;
                logList.add(lg); 
            }
        }
        if(logList.size()>0)
        {
            try
            {
                insert logList;
            }
            catch(Exception e)
            {
                System.debug('Something went wrong : ' + e.getMessage());
            }
        }        
    }    
    
    //Work when Contact gets updated.
    Public static void generateLog(List<Contact> conList,Map<id,Contact> conMap)
    {
        List<Contact_Log__c> logList = new List<Contact_Log__c>();
        for(Contact log : conList)
        {
            if(log.Contact_Role_s__c != conMap.get(log.id).Contact_Role_s__c)
            {
                Contact_Log__c lg = new Contact_Log__c();
                lg.Current_Contact_Role__c = log.Contact_Role_s__c; 
                lg.Previous_Contact_Role__c = conMap.get(log.id).Contact_Role_s__c; 
                lg.Contact__c = log.id;
                logList.add(lg); 
            }
        }
        if(logList.size()>0)
        {
            try
            {
                insert logList;
            }
            catch(Exception e)
            {
                System.debug('Something went wrong : ' + e.getMessage());
            }
        }
        
    }
    Public static void updateMostRecentContactRole(List<Contact> conList,Map<id,Contact> conMap)
    {
        for(Contact con:conList)
        {
            if(con.Contact_Role_s__c != conMap.get(con.id).Contact_Role_s__c)
            {
                String oldRole = '';
                oldRole = conMap.get(con.id).Contact_Role_s__c;
                if(oldRole ==null)
                {
                    oldRole = '';
                }
                con.Most_Recent_Role__c = oldRole;
            }
        }
    }
}