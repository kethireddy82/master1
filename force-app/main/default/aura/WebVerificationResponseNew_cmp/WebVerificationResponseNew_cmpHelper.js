({
    setProgressBar : function(component) {
        var stepsData = [];
        var page1 = {id:'',label:''};
        page1.id = 1;
        page1.label = 'Header';
        stepsData.push(page1);
        var page2 = {id:'',label:''};
        page2.id = 2;
        page2.label = 'Purpose & Overview';
        stepsData.push(page2);
        var page3 = {id:'',label:''};
        page3.id = 3;
        page3.label = 'Instructions';
        stepsData.push(page3);
        var page4 = {id:'',label:''};
        page4.id = 4;
        page4.label = 'Web Verification Checklist';
        stepsData.push(page4);
        var page5 = {id:'',label:''};
        page5.id = 5;
        page5.label = 'Recruiting, Marketing, & Advertising';
        stepsData.push(page5);
        var page6 = {id:'',label:''};
        page6.id = 6;
        page6.label = 'Financial Matters';
        stepsData.push(page6);
        var page7 = {id:'',label:''};
        page7.id = 7;
        page7.label = 'Accreditation & Credentialing Requirements';
        stepsData.push(page7);
        var stepsPreComponents = [[
            "lightning:progressIndicator",
            {
                "currentStep" : component.getReference('v.currentPage')
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
    
    getParameterByName: function(component, event, name) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var url = window.location.href;
        var regex = new RegExp("[?&]" + name + "(=1\.([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    
    showHelpSection : function(component){
        component.set('v.showMainSection',false);
        component.set('v.showHelpSection',true);
    },
    
	setPicklistValue : function(dropdown,yesNoValue,allValues){
		for(var j in allValues){
			if(yesNoValue == allValues[j].value){
				dropdown.selectedIndex = allValues[j].index;
				break;
			}
		}
	},
	
	showAttachment: function(component,recordId,attachmentList){
        component.set('v.attachmentId',recordId);
        component.set('v.attachmentList',attachmentList);
        component.set('v.isOpen',true);
	},
	
    getCheckListValues : function(component){
        var action = component.get('c.getCheckListValues');
        action.setParams({
            'recordId': component.get('v.parentRecordId')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            console.log(state);
            if(state === "SUCCESS"){
                var responseValue = response.getReturnValue();
                if(responseValue!=null && responseValue!=undefined){
                    if(responseValue.listOfCheckListValues!=null && responseValue.listOfCheckListValues!= undefined && responseValue.listOfCheckListValues.length == 4){
                        component.set('v.accountName',responseValue.listOfCheckListValues[0]);
                        component.set('v.opeId',responseValue.listOfCheckListValues[1]);
                        component.set('v.userName',responseValue.listOfCheckListValues[2]);
                        component.set('v.dateValue',responseValue.listOfCheckListValues[3]);
                    }
					if(responseValue.icpWebVerificationObj!=null && responseValue.icpWebVerificationObj!=undefined){
						component.set('v.icpWebVerificationObj',responseValue.icpWebVerificationObj);
					}
                    if(responseValue.icpId!=null){
                        component.set("v.icpId",responseValue.icpId);
                    }
                    if(responseValue.icpYear!=null){
                        component.set("v.icpYear",responseValue.icpYear);
                    }
                    if(responseValue.listOfWebVerificationResponses!=null && responseValue.listOfWebVerificationResponses!=undefined && responseValue.listOfWebVerificationResponses.length > 0){
                        var picklistValues = component.get('v.picklistOptions');
                        var allValues = [];
                        for(var i in picklistValues){
                            var targetValue = {'value':'','index':''};
                            targetValue.value = picklistValues[i];
                            targetValue.index = i;
                            allValues.push(targetValue);
                        }
                        for(var i in responseValue.listOfWebVerificationResponses){
                            switch(responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Name){
								case '1' : component.set('v.question1',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question1Attachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								if(responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c=='Yes'){
                                    component.set('v.showQuestion2',true);
                                }
                                else{
                                    component.set('v.showQuestion2',false);
                                }
                                var dropdown = document.getElementById('question1Dropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '2a' : component.set('v.question2a',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question2aAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question2aDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '2b' : component.set('v.question2b',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question2bAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question2bDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '2c' : component.set('v.question2c',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question2cAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question2cDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '2d' : component.set('v.question2d',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question2dAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question2dDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '2e' : component.set('v.question2e',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question2eAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question2eDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '2f' : component.set('v.question2f',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question2fAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question2fDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '3' : component.set('v.question3',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question3Attachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								if(responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c=='Yes'){
                                    component.set('v.showQuestion4',true);
                                }
                                else{
                                    component.set('v.showQuestion4',false);
                                }
								var dropdown = document.getElementById('question3Dropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '4a' : component.set('v.question4a',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question4aAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question4aDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '4b' : component.set('v.question4b',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question4bAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question4bDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '4c' : component.set('v.question4c',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question4cAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question4cDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '4d' : component.set('v.question4d',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question4dAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question4dDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '4e' : component.set('v.question4e',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question4eAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question4eDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '5' : component.set('v.question5',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question5Attachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								if(responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c=='Yes'){
                                    component.set('v.showQuestion6',true);
                                }
                                else{
                                    component.set('v.showQuestion6',false);
                                }
								var dropdown = document.getElementById('question5Dropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '6a' : component.set('v.question6a',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question6aAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question6aDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '6b' : component.set('v.question6b',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question6bAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question6bDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '6c' : component.set('v.question6c',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question6cAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question6cDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '6d' : component.set('v.question6d',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question6dAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question6dDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '6e' : component.set('v.question6e',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question6eAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question6eDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
                                case '6f' : component.set('v.question6f',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question6fAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question6fDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '7' : component.set('v.question7',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question7Attachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								if(responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c=='Yes'){
                                    component.set('v.showQuestion8',true);
                                }
                                else{
                                    component.set('v.showQuestion8',false);
                                }
								var dropdown = document.getElementById('question7Dropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '8' : component.set('v.question8',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question10attachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question8Dropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '9' : component.set('v.question9',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question9Attachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								if(responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c=='Yes'){
                                    component.set('v.showQuestion10to12',true);
                                }
                                else{
                                    component.set('v.showQuestion10to12',false);
                                }
								var dropdown = document.getElementById('question9Dropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '10a' : component.set('v.question10a',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question10aAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question10aDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '10b' : component.set('v.question10b',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question10bAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question10bDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '10c' : component.set('v.question10c',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question10cAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question10cDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '10d' : component.set('v.question10d',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question10dAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question10dDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '10e' : component.set('v.question10e',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question10eAttachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question10eDropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '11' : component.set('v.question11',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question11Attachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question11Dropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '12' : component.set('v.question12',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question12Attachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question12Dropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '13' : component.set('v.question13',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question13Attachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question13Dropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '14' : component.set('v.question14',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question14Attachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question14Dropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '15' : component.set('v.question15',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question15Attachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question15Dropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
								case '16' : component.set('v.question16',responseValue.listOfWebVerificationResponses[i].webVerificationResponse);
								component.set('v.question16Attachment',responseValue.listOfWebVerificationResponses[i].attachmentList);
								var dropdown = document.getElementById('question16Dropdown');
								this.setPicklistValue(dropdown,responseValue.listOfWebVerificationResponses[i].webVerificationResponse.Yes_No__c,allValues);
								break;
							}
						}
                    }
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    saveResponses : function(component,icpWebVerificationResponses,icpWebVerificationObj,needsUpdate){
		component.set('v.showSpinner',true);
		var assessmentScoring = component.get('v.assessmentScoring');
        if(icpWebVerificationObj!=null && icpWebVerificationObj.Status__c == 'Submitted'){
            assessmentScoring.WV1__c = component.get("v.question1").Answer_Score__c;
            assessmentScoring.WV2a__c = component.get("v.question2a").Answer_Score__c;
            assessmentScoring.WV2b__c = component.get("v.question2b").Answer_Score__c;
            assessmentScoring.WV2c__c = component.get("v.question2c").Answer_Score__c;
            assessmentScoring.WV2d__c = component.get("v.question2d").Answer_Score__c;
            assessmentScoring.WV2e__c = component.get("v.question2e").Answer_Score__c;
            assessmentScoring.WV2f__c = component.get("v.question2f").Answer_Score__c;
            assessmentScoring.WV3__c = component.get("v.question3").Answer_Score__c;
            assessmentScoring.WV4a__c = component.get("v.question4a").Answer_Score__c;
            assessmentScoring.WV4b__c = component.get("v.question4b").Answer_Score__c;
            assessmentScoring.WV4c__c = component.get("v.question4c").Answer_Score__c;
            assessmentScoring.WV4d__c = component.get("v.question4d").Answer_Score__c;
            assessmentScoring.WV4e__c = component.get("v.question4e").Answer_Score__c;
            assessmentScoring.WV5__c = component.get("v.question5").Answer_Score__c;
            assessmentScoring.WV6a__c = component.get("v.question6a").Answer_Score__c;
            assessmentScoring.WV6b__c = component.get("v.question6b").Answer_Score__c;
            assessmentScoring.WV6c__c = component.get("v.question6c").Answer_Score__c;
            assessmentScoring.WV6d__c = component.get("v.question6d").Answer_Score__c;
            assessmentScoring.WV6e__c = component.get("v.question6e").Answer_Score__c;
            assessmentScoring.WV6f__c = component.get("v.question6f").Answer_Score__c;
            assessmentScoring.WV7__c = component.get("v.question7").Answer_Score__c;
            assessmentScoring.WV8__c = component.get("v.question8").Answer_Score__c;
            assessmentScoring.WV9__c = component.get("v.question9").Answer_Score__c;
            assessmentScoring.WV10a__c = component.get("v.question10a").Answer_Score__c;
            assessmentScoring.WV10b__c = component.get("v.question10b").Answer_Score__c;
            assessmentScoring.WV10c__c = component.get("v.question10c").Answer_Score__c;
            assessmentScoring.WV10d__c = component.get("v.question10d").Answer_Score__c;
            assessmentScoring.WV10e__c = component.get("v.question10e").Answer_Score__c;
            assessmentScoring.WV11__c = component.get("v.question11").Answer_Score__c;
            assessmentScoring.WV12__c = component.get("v.question12").Answer_Score__c;
            assessmentScoring.WV13__c = component.get("v.question13").Answer_Score__c;
            assessmentScoring.WV14__c = component.get("v.question14").Answer_Score__c;
            assessmentScoring.WV15__c = component.get("v.question15").Answer_Score__c;
            assessmentScoring.WV16__c = component.get("v.question16").Answer_Score__c;
            assessmentScoring.Assessment__c = component.get("v.recordId");
            assessmentScoring.OPEID__c = component.get("v.opeID");
            assessmentScoring.School_Name__c = component.get("v.accountName");
            assessmentScoring.ICP__c = component.get("v.icpId");
            assessmentScoring.Year__c = component.get("v.icpYear");
        }
		var action = component.get("c.saveWebVerificationResponses");
		action.setParams({
			"responses":icpWebVerificationResponses,
			"icpWebVerificationObj" : icpWebVerificationObj,
			"needToUpdate" : needsUpdate,
            "assessmentScoring" : assessmentScoring,
            "icpObject" : component.get("v.icpObject")
		});
		action.setCallback(this,function(response){
			var state = response.getState();
			if(state === "SUCCESS"){
                $A.get('e.force:refreshView').fire();
				/*var navEvt = $A.get("e.force:navigateToSObject");
				navEvt.setParams({
				  "recordId": record.id,
				  "slideDevName": "related"
				});
				navEvt.fire();*/
			}
			component.set('v.showSpinner',false);
			return;
		});
		$A.enqueueAction(action);
	}
})