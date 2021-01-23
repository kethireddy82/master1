public class DeleteICPAssessmentQuestionController {
    @AuraEnabled
    public static string getAssessMentsList(string ICPId){
        list<Assessment__c> lstquestions = [select id,Name,Status__c from Assessment__c where ICP__c =: ICPId and Status__c = 'New'];
        /*list<assessmentlistClass> lstAssements = new list<assessmentlistClass>();
        IF(!lstquestions.isEmpty()){
            for(Assessment__c asmt : lstquestions){
            	assessmentlistClass assmntcls = new assessmentlistClass();
                assmntcls.isSelected = false;
                assmntcls.assessment =  asmt;  
                lstAssements.add(assmntcls);
            }
            
        }*/
        return JSON.serialize(lstquestions);
    }
    
    @AuraEnabled
    public static string deleteAssessmentQuestions(string ICPId){
        list<Assessment__c> lstAssessment = (list<Assessment__c>) System.JSON.deserialize(ICPId, list<Assessment__c>.class);
        system.debug(lstAssessment + '@@@123$');
        if(!lstAssessment.isEmpty()){
        	list<Assessment_Question__c> lstquestions = [select id,Assessment__c,Assessment__r.Status__c from Assessment_Question__c where Assessment__c IN : lstAssessment];
            if(!lstquestions.isempty()){
                delete lstquestions;
            }
            list<Survey_Taker__c> lstSurveyTakers = [select id ,name from Survey_Taker__c where Assessment__c IN:lstAssessment ];
                if(!lstSurveyTakers.isEmpty()){
                	delete lstSurveyTakers;    
                }
            delete lstAssessment;
            system.debug(lstquestions + '@@@1234$');
        }
        return 'success';
        /*list<Assessment_Question__c> lstquestions = [select id,Assessment__c,Assessment__r.Status__c from Assessment_Question__c where Assessment__r.ICP__c =: ICPId];
        IF(lstquestions.isEmpty()){
            return 'No Records';
        } else if(lstquestions[0].Assessment__r.Status__c == 'Completed'){
            return 'Assement Completed';
        } else {
           delete lstquestions;
            return 'success';
        }*/
        //return null; 
    }
    
    public class assessmentlistClass{
        @AuraEnabled public  boolean isSelected{get;set;}
        @AuraEnabled public Assessment__c assessment {get;set;}
    }
    
}