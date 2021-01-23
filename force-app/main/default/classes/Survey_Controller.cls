public class Survey_Controller {
    public mainWrapper htmlData {get;set;}
    public List<printClass> printDetails{get;set;}
    
    public Survey_Controller(){
        if(ApexPages.currentPage() != null && ApexPages.currentPage().getParameters().containsKey('Id')){
            Assessment__c assessmentObj = [Select Name__c,Table_Data__c from Assessment__c where Id=: ApexPages.currentPage().getParameters().get('Id') LIMIT 1];
            htmlData = (mainWrapper)JSON.deserialize(assessmentObj.Table_Data__c, mainWrapper.class);
            List<printClass> printResults = new List<printClass>();
            printResults=htmlData.wrapperClassList;
            printDetails=new List<printClass>();
            printDetails.addAll(printResults);
            //htmlData = EncodingUtil.base64Decode(assessmentObj.Table_Data__c).toString();
            Apexpages.currentPage().getHeaders().put('content-disposition', 'attachment; filename='+assessmentObj.Name__c+'.pdf');
        }
    }
    @AuraEnabled
    public static String printTable(String recordId,String data){
        string redirectionUrl = null;
        if(!String.isEmpty(recordId) && !String.isEmpty(Data)){
            Assessment__c assessmentObj = [Select Id,Table_Data__c from Assessment__c where Id=: recordId LIMIT 1];
        	//assessmentObj.Table_Data__c = EncodingUtil.base64Encode(Blob.valueOf(data.replaceAll('\'','')));
        	assessmentObj.Table_Data__c = data.replaceAll('\'','');
            update assessmentObj;
            redirectionURL=URL.getSalesforceBaseUrl().getHost();
        }
        return redirectionUrl;
    }
    
    @AuraEnabled
    public static void createResponseRecord(string userResponseString) {
        system.debug('===userResponseString==='+userResponseString);    
        //sObject AR = JSON.deserialize(userResponseString, Assessment_Response__c.class);        
        //system.debug('===AR==='+AR);    
        if(userResponseString != null  && userResponseString != ''){
            Map<String, Object> results = (Map<String, Object>)JSON.deserializeUntyped(userResponseString);
            system.debug('===results==='+results);    
            Assessment_Response__c newRes = new Assessment_Response__c();
            newRes.Id = string.valueof(results.get('Id'));
            newRes.Response__c = string.valueof(results.get('Response__c'));
            update newRes;            
        }
    }
    @AuraEnabled 
    public static user fetchUser(){
        // query current user information  
        User oUser = [select id,Name,TimeZoneSidKey,Username,Alias,Country,Email,FirstName,LastName,IsActive,IsPortalEnabled 
                      FROM User Where id =: userInfo.getUserId()];
        return oUser;
    }
    @AuraEnabled public List<ICP__c> icpList {get;set;}
    @AuraEnabled public List<Assessment__c> surveyList {get;set;}
    @AuraEnabled
    public static Survey_Controller initMethod() {
        string contactId = '';
        contactId = [select contactId from User where id = : UserInfo.getUserId()].contactId;
        system.debug(contactId+'===='+ UserInfo.getUserId());
        //if(contactId == null)
          //  contactId = '003r0000009VHMg';
        
        List<Contact> contList = new List<Contact>([Select Id,Name,AccountId from Contact where Id =: contactId]);
        system.debug(contList.size()+'===='+contList);
        List<Account> accList = new List<Account>([Select Id,Name from Account where Id =: contList[0].AccountId limit 1]);
        List<ICP__c> icpList = new List<ICP__c>([Select Id,Name,Account__c from ICP__c where Account__c =: accList[0].Id]);
        Set<Id> icpIds = new Set<Id>();
        Set<Id> assessmentIds = new Set<Id>();
        for(ICP__c tempICP : icpList)
            icpIds.add(tempICP.Id);
        List<Survey_Taker__c> surverTakerList = new List<Survey_Taker__c>([SELECT Id, Contact__c,Assessment_Status__c, Assessment__c,Assessment__r.Name,Survey_Status__c 
                                                                           FROM Survey_Taker__c WHERE Contact__c =: contactId]);
        for(Survey_Taker__c tempAssmt : surverTakerList)
            assessmentIds.add(tempAssmt.Assessment__c);
        List<Assessment__c> surveyList = new List<Assessment__c>([Select Id,Name,Date__c,Title__c,Status__c,Is_certify__c,ICP__c From Assessment__c 
                                                                  Where ICP__c =: icpIds AND Id =: assessmentIds]);
        
        Survey_Controller obj = new Survey_Controller();
        obj.icpList = icpList;
        obj.surveyList = surveyList;       
        //system.debug('===obj==='+obj);
        return obj;
    }
    
    @AuraEnabled
    public static List<wrapperClass> getSurveyInformation(string getSurveyId) {
        List<Assessment__c> lstAssessment = new List<Assessment__c>();
        lstAssessment = [Select Id,Name,Status__c from Assessment__c where Id =: getSurveyId limit 1];
        //abhishek
        //lstAssessment[0].Status__c = 'Draft';
        //update lstAssessment;
        if (lstAssessment[0].Status__c == '' || lstAssessment[0].Status__c == null || lstAssessment[0].Status__c == 'New')
        {
               lstAssessment[0].Status__c = 'Draft';
               update lstAssessment;
        } 
        //update lstAssessment;
        //system.debug('===getSurveyId==='+getSurveyId);   
        List<Survey_Taker__c> surverTakerList = new List<Survey_Taker__c>([SELECT Id, Contact__c,Contact__r.Name, Assessment_Status__c,
                                                                           Assessment__c,Assessment__r.Name,Survey_Status__c,
                                                                           Assessment__r.Status__c
                                                                           FROM Survey_Taker__c WHERE Assessment__c =: getSurveyId limit 1]);
        //Get Question
        //Question__c,
        Map<Id,Assessment_Question__c> existingQues = new Map<Id,Assessment_Question__c>([SELECT Id, Name,Static_Info__c, Assessment__c,Recordtype.Name, Choices__c, OrderNumber__c, Type__c,  Question__c,
                                                                                          Assessment__r.Name,Is_having_master_Attachment__c,(SELECT Id,Name From Assessment_Responses__r)
                                                                                          FROM Assessment_Question__c
                                                                                          WHERE Assessment__c =: getSurveyId ORDER BY OrderNumber__c ASC]);
        
        Map<Id,Assessment_Response__c> existingAnswer = new Map<Id,Assessment_Response__c>([SELECT Id,Name, Response__c,Assessment_Question__c,LastModifiedBy.Name,(Select Id,Name,ParentId,ContentType From Attachments)
                                                                                            FROM Assessment_Response__c WHERE Assessment_Question__c =: existingQues.Keyset()
                                                                                           ]);
        //system.debug('==existingQues=='+existingQues );
        //system.debug('==existingAnswer=='+existingAnswer);
        Map<Id,Assessment_Response__c> quesAnsMap = new Map<Id,Assessment_Response__c>();
        Map<string,string> checkMap = new Map<string,string>();
        Map<Id,string> tempResponseMap= new Map<Id,string>();
        //Get content records
        List<Id> newSet = new List<Id>();
        List<Id> newAssessmentSet = new List<Id>();
        for(Assessment_Response__c tempAns : existingAnswer.values()){
            quesAnsMap.put(tempAns.Assessment_Question__c, tempAns);
            checkMap.put(tempAns.Assessment_Question__c, tempAns.Response__c);
            newSet.add(tempAns.Id);
            tempResponseMap.put(tempAns.Id,tempAns.Response__c);
        }        
        //system.debug(newSet+'==@@@@=='+quesAnsMap);
        Map<Id,List<ContentDocumentLink>> reponseAttachListMap = new Map<Id,List<ContentDocumentLink>>();
        reponseAttachListMap = Survey_Controller.getListAttachment(newSet);  
        newAssessmentSet.add(getSurveyId);
        Map<Id,List<ContentDocumentLink>> assessmentAttachListMap = new Map<Id,List<ContentDocumentLink>>();
        assessmentAttachListMap = Survey_Controller.getListAttachment(newAssessmentSet );   
        system.debug(assessmentAttachListMap.size()+'==@@assessmentAttachListMap @@=='+assessmentAttachListMap );     
        //Get Question vs Answer
        List<wrapperClass> quesWrap = new List<wrapperClass>();
        Map <Id, Assessment_Response__c> QuesIdAnsMap = new Map <Id, Assessment_Response__c>();
        if(existingQues.keyset().size() > 0){
            integer count = 1;
            for (Assessment_Question__c temp : existingQues.values()) {
                system.debug(temp +'====temp====');
                wrapperClass wrap = new wrapperClass();
                wrap.surveyQues = temp;
                List<options> wrapOptionsList = new List<options>();
                if(temp.Recordtype.Name != 'Static Text'){
                wrap.questionNo = count;
                count++;
                }
                
                if(temp.Recordtype.Name != 'Static Text' && temp.Type__c != 'Free Text'){
                    string checkString = checkMap.get(temp.Id);
                    set<string> checkSet = new set<string>();
                    if(checkString != null){
                        for(String resTemp : checkString.split('\r\n')){
                            checkSet.add(resTemp.trim());
                        }   
                    }
                    for(String s : temp.Choices__c.split('\r\n')){
                        options newOption = new options();
                        newOption.label = s;
                        newOption.value = s;
                        if(checkSet.contains(s))
                            newOption.Checked = true;
                        else
                            newOption.Checked = false;
                        wrapOptionsList.add(newOption);
                    }
                }
                wrap.surveyQuesChoice = wrapOptionsList;
                wrap.questionOrder = temp.OrderNumber__c;
                wrap.surverTakerInfo = surverTakerList[0];
                if(quesAnsMap.containskey(temp.Id)){
                    Id attendeeId = quesAnsMap.get(temp.Id).Id;
                    wrap.surveyResponse = quesAnsMap.get(temp.Id);
                    wrap.lastModifiedByUserName = quesAnsMap.get(temp.Id).LastModifiedBy.Name;
                    List<responseAttachs> wrapAttachList = new List<responseAttachs>();
                    if(reponseAttachListMap.containskey(attendeeId)){
                        for(ContentDocumentLink tempAttach : reponseAttachListMap.get(attendeeId)){
                            responseAttachs wrapAttach = new responseAttachs();
                            wrapAttach.attachId = tempAttach.ContentDocument.Id;
                            wrapAttach.attachName = tempAttach.ContentDocument.Title;                            
                            wrapAttach.attachSize = Survey_Controller.FileSizeToString(tempAttach.ContentDocument.ContentSize); 
                            wrapAttach.attachType = tempAttach.ContentDocument.FileType;                        
                            wrapAttachList.add(wrapAttach);
                        }
                    }
                    wrap.responseAttach = wrapAttachList;       
                }
                    List<assessmentAttachs> wrapAssessmentAttachList = new List<assessmentAttachs>();
                    system.debug('==@@====@@=='+temp.Assessment__c); 
                    if(assessmentAttachListMap.containskey(temp.Assessment__c)){
                        system.debug('==@@====@@=='+assessmentAttachListMap.get(temp.Assessment__c)); 
                        for(ContentDocumentLink tempAttach : assessmentAttachListMap.get(temp.Assessment__c)){
                            assessmentAttachs wrapAttach = new assessmentAttachs();
                            wrapAttach.attachId = tempAttach.ContentDocument.Id;
                            wrapAttach.attachName = tempAttach.ContentDocument.Title;                            
                            wrapAttach.attachSize = Survey_Controller.FileSizeToString(tempAttach.ContentDocument.ContentSize);
                            wrapAttach.attachType = tempAttach.ContentDocument.FileType;                        
                            wrapAssessmentAttachList.add(wrapAttach);
                        }
                    }
                    system.debug('==@@wrapAssessmentAttachList@@=='+wrapAssessmentAttachList); 
                    wrap.surverTakerInfo = surverTakerList[0];       
                    wrap.assessmentAttach = wrapAssessmentAttachList;
                    system.debug('==@@tempResponseMap@@=='+tempResponseMap);
                    wrap.responseMap = tempResponseMap; 
                quesWrap.add(wrap);     
            }
        }
        
        system.debug('==@@@@=='+quesWrap ); 
        return quesWrap ;
    }
    @AuraEnabled    
    public static void submitSurvey(Assessment__c assessmentRecord,string surverTakerId) {
        system.debug(assessmentRecord+'==@@@@=='+surverTakerId);      
        List<Survey_Taker__c> lstSurveyTaker = new List<Survey_Taker__c>([Select Id,Name,Survey_Status__c from Survey_Taker__c 
                                                                          WHERE Id=: surverTakerId limit 1]);
        try {
            if(assessmentRecord != null){
                update assessmentRecord;                
            }
            if(lstSurveyTaker.size() > 0){
                lstSurveyTaker[0].Survey_Status__c = 'Completed';
                update lstSurveyTaker;
            }
        }
        catch (Exception e) {
            throw new AuraHandledException('Darn it! Something went wrong: '+ e.getMessage());    
        }   
    }
    @AuraEnabled
    public static Map<Id,List<ContentDocumentLink>> getListAttachment(List<Id> newSet) {
        Map<Id,List<ContentDocumentLink>> reponseAttachListMap = new Map<Id,List<ContentDocumentLink>>();
        List<ContentDocumentLink> lstCDocLink = new List<ContentDocumentLink>();
        system.debug('==newSet=='+newSet);
        if(newSet.size() > 0)
            lstCDocLink = [SELECT ContentDocumentID,LinkedEntityId, ContentDocument.CreatedDate,ContentDocument.Title,  
                           ContentDocument.ContentSize,ContentDocument.FileType,ContentDocument.CreatedBy.Name, LinkedEntity.type, LinkedEntity.Name FROM ContentDocumentLink 
                           WHERE LinkedEntityId IN: newSet];
        if(lstCDocLink.size() > 0){
            for(ContentDocumentLink CVDocLink : lstCDocLink){
                if(reponseAttachListMap.containsKey(CVDocLink.LinkedEntityId)) {                    
                    List<sObject> contentList = reponseAttachListMap.get(CVDocLink.LinkedEntityId);
                    contentList.add(CVDocLink);
                    reponseAttachListMap.put(CVDocLink.LinkedEntityId, contentList);
                } else {
                    reponseAttachListMap.put(CVDocLink.LinkedEntityId, new List<sObject> { CVDocLink});
                }
            }
        }
        system.debug(reponseAttachListMap.size()+'==reponseAttachListMap=='+reponseAttachListMap);
        return reponseAttachListMap;
    }
    
    public class mainWrapper{
        public List<printClass> wrapperClassList{get;set;}
    }
    
    public class printClass{
        public String question{get;set;}
        public String response{get;set;}
        public String user{get;set;}
    }
    
    public class wrapperClass{
        @AuraEnabled public List<options> surveyQuesChoice{get;set;}
        @AuraEnabled public Assessment_Question__c surveyQues{get;set;}
        @AuraEnabled public Assessment_Response__c surveyResponse{get;set;}
        @AuraEnabled public List<responseAttachs> responseAttach{get;set;}
        @AuraEnabled public Map<Id,string> responseMap{get;set;}
        @AuraEnabled public List<assessmentAttachs> assessmentAttach{get;set;}
        @AuraEnabled public decimal questionOrder {get;set;}
        @AuraEnabled public decimal questionNo {get;set;}
        @AuraEnabled public Survey_Taker__c surverTakerInfo {get;set;}
        @AuraEnabled public string lastModifiedByUserName {get;set;}
    }
    public class responseAttachs{
        @AuraEnabled public string attachId {get;set;}
        @AuraEnabled public string attachName {get;set;}        
        @AuraEnabled public string attachType {get;set;}
        @AuraEnabled public string attachSize {get;set;}        
    }    
    public class assessmentAttachs{
        @AuraEnabled public string attachId {get;set;}
        @AuraEnabled public string attachName {get;set;}        
        @AuraEnabled public string attachType {get;set;}
        @AuraEnabled public string attachSize {get;set;}        
    }
    public class options{
        @AuraEnabled public string label {get;set;}        
        @AuraEnabled public string value {get;set;}
        @AuraEnabled public boolean Checked {get;set;}       
    }
    @AuraEnabled
    public static void deleteContentDoc(string contentDocId) {
        List<ContentDocument> cd = new List<ContentDocument>([SELECT Id, PublishStatus, Title, LatestPublishedVersionId
                                                              FROM ContentDocument where Id = : contentDocId]);
        if(cd.size() > 0)
            delete cd;
    }
    //Method to calculate the size
    public static String FileSizeToString(Long Value){
        if (Value < 1024)
            return string.valueOf(Value) + ' Bytes';
        else
            if (Value >= 1024 && Value < (1024*1024)){
            Decimal kb = Decimal.valueOf(Value);
            kb = kb.divide(1024,2);
            return string.valueOf(kb) + ' KB';
        }
        else
            if (Value >= (1024*1024) && Value < (1024*1024*1024)){
            Decimal mb = Decimal.valueOf(Value);
            mb = mb.divide((1024*1024),2);
            return string.valueOf(mb) + ' MB';
        }
        else{
            Decimal gb = Decimal.valueOf(Value);
            gb = gb.divide((1024*1024*1024),2);            
            return string.valueOf(gb) + ' GB';
        }    
    }
}