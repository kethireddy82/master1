public without sharing class NewCaseCreationController {
    public class recordtypeswrapper{
        @AuraEnabled public string label{get;set;}
        @AuraEnabled public string value{get;set;}
    }
    public class inputParametersList{
        @AuraEnabled public list<recordtypeswrapper> lstRecordtypes{get;set;}
        @AuraEnabled public list<string> lstICPYears{get;set;}
        @AuraEnabled public list<string> lstStatus{get;set;}
        @AuraEnabled public list<string> lstCategories{get;set;}
        @AuraEnabled public list<string> lstOrigins{get;set;}
        @AuraEnabled public list<string> lstPriorities{get;set;}
        @AuraEnabled public list<string> lsttypes{get;set;}
        @AuraEnabled public Account Acct{get;set;}
        @AuraEnabled public Contact Cont{get;set;}
        @AuraEnabled public string AcctName{get;set;}
        @AuraEnabled public string ContName{get;set;}
    }
    @AuraEnabled 
    public static string getRecordTypes(){
        Schema.DescribeSObjectResult R = case.SObjectType.getDescribe();
        List<Schema.RecordTypeInfo> RT = R.getRecordTypeInfos();
        list<recordtypeswrapper> lstRecordTypeNames = new list<recordtypeswrapper>();
        for(Schema.RecordTypeInfo srt : RT){
            if((srt.getName() !='Master') && (srt.getName() !='Non VolEd Case'))
            {
                recordtypeswrapper rtwrap = new recordtypeswrapper();
                rtwrap.label = srt.getName();
                rtwrap.value = srt.getDeveloperName();
                lstRecordTypeNames.add(rtwrap);    
            }
            
        }
        List<String> lstICPYears= new List<String>();
        Schema.DescribeFieldResult fieldResult = Case.ICP_Year__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : ple){
            lstICPYears.add(pickListVal.getLabel());
        } 
        inputParametersList iPL = new inputParametersList();
        iPL.lstRecordtypes = lstRecordTypeNames;
        iPL.lstICPYears = getPicklistValues('ICP_Year__c');
        iPL.lstStatus = getPicklistValues('status');
        //iPL.lstCategories =getPicklistValues('ICP_Year__c');
        iPL.lstOrigins = getPicklistValues('Origin'); 
        iPL.lstPriorities = getPicklistValues('Priority');
        iPL.lsttypes = getPicklistValues('type');
        user u = [select id,name,contactid,accountid from user where id=:userinfo.getUserId()];
        Account acc = new account();
        Contact ct = new Contact();
        string AcctName;
        string ContName;
        if(u.AccountId !=null){
            acc = [select id,name from Account where id =:u.AccountId];
            AcctName = acc.name;
        }
        if(u.ContactId !=null){
            ct = [select id,name,AccountId,Account.Name from Contact where id =:u.ContactId];
            ContName = ct.name;
            AcctName = ct.Account.Name;
        }
        iPL.Acct = acc;
        iPL.Cont = ct;
        iPL.AcctName = AcctName;
        iPL.ContName = ContName;
        system.debug('@@@@@' + iPL);
        return JSON.serialize(ipl);
    }
    @AuraEnabled 
    public static string CreateCase(string CaseObj, string RecordTypeName){
       Case cs = (Case)JSON.deserialize(CaseObj, Case.class);
       // string RecordTypeName = string.valueOf(cs.RecordType);
        if(!test.isRunningTest()){
        	cs.recordTypeId = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('Voled_Unrestricted_Access').getRecordTypeId();    
        }
           
         insert cs;
                                       
                                       
        return cs.Id;
    }
    
    public static list<string> getPicklistValues(string fieldname){
        List<String> picklistValues= new List<String>();
        
       // Schema.DescribeFieldResult fieldResult = new Schema.DescribeFieldResult();  
        if(fieldname == 'ICP_Year__c'){
            Schema.DescribeFieldResult fieldResult = Case.ICP_Year__c.getDescribe();  
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
            for( Schema.PicklistEntry pickListVal : ple){
                picklistValues.add(pickListVal.getLabel());
            } 
            return picklistValues;
        } else if(fieldname == 'Status'){
            Schema.DescribeFieldResult fieldResult = Case.Status.getDescribe();  
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
            for( Schema.PicklistEntry pickListVal : ple){
                picklistValues.add(pickListVal.getLabel());
            } 
            return picklistValues;
        } else if(fieldname == 'Type'){
            Schema.DescribeFieldResult fieldResult = Case.Type.getDescribe();   
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
            for( Schema.PicklistEntry pickListVal : ple){
                picklistValues.add(pickListVal.getLabel());
            } 
            return picklistValues;
        } else if(fieldname == 'Priority'){
            Schema.DescribeFieldResult fieldResult = Case.Priority.getDescribe();  
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
            for( Schema.PicklistEntry pickListVal : ple){
                picklistValues.add(pickListVal.getLabel());
            } 
            return picklistValues;
        } else if(fieldname == 'Origin'){
            Schema.DescribeFieldResult fieldResult = Case.Origin.getDescribe();  
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
            for( Schema.PicklistEntry pickListVal : ple){
                picklistValues.add(pickListVal.getLabel());
            } 
            return picklistValues;
        } 
        return null;
        
    }
    @AuraEnabled
    public static Id saveChunk(Id parentId, String fileName, String base64Data, String contentType, String fileId) {
        // check if fileId id ''(Always blank in first chunk), then call the saveTheFile method,
        //  which is save the check data and return the attachemnt Id after insert, 
        //  next time (in else) we are call the appentTOFile() method
        //   for update the attachment with reamins chunks   
        if (fileId == '') {
            fileId = saveTheFile(parentId, fileName, base64Data, contentType);
        } else {
            appendToFile(fileId, base64Data);
        }
 
        return Id.valueOf(fileId);
    }
 
    public static Id saveTheFile(Id parentId, String fileName, String base64Data, String contentType) {
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        ContentVersion cVersion = new ContentVersion();
        cVersion.ContentLocation = 'S'; //S-Document is in Salesforce. E-Document is outside of Salesforce. L-Document is on a Social Netork.
        cVersion.PathOnClient = fileName;//File name with extention
        cVersion.Origin = 'C';//C-Content Origin. H-Chatter Origin.
        cVersion.OwnerId = userinfo.getUserId();//Owner of the file
        cVersion.Title = fileName;//Name of the file
        cVersion.VersionData = EncodingUtil.base64Decode(base64Data);//File content
        Insert cVersion;
 
        /*Attachment oAttachment = new Attachment();
        oAttachment.parentId = parentId;
 
        oAttachment.Body = EncodingUtil.base64Decode(base64Data);
        oAttachment.Name = fileName;
        oAttachment.ContentType = contentType;
 
        insert oAttachment;*/
 
        return cVersion.Id;
    }
 
    public static void appendToFile(Id fileId, String base64Data) {
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
 
        ContentVersion a = [
            SELECT Id, versionData
            FROM ContentVersion
            WHERE Id =: fileId
        ];
 
        String existingBody = EncodingUtil.base64Encode(a.versionData);
 
        a.versionData = EncodingUtil.base64Decode(existingBody + base64Data);
 
        update a;
    }
    
}