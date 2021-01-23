({
    doInit : function(component, event, helper)  {
        var action = component.get('c.getRecordTypes');
        
        action.setCallback(this,function(response){
            var state = response.getState();
            console.log(state);
            if(state === "SUCCESS"){
                var responseValue = response.getReturnValue();
                component.set('v.options',JSON.parse(response.getReturnValue()).lstRecordtypes);
                component.set('v.Statusoptions',JSON.parse(response.getReturnValue()).lstStatus);
                component.set('v.Originoptions',JSON.parse(response.getReturnValue()).lstOrigins);
                component.set('v.PriorityOptions',JSON.parse(response.getReturnValue()).lstPriorities);
                component.set('v.TypesOption',JSON.parse(response.getReturnValue()).lsttypes);
                component.set('v.selectedLookUpRecord',JSON.parse(response.getReturnValue()).Acct);
                component.set('v.selectedContactLookUpRecord',JSON.parse(response.getReturnValue()).Cont);
                component.set('v.ICPYearOptions',JSON.parse(response.getReturnValue()).lstICPYears);
                component.set('v.loggedInAccountName',JSON.parse(response.getReturnValue()).AcctName);
                component.set('v.loggedInContactName',JSON.parse(response.getReturnValue()).ContName);
            }
        });
        $A.enqueueAction(action);
        /*var cCase ;
        cCase.subject ='test Subject';*/
    },
    openModel: function(component, event, helper) {
        // Set isModalOpen attribute to true
        component.set("v.isCaseModalOpen", true);
    },
    
    
    closeModel: function(component, event, helper) {
        // Set isModalOpen attribute to true
        component.set("v.isRecordTypeModalOpen", false);
        var navEvent = $A.get("e.force:navigateToList");
            navEvent.setParams({
                "listViewName": "Recently Viewed",
                "scope": "Case"
            });
            navEvent.fire();
    },
    closeCaseModel: function(component, event, helper) {
        // Set isModalOpen attribute to true
        component.set("v.isCaseModalOpen", false);
        var navEvent = $A.get("e.force:navigateToList");
            navEvent.setParams({
                "listViewName": "Recently Viewed",
                "scope": "Case"
            });
            navEvent.fire();
    },
    typeChange: function(component, event, helper) {
    	component.set("v.TypeSelected", true);
        component.set("v.IsTypeNotFilled", false);
        if(component.get("v.selectedType") === 'Complaint'){
         	component.set("v.TypeDescription","Complaint Description");   
        }
        if(component.get("v.selectedType") === 'Question'){
         	component.set("v.TypeDescription","Question Description");   
        }
        if(component.get("v.selectedType") === 'Suggestion'){
         	component.set("v.TypeDescription","Suggestion Description");   
        }
        if(component.get("v.selectedType") === ''){
         	component.set("v.TypeSelected", false);  
            component.set("v.IsTypeNotFilled", true);
        }
    },
    
    handleSubmit: function(component, event, helper) {
        // Set isModalOpen attribute to false  
        component.set("v.isModalOpen", false);
    },
    
    clickNext: function(component, event, helper) {
        
        // Set isModalOpen attribute to false
        //Add your code to call apex method or do some processing
        component.set("v.isRecordTypeModalOpen", false);
        component.set("v.isCaseModalOpen", true);
    },
   
    HideMe: function(component, event, helper) {
        component.set("v.ShowModule", false);
    },
    ShowModuleBox: function(component, event, helper) {
        component.set("v.ShowModule", true);
    },
    getCategory: function (component, event, helper) {
        
        var params = event.getSource().get("v.fieldValue");
        
        //var selectedvalue = params.fieldValue;
        //alert(params);
        component.set('v.selectedCategory', JSON.parse(JSON.stringify(event.getParams("v.fieldValue"))).fieldValue);
    },
    getSubCategory: function (component, event, helper) {
        

        component.set('v.selectedSubCategory', JSON.parse(JSON.stringify(event.getParams("v.fieldValue"))).fieldValue);
    },
    onSubjectChange: function(component, event, helper) {
        if(component.get('v.CaseSubject')!= ''){
        	component.set('v.IsSubjectNotFilled',false);    
        } else{
            component.set('v.IsSubjectNotFilled',true);
        }
       
    },
    onDescriptionChange: function(component, event, helper) {
        if(component.get('v.CaseDescription')!= ''){
        	component.set('v.IsDescriptionNotFilled',false);    
        } else{
            component.set('v.IsDescriptionNotFilled',true);
        }
      // component.set('v.IsDescriptionFilled',true);
    },
    Save: function (component, event, helper) {
        component.set('v.IsSpinner',true);
        var conObj = {
            sobjectType: 'Case',
            Subject: component.get('v.CaseSubject'),
			Description : component.get('v.CaseDescription'),
            AccountId : JSON.parse(JSON.stringify(component.get('v.selectedLookUpRecord'))).Id,
            ContactId : JSON.parse(JSON.stringify(component.get('v.selectedContactLookUpRecord'))).Id,
            status : component.get('v.selectedStatus'),
            Priority : component.get('v.selectedPriority'),
            Origin : component.get('v.selectedOrigin'),
            ICP_Year__c : component.get('v.selectedICPYear'),
            Type : component.get('v.selectedType'),
            Category__c : component.get('v.selectedCategory'),
            //Subcategory__c : component.get('v.selectedSubCategory'),
         //   RecordType : component.get('v.selectedvalue')
        }
        
        component.set('v.cCase',conObj);
        /*cs.Subject = component.get('v.CaseSubject');
        cs.Description = component.get('v.CaseDescription');
        cs.AccountId = JSON.parse(JSON.stringify(component.get('v.selectedLookUpRecord'))).Id;
        cs.ContactId = component.get('v.CaseSubject');
        cs.status = component.get('v.selectedStatus');
        cs.Priority = component.get('v.selectedPriority');
        cs.Origin = component.get('v.selectedOrigin');
        cs.ICP_Year__c = component.get('v.selectedICPYear');
        cs.Type = component.get('v.selectedType');
        cs.Category__c = component.get('v.selectedCategory');
        cs.Subcategory__c = component.get('v.selectedSubCategory');
        cs.RecordType = component.get('v.selectedvalue');*/
        if(component.get('v.CaseSubject') ==='' || component.get('v.CaseDescription') ==='' || component.get('v.selectedType') ==='' ||component.get('v.selectedCategory') ==='' || component.get('v.selectedCategory') === undefined ){
            if(component.get('v.CaseSubject') ===''){
            	component.set('v.IsSubjectNotFilled',true);	    
            }
            if(component.get('v.CaseDescription') ===''){
            	component.set('v.IsDescriptionNotFilled',true);	    
            }
            if(component.get('v.selectedType') ===''){
            	component.set('v.IsTypeNotFilled',true);	    
            }
            if(component.get('v.selectedCategory') ==='' || component.get('v.selectedCategory') === undefined){
            	var childCmp = component.find("cComp")
 				childCmp.CategoryValidation();	    
            }
            
        
        } else{
        var action = component.get('c.CreateCase');
        action.setParams({
            "CaseObj" : JSON.stringify(component.get('v.cCase')),
            "RecordType" : component.get('v.selectedvalue')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            console.log(state);
            if(state === "SUCCESS"){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "type":"success",
                    "message": "The record has been updated successfully."
                });
                toastEvent.fire();
                component.set('v.parentId',response.getReturnValue());
                if (component.find("fileId").get("v.files")!=null) {
                	helper.uploadHelper(component, event);
                } else{
                   var navEvt = $A.get("e.force:navigateToSObject");
                navEvt.setParams({
                    "recordId": response.getReturnValue() ,
                    "slideDevName": "Detail"
                });
                navEvt.fire(); 
                }
               /* var navEvt = $A.get("e.force:navigateToSObject");
                navEvt.setParams({
                    "recordId": response.getReturnValue() ,
                    "slideDevName": "Detail"
                });
                navEvt.fire();*/
            }
        });
        $A.enqueueAction(action);
        }
    },
    handleFilesChange: function(component, event, helper) {
        var fileName = 'No File Selected..';
        if (event.getSource().get("v.files").length > 0) {
            fileName = event.getSource().get("v.files")[0]['name'];
        }
        component.set("v.fileName", fileName);
    },
    
})