public class AssessmentQuestionTriggerHandler {
    private boolean m_isExecuting = false;
    private integer BatchSize = 0;
    public AssessmentQuestionTriggerHandler(boolean isExecuting, integer size){
        m_isExecuting = isExecuting;
        BatchSize = size;
    }
    public void OnBeforeDelete(List<Assessment_Question__c> oldQuesList){
        Set<Id> assQuesId = new Set<ID>();
        for(Assessment_Question__c quesLst : oldQuesList){
            assQuesId.add(quesLst.Id);
        }
        List<Assessment_Response__c> assessmentResList = new List<Assessment_Response__c>();
        for(Assessment_Response__c tempQues : [SELECT Id,Name, Response__c,Assessment_Question__c,LastModifiedBy.Name
                                               FROM Assessment_Response__c WHERE Assessment_Question__c =: assQuesId]){
                                                   assessmentResList.add(tempQues);  
                                               }
        if(assessmentResList.size() > 0)
            delete assessmentResList;
    }
}