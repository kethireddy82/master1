@isTest
private class PF_EditTestCaseStepExtension_Test {
    Private Static testmethod void TestExtension(){     
    
      //Prepare project 
        PF_Project__c project = new PF_Project__c();
        project.Name = 'Project Test';       
        project.PF_Project_Status__c =  'In Progress';
        insert project;
        
        //Prepare Release
        PF_Release__c release = new PF_Release__c();
        release .Name = 'Release Test';       
        release.PF_Release_Status__c = 'In Progress';
        release.PF_Project__c = project.id;
        release.PF_Planned_Start_Date__c = Date.Today();
        release.PF_Planned_End_Date__c    = Date.Today().addDays(1);
        insert release;
        
        PF_Sprints__c sprint = new PF_Sprints__c();
        sprint.Name = 'sprint Test';
        sprint.PF_Sprint_Status__c = 'In Progress';
        sprint.PF_Release__c = release.Id;
        sprint.PF_Priority__c = 'High';
        sprint.PF_Number_Of_Resources__c= 2;
        sprint.PF_Planned_Start_Date__c = Date.Today();
        sprint.PF_Planned_End_Date__c    = Date.Today().addDays(1);
        insert sprint ;
        
        //Prepare for requirement
        PF_Stories__c story = new PF_Stories__c();
        story.PF_Story_Description__c = 'Requirement Test';
        //story.Source__c = 'Requirement Source';
        story.PF_Story_Status__c = 'New';
        story.PF_Sprint__c= sprint.Id;
        insert story ;
        
        //prepare for testcase
         PF_TestCases__c Testcase = new PF_TestCases__c();
         TestCase.PF_Story__c    =    story.Id;
         TestCase.PF_UAT__c      =    True;
         insert Testcase;      
    
    
    
    PF_Test_Case_Step__c newTCS = new PF_Test_Case_Step__c();  
    newTCS.PF_Step_Number__c = 1;            
    newTCS.PF_Step_Description__c = 'new TestCase Step';            
    newTCS.PF_Expected_Result__c = 'Passed';            
    newTCS.PF_Test_Case__c= Testcase.Id;    
    insert newTCS;            
    
    ApexPages.StandardController con = new ApexPages.StandardController(Testcase );
    PF_EditTestCaseStepExtension testExtension =  new PF_EditTestCaseStepExtension (con);
     
    testExtension.getTestCaseSteps();
    testExtension.getSelected()  ;
    testExtension.addtestcasestep();
    testExtension.updateTestCaseStep();
    testExtension.removeTestCaseStep() ;
    testExtension.zeroStepNumber();
    testExtension.duplicateStepNumber();
    
}
}