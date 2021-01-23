trigger AssessmentQuestion on Assessment_Question__c (before delete) {
AssessmentQuestionTriggerHandler handler = new AssessmentQuestionTriggerHandler(Trigger.isExecuting, Trigger.size);    
    
    if(Trigger.isDelete){
        if(Trigger.isBefore){
            handler.OnBeforeDelete(trigger.Old);
        }
    }
}