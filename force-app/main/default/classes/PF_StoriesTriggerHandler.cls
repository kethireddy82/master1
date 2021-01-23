/****************************************
 * Class Name : PF_StoriesTriggerHandler * 
 * Description: Helper class for PF_Story__c object. * 
 * Created By : Tara
 * ****************************************/

 public class PF_StoriesTriggerHandler {

    
    public static void onAfterInsert(List<PF_Stories__c> newObjectList) {
        
        rollup_fields(newObjectList);
    
    }
    
    public static void onAfterUpdate(List<PF_Stories__c> newObjectList) {
        
        rollup_fields(newObjectList);
        
    }

    public static void onAfterDelete(List<PF_Stories__c> oldObjectList) {
        
        rollup_fields(oldObjectList);
        
    }
            
    
    public  static  void rollup_fields(List<PF_Stories__c> newObjectList){
        
        try{
            Set<Id> sprintIds = new Set<Id>();
            Map<Id , PF_Sprints__c> sprintMap  = new Map<Id , PF_Sprints__c>();
            List<PF_Sprints__c> sprintList  = new List<PF_Sprints__c>();
            List<PF_Sprints__c> updatesprintList  = new List<PF_Sprints__c>();
            
            for(PF_Stories__c story: newObjectList){
                if (story.PF_Sprint__c != null){
                    sprintIds.add(story.PF_Sprint__c);
                }
            }
            
            sprintList = [SELECT PF_Total_Estimated_Hours__c
                                                FROM PF_Sprints__c where id IN: sprintIds];
                                                
            for(PF_Sprints__c sprint : sprintList){
               sprintMap.put(sprint.id,  sprint);
            }
            
            AggregateResult[] groupedResults = [SELECT Sum(PF_Total_Estimated_Hours__c),Sum(PF_Total_Actual_Hours__c),
                                                Sum(PF_Testing_Effort__c),Sum(PF_Total_Defects__c),Sum(PF_Total_TC_Executed__c),
                                                Sum(PF_Total_TC_Passed__c),Sum(PF_Total_TC_Written__c),Sum(PF_First_Pass_Count__c),PF_Sprint__c
                                                FROM PF_Stories__c where PF_Sprint__c IN: sprintIds
                                                GROUP BY PF_Sprint__c];
                                                
            for (AggregateResult ar : groupedResults)  {
                ID sprintId = (ID)ar.get('PF_Sprint__c');
                PF_Sprints__c  sprint = sprintMap.get(sprintId);
                sprint.PF_Total_Estimated_Hours__c = (Decimal)ar.get('expr0');   
                sprint.PF_Total_Actual_Hours__c    = (Decimal)ar.get('expr1'); 
                sprint.PF_Total_Testing_Effort__c  = (Decimal)ar.get('expr2'); 
                sprint.PF_Total_Defects__c         = (Decimal)ar.get('expr3'); 
                sprint.PF_Total_TC_Executed__c     = (Decimal)ar.get('expr4'); 
                sprint.PF_Total_TC_Passed__c       = (Decimal)ar.get('expr5'); 
                sprint.PF_Total_TC_Written__c      = (Decimal)ar.get('expr6'); 
                sprint.PF_First_Pass_Count__c      = (Decimal)ar.get('expr7');        
                updatesprintList.add(sprint);
            }
           
           update updatesprintList;
       }
       catch(exception e){
           system.debug('Here is the Exception' + e.getmessage());
       }
       
    }//end method.
    
}