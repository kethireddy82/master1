({
    doInit : function(component, event, helper) {
        helper.getSurveyRecord(component);
        helper.getLastModifiedBy(component);        
    }, 
    backICP : function(component, event, helper) {
        component.set("v.showICP",true);  
        component.set("v.showAssessment",false);
    },
    backtohome: function(component, event, helper) {
        var address = '/';
            var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
                "url": address,
                "isredirect" :false
            });
            urlEvent.fire();
    },
    continueICP : function(component, event, helper) {
        var index = event.getSource().get("v.title");
        var assessmentList = component.get('v.objClassController').surveyList;
        var updateAssessment = [];
        for(var i in assessmentList){
            if(assessmentList[i].ICP__c == index)
                updateAssessment.push(assessmentList[i]);
        }
        component.set("v.assessmentList",updateAssessment);
        component.set("v.showICP",false);  
        component.set("v.showAssessment",true);
    },
    continueSurvey : function(component, event, helper) {        
        var index = event.getSource().get("v.title");
        component.set("v.surveyId",index);
        helper.getinitClass(component);
    }, 
    handleUploadFinished: function(component, event, helper) {
        var uploadedFiles = event.getParam("files");        
        var init = component.get("v.intiMethod");
        var currentStage = component.get("v.stage.id");
        if(event.getSource().getLocalId() == 'responseAttach'){
            for(var i in init){
                if(init[i].questionOrder == currentStage.substr(2) ){
                    for(var j in uploadedFiles){
                        var detailtemp = {};
                        detailtemp = {attachId:'',attachName:'',attachSize:'',attachType:''};
                        detailtemp.attachId = uploadedFiles[j].documentId;
                        detailtemp.attachName = uploadedFiles[j].name;
                        init[i].responseAttach.push(detailtemp);
                    }  
                }
            }   
            component.set("v.intiMethod",init);         
        }
        else if(event.getSource().getLocalId() == 'masterAttach'){
            for(var j in uploadedFiles){
                var detailtemp = {};
                detailtemp = {attachId:'',attachName:'',attachSize:'',attachType:''};
                detailtemp.attachId = uploadedFiles[j].documentId;
                detailtemp.attachName = uploadedFiles[j].name;
                init[0].assessmentAttach.push(detailtemp);
            } 
            component.set("v.intiMethod",init);
        }
    },
    handleCancel : function(component) {
        component.find('overlayLib').notifyClose();
    },   
    ChangeInputArea : function(component) {
    },   
    submitSingleResponse : function(component, event, helper) {        
        var index = event.getSource().get("v.value");
        console.log(index);
        var currentStage = component.get("v.stage.id");
        var init = component.get("v.intiMethod"); 
        for(var i in init){
            if(init[i].questionOrder == currentStage.substr(2) ){   
                init[i].surveyResponse.Response__c = index;
            }
        }
    },
    submitMultipleResponse : function(component, event, helper) {        
        var index = event.getSource().get("v.value");
        var checked = event.getSource().get("v.checked");
        var currentStage = component.get("v.stage.id");
        var init = component.get("v.intiMethod"); 
        for(var i in init){
            if(init[i].questionOrder == currentStage.substr(2) ){
                console.log(typeof init[i].surveyResponse.Response__c);
                console.log(init[i].surveyResponse.Response__c);
                if(typeof init[i].surveyResponse.Response__c == 'undefined' ||
                   init[i].surveyResponse.Response__c == ''){
                    init[i].surveyResponse.Response__c = index;  
                }
                else if(checked)
                    init[i].surveyResponse.Response__c += '\r\n' + index;
                    else if(!checked){
                        var responseArr = init[i].surveyResponse.Response__c.split('\r\n');
                        var finalResponse = '';
                        for(var key in responseArr){
                            if(responseArr[key] != index)
                                finalResponse += '\r\n' + responseArr[key];
                        }
                        init[i].surveyResponse.Response__c = finalResponse;
                    }
                console.log(init[i].surveyResponse.Response__c);
            }
        }
    },
    goToPrevious : function(component, event, helper) {
        var currentStage = component.get("v.stage.id");
        var nxtStep = currentStage.substring(0,2)+ (parseInt(currentStage.substring(2))-1);
        helper.draftResponse(component,currentStage);        
        component.set('v.stage.id', nxtStep);
    },
    goToNext : function(component, event, helper) {        
        var currentStage = component.get("v.stage.id");
        console.log(currentStage);
        var nxtStep = currentStage.substring(0,2)+ (parseInt(currentStage.substring(2))+1);
        console.log(nxtStep);
        helper.draftResponse(component,currentStage);
        component.set('v.stage.id', nxtStep);
    },
    handleStepBlur : function (cmp, evt, helper) {
        var stepIndex = evt.getParam('index');
        alert(stepIndex);
    },
    finalSubmit: function(component, evt, helper) {             
        var assessmentRec = component.get("v.assessmentFinal");
        assessmentRec.Id = component.get("v.surveyId");
        assessmentRec.Status__c = 'Ready for review';
        if(assessmentRec.Name__c != '' &&
          assessmentRec.Title__c != '' &&
          assessmentRec.Date__c != '' &&
          assessmentRec.Is_certify__c){            
            if (confirm("Confirm to submit the Assessment?")) {   
                helper.changeSurveyStatus(component,assessmentRec);
            } 
        }
        else{
            alert('Enter all the required fields in Agreement Section.');
        }
    },
    
    printTableData : function(component,event,helper){
        var printDataValue = {};
        printDataValue = {wrapperClassList:[]};
        var arrayList = [];
        var reviewTableValues = component.get('v.intiMethod');
        for(var i = 0 ; i < reviewTableValues.length ; i++){
            if(reviewTableValues[i].surveyQues.RecordType.Name == 'Questions'){
                var printDataResult = {};
                printDataResult = {question:'',response:'',user:''};
                printDataResult.question = reviewTableValues[i].surveyQues.Question__c;
                printDataResult.response = reviewTableValues[i].surveyResponse.Response__c;
                printDataResult.user = reviewTableValues[i].lastModifiedByUserName;
                arrayList.push(printDataResult);
            }
        }
        printDataValue.wrapperClassList = arrayList;
        var printData = printDataValue;
        component.set("v.showSpinner",true);
        var print = component.get("c.printTable");
        print.setParams({
            "recordId" : component.get("v.surveyId"),
            "data" : JSON.stringify(printData)
        });
        print.setCallback(this,function(response){
            var state = response.getState();
            console.log(state);
            if(state == "SUCCESS"){
                component.set("v.showFrame",true);
                //var printURL = 'https://dodvoled--voleddev1--c.cs32.visual.force.com/apex/SurveyPrint_vf?Id='+ component.get("v.surveyId");
                var printURL = 'https://'+response.getReturnValue()+'/apex/SurveyPrint_vf?Id='+ component.get("v.surveyId");
                console.log(encodeURI(printURL));
                component.set("v.printURL",encodeURI(printURL));
                window.setTimeout(
                    $A.getCallback(function(){
                        component.set("v.showFrame",false);
                        component.set("v.printURL","");
                    }),2000
                );
            }
            if(state == "ERROR"){
                var errors = response.getError();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error!',
                    message : errors[0].pageErrors[0].message,
                    type: 'error'
                });
                toastEvent.fire();
            }
            component.set("v.showSpinner",false);
        });
        $A.enqueueAction(print);
    }
})