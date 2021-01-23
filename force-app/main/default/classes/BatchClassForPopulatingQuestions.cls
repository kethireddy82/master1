public class BatchClassForPopulatingQuestions implements Database.Batchable<sObject>{
    public list<Account> lstAccounts= new list<Account>();
    public string ICPName;
    public BatchClassForPopulatingQuestions(String SelectedICPName,list<Account> lstSelectedAccounts) {
        ICPName = SelectedICPName;
        lstAccounts = lstSelectedAccounts;
    }
    
    public list<Account> start(Database.BatchableContext BC) {
        //String query = 'select id,Parent.name,Parent.Type,Title,body from note';
        return lstAccounts;
    }
    
    public void execute(Database.BatchableContext BC, List<Account> scope) {
        list<ICP__c> lstICPS = [SELECT Id, Account__c, ICP_Year__c, Name FROM ICP__c where name =:ICPName and Account__c IN:scope ];
        map<id,id> mapAccountToICP = new map<id,id>();
        ICP__c defaultICP = new ICP__c();
        if(!lstICPS.isEmpty()){
            for(ICP__c icp : lstICPS) {
                mapAccountToICP.put(icp.account__c,icp.id);    
            } 
            defaultICP = lstICPS[0];
        } else{
            defaultICP = [SELECT Id, Account__c, ICP_Year__c, Name FROM ICP__c where name =:ICPName and account__c=:system.label.DefaultUniversity];
        }
        set<id> setNoICPAccountIds = new set<id>();
        for(Account acc : scope){
            if(!mapAccountToICP.containskey(acc.id)){
                setNoICPAccountIds.add(acc.id);    
            }
        }
        if(!setNoICPAccountIds.isEmpty()){
            list<icp__c> lstICPsToCreate = new list<Icp__c>();
            for(id aid : setNoICPAccountIds){
                icp__c ICP = new icp__c();  
                ICP.Name = defaultICP.Name;
                ICP.ICP_Year__c = defaultICP.ICP_Year__c;
                ICP.Account__c = aid;
                lstICPsToCreate.add(ICP);
            }
            if(!lstICPsToCreate.isEmpty()){
                insert lstICPsToCreate;    
            }
        }
        list<ICP__c> lstTotalICPS = [SELECT Id, Account__c,Account__r.name,Account__r.OPE_Id__c, ICP_Year__c, Name FROM ICP__c where name =:ICPName and Account__c IN:scope ];
        list<Assessment__c > lstAssessments = [SELECT Id, Name, ICP__c, Status__c, Name__c, Title__c, Date__c, Is_certify__c, Account_Name__c, Table_Data__c, Account_OPE_Id__c 
                                               FROM Assessment__c where ICP__r.name =:ICPName and ICP__r.Account__c=:system.label.DefaultUniversity];
        list<Assessment__c > lstAssessmentsToDelete = [SELECT Id, Name, ICP__c, Status__c, Name__c, Title__c, Date__c, Is_certify__c, Account_Name__c, Table_Data__c, Account_OPE_Id__c 
                                               FROM Assessment__c where ICP__r.name =:ICPName and ICP__r.Account__c IN : scope];
                                               if(!lstAssessmentsToDelete .isEmpty()){
                                               delete lstAssessmentsToDelete ;
                                               }
        list<Assessment__c > lstAssessmentsToCreate = new list<Assessment__c >();
        for(ICP__c ICP :lstTotalICPS ){
            Assessment__c assmnt = new Assessment__c();
            assmnt.Name = lstAssessments[0].name;
            assmnt.ICP__c = ICP.Id;
            assmnt.Status__c = 'New';
            lstAssessmentsToCreate.add(assmnt);
        }
        if(!lstAssessmentsToCreate.isempty()){
            insert lstAssessmentsToCreate;
        }
        list<Assessment_Question__c> lstAssessmentQuestions = [SELECT Id, Name, RecordTypeId,   Choices__c, OrderNumber__c, Question__c, Static_Info__c, Assessment__c, Type__c, Is_having_master_Attachment__c, Use_for_Assessment_Score__c, Question1__c FROM Assessment_Question__c where Assessment__r.ICP__r.name=:ICPName AND Assessment__r.ICP__r.Account__c=:system.label.DefaultUniversity];
            list<Assessment_Question__c> lstAssessmentQuestionsToCreate = new list<Assessment_Question__c>();
        for(Assessment__c assm : [SELECT Id, Name, ICP__c, Status__c, Name__c, Title__c, Date__c, Is_certify__c, Account_Name__c, Table_Data__c, Account_OPE_Id__c 
                                  FROM Assessment__c where ICP__r.Account__c IN:scope]){
                                      for(Assessment_Question__c assessQues : lstAssessmentQuestions){
                                          Assessment_Question__c AQ = new Assessment_Question__c();
                                          if(assessQues.RecordTypeId!=null){
                                              AQ.RecordTypeId = assessQues.RecordTypeId;    
                                          }
                                          if(assessQues.Choices__c!=null){
                                              AQ.Choices__c = assessQues.Choices__c;
                                          }
                                          if(assessQues.OrderNumber__c!=null){
                                              AQ.OrderNumber__c = assessQues.OrderNumber__c;
                                          }
                                          if(assessQues.Question__c!=null){
                                              AQ.Question__c = assessQues.Question__c;
                                          }
                                          if(assessQues.Static_Info__c!=null){
                                              AQ.Static_Info__c = assessQues.Static_Info__c;
                                          }
                                          
                                          AQ.Assessment__c = assm.id;
                                          if(assessQues.Type__c!=null){
                                              AQ.Type__c = assessQues.Type__c;
                                          }
                                          if(assessQues.Is_having_master_Attachment__c!=null){
                                              AQ.Is_having_master_Attachment__c = assessQues.Is_having_master_Attachment__c;
                                          }
                                          if(assessQues.Use_for_Assessment_Score__c!=null){
                                              AQ.Use_for_Assessment_Score__c = assessQues.Use_for_Assessment_Score__c;
                                          }
                                          if(assessQues.Question1__c!=null){
                                              AQ.Question1__c = assessQues.Question1__c;
                                          }
                                          lstAssessmentQuestionsToCreate.add(AQ);
                                      }                     
                                  }
      insert lstAssessmentQuestionsToCreate;
    } 
    public void finish(Database.BatchableContext BC) {
    }
    
}