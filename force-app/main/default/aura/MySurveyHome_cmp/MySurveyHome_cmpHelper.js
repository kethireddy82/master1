({
    getSurveyRecord : function(component) {
        var action = component.get("c.initMethod");
        action.setCallback(this, function(a) {
            if (a.getState() === "SUCCESS") {
                component.set('v.objClassController', a.getReturnValue());
            } else if (a.getState() === "ERROR"){
                console.log(a.getError());
                var errors = a.getError();
                if(errors[0] && errors[0].pageErrors)
                    alert(errors[0].pageErrors[0].message);    
            }
        });        
        $A.enqueueAction(action);		
    },
    saveResponse : function(component,userResponse) {
        var action = component.get("c.createResponseRecord");
        action.setParams({ "userResponseString" : userResponse });
        action.setCallback(this, function(a) {
            if (a.getState() === "SUCCESS") {
            } else if (a.getState() === "ERROR"){
                console.log(a.getError());
                var errors = a.getError();
                if(errors[0] && errors[0].pageErrors)
                    alert(errors[0].pageErrors[0].message);    
            }
        });        
        $A.enqueueAction(action);		
    },
    draftResponse : function(component,currentStage) {
        var init = component.get("v.intiMethod");
        var userResponse;
        var isValid = false;
        var assessmentResponseMap = component.get("v.assessmentResponseMap");
        for(var i in init){
            if(init[i].questionOrder == currentStage.substr(2) ){
                if(init[i].surveyQues.RecordType.Name == 'Questions' ){
                    //console.log(JSON.stringify(assessmentResponseMap));
                    var existingRes;
                    if(typeof assessmentResponseMap != 'undefined')
                        existingRes = assessmentResponseMap[init[i].surveyResponse.Id];
                    //console.log(existingRes );
                    //console.log(typeof init[i].surveyResponse.Response__c );
                    //console.log(init[i].surveyResponse.Response__c );
                    if(                   
                        existingRes != init[i].surveyResponse.Response__c &&
                        (typeof init[i].surveyResponse.Response__c != 'undefined'  )
                    ){
                        userResponse = init[i].surveyResponse; 
                        assessmentResponseMap[init[i].surveyResponse.Id] = init[i].surveyResponse.Response__c;
                        init[i].lastModifiedByUserName = component.get("v.userInfo");
                        isValid = true; 
                    }
                    
                }
            }     
        }
        console.log(isValid);
        if(isValid){
            component.set("v.assessmentResponseMap",assessmentResponseMap);
            this.saveResponse(component,JSON.stringify(userResponse));
        }   
    },
    changeSurveyStatus : function(component,assessmentRec) {
        var surverId = component.get("v.surveyId");
        var init = component.get("v.intiMethod");
        var action = component.get("c.submitSurvey");
        action.setParams({ 
            "assessmentRecord" : assessmentRec,
            "surverTakerId" : init[0].surverTakerInfo.Id
        });
        action.setCallback(this, function(a) {
            if (a.getState() === "SUCCESS") { 
                this.callNewModal(component);
            } else if (a.getState() === "ERROR"){
                console.log(a.getError());
                var errors = a.getError();
                if(errors[0] && errors[0].pageErrors)
                    alert(errors[0].pageErrors[0].message);    
            }
        });        
        $A.enqueueAction(action);		
    },
    callNewModal : function(component) {   
        $A.createComponents(
            [
                ["lightning:button",
                 {
                     "aura:id": "cancelButton",
                     "label": "Exit",
                     "onclick": component.getReference("c.backtohome")               
                 }]
            ],
            function(comp, status) {
                if (status === "SUCCESS") {
                    component.find('overlayLib').showCustomModal({
                        header: "Assessment Confirmation",
                        body: "Thank you ! Your assessment is successfully completed. You will shortly receive a mail confirmation for the same.", 
                        footer: comp,
                        showCloseButton: false,
                    });
                }
            }
        );
    },
    getinitClass : function(component) {
        var surveyId = component.get("v.surveyId");
        var action = component.get("c.getSurveyInformation");
        action.setParams({
            getSurveyId : surveyId
        });
        action.setCallback(this, function(a) {
            console.log('==='+JSON.stringify(a.getReturnValue() ));
            if (a.getState() === "SUCCESS") {
                var result = a.getReturnValue();
                var responseMap;
                for(var i in result){
                    if(typeof result[i].responseMap != 'undefined')
                        responseMap = result[i].responseMap;
                }
                //console.log(JSON.stringify(responseMap ));
                component.set("v.assessmentResponseMap",responseMap);            
                this.getValidateAssessment(component,a.getReturnValue());
                this.setProgressBar(component);
            } else if (a.getState() === "ERROR") {
                $A.log("Errors", a.getError());
            }
        });        
        $A.enqueueAction(action);		
    },    
    getValidateAssessment : function(component,returnResponse) {
        console.log(JSON.stringify(returnResponse[0]));
        console.log(returnResponse[0].surverTakerInfo.Assessment_Status__c);
       //alert('Abhishek ' + returnResponse[0].surverTakerInfo.Assessment_Status__c);
           // if(returnResponse[0].surverTakerInfo.Assessment_Status__c == 'Draft' || returnResponse[0].surverTakerInfo.Assessment_Status__c == '')
       // {
        if(returnResponse[0].surverTakerInfo.Assessment_Status__c != 'Ready for review'){                             
            component.set("v.showAssessment",false);
            component.set("v.showQuestion",true);
            component.set('v.intiMethod', returnResponse);
        }
        else{
            alert('Assessment already taken by you.');
        }
        
    },
    setProgressBar : function(component) {
        var stepsData = [];
        var surveyQuestions = component.get("v.intiMethod");
        if(surveyQuestions.length != 0){
            var i = 1;
            for(i in surveyQuestions){
                i++;
                var detailtemp = {};
                detailtemp = {id:'',label:''};
                detailtemp.id = 'id'+ i;
                detailtemp.label = 'Order No '+ i;
                stepsData.push(detailtemp);
            }
            var detailtemp = {};
            detailtemp = {id:'',label:''};
            detailtemp.id = 'id'+ (surveyQuestions.length+1);
            detailtemp.label = 'Review';
            stepsData.push(detailtemp);
            console.log(JSON.stringify(stepsData));
        }
        //console.log('stepsData==='+JSON.stringify(stepsData));
        var stepsPreComponents = [[
            "lightning:progressIndicator",
            {
                "currentStep" : component.getReference('v.stage.id')
            }
        ]];        
        // Add the steps
        for (var index in stepsData) {
            var step = stepsData[index];
            stepsPreComponents.push([
                "lightning:progressStep",
                {
                    "label":step.label,
                    "value":step.id
                }
            ]);
        }
        $A.createComponents(
            stepsPreComponents,
            function(components, status, errorMessage){
                if (status === "SUCCESS") {
                    var progressIndicator = components.shift();
                    progressIndicator.set('v.body',components);
                    component.set('v.progressIndicator',progressIndicator);
                } 
            }
        );
    },
    getLastModifiedBy : function(component) {
        var action = component.get("c.fetchUser");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                // set current user information on userInfo attribute
                component.set("v.userInfo", storeResponse.Name);
            }
        });
        $A.enqueueAction(action);
    }
})