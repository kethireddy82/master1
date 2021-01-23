trigger SurveyTakerTrigger on Survey_Taker__c (after insert,before delete) {
    //SurveyTakerTriggerHandler handler = new SurveyTakerTriggerHandler(Trigger.isExecuting, Trigger.size);    
    if(Trigger.isInsert ){
        if(Trigger.isAfter){
            //handler.OnAfterInsert(trigger.New);
        }
    }
    if(Trigger.isDelete){
        if(Trigger.isBefore){
            //handler.OnBeforeDelete(trigger.Old);
        }
    }
}