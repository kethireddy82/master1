public with sharing class PopulateQuestionsToUniversities {
    @AuraEnabled(cacheable=true)
    public static string getBasicInfo() {
        string defaultAccountId = system.label.DefaultUniversity;
        basicDetailsWrapper bDW = new basicDetailsWrapper();
        list<Account> lstAccounts = [SELECT Id, Name, Type, Rating,Phone, Website, AnnualRevenue FROM Account where recordtype.name='Institution'];
        list<UniversityWrapper> lstUniverseWrapper = new list<UniversityWrapper>();
        if(!lstAccounts.isEmpty()){
            for(Account acc : lstAccounts){
                if(acc.id == defaultAccountId){
                   bDW.defaultAccount = acc;
                }  else{
                   UniversityWrapper UW = new UniversityWrapper();
                    UW.acct = acc;
                    UW.isSelected = true;
                    lstUniverseWrapper.add(UW);
                } 
            }  
            bDW.lstUniversities = lstUniverseWrapper;
            list<String> IcpYears = new list<string>();
            IcpYears.add('--None--');
            for(ICP__c ICP : [select id,name from ICP__c where Account__c=:defaultAccountId]){
            	IcpYears.add(ICP.name);    
            }
            bDW.ICPYears = ICPYears;
        }
    	return JSON.serialize(bDW) ;    
    }
    @AuraEnabled(cacheable=true)
    public static string getAstQuestions(string ICPName) {
        string defaultAccountId = system.label.DefaultUniversity;
        list<QuestionsWrapper> lstQuestions = new list<QuestionsWrapper>();
        for(Assessment_Question__c AQ :[SELECT Id, Name, RecordTypeId,   Choices__c, OrderNumber__c, Question__c, Static_Info__c, Assessment__c, Type__c, Is_having_master_Attachment__c, Use_for_Assessment_Score__c, Question1__c FROM Assessment_Question__c where Assessment__r.ICP__r.name=:ICPName AND Assessment__r.ICP__r.Account__c=:defaultAccountId]){
        	QuestionsWrapper QW = new QuestionsWrapper();
            QW.assqt = AQ;
            QW.isSelected = true;
            lstQuestions.add(QW);
        }
        return JSON.serialize(lstQuestions);
    }
    
    @AuraEnabled(cacheable=true)
    public static boolean CreateQuestionsToAllUniversities(string ICPName, string Universitywrapper) {
        list<UniversityWrapper> accDetails = (list<UniversityWrapper>)JSON.deserialize(Universitywrapper,list<UniversityWrapper>.class);
        list<Account> selectedAccounts = new list<Account>();
        if(!accDetails.isEmpty()){
        	for(UniversityWrapper uw :accDetails){
                if(uw.isSelected){
            		selectedAccounts.add(uw.acct);
                }
        	}    
        }
        BatchClassForPopulatingQuestions shn = new BatchClassForPopulatingQuestions(ICPName,selectedAccounts); 
        database.executeBatch(shn);
        return true;
    }
    
    public class basicDetailsWrapper{
        @AuraEnabled public list<string> ICPYears;
        @AuraEnabled public Account defaultAccount;
        @AuraEnabled public list<UniversityWrapper> lstUniversities;
    }
    public class UniversityWrapper{
    	@AuraEnabled public Account acct; 
        @AuraEnabled public boolean isSelected;
    }
    public class QuestionsWrapper{
    	@AuraEnabled public Assessment_Question__c assqt; 
        @AuraEnabled public boolean isSelected;
    }
}