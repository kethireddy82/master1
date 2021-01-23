@isTest
private class Feed_PDFGenerator_TestClass {
    @testSetup 
    static void setup() {
        Account testAccount = new Account(name='Test Company Name');
        insert testAccount;
        Contact con = new Contact(LastName = 'Test',firstname='Test1',email='test@test.com',accountid=testAccount.id);
        insert con;
        Case testCase = new Case(Subject='Test Controller Acct Case',Status='New',
        Category__c = 'General',Accountid = testAccount.id,contactid = con.id,
        SuppliedName ='Test12',SuppliedEmail='test123@ttt.com');
        insert testCase; 
        
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
        User u = new User(Alias = 'stdt12', Email='standarduser@testorg.com', 
        EmailEncodingKey='UTF-8', LastName='Testing12345', LanguageLocaleKey='en_US', 
        LocaleSidKey='en_US', ProfileId = p.Id, 
        TimeZoneSidKey='America/Los_Angeles', UserName='standarduser111222@testorg.com');

        System.runAs(u) {
            Case testCase1 = new Case(Subject='Test Controller Acct Case',Status='New',
            Category__c = 'General',Accountid = testAccount.id,contactid = con.id,
            SuppliedName ='Test123',SuppliedEmail='test123@ttt11.com');
            insert testCase1; 
        }
      
        CaseComment csecmt = new CaseComment();
        csecmt.CommentBody = 'Test Comment';
        csecmt.ParentId = testCase.Id;
        insert csecmt;
        Task tsk = new Task();
        tsk.OwnerId = UserInfo.getUserId();
        tsk.Subject='Donni';
        tsk.Status='Not Started';
        tsk.Priority='Normal';
        tsk.TaskSubtype = 'Call';
        tsk.WhoId = con.Id;
        insert tsk;
        
        Task tsk2 = new Task();
        tsk2.OwnerId = UserInfo.getUserId();
        tsk2.Subject='Hello';
        tsk2.Status='Not Started';
        tsk2.Priority='Normal';
        tsk2.TaskSubtype = 'Task';
        tsk.WhoId = con.Id;
        insert tsk2;
        
        Task tsk3 = new Task();
        tsk3.OwnerId = UserInfo.getUserId();
        tsk3.Subject='List: Hello123';
        tsk3.Status='Not Started';
        tsk3.Priority='Normal';
        tsk3.TaskSubtype = 'ListEmail';
        tsk3.WhoId = con.Id;
        insert tsk3;
        
        Event Evt = new Event();
        Evt.Type = 'Email';
        Evt.OwnerId = UserInfo.getUserId();
        Evt.Description = 'Helloo'; //string
        Evt.WhoId = con.Id; //user id
        Evt.WhatId = testCase.Id;
        Evt.StartDateTime=system.today();
        Evt.EndDateTime=system.today()+5;
        insert Evt;
        
        //Insert emailmessage for case
        EmailMessage email = new EmailMessage();
        email.FromAddress = 'test@abc.org';
        email.Incoming = True;
        email.ToAddress= 'test@xyz.org';
        email.Subject = 'Test email';
        email.HtmlBody = 'Test email body';
        email.relatedToId = testCase.Id; 
        insert email;
        
        string emailCCAddress = 'kethireddy82@gmail.com';
        String[] lstStr = new String[]{};
            //lstStr.add(emailCCAddress);
            ListEmail lstEmail = new ListEmail();
        lstEmail.Name = 'Test';
        lstEmail.FromName = 'Test1 Test';
        lstEmail.FromAddress = 'kethireddy82@gmail.com';
        lstEmail.Subject = 'Hello123';
        lstEmail.HtmlBody = 'Test email body';
        lstEmail.Status = 'draft';
        //insert lstEmail;
        
        ContentVersion contentVersion = new ContentVersion(
          Title = 'Penguins',
          PathOnClient = 'Penguins.jpg',
          VersionData = Blob.valueOf('Test Content'),
          IsMajorVersion = true
        );
        insert contentVersion;    
        List<ContentDocument> documents = [SELECT Id, Title, LatestPublishedVersionId FROM ContentDocument];
        
        //create ContentDocumentLink  record 
        ContentDocumentLink cdl = New ContentDocumentLink();
        cdl.LinkedEntityId = testAccount.id;
        cdl.ContentDocumentId = documents[0].Id;
        cdl.shareType = 'V';
        insert cdl;
        
        Attachment attach=new Attachment(); 
        attach.Name='Unit Test Attachment'; 
        Blob bodyBlob=Blob.valueOf('Unit Test Attachment Body'); 
        attach.body=bodyBlob; attach.parentId=testAccount.id;
        insert attach;
 
    }
    static testMethod void Feed_PDFGenerator_Method() {
        Case testCase = [SELECT Id,CaseNumber FROM Case LIMIT 1];
        
        Test.StartTest(); 
        ApexPages.currentPage().getParameters().put('id', String.valueOf(testCase.Id));
        ApexPages.StandardController sc = new ApexPages.StandardController(testCase);
        Feed_PDFGenerator  testPDF = new Feed_PDFGenerator(sc);
        Test.StopTest();
    }
    static testMethod void Feed_PDFGenerator_Method2() {
        Account testaccount = [SELECT Id,Name FROM Account LIMIT 1];
        Case testCase = [SELECT Id,CaseNumber FROM Case LIMIT 1];
        
        Test.StartTest(); 
        ApexPages.currentPage().getParameters().put('parentId', String.valueOf(testaccount.Id));
        ApexPages.currentPage().getParameters().put('feedtype', 'All Feeds');
        ApexPages.currentPage().getParameters().put('sd', string.valueof(date.today()));
        ApexPages.currentPage().getParameters().put('ed', string.valueof(date.today()+20));
        ApexPages.StandardController sc = new ApexPages.StandardController(testCase);
        ApexPages.currentPage().getParameters().put('parentId', String.valueOf(testaccount.Id));
        Feed_PDFGenerator  testPDF = new Feed_PDFGenerator(sc);
        testPDF.getAllFeedItem(null,testaccount.Id,'All Feeds');
        Test.StopTest();
    }
    static testMethod void Feed_PDFGenerator_Method3() {
        Contact con = [SELECT Id,Name,Email FROM Contact LIMIT 1];
        Case testCase = [SELECT Id,CaseNumber FROM Case LIMIT 1];
        
        Test.StartTest(); 
        ApexPages.currentPage().getParameters().put('parentId', String.valueOf(con.Id));
        ApexPages.currentPage().getParameters().put('feedtype', 'Call Logs');
        ApexPages.StandardController sc = new ApexPages.StandardController(testCase);
        Feed_PDFGenerator  testPDF = new Feed_PDFGenerator(sc);
            try{
        testPDF.getAllFeedItem(null,con.Id,'Call Logs');
        
        //QuickContactController.saveContactWithAccount(con);
        //QuickContactController.getContactDetails(testCase.Id);
        //QuickContactController.fetchLookUpValues('Test','Account');
        //Feed_PDFGenerator.getCaseCount('Test','Account');
        //Feed_PDFGenerator.getCaseCount('Test','Contact');
        
            }catch(exception ex){}
        Test.StopTest();
    } 
    static testMethod void Feed_PDFGenerator_Method4() {
        Contact con = [SELECT Id,Name FROM Contact LIMIT 1];
        Case testCase = [SELECT Id,CaseNumber FROM Case LIMIT 1];
        
        Test.StartTest(); 
        ApexPages.currentPage().getParameters().put('parentId', String.valueOf(con.Id));
        ApexPages.currentPage().getParameters().put('feedtype', 'Task');
        ApexPages.StandardController sc = new ApexPages.StandardController(testCase);
        Feed_PDFGenerator  testPDF = new Feed_PDFGenerator(sc);
        testPDF.getAllFeedItem(null,con.Id,'Task');
        Test.StopTest();
    }
}