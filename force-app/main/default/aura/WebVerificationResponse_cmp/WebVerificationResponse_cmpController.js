({
    doInit : function(component, event, helper) {
		var recordId = event.getParam("recordId");
		if(recordId == component.get('v.recordId')){
			component.set('v.icpObject',event.getParam("icpObject"));
			component.set('v.readOnly',event.getParam("readOnly"));
			component.set("v.isOpenPopup",true);
			component.set("v.parentRecordId", component.get('v.recordId'));
            component.set("v.currentPage",1);
			helper.setProgressBar(component);
			helper.getCheckListValues(component);
		}
    },
	
	onChildAttributeChange : function(component, event, helper) {
		var currentQuestionNo = component.get('v.currentQuestionNo');
		var attachmentList = component.get('v.attachmentList');
        console.log(JSON.stringify(attachmentList));
		switch(currentQuestionNo){
			case '1' : component.set('v.question1Attachment',attachmentList);
			break;
			case '2a' : component.set('v.question2aAttachment',attachmentList);
			break;
			case '2b' : component.set('v.question2bAttachment',attachmentList);
			break;
			case '2c' : component.set('v.question2cAttachment',attachmentList);
			break;
			case '2d' : component.set('v.question2dAttachment',attachmentList);
			break;
			case '2e' : component.set('v.question2eAttachment',attachmentList);
			break;
			case '2f' : component.set('v.question2fAttachment',attachmentList);
			break;
			case '3' : component.set('v.question3Attachment',attachmentList);
			break;
			case '4a' : component.set('v.question4aAttachment',attachmentList);
			break;
			case '4b' : component.set('v.question4bAttachment',attachmentList);
			break;
			case '4c' : component.set('v.question4cAttachment',attachmentList);
			break;
			case '4d' : component.set('v.question4dAttachment',attachmentList);
			break;
			case '4e' : component.set('v.question4eAttachment',attachmentList);
			break;
			case '5' : component.set('v.question5Attachment',attachmentList);
			break;
			case '6a' : component.set('v.question6aAttachment',attachmentList);
			break;
			case '6b' : component.set('v.question6bAttachment',attachmentList);
			break;
			case '6c' : component.set('v.question6cAttachment',attachmentList);
			break;
			case '6d' : component.set('v.question6dAttachment',attachmentList);
			break;
			case '6e' : component.set('v.question6eAttachment',attachmentList);
			break;
			case '7' : component.set('v.question7Attachment',attachmentList);
			break;
			case '8a' : component.set('v.question8aAttachment',attachmentList);
			break;
			case '8b' : component.set('v.question8bAttachment',attachmentList);
			break;
			case '8c' : component.set('v.question8cAttachment',attachmentList);
			break;
			case '8d' : component.set('v.question8dAttachment',attachmentList);
			break;
			case '8e' : component.set('v.question8eAttachment',attachmentList);
			break;
			case '9' : component.set('v.question9Attachment',attachmentList);
			break;
			case '10' : component.set('v.question10Attachment',attachmentList);
			break;
			case '11' : component.set('v.question11Attachment',attachmentList);
			break;
			case '12' : component.set('v.question12Attachment',attachmentList);
			break;
			case '13' : component.set('v.question13Attachment',attachmentList);
			break;
			case '14' : component.set('v.question14Attachment',attachmentList);
			break;
			case '15' : component.set('v.question15Attachment',attachmentList);
			break;
			case '16' : component.set('v.question16Attachment',attachmentList);
			break;
		}
	},
    
    goToNext : function(component, event, helper) {
		var picklistValues = component.get('v.picklistOptions');
		var allValues = [];
		for(var i in picklistValues){
			var targetValue = {'value':'','index':''};
			targetValue.value = picklistValues[i];
			targetValue.index = i;
			allValues.push(targetValue);
		}
		var icpWebVerificationObj = component.get('v.icpWebVerificationObj');
        var pagenum = component.get('v.currentPage');        
		var readOnly = component.get('v.readOnly');
		
		if(readOnly){
			if(pagenum != 11){
				component.set('v.currentPage',component.get('v.currentPage')+1);
			}
		}
		else{
			if(pagenum == 5 ){
				var dropdown = document.getElementById('question1Dropdown');
				var selectedOptionValue = dropdown.options[dropdown.selectedIndex].value;
				
				var save = false;
				var question1ans = false;
				var question2a = false;
				var question2b = false;
				var question2c = false;
				var question2d = false;
				var question2e = false;
				var question2f = false;
				
				var question2aDropdown = document.getElementById('question2aDropdown');
				var question2bDropdown = document.getElementById('question2bDropdown');
				var question2cDropdown = document.getElementById('question2cDropdown');
				var question2dDropdown = document.getElementById('question2dDropdown');
				var question2eDropdown = document.getElementById('question2eDropdown');
				var question2fDropdown = document.getElementById('question2fDropdown');
						
				if(selectedOptionValue=='Yes'){
					if(component.get('v.question1.URL__c') ==undefined || component.get('v.question1.URL__c') == null || component.get('v.question1.URL__c') ==""){
						component.set('v.Question1URLRequired',true);
						question1ans = false;
					}
					else{
						component.set('v.Question1URLRequired',false);
						question1ans = true;
					}
					
					if(question2aDropdown.options[question2aDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question2a.URL__c') ==undefined || component.get('v.question2a.URL__c') == null || component.get('v.question2a.URL__c') ==""){
						   component.set('v.Question2aURLRequired',true); 
						   question2a = false;
						}
						else{
							component.set('v.Question2aURLRequired',false);
							question2a = true;
						}
					}
					else{
						component.set('v.Question2aURLRequired',false);
						question2a = true;
					}
					
					if(question2bDropdown.options[question2bDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question2b.URL__c') ==undefined || component.get('v.question2b.URL__c') == null || component.get('v.question2b.URL__c') ==""){
						   component.set('v.Question2bURLRequired',true); 
						   question2b = false;
						}
						else{
							component.set('v.Question2bURLRequired',false);
							question2b = true;
						}
					}
					else{
						component.set('v.Question2bURLRequired',false);
						question2b = true;
					}
					
					if(question2cDropdown.options[question2cDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question2c.URL__c') ==undefined || component.get('v.question2c.URL__c') == null || component.get('v.question2c.URL__c') ==""){
						   component.set('v.Question2cURLRequired',true); 
						   question2c = false;
						}
						else{
							component.set('v.Question2cURLRequired',false);
							question2c = true;
						}
					}
					else{
						component.set('v.Question2cURLRequired',false);
						question2c = true;
					}
					
					if(question2dDropdown.options[question2dDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question2d.URL__c') == undefined || component.get('v.question2d.URL__c') == null || component.get('v.question2d.URL__c') ==""){
						   component.set('v.Question2dURLRequired',true); 
						   question2d = false;
						}
						else{
							component.set('v.Question2dURLRequired',false);
							question2d = true;
						}
					}
					else{
						component.set('v.Question2dURLRequired',false);
						question2d = true;
					}
					
					if(question2eDropdown.options[question2eDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question2e.URL__c') == undefined || component.get('v.question2e.URL__c') == null || component.get('v.question2e.URL__c') ==""){
						   component.set('v.Question2eURLRequired',true); 
						   question2e = false;
						}
						else{
							component.set('v.Question2eURLRequired',false);
							question2e = true;
						}
					}
					else{
						component.set('v.Question2eURLRequired',false);
						question2e = true;
					}
					
					if(question2fDropdown.options[question2fDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question2f.URL__c') == undefined || component.get('v.question2f.URL__c') == null || component.get('v.question2f.URL__c') ==""){
						   component.set('v.Question2fURLRequired',true); 
						   question2f = false;
						}
						else{
							component.set('v.Question2fURLRequired',false);
							question2f = true;
						}
					}
					else{
						component.set('v.Question2fURLRequired',false);
						question2f = true;
					}
					
					if(question1ans===true && question2a===true && question2b===true && question2c===true && question2d===true && question2e===true && question2f===true){
						save = true;
					}
				}
				else{
					component.set('v.Question1URLRequired',false);
					helper.setPicklistValue(document.getElementById('question2aDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question2bDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question2cDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question2dDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question2eDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question2fDropdown'),'N/A',allValues);
					save = true;
				}
				
				if(save===true){
					var webVerificationResponses = [];
                    var question1AnswerScore = 0;
                    var question2aAnswerScore = 0;
                    var question2bAnswerScore = 0;
                    var question2cAnswerScore = 0;
                    var question2dAnswerScore = 0;
                    var question2eAnswerScore = 0;
                    var question2fAnswerScore = 0;
					
					var question1 = component.get('v.question1');
					question1.Question__c = component.get('v.questionNo1');
					question1.Name = '1';
					var question1Dropdown = document.getElementById('question1Dropdown');
					question1.Yes_No__c = question1Dropdown.options[question1Dropdown.selectedIndex].value;
                    if(question1.Yes_No__c == "Yes" || question1.Yes_No__c == "No" || question1.Yes_No__c =="N/A"){
                        question1AnswerScore = 0;
                    }
                	var question1Weight = 0;
					question1.Answer_Score__c = question1AnswerScore;
					webVerificationResponses.push(question1);
					
					var question2a = component.get('v.question2a');
					question2a.Question__c = component.get('v.questionNo2a');
					question2a.Name = '2a';
					question2a.Yes_No__c = question2aDropdown.options[question2aDropdown.selectedIndex].value;
                    if(question2a.Yes_No__c == "Yes in Excess"){
                        question2aAnswerScore = 2;
                    }
                    else if(question2a.Yes_No__c == "Yes"){
                        question2aAnswerScore = 1;
                    }
                    else if(question2a.Yes_No__c == "No" || question2a.Yes_No__c == "N/A"){
                        question2aAnswerScore = 0;
                    }
					question2a.Answer_Score__c = question2aAnswerScore;
					webVerificationResponses.push(question2a);
					
					var question2b = component.get('v.question2b');
					question2b.Question__c = component.get('v.questionNo2b');
					question2b.Name = '2b';
					question2b.Yes_No__c = question2bDropdown.options[question2bDropdown.selectedIndex].value;
					if(question2b.Yes_No__c == "Yes in Excess"){
                        question2bAnswerScore = 2;
                    }
                    else if(question2b.Yes_No__c == "Yes"){
                        question2bAnswerScore = 1;
                    }
                    else if(question2b.Yes_No__c == "No" || question2b.Yes_No__c == "N/A"){
                        question2bAnswerScore = 0;
                    }
					question2b.Answer_Score__c = question2bAnswerScore;
					webVerificationResponses.push(question2b);
                    
					var question2c = component.get('v.question2c');
					question2c.Question__c = component.get('v.questionNo2c');
					question2c.Name = '2c';
					question2c.Yes_No__c = question2cDropdown.options[question2cDropdown.selectedIndex].value;
					if(question2c.Yes_No__c == "Yes in Excess"){
                        question2cAnswerScore = 2;
                    }
                    else if(question2c.Yes_No__c == "Yes"){
                        question2cAnswerScore = 1;
                    }
                    else if(question2c.Yes_No__c == "No" || question2c.Yes_No__c == "N/A"){
                        question2cAnswerScore = 0;
                    }
					question2c.Answer_Score__c = question2cAnswerScore;
					webVerificationResponses.push(question2c);
                    
					var question2d = component.get('v.question2d');
					question2d.Question__c = component.get('v.questionNo2d');
					question2d.Name = '2d';
					question2d.Yes_No__c = question2dDropdown.options[question2dDropdown.selectedIndex].value;
					if(question2d.Yes_No__c == "Yes in Excess"){
                        question2dAnswerScore = 2;
                    }
                    else if(question2d.Yes_No__c == "Yes"){
                        question2dAnswerScore = 1;
                    }
                    else if(question2d.Yes_No__c == "No" || question2d.Yes_No__c == "N/A"){
                        question2dAnswerScore = 0;
                    }
					question2d.Answer_Score__c = question2dAnswerScore;
					webVerificationResponses.push(question2d);
                    
					var question2e = component.get('v.question2e');
					question2e.Question__c = component.get('v.questionNo2e');
					question2e.Name = '2e';
					question2e.Yes_No__c = question2eDropdown.options[question2eDropdown.selectedIndex].value;
					if(question2e.Yes_No__c == "Yes in Excess"){
                        question2eAnswerScore = 2;
                    }
                    else if(question2e.Yes_No__c == "Yes"){
                        question2eAnswerScore = 1;
                    }
                    else if(question2e.Yes_No__c == "No" || question2e.Yes_No__c == "N/A"){
                        question2eAnswerScore = 0;
                    }
					question2e.Answer_Score__c = question2eAnswerScore;
					webVerificationResponses.push(question2e);
                    
					var question2f = component.get('v.question2f');
					question2f.Question__c = component.get('v.questionNo2f');
					question2f.Name = '2f';
					question2f.Yes_No__c = question2fDropdown.options[question2fDropdown.selectedIndex].value;
					if(question2f.Yes_No__c == "Yes in Excess"){
                        question2fAnswerScore = 2;
                    }
                    else if(question2f.Yes_No__c == "Yes"){
                        question2fAnswerScore = 1;
                    }
                    else if(question2f.Yes_No__c == "No" || question2f.Yes_No__c == "N/A"){
                        question2fAnswerScore = 0;
                    }
					question2f.Answer_Score__c = question2fAnswerScore;
					webVerificationResponses.push(question2f);
                    
					icpWebVerificationObj.Status__c = 'Draft';
					helper.saveResponses(component,webVerificationResponses,icpWebVerificationObj,true);
					component.set('v.currentPage',component.get('v.currentPage')+1);
				}
			} else if(pagenum == 6){
				var dropdown3 = document.getElementById('question3Dropdown');
				var selectedOptionValue3 = dropdown3.options[dropdown3.selectedIndex].value;
				var save = false;
				if(selectedOptionValue3=='Yes'){
					var question3ans = false;
					var question4a = false;
					var question4b = false;
					var question4c = false;
					var question4d = false;
					var question4e = false;
					
					var question4aDropdown = document.getElementById('question4aDropdown');
					var question4bDropdown = document.getElementById('question4bDropdown');
					var question4cDropdown = document.getElementById('question4cDropdown');
					var question4dDropdown = document.getElementById('question4dDropdown');
					var question4eDropdown = document.getElementById('question4eDropdown');
					
					if(component.get('v.question3.URL__c') ==undefined || component.get('v.question3.URL__c') == null || component.get('v.question3.URL__c') == ""){
					   component.set('v.Question3URLRequired',true);
					   question3ans = false;
					}
					else{
						component.set('v.Question3URLRequired',false);
						question3ans = true;
					}
					
					if(question4aDropdown.options[question4aDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question4a.URL__c') == undefined || component.get('v.question4a.URL__c') == null || component.get('v.question4a.URL__c') ==""){
						   component.set('v.Question4aURLRequired',true); 
						   question4a = false;
						}
						else{
							component.set('v.Question4aURLRequired',false);
							question4a = true;
						}
					}
					else{
						component.set('v.Question4aURLRequired',false);
						question4a = true;
					}
					
					if(question4bDropdown.options[question4bDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question4b.URL__c') ==undefined || component.get('v.question4b.URL__c') == null || component.get('v.question4b.URL__c') ==""){
						   component.set('v.Question4bURLRequired',true);
						   question4b = false;				   
						}
						else{
							component.set('v.Question4bURLRequired',false);
							question4b = true;
						}
					}
					else{
						component.set('v.Question4bURLRequired',false);
						question4b = true;
					}
					
					if(question4cDropdown.options[question4cDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question4c.URL__c') ==undefined || component.get('v.question4c.URL__c') == null || component.get('v.question4c.URL__c') ==""){
						   component.set('v.Question4cURLRequired',true); 
						   question4c = false;
						}
						else{
							component.set('v.Question4cURLRequired',false);
							question4c = true;
						}
					}
					else{
						component.set('v.Question4cURLRequired',false);
						question4c = true;
					}
					
					if(question4dDropdown.options[question4dDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question4d.URL__c') == undefined || component.get('v.question4d.URL__c') == null || component.get('v.question4d.URL__c') ==""){
						   component.set('v.Question4dURLRequired',true); 
						   question4d = false;
						}
						else{
							component.set('v.Question4dURLRequired',false);
							question4d = true;
						}
					}
					else{
						component.set('v.Question4dURLRequired',false);
						question4d = true;
					}
					
					if(question4eDropdown.options[question4eDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question4e.URL__c') == undefined || component.get('v.question4e.URL__c') == null || component.get('v.question4e.URL__c') ==""){
						   component.set('v.Question4eURLRequired',true); 
						   question4e = false;
						}
						else{
							component.set('v.Question4eURLRequired',false);
							question4e = true;
						}
					}
					else{
						component.set('v.Question4eURLRequired',false);
						question4e = true;
					}
					
					if(question3ans === true && question4a===true && question4b===true && question4c===true && question4d===true && question4e===true){
						save = true;
					}
					else{
						save = false;
					}
				}
				else{
					component.set('v.Question3URLRequired',false);
					helper.setPicklistValue(document.getElementById('question4aDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question4bDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question4cDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question4dDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question4eDropdown'),'N/A',allValues);
					save = true;
				}
				if(save === true){
					var webVerificationResponses = [];
					var question3AnswerScore = 0;
                    var question4aAnswerScore = 0;
                    var question4bAnswerScore = 0;
                    var question4cAnswerScore = 0;
                    var question4dAnswerScore = 0;
                    var question4eAnswerScore = 0;
					
					var question3 = component.get('v.question3');
					question3.Question__c = component.get('v.questionNo3');
					question3.Name = '3';
					var question3Dropdown = document.getElementById('question3Dropdown');
					question3.Yes_No__c = question3Dropdown.options[question3Dropdown.selectedIndex].value;
					var question3AnswerScore = 0;
					webVerificationResponses.push(question3);
					
					var question4a = component.get('v.question4a');
					question4a.Question__c = component.get('v.questionNo4a');
					question4a.Name = '4a';
					var question4aDropdown = document.getElementById('question4aDropdown');
					question4a.Yes_No__c = question4aDropdown.options[question4aDropdown.selectedIndex].value;
					if(question4a.Yes_No__c == "No"){
                        question4aAnswerScore = 1;
                    }
                    else if(question4a.Yes_No__c == "Yes" || question4a.Yes_No__c == "N/A"){
                        question4aAnswerScore = 0;
                    }
					question4a.Answer_Score__c = question4aAnswerScore;
					webVerificationResponses.push(question4a);
					
					var question4b = component.get('v.question4b');
					question4b.Question__c = component.get('v.questionNo4b');
					question4b.Name = '4b';
					var question4bDropdown = document.getElementById('question4bDropdown');
					question4b.Yes_No__c = question4bDropdown.options[question4bDropdown.selectedIndex].value;
					if(question4b.Yes_No__c == "No"){
                        question4bAnswerScore = 1;
                    }
                    else if(question4b.Yes_No__c == "Yes" || question4b.Yes_No__c == "N/A"){
                        question4bAnswerScore = 0;
                    }
					question4b.Answer_Score__c = question4bAnswerScore;
					webVerificationResponses.push(question4b);
					
					var question4c = component.get('v.question4c');
					question4c.Question__c = component.get('v.questionNo4c');
					question4c.Name = '4c';
					var question4cDropdown = document.getElementById('question4cDropdown');
					question4c.Yes_No__c = question4cDropdown.options[question4cDropdown.selectedIndex].value;
					if(question4c.Yes_No__c == "No"){
                        question4cAnswerScore = 1;
                    }
                    else if(question4c.Yes_No__c == "Yes" || question4c.Yes_No__c == "N/A"){
                        question4cAnswerScore = 0;
                    }
					question4c.Answer_Score__c = question4cAnswerScore;
					webVerificationResponses.push(question4c);
					
					var question4d = component.get('v.question4d');
					question4d.Question__c = component.get('v.questionNo4d');
					question4d.Name = '4d';
					var question4dDropdown = document.getElementById('question4dDropdown');
					question4d.Yes_No__c = question4dDropdown.options[question4dDropdown.selectedIndex].value;
					if(question4d.Yes_No__c == "No"){
                        question4dAnswerScore = 1;
                    }
                    else if(question4d.Yes_No__c == "Yes" || question4d.Yes_No__c == "N/A"){
                        question4dAnswerScore = 0;
                    }
					question4d.Answer_Score__c = question4dAnswerScore;
					webVerificationResponses.push(question4d);
					
					var question4e = component.get('v.question4e');
					question4e.Question__c = component.get('v.questionNo4e');
					question4e.Name = '4e';
					var question4eDropdown = document.getElementById('question4eDropdown');
					question4e.Yes_No__c = question4eDropdown.options[question4eDropdown.selectedIndex].value;
					if(question4e.Yes_No__c == "Egregiously No"){
						question4eAnswerScore = 2;
					}
					else if(question4e.Yes_No__c == "No"){
						question4eAnswerScore = 1;
					}
					else if(question4e.Yes_No__c == "Yes" || question4e.Yes_No__c == "N/A"){
						question4eAnswerScore = 0;
					}
					question4e.Answer_Score__c = question4eAnswerScore;
					webVerificationResponses.push(question4e);
					
					helper.saveResponses(component,webVerificationResponses,icpWebVerificationObj,false);
					component.set('v.currentPage',component.get('v.currentPage')+1);
				}
				
			} else if(pagenum == 7){
				var dropdown5 = document.getElementById('question5Dropdown');
				var selectedOptionValue5 = dropdown5.options[dropdown5.selectedIndex].value;
				var save = false;
				if(selectedOptionValue5=='Yes'){
					var question5ans = false;
					var question6a = false;
					var question6b = false;
					var question6c = false;
					var question6d = false;
					var question6e = false;
                    var question6f = false;
					
					var question6aDropdown = document.getElementById('question6aDropdown');
					var question6bDropdown = document.getElementById('question6bDropdown');
					var question6cDropdown = document.getElementById('question6cDropdown');
					var question6dDropdown = document.getElementById('question6dDropdown');
					var question6eDropdown = document.getElementById('question6eDropdown');
                    var question6fDropdown = document.getElementById('question6fDropdown');
					
					if(component.get('v.question5.URL__c') == undefined || component.get('v.question5.URL__c') == null || component.get('v.question5.URL__c') ==""){
						component.set('v.Question5URLRequired',true);
						question5ans = false;
					}
					else{
						component.set('v.Question5URLRequired',false);
						question5ans = true;
					}
					
					if(question6aDropdown.options[question6aDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question6a.URL__c') == undefined || component.get('v.question6a.URL__c') == null || component.get('v.question6a.URL__c') ==""){
						   component.set('v.Question6aURLRequired',true); 
						   question6a = false;
						}
						else{
							component.set('v.Question6aURLRequired',false);
							question6a = true;
						}
					}
					else{
						component.set('v.Question6aURLRequired',false);
						question6a = true;
					}
					
					if(question6bDropdown.options[question6bDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question6b.URL__c') == undefined || component.get('v.question6b.URL__c') == null || component.get('v.question6b.URL__c') ==""){
						   component.set('v.Question6bURLRequired',true); 
						   question6b = false;
						}
						else{
							component.set('v.Question6bURLRequired',false);
							question6b = true;
						}
					}
					else{
						component.set('v.Question6bURLRequired',false);
						question6b = true;
					}
					
					if(question6cDropdown.options[question6cDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question6c.URL__c') == undefined || component.get('v.question6c.URL__c') == null || component.get('v.question6c.URL__c') ==""){
						   component.set('v.Question6cURLRequired',true); 
						   question6c = false;
						}
						else{
							component.set('v.Question6cURLRequired',false);
							question6c = true;
						}
					}
					else{
						component.set('v.Question6cURLRequired',false);
						question6c = true;
					}
					
					if(question6dDropdown.options[question6dDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question6d.URL__c') == undefined || component.get('v.question6d.URL__c') == null || component.get('v.question6d.URL__c') ==""){
						   component.set('v.Question6dURLRequired',true); 
						   question6d = false;
						}
						else{
							component.set('v.Question6dURLRequired',false);
							question6d = true;
						}
					}
					else{
						component.set('v.Question6dURLRequired',false);
						question6d = true;
					}
					
					if(question6eDropdown.options[question6eDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question6e.URL__c') == undefined || component.get('v.question6e.URL__c') == null || component.get('v.question6e.URL__c') ==""){
						   component.set('v.Question6eURLRequired',true); 
						   question6e = false;
						}
						else{
							component.set('v.Question6eURLRequired',false);
							question6e = true;
						}
					}
					else{
						component.set('v.Question6eURLRequired',false);
						question6e = true;
					}
                    
                    
             /*      if(question6eDropdown.options[question6fDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question6f.URL__c') == undefined || component.get('v.question6f.URL__c') == null || component.get('v.question6f.URL__c') ==""){
						   component.set('v.Question6fURLRequired',true); 
						   question6e = false;
						}
						else{
							component.set('v.Question6fURLRequired',false);
							question6e = true;
						}
					}
					else{
						component.set('v.Question6fURLRequired',false);
						question6e = true;
					}
                    */
                    
					
					if(question5ans===true && question6a===true && question6b===true && question6c===true && question6d===true && question6e===true){
						save = true;
					}
					else{
						save = false;
					}
				}
				else{
					component.set('v.Question5URLRequired',false);
					helper.setPicklistValue(document.getElementById('question6aDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question6bDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question6cDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question6dDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question6eDropdown'),'N/A',allValues);
					save = true;
				}
				if(save === true){
					var webVerificationResponses = [];
					var question5AnswerScore = 0;
                    var question6aAnswerScore = 0;
                    var question6bAnswerScore = 0;
                    var question6cAnswerScore = 0;
                    var question6dAnswerScore = 0;
                    var question6eAnswerScore = 0;
					
					var question5 = component.get('v.question5');
					question5.Question__c = component.get('v.questionNo5');
					question5.Name = '5';
					var question5Dropdown = document.getElementById('question5Dropdown');
					question5.Yes_No__c = question5Dropdown.options[question5Dropdown.selectedIndex].value;
					if(question5.Yes_No__c == "No"){
						question5AnswerScore = 1;
					}
					else if(question5.Yes_No__c == "Yes" || question5.Yes_No__c == "N/A"){
						question5AnswerScore = 0;
					}
					question5.Answer_Score__c = question5AnswerScore;
					webVerificationResponses.push(question5);
					
					var question6a = component.get('v.question6a');
					question6a.Question__c = component.get('v.questionNo6a');
					question6a.Name = '6a';
					var question6aDropdown = document.getElementById('question6aDropdown');
					question6a.Yes_No__c = question6aDropdown.options[question6aDropdown.selectedIndex].value;
					if(question6a.Yes_No__c == "No"){
						question6aAnswerScore = 1;
					}
					else if(question6a.Yes_No__c == "Yes" || question6a.Yes_No__c == "N/A"){
						question6aAnswerScore = 0;
					}
					question6a.Answer_Score__c = question6aAnswerScore;
					webVerificationResponses.push(question6a);
					
					var question6b = component.get('v.question6b');
					question6b.Question__c = component.get('v.questionNo6b');
					question6b.Name = '6b';
					var question6bDropdown = document.getElementById('question6bDropdown');
					question6b.Yes_No__c = question6bDropdown.options[question6bDropdown.selectedIndex].value;
					if(question6b.Yes_No__c == "No"){
						question6bAnswerScore = 1;
					}
					else if(question6b.Yes_No__c == "Yes" || question6b.Yes_No__c == "N/A"){
						question6bAnswerScore = 0;
					}
					question6b.Answer_Score__c = question6bAnswerScore;
					webVerificationResponses.push(question6b);
					
					var question6c = component.get('v.question6c');
					question6c.Question__c = component.get('v.questionNo6c');
					question6c.Name = '6c';
					var question6cDropdown = document.getElementById('question6cDropdown');
					question6c.Yes_No__c = question6cDropdown.options[question6cDropdown.selectedIndex].value;
					if(question6c.Yes_No__c == "No"){
						question6cAnswerScore = 1;
					}
					else if(question6c.Yes_No__c == "Yes" || question6c.Yes_No__c == "N/A"){
						question6cAnswerScore = 0;
					}
					question6c.Answer_Score__c = question6cAnswerScore;
					webVerificationResponses.push(question6c);
					
					var question6d = component.get('v.question6d');
					question6d.Question__c = component.get('v.questionNo6d');
					question6d.Name = '6d';
					var question6dDropdown = document.getElementById('question6dDropdown');
					question6d.Yes_No__c = question6dDropdown.options[question6dDropdown.selectedIndex].value;
					if(question6d.Yes_No__c == "No"){
						question6dAnswerScore = 1;
					}
					else if(question6d.Yes_No__c == "Yes" || question6d.Yes_No__c == "N/A"){
						question6dAnswerScore = 0;
					}
					question6d.Answer_Score__c = question6dAnswerScore;
					webVerificationResponses.push(question6d);
					
					var question6e = component.get('v.question6e');
					question6e.Question__c = component.get('v.questionNo6e');
					question6e.Name = '6e';
					var question6eDropdown = document.getElementById('question6eDropdown');
					question6e.Yes_No__c = question6eDropdown.options[question6eDropdown.selectedIndex].value;
					if(question6e.Yes_No__c == "No"){
						question6eAnswerScore = 1;
					}
					else if(question6e.Yes_No__c == "Yes" || question6e.Yes_No__c == "N/A"){
						question6eAnswerScore = 0;
					}
					question6e.Answer_Score__c = question6eAnswerScore;
					webVerificationResponses.push(question6e);
					
					helper.saveResponses(component,webVerificationResponses,icpWebVerificationObj,false);
					component.set('v.currentPage',component.get('v.currentPage')+1);
				}
			} else if(pagenum == 8){
				var dropdown7 = document.getElementById('question7Dropdown');
				var selectedOptionValue7 = dropdown7.options[dropdown7.selectedIndex].value;
				var save = false;
				if(selectedOptionValue7=='Yes'){
					var question7ans = false;
					var question8a = false;
					var question8b = false;
					var question8c = false;
					var question8d = false;
					var question8e = false;
					var question9 = false;
					var question10 = false;
					
					var question8aDropdown = document.getElementById('question8aDropdown');
					var question8bDropdown = document.getElementById('question8bDropdown');
					var question8cDropdown = document.getElementById('question8cDropdown');
					var question8dDropdown = document.getElementById('question8dDropdown');
					var question8eDropdown = document.getElementById('question8eDropdown');
					var question9Dropdown = document.getElementById('question9Dropdown');
					var question10Dropdown = document.getElementById('question10Dropdown');
					
					if(component.get('v.question7.URL__c') == undefined || component.get('v.question7.URL__c') == null || component.get('v.question7.URL__c') ==""){
						component.set('v.Question7URLRequired',true);
						question7ans = false;
					}
					else{
						component.set('v.Question7URLRequired',false);
						question7ans = true;
					}
					
					if(question8aDropdown.options[question8aDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question8a.URL__c') == undefined || component.get('v.question8a.URL__c') == null || component.get('v.question8a.URL__c') ==""){
						   component.set('v.Question8aURLRequired',true); 
						   question8a = false;
						}
						else{
							component.set('v.Question8aURLRequired',false);
							question8a = true;
						}
					}
					else{
						component.set('v.Question8aURLRequired',false);
						question8a = true;
					}
					
					if(question8bDropdown.options[question8bDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question8b.URL__c') == undefined || component.get('v.question8b.URL__c') == null || component.get('v.question8b.URL__c') ==""){
						   component.set('v.Question8bURLRequired',true); 
						   question8b = false;
						}
						else{
							component.set('v.Question8bURLRequired',false);
							question8b = true;
						}
					}
					else{
						component.set('v.Question8bURLRequired',false);
						question8b = true;
					}
					
					if(question8cDropdown.options[question8cDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question8c.URL__c') == undefined || component.get('v.question8c.URL__c') == null || component.get('v.question8c.URL__c') ==""){
						   component.set('v.Question8cURLRequired',true); 
						   question8c = false;
						}
						else{
							component.set('v.Question8cURLRequired',false);
							question8c = true;
						}
					}
					else{
						component.set('v.Question8cURLRequired',false);
						question8c = true;
					}
					
					if(question8dDropdown.options[question8dDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question8d.URL__c') == undefined || component.get('v.question8d.URL__c') == null || component.get('v.question8d.URL__c') ==""){
						   component.set('v.Question8dURLRequired',true); 
						   question8d = false;
						}
						else{
							component.set('v.Question8dURLRequired',false);
							question8d = true;
						}
					}
					else{
						component.set('v.Question8dURLRequired',false);
						question8d = true;
					}
					
					if(question8eDropdown.options[question8eDropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question8e.URL__c') == undefined || component.get('v.question8e.URL__c') == null || component.get('v.question8e.URL__c') == ""){
						   component.set('v.Question8eURLRequired',true); 
						   question8e = false;
						}
						else{
							component.set('v.Question8eURLRequired',false);
							question8e = true;
						}
					}
					else{
						component.set('v.Question8eURLRequired',false);
						question8e = true;
					}
					
					if(question9Dropdown.options[question9Dropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question9.URL__c') == undefined || component.get('v.question9.URL__c') ==null || component.get('v.question9.URL__c') ==""){
						   component.set('v.Question9URLRequired',true); 
						   question9 = false;
						}
						else{
							component.set('v.Question9URLRequired',false);
							question9 = true;
						}
					}
					else{
						component.set('v.Question9URLRequired',false);
						question9 = true;
					}
					
					if(question10Dropdown.options[question10Dropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question10.URL__c') == undefined || component.get('v.question10.URL__c') == null || component.get('v.question10.URL__c') ==""){
						   component.set('v.Question10URLRequired',true); 
						   question10 = false;
						}
						else{
							component.set('v.Question10URLRequired',false);
							question10 = true;
						}
					}
					else{
						component.set('v.Question10URLRequired',false);
						question10 = true;
					}
					
					if(question7ans===true && question8a===true && question8b===true && question8c===true && question8d===true && question8e===true &&  question9===true && question10===true){
						save = true;
					}
					else{
						save = false;
					}
				}
				else{
					component.set('v.Question7URLRequired',false);
					helper.setPicklistValue(document.getElementById('question8aDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question8bDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question8cDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question8dDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question8eDropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question9Dropdown'),'N/A',allValues);
					helper.setPicklistValue(document.getElementById('question10Dropdown'),'N/A',allValues);
					save = true;
				}
				if(save === true){
					var webVerificationResponses = [];
					var question7AnswerScore = 0;
                    var question8aAnswerScore = 0;
                    var question8bAnswerScore = 0;
                    var question8cAnswerScore = 0;
                    var question8dAnswerScore = 0;
                    var question8eAnswerScore = 0;
                    var question9AnswerScore = 0;
					var question10AnswerScore = 0;
					
					var question7 = component.get('v.question7');
					question7.Question__c = component.get('v.questionNo7');
					question7.Name = '7';
					var question7Dropdown = document.getElementById('question7Dropdown');
					question7.Yes_No__c = question7Dropdown.options[question7Dropdown.selectedIndex].value;
					if(question7.Yes_No__c == "No"){
						question7AnswerScore = 1;
					}
					else if(question7.Yes_No__c == "Yes" || question7.Yes_No__c == "N/A"){
						question7AnswerScore = 0;
					}
					question7.Answer_Score__c = question7AnswerScore;
					webVerificationResponses.push(question7);
					
					var question8a = component.get('v.question8a');
					question8a.Question__c = component.get('v.questionNo8a');
					question8a.Name = '8a';
					var question8aDropdown = document.getElementById('question8aDropdown');
					question8a.Yes_No__c = question8aDropdown.options[question8aDropdown.selectedIndex].value;
					if(question8a.Yes_No__c == "No"){
						question8aAnswerScore = 1;
					}
					else if(question8a.Yes_No__c == "Yes" || question8a.Yes_No__c == "N/A"){
						question8aAnswerScore = 0;
					}
					question8a.Answer_Score__c = question8aAnswerScore;
					webVerificationResponses.push(question8a);
					
					var question8b = component.get('v.question8b');
					question8b.Question__c = component.get('v.questionNo8b');
					question8b.Name = '8b';
					var question8bDropdown = document.getElementById('question8bDropdown');
					question8b.Yes_No__c = question8bDropdown.options[question8bDropdown.selectedIndex].value;
					if(question8b.Yes_No__c == "No"){
						question8bAnswerScore = 1;
					}
					else if(question8b.Yes_No__c == "Yes" || question8b.Yes_No__c == "N/A"){
						question8bAnswerScore = 0;
					}
					question8b.Answer_Score__c = question8bAnswerScore;
					webVerificationResponses.push(question8b);
					
					var question8c = component.get('v.question8c');
					question8c.Question__c = component.get('v.questionNo8c');
					question8c.Name = '8c';
					var question8cDropdown = document.getElementById('question8cDropdown');
					question8c.Yes_No__c = question8cDropdown.options[question8cDropdown.selectedIndex].value;
					if(question8c.Yes_No__c == "No"){
						question8cAnswerScore = 1;
					}
					else if(question8c.Yes_No__c == "Yes" || question8c.Yes_No__c == "N/A"){
						question8cAnswerScore = 0;
					}
					question8c.Answer_Score__c = question8cAnswerScore;
					webVerificationResponses.push(question8c);
					
					var question8d = component.get('v.question8d');
					question8d.Question__c = component.get('v.questionNo8d');
					question8d.Name = '8d';
					var question8dDropdown = document.getElementById('question8dDropdown');
					question8d.Yes_No__c = question8dDropdown.options[question8dDropdown.selectedIndex].value;
					if(question8d.Yes_No__c == "No"){
						question8dAnswerScore = 1;
					}
					else if(question8d.Yes_No__c == "Yes" || question8d.Yes_No__c == "N/A"){
						question8dAnswerScore = 0;
					}
					question8d.Answer_Score__c = question8dAnswerScore;
					webVerificationResponses.push(question8d);
					
					var question8e = component.get('v.question8e');
					question8e.Question__c = component.get('v.questionNo8e');
					question8e.Name = '8e';
					var question8eDropdown = document.getElementById('question8eDropdown');
					question8e.Yes_No__c = question8eDropdown.options[question8eDropdown.selectedIndex].value;
					if(question8e.Yes_No__c == "No"){
						question8eAnswerScore = 1;
					}
					else if(question8e.Yes_No__c == "Yes" || question8e.Yes_No__c == "N/A"){
						question8eAnswerScore = 0;
					}
					question8e.Answer_Score__c = question8eAnswerScore;
					webVerificationResponses.push(question8e);
					
					var question9 = component.get('v.question9');
					question9.Question__c = component.get('v.questionNo9');
					question9.Name = '9';
					var question9Dropdown = document.getElementById('question9Dropdown');
					question9.Yes_No__c = question9Dropdown.options[question9Dropdown.selectedIndex].value;
					if(question9.Yes_No__c == "Yes"){
						question9AnswerScore = 1;
					}
					else if(question9.Yes_No__c == "No" || question9.Yes_No__c == "N/A"){
						question9AnswerScore = 0;
					}
					question9.Answer_Score__c = question9AnswerScore;
					webVerificationResponses.push(question9);
					
					var question10 = component.get('v.question10');
					question10.Question__c = component.get('v.questionNo10');
					question10.Name = '10';
					var question10Dropdown = document.getElementById('question10Dropdown');
					question10.Yes_No__c = question10Dropdown.options[question10Dropdown.selectedIndex].value;
					if(question10.Yes_No__c == "Egregiously No"){
						question10AnswerScore = 2;
					}
					else if(question10.Yes_No__c == "No"){
						question10AnswerScore = 1;
					}
					else if(question10.Yes_No__c == "Yes" || question10.Yes_No__c == "N/A"){
						question10AnswerScore = 0;
					}
					question10.Answer_Score__c = question10AnswerScore;
					webVerificationResponses.push(question10);
					
					helper.saveResponses(component,webVerificationResponses,icpWebVerificationObj,false);
					component.set('v.currentPage',component.get('v.currentPage')+1);
				}
			} else if(pagenum == 9){
				var dropdown11 = document.getElementById('question11Dropdown');
				var selectedOptionValue11 = dropdown11.options[dropdown11.selectedIndex].value;
				var save = false
				if(selectedOptionValue11=='Yes'){
					var question11ans = false;
					var question12 = false;
					
					var question12Dropdown = document.getElementById('question12Dropdown');
					
					if(component.get('v.question11.URL__c') == undefined || component.get('v.question11.URL__c') == null || component.get('v.question11.URL__c') == ""){
						component.set('v.Question11URLRequired',true);
						question11ans = false;
					}
					else{
						component.set('v.Question11URLRequired',false);
						question11ans = true;
					}
					
					if(question12Dropdown.options[question12Dropdown.selectedIndex].value == 'Yes'){
						if(component.get('v.question12.URL__c') == undefined || component.get('v.question12.URL__c') == null || component.get('v.question12.URL__c') == ""){
							component.set('v.Question12URLRequired',true);
							question12 = false;
						}
						else{
							component.set('v.Question12URLRequired',false);
							question12 = true;
						}
					}
					else{
						component.set('v.Question12URLRequired',false);
						question12 = true;
					}
					
					if(question11ans===true && question12 === true){
						save = true;
					}
					else{
						save = false;
					}
				}
				else{
					component.set('v.Question11URLRequired',false);
					helper.setPicklistValue(document.getElementById('question12Dropdown'),'N/A',allValues);
					save = true;
				}
				if(save === true){
					var webVerificationResponses = [];
					var question11AnswerScore = 0;
                    var question12AnswerScore = 0;
					
					var question11 = component.get('v.question11');
					question11.Question__c = component.get('v.questionNo11');
					question11.Name = '11';
					var question11Dropdown = document.getElementById('question11Dropdown');
					question11.Yes_No__c = question11Dropdown.options[question11Dropdown.selectedIndex].value;
					if(question11.Yes_No__c == "No"){
						question11AnswerScore = 1;
					}
					else if(question11.Yes_No__c == "Yes" || question11.Yes_No__c == "N/A"){
						question11AnswerScore = 0;
					}
					question11.Answer_Score__c = question11AnswerScore;
					webVerificationResponses.push(question11);
					
					var question12 = component.get('v.question12');
					question12.Question__c = component.get('v.questionNo12');
					question12.Name = '12';
					var question12Dropdown = document.getElementById('question12Dropdown');
					question12.Yes_No__c = question12Dropdown.options[question12Dropdown.selectedIndex].value;
					if(question12.Yes_No__c == "Yes"){
						question12AnswerScore = 1;
					}
					else if(question12.Yes_No__c == "No" || question12.Yes_No__c == "N/A"){
						question12AnswerScore = 0;
					}
					question12.Answer_Score__c = question12AnswerScore;
					webVerificationResponses.push(question12);
					
					helper.saveResponses(component,webVerificationResponses,icpWebVerificationObj,false);
					component.set('v.currentPage',component.get('v.currentPage')+1);
				}
			} else if(pagenum == 10){
				var dropdown13 = document.getElementById('question13Dropdown');
				var selectedOptionValue13 = dropdown13.options[dropdown13.selectedIndex].value;
				var dropdown14 = document.getElementById('question14Dropdown');
				var selectedOptionValue14 = dropdown14.options[dropdown14.selectedIndex].value;
				var dropdown15 = document.getElementById('question15Dropdown');
				var selectedOptionValue15 = dropdown15.options[dropdown15.selectedIndex].value;
				
				var question13 = false;
				var question14 = false;
				var question15 = false;
				
				if(selectedOptionValue13=='Yes' && (component.get('v.question13.URL__c') == undefined || component.get('v.question13.URL__c') == null || component.get('v.question13.URL__c') == "")){
				   component.set('v.Question13URLRequired',true);
				   question13 = false;
				}
				else{
					component.set('v.Question13URLRequired',false);
					question13 = true;
				}
				
				if(selectedOptionValue14=='Yes' && (component.get('v.question14.URL__c') == undefined || component.get('v.question14.URL__c') == null || component.get('v.question14.URL__c') == "")){
				   component.set('v.Question14URLRequired',true); 
					question14 = false;
				}
				else{
					component.set('v.Question14URLRequired',false);
					question14 = true;
				}
				
				if(selectedOptionValue15=='Yes' && (component.get('v.question15.URL__c') == undefined || component.get('v.question15.URL__c') == null || component.get('v.question15.URL__c') == "")){
				   component.set('v.Question15URLRequired',true);
					question15 = false;
				}
				else{
					component.set('v.Question15URLRequired',false);
					question15 = true;
				}
				
				if(question13 === true && question14 === true && question15 === true){
					var webVerificationResponses = [];
					var question13AnswerScore = 0;
                    var question14AnswerScore = 0;
                    var question15AnswerScore = 0;
					
					var question13 = component.get('v.question13');
					question13.Question__c = component.get('v.questionNo13');
					question13.Name = '13';
					var question13Dropdown = document.getElementById('question13Dropdown');
					question13.Yes_No__c = question13Dropdown.options[question13Dropdown.selectedIndex].value;
					if(question13.Yes_No__c == "No"){
						question13AnswerScore = 1;
					}
					else if(question13.Yes_No__c == "Yes" || question13.Yes_No__c == "N/A"){
						question13AnswerScore = 0;
					}
					question13.Answer_Score__c = question13AnswerScore;
					webVerificationResponses.push(question13);
					
					var question14 = component.get('v.question14');
					question14.Question__c = component.get('v.questionNo14');
					question14.Name = '14';
					var question14Dropdown = document.getElementById('question14Dropdown');
					question14.Yes_No__c = question14Dropdown.options[question14Dropdown.selectedIndex].value;
					if(question14.Yes_No__c == "No"){
						question14AnswerScore = 1;
					}
					else if(question14.Yes_No__c == "Yes" || question14.Yes_No__c == "N/A"){
						question14AnswerScore = 0;
					}
					question14.Answer_Score__c = question14AnswerScore;
					webVerificationResponses.push(question14);
					
					var question15 = component.get('v.question15');
					question15.Question__c = component.get('v.questionNo15');
					question15.Name = '15';
					var question15Dropdown = document.getElementById('question15Dropdown');
					question15.Yes_No__c = question15Dropdown.options[question15Dropdown.selectedIndex].value;
					if(question15.Yes_No__c == "No"){
						question15AnswerScore = 1;
					}
					else if(question15.Yes_No__c == "Yes" || question15.Yes_No__c == "N/A"){
						question15AnswerScore = 0;
					}
					question15.Answer_Score__c = question15AnswerScore;
					webVerificationResponses.push(question15);
					
					helper.saveResponses(component,webVerificationResponses,icpWebVerificationObj,false);
					component.set('v.currentPage',component.get('v.currentPage')+1);    
				}
			} else if(pagenum == 11){
				var dropdown16 = document.getElementById('question16Dropdown');
				var selectedOptionValue16 = dropdown16.options[dropdown16.selectedIndex].value;
				if(selectedOptionValue16=='Yes' && (component.get('v.question16.URL__c') == undefined || component.get('v.question16.URL__c') == null || component.get('v.question16.URL__c') == "")){
				   component.set('v.Question16URLRequired',true);
					//alert('I am here');
				}
				else{
					component.set('v.Question16URLRequired',false);
					var webVerificationResponses = [];
					var question16AnswerScore = 0;
					
					var question16 = component.get('v.question16');
					question16.Question__c = component.get('v.questionNo16');
					question16.Name = '16';
					var question16Dropdown = document.getElementById('question16Dropdown');
					question16.Yes_No__c = question16Dropdown.options[question16Dropdown.selectedIndex].value;
					if(question16.Yes_No__c == "No"){
						question16AnswerScore = 1;
					}
					else if(question16.Yes_No__c == "Yes" || question16.Yes_No__c == "N/A"){
						question16AnswerScore = 0;
					}
					question16.Answer_Score__c = question16AnswerScore;
					webVerificationResponses.push(question16);
					
					icpWebVerificationObj.Status__c = 'Submitted';
					helper.saveResponses(component,webVerificationResponses,icpWebVerificationObj,true);
					component.set('v.currentPage',component.get('v.currentPage')+1);
					$A.get('e.force:refreshView').fire();
					var recId = component.get("v.recordId");
					var recordId = recId;
					if(!recId){
						recordId = component.get("v.parentRecordId");
					}
					var navEvt = $A.get("e.force:navigateToSObject");
					navEvt.setParams({
						"recordId": recordId,
						"slideDevName": "related"
					});
					navEvt.fire();
					$A.get('e.force:refreshView').fire();
					
				}
			} else{
				component.set('v.currentPage',component.get('v.currentPage')+1);
			}
		}
        
    },
    
    goToPrevious : function(component, event, helper) {
        component.set('v.currentPage',component.get('v.currentPage')-1);
    },
    
    toggleQuestion2 : function(component, event, helper) {
        var dropdown = document.getElementById('question1Dropdown');
        var selectedOptionValue = dropdown.options[dropdown.selectedIndex].value;
        if(selectedOptionValue=='Yes'){
            component.set('v.showQuestion2',true);
        }
        else{
            component.set('v.showQuestion2',false);
        }
    },
    
    toggleQuestion4 : function(component, event, helper) {
        var dropdown = document.getElementById('question3Dropdown');
        var selectedOptionValue = dropdown.options[dropdown.selectedIndex].value;
        if(selectedOptionValue=='Yes'){
            component.set('v.showQuestion4',true);
        }
        else{
            component.set('v.showQuestion4',false);
        }
    },
    
    toggleQuestion8to10 : function(component, event, helper) {
        var dropdown = document.getElementById('question7Dropdown');
        var selectedOptionValue = dropdown.options[dropdown.selectedIndex].value;
        if(selectedOptionValue=='Yes'){
            component.set('v.showQuestion8to10',true);
        }
        else{
            component.set('v.showQuestion8to10',false);
        }
    },
    
    toggleQuestion12 : function(component, event, helper) {
        var dropdown = document.getElementById('question11Dropdown');
        var selectedOptionValue = dropdown.options[dropdown.selectedIndex].value;
        if(selectedOptionValue=='Yes'){
            component.set('v.showQuestion12',true);
        }
        else{
            component.set('v.showQuestion12',false);
        }
    },
    
    toggleQuestion6 : function(component, event, helper) {
        var dropdown = document.getElementById('question5Dropdown');
        var selectedOptionValue = dropdown.options[dropdown.selectedIndex].value;
        if(selectedOptionValue=='Yes'){
            component.set('v.showQuestion6',true);
        }
        else{
            component.set('v.showQuestion6',false);
        }
    },
    
    closeModel : function(component, event, helper){
        component.set('v.attachmentId',"");
        component.set('v.isOpen',false);
    },
    
	showQuestion1Attachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','1');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question1Attachment"));
    },
	
	showQuestion2aAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','2a');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question2aAttachment"));
    },
	
	showQuestion2bAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','2b');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question2bAttachment"));
    },
	
	showQuestion2cAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','2c');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question2cAttachment"));
    },
	
	showQuestion2dAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','2d');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question2dAttachment"));
    },
	
	showQuestion2eAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','2e');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question2eAttachment"));
    },
	
	showQuestion2fAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','2f');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question2fAttachment"));
    },
	
	showQuestion3Attachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','3');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question3Attachment"));
    },
	
	showQuestion4aAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','4a');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question4aAttachment"));
    },
	
	showQuestion4bAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','4b');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question4bAttachment"));
    },
	
	showQuestion4cAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','4c');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question4cAttachment"));
    },
	
	showQuestion4dAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','4d');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question4dAttachment"));
    },
	
	showQuestion4eAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','4e');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question4eAttachment"));
    },
	
	showQuestion5Attachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','5');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question5Attachment"));
    },
	
	showQuestion6aAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','6a');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question6aAttachment"));
    },
	
	showQuestion6bAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','6b');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question6bAttachment"));
    },
	
	showQuestion6cAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','6c');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question6cAttachment"));
    },
	
	showQuestion6dAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','6d');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question6dAttachment"));
    },
	
	showQuestion6eAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','6e');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question6eAttachment"));
    },
	
	showQuestion7Attachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','7');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question7Attachment"));
    },
	
	showQuestion8aAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','8a');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question8aAttachment"));
    },
	
	showQuestion8bAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','8b');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question8bAttachment"));
    },
    
	showQuestion8cAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','8c');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question8cAttachment"));
    },
	
	showQuestion8dAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','8d');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question8dAttachment"));
    },
	
	showQuestion8eAttachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','8e');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question8eAttachment"));
    },
	
	showQuestion9Attachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','9');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question9Attachment"));
    },
	
	showQuestion10Attachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','10');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question10Attachment"));
    },
	
	showQuestion11Attachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','11');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question11Attachment"));
    },
	
	showQuestion12Attachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','12');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question12Attachment"));
    },
	
	showQuestion13Attachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','13');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question13Attachment"));
    },
	
	showQuestion14Attachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','14');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question14Attachment"));
    },
	
	showQuestion15Attachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','15');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question15Attachment"));
    },
	
	showQuestion16Attachment: function(component, event, helper) {
		component.set('v.currentQuestionNo','16');
        helper.showAttachment(component,event.getSource().get('v.value'),component.get("v.question16Attachment"));
    },
	
    closeModal : function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
        /*var recId = component.get("v.recordId");
        var recordId = recId;
        if(!recId){
            recordId = component.get("v.parentRecordId");
        }
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recordId,
            "slideDevName": "related"
        });
        navEvt.fire();*/
		component.set("v.isOpenPopup",false);
        $A.get('e.force:refreshView').fire();
    },
    
    finalSubmit : function(component, event, helper) {
		var icpWebVerificationObj = component.get('v.icpWebVerificationObj');
        var dropdown16 = document.getElementById('question16Dropdown');
        var selectedOptionValue16 = dropdown16.options[dropdown16.selectedIndex].value;
		
        if(selectedOptionValue16=='Yes' && component.get('v.question16.URL__c') ==undefined){
            component.set('v.Question16URLRequired',true);
        }
        else{
            component.set('v.Question16URLRequired',false);
			var webVerificationResponses = [];
			var question16 = component.get('v.question16');
			question16.Question__c = component.get('v.questionNo16');
			question16.Name = '16';
			var question16Dropdown = document.getElementById('question16Dropdown');
			question16.Yes_No__c = question16Dropdown.options[question16Dropdown.selectedIndex].value;
			//question16.ICP_Web_Verification__c = record.id;
			webVerificationResponses.push(question16);
			
			icpWebVerificationObj.Status__c = 'Submitted';
			helper.saveResponses(component,webVerificationResponses,icpWebVerificationObj,true);
			//New lines added
			$A.get('e.force:refreshView').fire();
			/*var recId = component.get("v.recordId");
			var recordId = recId;
			if(!recId){
				recordId = component.get("v.parentRecordId");
			}
			var navEvt = $A.get("e.force:navigateToSObject");
			navEvt.setParams({
				"recordId": recordId,
				"slideDevName": "related"
			});
			navEvt.fire();*/
			component.set("v.isOpenPopup",false);
			$A.get('e.force:refreshView').fire();
        }
    },
    
    showHelpSection1: function(component, event, helper) {
        component.set("v.sectionName",'section1');
        helper.showHelpSection(component);
    },
    
    showHelpSection2: function(component, event, helper) {
        component.set("v.sectionName",'section2');
        helper.showHelpSection(component);
    },
    
    showHelpSection3: function(component, event, helper) {
        component.set("v.sectionName",'section3');
        helper.showHelpSection(component);
    },
    
    showHelpSection4: function(component, event, helper) {
        component.set("v.sectionName",'section4');
        helper.showHelpSection(component);
    },
    
    showHelpSection5: function(component, event, helper) {
        component.set("v.sectionName",'section5');
        helper.showHelpSection(component);
    },
    
    showHelpSection6: function(component, event, helper) {
        component.set("v.sectionName",'section6');
        helper.showHelpSection(component);
    },
    showHelpSection7: function(component, event, helper) {
        component.set("v.sectionName",'section7');
        helper.showHelpSection(component);
    },
    
    closeHelpSection: function(component, event, helper) {
        component.set("v.sectionName",'');
        component.set('v.showHelpSection',false);
        component.set('v.showMainSection',true);
    }
})