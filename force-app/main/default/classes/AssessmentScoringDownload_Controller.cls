public class AssessmentScoringDownload_Controller {
	@AuraEnabled
    public static List<Years_For_Assessment_Scoring__c> getYears(){
        return [Select Id,Name from Years_For_Assessment_Scoring__c];
    }
    
    @AuraEnabled
    public static List<Assessment_Scoring__c> getAssessmentScoring(String year){
        return [Select Id,WV1__c,WV2a__c,WV2b__c,WV2c__c,WV2d__c,WV2e__c,WV2f__c,WV3__c,WV4a__c,WV4b__c,WV4c__c,WV4d__c,WV4e__c,WV5__c,WV6a__c,WV6b__c,WV6c__c,WV6d__c,WV6e__c,WV6f__c,WV7__c,WV8__c,WV9__c,WV10a__c,WV10b__c,WV10c__c,WV10d__c,WV10e__c,WV11__c,WV12__c,WV13__c,WV14__c,WV15__c,WV16__c,SA1__c,SA2__c,SA3__c,SA4__c,SA5__c,SA6__c,SA7__c,SA8__c,SA9__c,SA10__c,SA11__c,SA12__c,SA13__c,Count_of_0_s__c,Count_of_1_s__c,Count_of_2_s__c,OPEID__c,School_Name__c,Year__c from Assessment_Scoring__c where Year__c = :year order by School_Name__c asc];
    }
}