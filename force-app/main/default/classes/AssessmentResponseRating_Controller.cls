public class AssessmentResponseRating_Controller {
    public PrintData htmlData {get;set;}
    public List<PrintResults> printDetails{get;set;}
    
    public AssessmentResponseRating_Controller(){
        if(ApexPages.currentPage() != null && ApexPages.currentPage().getParameters().containsKey('Id')){
            Assessment__c assessmentObj = [Select Name,Table_Data__c from Assessment__c where Id=: ApexPages.currentPage().getParameters().get('Id') LIMIT 1];
            htmlData = (PrintData)JSON.deserialize(assessmentObj.Table_Data__c, PrintData.class);
            List<PrintResults> printResults = new List<PrintResults>();
            printResults=htmlData.result;
            printDetails=new List<PrintResults>();
            printDetails.addAll(printResults);
            //htmlData = EncodingUtil.base64Decode(assessmentObj.Table_Data__c).toString();
            Apexpages.currentPage().getHeaders().put('content-disposition', 'attachment; filename='+assessmentObj.Name+'.pdf');
        }
    }
    @AuraEnabled
    public static void printTable(String recordId,String data){
        if(!String.isEmpty(recordId) && !String.isEmpty(Data)){
            Assessment__c assessmentObj = [Select Id,Table_Data__c from Assessment__c where Id=: recordId LIMIT 1];
            //assessmentObj.Table_Data__c = EncodingUtil.base64Encode(Blob.valueOf(data.replaceAll('\'','')));
            assessmentObj.Table_Data__c = data.replaceAll('\'','');
            update assessmentObj;
        }
    }
    
    @AuraEnabled
    public static List<WrapperClass> getAssessmentQuestionsAndResponse(String recordId){
        List<WrapperClass> questionResponseWrapper = new List<WrapperClass>();
        List<Assessment_Question__c> listOfAssessmentQuestions = new List<Assessment_Question__c>();
        List<options> newRatingValues;
        if(String.isNotBlank(recordId)){    
            List<options> ratingValues = getPickListValuesIntoList();
            Id questionsRecordTypeId = Schema.SObjectType.Assessment_Question__c.getRecordTypeInfosByName().get(Label.Questions).getRecordTypeId();
            try{
                  //listOfAssessmentQuestions = [Select Id,Assessment__r.Status__c,Type__c,Choices__c,RecordType.Name,(Select Id,AssessmentQuestion__c,AssessmentResponse__c,Rating__c from AssessmentResponseRatings__r),(Select Id,Response__c from Assessment_Responses__r) from Assessment_Question__c where Assessment__c =:recordId and (Assessment__r.Status__c =:Label.ReadyForReview or Assessment__r.Status__c =:Label.CompletedStatus or Assessment__r.Status__c=:Label.ReadyForWebVerification) and RecordTypeId =:questionsRecordTypeId order by OrderNumber__c asc];
					system.debug(recordId + 'RecordId' +  '  '+questionsRecordTypeId);
                system.debug(recordId + 'RecordId');
                listOfAssessmentQuestions = [Select Id,Assessment__r.Status__c,Question__c,Type__c,Choices__c,RecordType.Name,(Select Id,AssessmentQuestion__c,AssessmentResponse__c,Rating__c from AssessmentResponseRatings__r),(Select Id,Response__c from Assessment_Responses__r) from Assessment_Question__c where Assessment__c =:recordId and (Assessment__r.Status__c =:Label.ReadyForReview or Assessment__r.Status__c =:Label.CompletedStatus or Assessment__r.Status__c=:Label.ReadyForWebVerification) and RecordTypeId =:questionsRecordTypeId order by OrderNumber__c asc];
                system.debug(listOfAssessmentQuestions + 'rateresponserecords');
                if(!listOfAssessmentQuestions.isEmpty()){
                    Integer count = 1;
                    for(Assessment_Question__c assessmentQuestion : listOfAssessmentQuestions){
                        List<Assessment_Response__c> assessmentResponseList = new List<Assessment_Response__c>();
                        List<options> wrapOptionsList = new List<options>();
                        WrapperClass newWrapperClass = new WrapperClass();
                        if(!ratingValues.isEmpty()){
                            if(assessmentQuestion.AssessmentResponseRatings__r!=null && !assessmentQuestion.AssessmentResponseRatings__r.isEmpty()){
                                AssessmentResponseRating__c assessmentResponseRating = assessmentQuestion.AssessmentResponseRatings__r[0];
                                newWrapperClass.ratingsId = assessmentResponseRating.Id;
                                newWrapperClass.ratingPresent = true;
                                newRatingValues = new List<options>();
                                for(options ratingOption : ratingValues){
                                    options newOption = new options();
                                    newOption.label = ratingOption.label;
                                    newOption.value = ratingOption.value;
                                    if(ratingOption.value == assessmentResponseRating.Rating__c){
                                        newOption.Checked = true;
                                    }
                                    else{
                                        newOption.Checked = false;
                                    }
                                    newRatingValues.add(newOption);
                                }
                                newWrapperClass.ratingValues = newRatingValues;
                            }
                            else{
                                newWrapperClass.ratingsId = null;
                                newWrapperClass.ratingPresent = false;
                                ratingValues[0].Checked = true;
                                newWrapperClass.ratingValues = ratingValues;
                            }
                        }
                        newWrapperClass.assessmentQuestion = assessmentQuestion;
                        newWrapperClass.questionNo = count;
                        newWrapperClass.questionId = assessmentQuestion.Id;
						newWrapperClass.status = assessmentQuestion.Assessment__r.Status__c;
                        if(!assessmentQuestion.Assessment_Responses__r.isEmpty()){
                            newWrapperClass.responseId = assessmentQuestion.Assessment_Responses__r[0].Id;
                        }
                        if(assessmentQuestion.Recordtype.Name != 'Static Text' && assessmentQuestion.Type__c != 'Free Text'){
                            string checkString = null;
                            string questionAndResponseIds;
                            if(!assessmentQuestion.Assessment_Responses__r.isEmpty()){
                                checkString = assessmentQuestion.Assessment_Responses__r[0].Response__c;
                            }
                            set<string> checkSet = new set<string>();
                            if(checkString != null){
                                for(String resTemp : checkString.split('\r\n')){
                                    checkSet.add(resTemp.trim());
                                }   
                            }
                            for(String s : assessmentQuestion.Choices__c.split('\r\n')){
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
                        newWrapperClass.surveyQuesChoice = wrapOptionsList;
                        assessmentResponseList = assessmentQuestion.Assessment_Responses__r;
                        newWrapperClass.assessmentResponse = assessmentResponseList;
                        questionResponseWrapper.add(newWrapperClass);
                        count++;
                    }
                }
                else{
                    return null;
                }
            }
            catch(Exception exceptionObj){
                System.debug('Exception is '+exceptionObj.getLineNumber()+' '+exceptionObj.getMessage());
            }
        }
        return questionResponseWrapper;
    }
    
    public static List<options> getPickListValuesIntoList(){
        List<options> pickListValuesList= new List<options>();
        Schema.DescribeFieldResult fieldResult = Assessment_Response__c.Rating__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : ple){
            options picklistOption = new options();
            picklistOption.label = pickListVal.getLabel();
            picklistOption.value = pickListVal.getLabel();
            picklistOption.Checked = false;
            pickListValuesList.add(picklistOption);
        }     
        return pickListValuesList;
    }
    
    public class WrapperClass{
        @AuraEnabled public Assessment_Question__c assessmentQuestion;
        @AuraEnabled public List<Assessment_Response__c> assessmentResponse;
        @AuraEnabled public List<options> surveyQuesChoice;
        @AuraEnabled public Integer questionNo;
		@AuraEnabled public String status;
        @AuraEnabled public String questionId;
        @AuraEnabled public String responseId;
        @AuraEnabled public String ratingsId;
        @AuraEnabled public List<options> ratingValues;
        @AuraEnabled public Boolean ratingPresent;
    }
    
    public class options{
        @AuraEnabled public string label;       
        @AuraEnabled public string value;
        @AuraEnabled public boolean Checked;   
    }
    
    public class MainRatingsWrapper{
        @AuraEnabled public List<ratingsWrapper> ratingResponse;
    }
    
    public class ratingsWrapper{
        @AuraEnabled public string ratingsId;
        @AuraEnabled public string questionId;        
        @AuraEnabled public string responseId;
        @AuraEnabled public string rating;  
    }
    
    @AuraEnabled
    public static void saveRatings(String ratingsData, String recordId){
        if(String.isNotBlank(ratingsData) && String.isNotBlank(recordId)){
            List<Assessment__c> listOfAssessment = new List<Assessment__c>();
            List<AssessmentResponseRating__c> listOfResponsesToUpdate = new List<AssessmentResponseRating__c>();
            List<AssessmentResponseRating__c> listOfResponsesToInsert = new List<AssessmentResponseRating__c>();
            try{
                listOfAssessment = [Select id, Status__c from Assessment__c where id=:recordId];
                MainRatingsWrapper ratingsWrapperObject = (MainRatingsWrapper)JSON.deserialize(ratingsData, MainRatingsWrapper.class);
                if(ratingsWrapperObject!=null){
                    List<ratingsWrapper> listOfQuestionResponseRatings = ratingsWrapperObject.ratingResponse;
                    if(listOfQuestionResponseRatings!=null && !listOfQuestionResponseRatings.isEmpty()){
                        for(ratingsWrapper wrapperObj : listOfQuestionResponseRatings){
                            if(String.isNotBlank(wrapperObj.ratingsId)){
                                AssessmentResponseRating__c assessmentResponseRatingObject = new AssessmentResponseRating__c();
                                assessmentResponseRatingObject.Id = (Id)wrapperObj.ratingsId;
                                assessmentResponseRatingObject.Rating__c = wrapperObj.rating;
                                listOfResponsesToUpdate.add(assessmentResponseRatingObject);
                            }
                            else{
                                AssessmentResponseRating__c assessmentResponseRatingObject = new AssessmentResponseRating__c();
                                assessmentResponseRatingObject.AssessmentQuestion__c = (Id)wrapperObj.questionId;
                                assessmentResponseRatingObject.AssessmentResponse__c = (Id)wrapperObj.responseId;
                                assessmentResponseRatingObject.Rating__c = wrapperObj.rating;
                                listOfResponsesToInsert.add(assessmentResponseRatingObject);
                            }
                        }
                    }
                }
            }
            catch(Exception e){
                System.debug('Exception is @'+e.getMessage());
            }
            if(!listOfAssessment.isEmpty()){
                listOfAssessment[0].Status__c = Label.ReadyForWebVerification;
                update listOfAssessment;
            }
            if(!listOfResponsesToUpdate.isEmpty()){
                update listOfResponsesToUpdate;
            }
            if(!listOfResponsesToInsert.isEmpty()){
                insert listOfResponsesToInsert;
            }
        }
    }
    
    public class PrintData{
        public List<PrintResults> result{get;set;}
    }
    
    public class PrintResults{
        public String no{get;set;}
        public String question{get;set;}
        public String response{get;set;}
        public String rating{get;set;}
        public Boolean multipleChoice{get;set;}
        public List<String> responses{get;set;}
    }
}