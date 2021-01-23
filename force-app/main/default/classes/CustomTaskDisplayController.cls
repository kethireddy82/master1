public class CustomTaskDisplayController {
    
    @AuraEnabled
    public static List <Task> fetchTasks() {
   /*     try{
            List<Task> taskList = [SELECT Id, Subject, Status, Priority, Description__c,ActivityDate FROM Task where ownerId=:UserInfo.getUserId()];
            return taskList;
        }
        catch(Exception e){}
        return null;
        */
        
         System.debug('Abhishek ' + UserInfo.getUserId());
        List<Task> taskList = [SELECT Id, Subject, Status, Priority, Description__c,ActivityDate FROM Task where ownerId=:UserInfo.getUserId() and status ='Open'];
        if (taskList != null)    
        {
              return taskList;
        }
      
        
        return null;
    }    
}