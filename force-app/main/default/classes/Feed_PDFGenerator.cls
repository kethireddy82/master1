global class Feed_PDFGenerator{
    public Case cse{get;set;}
    public date startDate;
    public date endDate;
    public Map<string,string> myMap;
    public List<wrapperFeedItem> wrapMainList{get;set;}
    public wrapperFeedItem wrapMain{get;set;}
    public Feed_PDFGenerator(ApexPages.StandardController stdController) {
        this.cse = (Case)stdController.getRecord();
        wrapMainList = new List<wrapperFeedItem>();
        string parentId = apexpages.currentpage().getparameters().get('parentId');
        string feedtype = apexpages.currentpage().getparameters().get('feedtype');
        string sDate = apexpages.currentpage().getparameters().get('sd');
        string eDate = apexpages.currentpage().getparameters().get('ed');
        if(sDate != null)
            startDate = date.valueof(sDate);
        if(eDate != null)
            endDate = date.valueof(eDate);
        system.debug(parentId +'=='+feedtype+'==='+startDate+'==='+endDate);
        system.debug(cse.Id+'==');
        if(parentId != null && parentId != '')
            wrapMainList = getAllFeedItem(cse.Id,parentId,feedtype);
        else
            wrapMainList = getAllFeedItem(cse.Id,parentId,'All Feeds');
        
        system.debug(cse.CaseNumber+'===wrapMainList==='+wrapMainList);
        wrapMainList.sort ();
    }
    public List<wrapperFeedItem> getAllFeedItem(string cseId,string parentId,string feedtype){
        set<Id> caseId = new set<Id>();
        String objectName = '';
        Set<string> emailListRelated = new Set<string>();
        
        if(cseId != null && cseId != ''){
            List<Case> cseNumber = new List<Case>([Select Id,CaseNumber From Case where Id =: cseId limit 1]);
            caseId.add(cseId);
            if(cseNumber.size() > 0 && cseNumber[0].CaseNumber != null){
                myMap = new Map<string,string>();
                myMap.put(cseId, cseNumber[0].CaseNumber);
            }
        }
        else if(parentId != null && parentId != ''){
            string queryStr = 'Select Id,CaseNumber,AccountId,ContactId From Case Where ';
            myMap = new Map<string,string>();
            String myIdPrefix = String.valueOf(parentId).substring(0,3);
            Map<String, Schema.SObjectType> gd =  Schema.getGlobalDescribe(); 
            for(Schema.SObjectType stype : gd.values()){
                Schema.DescribeSObjectResult r = stype.getDescribe();
                String prefix = r.getKeyPrefix();
                if(prefix!=null && prefix.equals(myIdPrefix)){
                    objectName = r.getName();
                    System.debug('Object Name! ' + objectName);
                    break;
                }
            }
            if(objectName == 'Account'){
                queryStr += 'AccountId =: parentId';
                List<Account> acc = new List<Account>([Select Id,Name from Account Where Id=: parentId]);
                List<Contact> cont = new List<Contact>([Select Id,Name,Email,AccountId from Contact Where AccountId =: acc[0].Id]);
                for(Contact con : cont){
                    myMap.put(con.Id, con.Name);
                    emailListRelated.add(con.Email);
                }
                myMap.put(acc[0].Id, acc[0].Name);
            }
            else if(objectName == 'Contact'){
                queryStr += 'ContactId =: parentId';
                List<Contact> cont = new List<Contact>([Select Id,Name,AccountId,Email from Contact Where Id =: parentId]);
                List<Account> acc2 = new List<Account>([Select Id,Name from Account Where Id =: cont[0].AccountId]);
                if(cont.size() > 0){
                    myMap.put(cont[0].Id, cont[0].Name);
                    emailListRelated.add(cont[0].Email);
                }
                if(acc2.size() > 0)
                    myMap.put(acc2[0].Id, acc2[0].Name);
            }
            List<Case> lstCase = new List<Case>();
            lstCase = Database.query(queryStr);
            if(lstCase.size() > 0){
                for(Case cs : lstCase){
                    caseId.add(cs.Id);
                    myMap.put(cs.Id, cs.CaseNumber);
                }
            }
        }
        system.debug(feedtype+'===myMap==='+myMap);
        List<wrapperFeedItem> tempwrapMainList = new List<wrapperFeedItem>();
        List<wrapperFeedItem> updatedWrapMainList = new List<wrapperFeedItem>();
        
        //Code Attachment Communication
        if(feedtype == 'All Feeds' || feedtype == 'Attachments'){
            List<string> newSet = new List<string>();
            for(Id tempId : myMap.keySet())
                newSet.add(tempId);
            //Get the Attachment of List Email
            List<EmailMessage> emailMessAttach = new List<EmailMessage>();
            List<EmailMessage> emailMessAttachChild = new List<EmailMessage>();//Get emailMessage for the case only
            List<EmailMessage> emailMessAttachExist = new List<EmailMessage>();//Get emailMessage for the Contact/Account
            Set<Id> emailId = new Set<Id>();
            Set<Id> emailIdChild = new Set<Id>();
            Map<Id,EmailMessage> LinkedEntityDatetime = new Map<Id,EmailMessage>();
            emailMessAttachExist = [SELECT Id, ParentId, CreatedBy.Name, CreatedDate, HasAttachment, RelatedToId,
                                    FromName, FromAddress, ToAddress, CcAddress, BccAddress
                                    FROM EmailMessage where relatedToId =: null AND HasAttachment =: true ];
            emailMessAttachChild = [SELECT Id, ParentId, CreatedBy.Name, CreatedDate, HasAttachment, RelatedToId,
                                    FromName, FromAddress, ToAddress, CcAddress, BccAddress
                                    FROM EmailMessage where relatedToId =: myMap.keyset() AND HasAttachment =: true ];
            system.debug(emailMessAttachExist.size() + '====emailMessAttachExist===='+emailMessAttachExist);
            system.debug(emailMessAttachChild.size() + '====emailMessAttachChild===='+emailMessAttachChild);
            for(EmailMessage tempEMAttach : emailMessAttachChild ){
                emailIdChild.add(string.valueof(tempEMAttach.Id));
                LinkedEntityDatetime.put(tempEMAttach.Id,tempEMAttach);
            }
            system.debug(emailIdChild.size() + '====emailIdChild===='+emailIdChild);
            //If relatedTo is not assign using below loop to match with email addres
            for(EmailMessage tempEMAttach : emailMessAttachExist){
                //Code to check Email addtess of ToAddress
                List<String> lstAlpha = tempEMAttach.ToAddress.split(';');
                Set<string> strTemp = new Set<string>();
                strTemp.addAll(lstAlpha );
                for(string objId: strTemp){
                    if(emailListRelated.contains(objId) ){
                        emailId.add(string.valueof(tempEMAttach.Id));
                        LinkedEntityDatetime.put(tempEMAttach.Id,tempEMAttach);   
                    }
                }
            }
            system.debug(LinkedEntityDatetime.size() + '====LinkedEntityDatetime===='+LinkedEntityDatetime);
            system.debug(emailId.size() + '====emailId===='+emailId);
            //End
            //Fetch the attachment related to Object and email message
            List<Attachment> lstAttach = new List<Attachment>([SELECT Id,createdDate, CreatedBy.Name,ParentId, Name,Parent.Name, ContentType, BodyLength, Body 
                                                               FROM Attachment Where ParentId =: myMap.keyset() OR ParentId =: emailId OR ParentId =: emailIdChild]);            
            system.debug(lstAttach + '====lstAttach====');
            
            //Fetch the Content related to Object and email message
            List<ContentDocumentLink> lstCDocLink = new List<ContentDocumentLink>([SELECT ContentDocumentID, ContentDocument.CreatedDate,ContentDocument.Title,  
                                                                                   ContentDocument.CreatedBy.Name, LinkedEntity.type, LinkedEntity.Name FROM ContentDocumentLink 
                                                                                   WHERE LinkedEntityId IN: newSet OR LinkedEntityId IN: emailId OR LinkedEntityId IN: emailIdChild ]);
            system.debug(lstCDocLink.size() + '====lstCDocLink===='+lstCDocLink);
            
            if(lstCDocLink.size() > 0){
                for(ContentDocumentLink CVDocLink : lstCDocLink){
                    wrapMain = new wrapperFeedItem();
                    if(LinkedEntityDatetime.containskey(CVDocLink.LinkedEntity.Id))
                        wrapMain.createdDate = LinkedEntityDatetime.get(CVDocLink.LinkedEntity.Id).CreatedDate;
                    else
                        wrapMain.createdDate = CVDocLink.ContentDocument.createdDate;
                    wrapMain.createdByUser = CVDocLink.ContentDocument.CreatedBy.Name;
                    wrapMain.typeFeed = 'Attachments';
                    lstAttachWrap temp1 = new lstAttachWrap();
                    temp1.nameAttach = CVDocLink.ContentDocument.Title;
                    temp1.attachLink = CVDocLink.ContentDocument.Id;
                    
                    if(LinkedEntityDatetime.containskey(CVDocLink.LinkedEntity.Id)){
                        //Code to show the Email in relatedTo
                        string ToAddressStr = LinkedEntityDatetime.get(CVDocLink.LinkedEntity.Id).ToAddress;
                        List<String> lstAlpha = ToAddressStr.split(';');
                        Set<string> strTemp = new Set<string>();
                        string emailIdRelatedTo;
                        strTemp.addAll(lstAlpha );
                        for(string objId: strTemp){
                            if(emailListRelated.contains(objId) ){
                                emailIdRelatedTo = string.valueof(objId); 
                            }
                        }
                        temp1.relatedTo = emailIdRelatedTo;
                    }
                    else{
                    temp1.relatedTo = CVDocLink.LinkedEntity.Name;
                    }
                    wrapMain.lstAttachWraps = temp1;
                    tempwrapMainList.add(wrapMain);
                }
            }
            if(lstAttach.size() > 0){
                for(Attachment attach : lstAttach){
                    wrapMain = new wrapperFeedItem();
                    wrapMain.createdDate = attach.createdDate;
                    wrapMain.createdByUser = attach.CreatedBy.Name;
                    wrapMain.typeFeed = 'Attachments';
                    lstAttachWrap temp1 = new lstAttachWrap();
                    temp1.nameAttach = attach.Name;
                    temp1.attachLink = attach.Id;
                    temp1.relatedTo = attach.Parent.Name;
                    wrapMain.lstAttachWraps = temp1;
                    tempwrapMainList.add(wrapMain);
                }
            }
            
        }
        //Code for ListEmail Message  
        if(feedtype == 'All Feeds' || feedtype == 'ListEmail Message'){
            set<ID> lstEmailTaskIds = new set<ID>();
            Map<Id,Task> lstEmailTaskMap = new Map<Id,Task>();
            List<Task> lstEmailTask  = new List<Task>([SELECT Id, WhoId,Who.Name,CreatedBy.Name,Account.Name, WhatId, Subject, ActivityDate, Status, 
                                                       Priority, Description, CreatedDate, CallType, CallObject,TaskSubtype FROM Task
                                                       where ((AccountId =: myMap.keyset() OR WhoId =: myMap.keyset()) AND TaskSubtype =: 'ListEmail')]);
            
            system.debug(lstEmailTask +'===lstEmailTask===='); 
            if(lstEmailTask.size() > 0){
                for(Task temp : lstEmailTask  ){
                    lstEmailTaskIds.add(temp.WhatId);
                    lstEmailTaskMap.put(temp.WhatId,temp);
                }
            }  
            system.debug(lstEmailTaskIds +'===lstEmailTaskIds===='); 
            
            List<ListEmail> lstemailMess = new List<ListEmail>([SELECT Id, Name, Subject, HtmlBody,CreatedBy.Name, TextBody, 
                                                                FromName, Status,CreatedDate FROM ListEmail WHERE Id=: lstEmailTaskIds]);          
            //system.debug(lstemailMess +'===lstemailMess ===='); 
            if(lstemailMess.size() > 0){
                for(ListEmail temp : lstemailMess){
                    wrapMain = new wrapperFeedItem();
                    wrapMain.createdDate = temp.createdDate;
                    wrapMain.createdByUser = temp.CreatedBy.Name;
                    wrapMain.typeFeed = 'ListEmail Message';
                    lstListEmailMessage temp1 = new lstListEmailMessage();
                    temp1.FromName = temp.FromName;
                    //temp1.ToAddress = temp.ToAddress;
                    temp1.MessageDate = temp.CreatedDate;
                    temp1.Subject = temp.Subject;
                    if(temp.HTMLBody != null)
                        temp1.HTMLBody = temp.HTMLBody;
                    else if(temp.HTMLBody == null)
                        temp1.HTMLBody = temp.TextBody;
                    if(lstEmailTaskMap.get(temp.Id).Who.Name != null)
                        temp1.relatedTo = lstEmailTaskMap.get(temp.Id).Who.Name;
                    if(lstEmailTaskMap.get(temp.Id).Account.Name != null)
                        temp1.AccountName = lstEmailTaskMap.get(temp.Id).Account.Name;
                    wrapMain.lstListEmailMessages = temp1;
                    tempwrapMainList.add(wrapMain);
                }
            }
        }
        
        if(feedtype == 'All Feeds' || feedtype == 'Email Message'){
            //Code for Email Message
            List<EmailMessage> emailMess = new List<EmailMessage>();
            emailMess = [SELECT Id, ParentId, CreatedBy.Name, CreatedDate, TextBody, HtmlBody, 
                         Subject, HasAttachment, Status, MessageDate, RelatedToId,
                         FromName, FromAddress, ToAddress, CcAddress, BccAddress
                         FROM EmailMessage where relatedToId =: myMap.keyset() OR ToAddress Like : emailListRelated
                         ORDER BY CreatedDate DESC];
            system.debug(emailMess.size()+'===emailMess ==='+emailMess );
            if(emailMess.size() > 0){
                for(EmailMessage temp : emailMess){
                    wrapMain = new wrapperFeedItem();
                    wrapMain.createdDate = temp.createdDate;
                    wrapMain.createdByUser = temp.CreatedBy.Name;
                    wrapMain.typeFeed = 'Email Message Event';
                    lstEmailMessage temp1 = new lstEmailMessage();
                    temp1.FromName = temp.FromName;
                    temp1.ToAddress = temp.ToAddress;
                    //Code to show the Email in relatedTo
                    string ToAddressStr = temp.ToAddress;
                    List<String> lstAlpha = ToAddressStr.split(';');
                    Set<string> strTemp = new Set<string>();
                    string emailIdRelatedTo = '';
                    strTemp.addAll(lstAlpha );
                    for(string objId: strTemp){
                        if(emailListRelated.contains(objId) ){
                            emailIdRelatedTo = string.valueof(objId); 
                        }
                    }
                    if(temp.RelatedToId != null)                    
                    temp1.CseNumber = myMap.get(temp.RelatedToId);
                    else                    
                    temp1.CseNumber = emailIdRelatedTo;
                    temp1.MessageDate = temp.MessageDate;
                    temp1.Subject = temp.Subject;
                    if(temp.HTMLBody != null)
                        temp1.HTMLBody = temp.HTMLBody;
                    else if(temp.HTMLBody == null)
                        temp1.HTMLBody = temp.TextBody;
                    
                    wrapMain.lstEmailMessages = temp1;
                    tempwrapMainList.add(wrapMain);
                }
            }
        }
        //Code for Case Comment
        if(feedtype == 'All Feeds' || feedtype == 'Case Comments'){
            List<CaseComment> listCaseComm = new List<CaseComment>();
            listCaseComm = [SELECT Id, ParentId, IsPublished, CommentBody, CreatedBy.Name, CreatedDate, IsDeleted 
                            FROM CaseComment where ParentId =: myMap.keyset()];
            if(listCaseComm.size() > 0){
                for(CaseComment temp : listCaseComm){
                    wrapMain = new wrapperFeedItem();
                    wrapMain.createdDate = temp.createdDate;
                    wrapMain.createdByUser = temp.CreatedBy.Name;
                    wrapMain.typeFeed = 'Case Comment Post';
                    lstCaseComment temp1 = new lstCaseComment();
                    temp1.cseComment = temp.CommentBody;
                    temp1.cseUser = temp.CreatedBy.Name;
                    wrapMain.lstCaseComments = temp1;
                    tempwrapMainList.add(wrapMain);
                }
            }
        }
        
        //Code for Task and call log
        if(feedtype == 'All Feeds' || feedtype == 'Call Logs' || feedtype == 'Task'){
            List<Task> listTask = new List<Task>();
            if(feedtype == 'All Feeds')
                listTask = [SELECT Id, WhoId,Who.Name,CreatedBy.Name, WhatId, What.Name,Subject, ActivityDate, Status, Priority, Description, CreatedDate, CallType, CallObject, 
                            TaskSubtype FROM Task where ((WhatId =: myMap.keyset() OR WhoId =: myMap.keyset()) AND (TaskSubtype =: 'Call' OR TaskSubtype =: 'Task' ))];
            if(feedtype == 'Call Logs')
                listTask = [SELECT Id, WhoId,Who.Name,CreatedBy.Name, WhatId,What.Name, Subject, ActivityDate, Status, Priority, Description, CreatedDate, CallType, CallObject, 
                            TaskSubtype FROM Task where ((WhatId =: myMap.keyset() OR WhoId =: myMap.keyset()) AND TaskSubtype =: 'Call')];
            if(feedtype == 'Task')
                listTask = [SELECT Id, WhoId,Who.Name,CreatedBy.Name, WhatId,What.Name, Subject, ActivityDate, Status, Priority, Description, CreatedDate, CallType, CallObject, 
                            TaskSubtype FROM Task where ((WhatId =: myMap.keyset() OR WhoId =: myMap.keyset()) AND TaskSubtype =: 'Task' )];
            set<Id> taskIds = new set<Id>();
            if(listTask.size() > 0){
                for(Task temp : listTask){
                    if(temp.TaskSubtype == 'Call')
                        taskIds.add(temp.Id);
                }
            }
            system.debug('===@@@listTask@@@====='+listTask);
            List<FeedComment> lstFeedComment = new List<FeedComment>();
            Map<Id,List<FeedComment>> mapFeedComment = new Map<Id,List<FeedComment>>();
            for(FeedComment fd : [SELECT Id, FeedItemId, ParentId, InsertedBy.Name,CreatedDate, CommentBody, CommentType, RelatedRecordId, Status 
                                  FROM FeedComment WHERE ParentId IN : taskIds] 
               ){
                   if(mapFeedComment.containsKey(fd.ParentId)) {
                       List<FeedComment> commId = mapFeedComment.get(fd.ParentId);
                       commId.add(fd);
                       mapFeedComment.put(fd.ParentId, commId);
                   } else {
                       mapFeedComment.put(fd.ParentId, new List<FeedComment> { fd });
                   } 
               }
            if(listTask.size() > 0){
                for(Task temp : listTask){
                    wrapMain = new wrapperFeedItem();
                    wrapMain.createdDate = temp.createdDate;
                    wrapMain.createdByUser = temp.CreatedBy.Name;
                    if(temp.TaskSubtype == 'Call' )
                        wrapMain.typeFeed = 'Case Log';
                    else
                        wrapMain.typeFeed = 'Case Task';
                    lstCaseTask temp1 = new lstCaseTask();
                    temp1.subjectTask = temp.Subject;
                    temp1.nameTask = temp.Who.Name;
                    if(temp.What.Name != null)
                        temp1.relatedTask = temp.What.Name;
                    temp1.DescriptionTask = temp.Description;
                    if(temp.TaskSubtype == 'Call' ){
                        if(mapFeedComment.containsKey(temp.Id)){
                            for(FeedComment fc : mapFeedComment.get(temp.Id)){
                                temp1.commentsTask.add(fc);
                            }
                        }
                    }
                    wrapMain.lstCaseTasks = temp1;
                    tempwrapMainList.add(wrapMain);
                }
            }
        }
        
        //Code for Event
        if(feedtype == 'All Feeds' || feedtype == 'Events'){
            List<Event> listEvent = new List<Event>();
            listEvent = [SELECT Id, WhoId,Who.Name, WhatId,What.Name, Subject,CreatedBy.Name , ActivityDate, Location, StartDateTime, EndDateTime, Description, Type, CreatedDate, CreatedById 
                         FROM Event where (WhatId =: myMap.keyset() OR WhoId =: myMap.keyset()) ];
            if(listEvent.size() > 0){
                for(Event temp : listEvent){
                    wrapMain = new wrapperFeedItem();
                    wrapMain.createdDate = temp.createdDate;
                    wrapMain.createdByUser = temp.CreatedBy.Name;
                    wrapMain.typeFeed = 'Case Event';
                    lstCaseEvent temp1 = new lstCaseEvent();
                    temp1.nameEvt = temp.Who.Name;
                    if(temp.What.Name != null)
                        temp1.relatedEvt = temp.What.Name;
                    temp1.descriptionEvt = temp.Description;
                    temp1.SubjectEvt = temp.Subject;
                    temp1.locationEvt = temp.Location;
                    temp1.startTask = temp.StartDateTime;
                    temp1.endTask = temp.EndDateTime;
                    wrapMain.lstCaseEvents = temp1;
                    tempwrapMainList.add(wrapMain);
                }
            }
        }
        system.debug(tempwrapMainList+'============tempwrapMainList=============');
        if(startDate != null && endDate != null){
            for(wrapperFeedItem wrapItem : tempwrapMainList){
                system.debug(startDate +'==========' + endDate );
                DateTime dT = wrapItem.createdDate;
                Date myDate = date.newinstance(dT.year(), dT.month(), dT.day());
                system.debug(myDate+'==========');
                system.debug((startDate <= myDate) +'*********' );
                system.debug((endDate >= myDate )+'*********' );
                if(startDate <= myDate  && endDate >= myDate  )
                    updatedWrapMainList.add(wrapItem);
            }
        }
        else
            updatedWrapMainList.addAll(tempwrapMainList);
        system.debug(updatedWrapMainList+'============updatedWrapMainList=============');
        return updatedWrapMainList;
    }
    global class wrapperFeedItem implements Comparable {
        public string typeFeed{get;set;}
        public Datetime createdDate{get;set;}
        public string createdByUser{get;set;}
        public lstListEmailMessage lstListEmailMessages{get;set;}
        public lstEmailMessage lstEmailMessages{get;set;}
        public lstCaseComment lstCaseComments{get;set;}
        public lstCaseTask lstCaseTasks{get;set;}
        public lstCaseEvent lstCaseEvents{get;set;}
        public lstAttachWrap lstAttachWraps{get;set;}
        
        global Integer compareTo(Object compareTo) {
            wrapperFeedItem compareToOppy = (wrapperFeedItem)compareTo;
            Integer returnValue = 0;
            
            if (createdDate < compareToOppy.createdDate) {
                returnValue = 1;
            } else if (createdDate > compareToOppy.createdDate) {
                returnValue = -1;
            }
            return returnValue;       
        }
    }
    public class lstListEmailMessage {
        public String FromName{get;set;}
        public String ToAddress{get;set;}
        public datetime MessageDate{get;set;}
        public String Subject{get;set;}
        public String HTMLBody{get;set;}
        public String relatedTo{get;set;}
        public String AccountName{get;set;}
    }
    public class lstEmailMessage {
        public String FromName{get;set;}
        public String ToAddress{get;set;}
        public datetime MessageDate{get;set;}
        public String Subject{get;set;}
        public String HTMLBody{get;set;}
        public String CseNumber{get;set;}
        
    }
    public class lstCaseComment {
        public String cseComment{get;set;}
        public String cseUser{get;set;}
    }
    public class lstCaseTask {
        public String subjectTask{get;set;}
        public String nameTask{get;set;}
        public String relatedTask{get;set;}
        public String DescriptionTask{get;set;}
        public List<FeedComment> commentsTask{get;set;}
        public lstCaseTask(){
            if(commentsTask==null)commentsTask = new List<FeedComment>();
        }
    }
    public class lstCaseEvent {
        public String nameEvt {get;set;}
        public String relatedEvt {get;set;}
        public String descriptionEvt{get;set;}
        public String SubjectEvt{get;set;}
        public String locationEvt{get;set;}
        public datetime startTask{get;set;}
        public datetime endTask{get;set;}
    }
    public class lstAttachWrap {
        public String nameAttach {get;set;}
        public String attachLink {get;set;}
        public String relatedTo{get;set;}
    }
    @AuraEnabled
    public static List<Case> getCaseCount(string parentId,string objectType) { 
        System.debug(objectType+'aaaaa '+ parentId); 
        List<Case> lstCase = new List<Case>();
        if(parentId != null && parentId != '' && objectType == 'Account') {
            lstCase = [SELECT Id,CaseNumber,Status,Origin,CreatedDate,Subject from Case where AccountId= : parentId];
            return lstCase;
        }
        else if(parentId != null && parentId != '' && objectType == 'Contact'){ 
            lstCase = [SELECT Id,CaseNumber,Status,Origin,CreatedDate,Subject from Case where ContactId= : parentId];
            return lstCase;
        }
        else
            return null;
    } 
}