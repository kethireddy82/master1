@isTest
public class NewCaseCreationControllerTest {
    
	static testMethod void NewCaseCreation_Method1() {
    	NewCaseCreationController.getRecordTypes();
        Case newcase = new case();
        newcase.subject ='Test';
        newcase.description = 'Test Description';
        string ccase = JSON.serialize(newcase);
        //
        string caseid = NewCaseCreationController.CreateCase(ccase,'Vol ED Unrestricted Access');
        system.debug(caseid);
        case cs = [select id from case where id=:caseid];
        NewCaseCreationController.saveTheFile(cs.id,'string','string','string');
        //NewCaseCreationController.saveChunk('','string','string','string','string');
        string base64Data = '221232344';
        string fileName = 'filename';
         base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        ContentVersion cVersion = new ContentVersion();
        cVersion.ContentLocation = 'S'; //S-Document is in Salesforce. E-Document is outside of Salesforce. L-Document is on a Social Netork.
        cVersion.PathOnClient = fileName;//File name with extention
        cVersion.Origin = 'C';//C-Content Origin. H-Chatter Origin.
        cVersion.OwnerId = userinfo.getUserId();//Owner of the file
        cVersion.Title = fileName;//Name of the file
        cVersion.VersionData = EncodingUtil.base64Decode(base64Data);//File content
        Insert cVersion;
         NewCaseCreationController.appendToFile(cVersion.id,base64Data);
    }
    static testMethod void Dependentpicklist() {
        //Global Describe Map.
Map<String, Schema.SObjectType> globalDescMap=Schema.getGlobalDescribe();

//Get the sObjectType. This is used for creating sObject.
        Schema.SObjectType targetType=globalDescMap.get('Case');

//Create new sObject.
sObject sObj=targetType.newSObject();
        dependentPicklist_UpdateCtrl.getDependentMap(sobj,'Category__c','Subcategory__c');
        
    }
    static testMethod void voledViewCase() {
        Case newcase = new case();
        newcase.subject ='Test';
        newcase.description = 'Test Description';
        string ccase = JSON.serialize(newcase);
        //
        string caseid = NewCaseCreationController.CreateCase(ccase,'Vol ED Unrestricted Access');
        CaseViewController.CaseInfo(caseid);
    }
}