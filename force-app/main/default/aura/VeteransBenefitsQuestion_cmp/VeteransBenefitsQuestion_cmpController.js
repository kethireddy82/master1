({
    doInit : function(component,event,helper){
        window.addEventListener("message", function(event) {
            if (event.data==="Unlock"){            	
              	component.set('v.hideSubmitButton', false);
            }            
        }, false); 
    },
    
    hideAlert : function(component, event, helper) {
		component.set('v.showAlert',false);
	},
    
    hideAlert1 : function(component, event, helper) {
		component.set('v.showAlertOnYes',false);
	},
    
    submit : function(component, event, helper) {
		var caseObj = component.get('v.caseObj');
        var contactObj = component.get('v.contactObj');
        var educationalBenefitsList = '';
        var educationalBenefitsListSelected = component.get('v.educationalBenefitsList');
        var issuesList = '';
        var issuesListSelected = component.get('v.issuesList');
        if(educationalBenefitsListSelected!=null && educationalBenefitsListSelected!=undefined && educationalBenefitsListSelected.length > 0){
            var values = '';
            for(var i in educationalBenefitsListSelected){
                educationalBenefitsList = educationalBenefitsList.concat(educationalBenefitsListSelected[i].concat(';'));
            }
            caseObj.Education_Benefits_Currently_Using__c = educationalBenefitsList.substring(0,educationalBenefitsList.length - 1);
        }
        if(issuesListSelected!=null && issuesListSelected!=undefined && issuesListSelected.length > 0){
            var values = '';
            for(var i in issuesListSelected){
                issuesList = issuesList.concat(issuesListSelected[i].concat(';'));
            }
            caseObj.Which_best_describes_your_issue__c = issuesList.substring(0,issuesList.length - 1);
        }
        caseObj.Steps_taken_to_resolve_the_issue__c = component.get('v.textArea1');
        caseObj.Resolution_for_the_issue__c = component.get('v.textArea2');
        if(component.get('v.showFieldForMyself')){
            caseObj.Filed_on_behalf_of__c = 'Myself';
            contactObj.Service_Affiliation__c = component.get('v.serviceAffiliation1');
			caseObj.Filed_By_Affiliation__c = component.get('v.serviceAffiliation1');
			
            contactObj.MyCAA__c = component.get('v.myCAAStudent1');
            if(component.get('v.showMYCAA')){
               contactObj.Service_Status__c = component.get('v.sponsorServiceStatus');
			   caseObj.Filed_By_Service_Status__c = component.get('v.sponsorServiceStatus');
			}
            else{
            	contactObj.Service_Status__c = component.get('v.serviceStatus');
				caseObj.Filed_By_Service_Status__c = component.get('v.serviceStatus');
			}
            contactObj.Branch__c = component.get('v.branch1');
            contactObj.Pay_Grade__c = component.get('v.payGrade1');
            contactObj.Age__c = component.get('v.age1');
			
			caseObj.Filed_By_Branch__c = component.get('v.branch1');
			caseObj.Filed_By_Pay_Grade__c = component.get('v.payGrade1');
			caseObj.Filed_By_Age__c = component.get('v.age1');
			
			
			
			
			caseObj.Filed_By_Service_Status__c = component.get('v.complainantServiceStatus');
        }
        else{
            caseObj.Filed_on_behalf_of__c = 'Someone Else';
			caseObj.Filed_Behalf_First_Name__c = component.get('v.newContactFirstName');
			caseObj.Filed_Behalf_Last_Name__c = component.get('v.newContactLastName');
			caseObj.Filed_Behalf_Phone_Number__c = component.get('v.complaintTelephone');
			caseObj.Filed_Behalf_Email__c = component.get('v.complainantEmail1');
			caseObj.Filed_Behalf_Pay_Grade__c = component.get('v.complainantPayGrade');
			caseObj.Filed_Behalf_Branch__c = component.get('v.sponsorBatch');
			caseObj.Filed_Behalf_Age__c = component.get('v.complainantAge');
			caseObj.Filed_Behalf_Affiliation__c = component.get('v.serviceAffiliationForOther');
			caseObj.Filed_Behalf_Street1__c = component.get('v.complaintStreet1');
			caseObj.Filed_Behalf_Street2__c = component.get('v.complaintStreet2');
			caseObj.Filed_Behalf_City__c = component.get('v.complaintCity');
			caseObj.Filed_Behalf_State__c = component.get('v.complaintState');
			caseObj.Filed_Behalf_Country__c = component.get('v.complaintCountry');
			caseObj.Filed_Behalf_Zip__c = component.get('v.complaintZip');
			caseObj.Filed_Behalf_Service_Status__c = component.get('v.complainantServiceStatus');
        }
        contactObj.Title = component.get('v.salutationValue');
        contactObj.FirstName = component.get('v.fname');
        contactObj.LastName = component.get('v.lname');
        contactObj.MailingStreet = component.get('v.street1').concat(' ').concat(component.get('v.street2'));
        contactObj.MailingCity = component.get('v.city');
        contactObj.MailingState = component.get('v.state');
        contactObj.MailingCountry = component.get('v.country');
        contactObj.MailingPostalCode = component.get('v.zip');
        contactObj.Phone = component.get('v.telNo');
        contactObj.Email = component.get('v.email');
        contactObj.Email_Upsert_Field__c = component.get('v.email');
		caseObj.Filed_By_First_Name__c = component.get('v.fname');
		caseObj.Filed_By_Last_Name__c = component.get('v.lname');
		caseObj.Filed_By_Phone_Number__c = component.get('v.telNo');
		caseObj.Filed_By_Email__c = component.get('v.email');
		caseObj.Filed_By_Street1__c = component.get('v.street1');
		caseObj.Filed_By_Street2__c = component.get('v.street2');
		caseObj.Filed_By_City__c = component.get('v.city');
		caseObj.Filed_By_State__c = component.get('v.state');
		caseObj.Filed_By_Country__c = component.get('v.country');
		caseObj.Filed_By_Zip__c =  component.get('v.zip');
		
        component.set('v.spinner',true);
        var action = component.get('c.createCase');
        action.setParams({
            'caseObj' : caseObj,
            'contactObj' : contactObj,
            'schoolId' : component.get('v.selectedSchool').Id
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue()!=null && response.getReturnValue()!=undefined){
                    component.set('v.CaseIsSubmitted',true);
                    
                    /*var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                      "recordId": response.getReturnValue(),
                      "slideDevName": "related"
                    });
                    navEvt.fire();*/
                }
            }
            component.set('v.spinner',false);
        });
        $A.enqueueAction(action);
	},
    
    hideAlertAndRedirect1 : function(component, event, helper){
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
          "url": 'https://www.google.com/'
        });
        urlEvent.fire();
        component.set('v.showAlertOnYes',false);
    },
    
    handleClick : function(component,event,helper){
        component.set('v.showAlertOnYes',true);
    },
    
    cancel : function(component, event, helper){
        var homeEvent = $A.get("e.force:navigateToObjectHome");
        homeEvent.setParams({
            "scope": "Case"
        });
        homeEvent.fire();
    },
    
    checkRadioButtonValue : function(component, event, helper) {
        if(document.getElementById("radio-three").checked){
            component.set("v.showFieldForMyself",true);
            component.set('v.showServiceStatusPicklist',false);
            component.set('v.showComplainantInfo',false);
        	component.set('v.showMYCAA',false);
        }
        else{
            component.set("v.showFieldForMyself",false);
			var contactList = component.get('v.contactList');
			if(contactList == null || contactList == undefined || contactList.length == 0){
				component.set('v.spinner',true);
				var action = component.get('c.fetchContacts');
				action.setCallback(this, function(response) {
					var state = response.getState();
					if (state === "SUCCESS") {
						if(response.getReturnValue()!=null && response.getReturnValue()!=undefined){
							component.set('v.contactList',response.getReturnValue());
						}
					}
					component.set('v.spinner',false);
				});
				$A.enqueueAction(action);
			}
            component.set('v.showServiceStatusPicklistForOther',false);
        	component.set('v.showMYCAAForOther',false);
            var val = component.get("v.complainantName");
            if(val == component.get("v.notListed")){
                component.set("v.showComplainantInfo",true);
            }
            else{
                component.set("v.showComplainantInfo",false);
            }
        }
	},
    
    hideAlertAndRedirect : function(component, event, helper) {
		component.set('v.showAlert',false);
        component.set('v.pageNo','page5');
        //Adding function for chevron functionality
        var records = [{'key':1,'val':'1. Contact & Complainant','width':'25%','cssClass':'active'},{'key':2,'val':'2. Education Benefits & Issue','width':'25%','cssClass':''},{'key':3,'val':'3. Complaint','width':'25%','cssClass':''},{'key':4,'val':'4. Education','width':'25%','cssClass':''}];
        component.set('v.records',records);
	},
    
    showAlert : function(component, event, helper) {
		component.set('v.showAlert',true);
	},
    
    redirectToAuthenticate : function(component, event, helper) {
		
	},
    
    doNothing : function(component,event,helper){
        event.preventDefault();
    },
    
    goBackToSection2 : function(component,event,helper){
        component.set("v.sectionName","educationBenefits");
        //helper.showAppropriateHighlighting(component,'educationBenefitsInfo','complaintInfo');
        helper.showAppropriateHighlighting(component,2);
        window.scrollTo(0, 0);
    },
    
    hideConsentMessage : function(component,event,helper){
        component.set('v.showConsentMessage',false);
    },
    
    goToPage1 : function(component,event,helper){
        component.set('v.pageNo','page1');
        window.scrollTo(0, 0);
    },
    
    goToPage2 : function(component,event,helper){
        component.set('v.pageNo','page2');
        window.scrollTo(0, 0);
    },
    
    goToPage3 : function(component,event,helper){
        component.set('v.pageNo','page3');
        window.scrollTo(0, 0);
    },
 
    goToSection2 : function(component, event, helper) {
        var validForm = component.find('contactAndComplainantForm').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        var verifyEmail = component.find('contactAndComplainantForm')[11];
        if(component.find('contactAndComplainantForm')[10].get('v.value').toLowerCase() != verifyEmail.get('v.value').toLowerCase()){
            validForm = false;
            verifyEmail.setCustomValidity("The emails do not match");
            verifyEmail.focus();
        }
        else{
            validForm = true;
            verifyEmail.setCustomValidity("");
        }
        verifyEmail.reportValidity();
        // If we pass error checking, do some real work
        if(validForm){
            component.set("v.sectionName","educationBenefits");
            //helper.showAppropriateHighlighting(component,'educationBenefitsInfo','complaintInfo');
            helper.showAppropriateHighlighting(component,2);
            window.scrollTo(0, 0);
        }
	},
	
	createContact : function(component, event, helper){
		var validForm = component.find('newContactForm').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
		if(validForm){
			var newContactObj = component.get('v.newContactObj');
			newContactObj.FirstName = component.get('v.newContactFirstName');
			newContactObj.LastName = component.get('v.newContactLastName');
			newContactObj.MailingStreet = component.get('v.complaintStreet1')+ ' ' +component.get('v.complaintStreet2');
			newContactObj.MailingCity = component.get('v.complaintCity');
			newContactObj.MailingState = component.get('v.complaintState');
			newContactObj.MailingCountry = component.get('v.complaintCountry');
			newContactObj.Phone = component.get('v.complaintTelephone');
			newContactObj.MailingPostalCode = component.get('v.complaintZip');
			newContactObj.Email = component.get('v.complainantEmail1');
			newContactObj.Service_Status__c = component.get('v.complainantServiceStatus');
            component.set('v.serviceStatusForOther',component.get('v.complainantServiceStatus'));
			newContactObj.Branch__c = component.get('v.sponsorBatch');
			newContactObj.Pay_Grade__c = component.get('v.complainantPayGrade');
			newContactObj.Age__c = component.get('v.complainantAge');
			component.set('v.spinner',true);
			var action = component.get('c.createContactObject');
			action.setParams({
				'contactObj' : newContactObj
			});
			action.setCallback(this, function(response) {
				var state = response.getState();
				if (state === "SUCCESS") {
					if(response.getReturnValue()!=null && response.getReturnValue()!=undefined){
						var contactList = component.get('v.contactList');
						component.set('v.complainantName',response.getReturnValue());
						newContactObj.Id = response.getReturnValue();
						contactList.push(newContactObj);
						component.set('v.contactList',contactList);
						
						component.set("v.contactPopup",false);
					}
				}
				component.set('v.spinner',false);
			});
			$A.enqueueAction(action);
		}
	},
    
    goToSection3 : function(component, event, helper) {
        helper.showAppropriateHighlighting(component,3);
        var isValid = true;
        var list1 = [];
        var list2 = [];
        var count1 = 0;
        var count2 = 0;
        component.set('v.educationalBenefitsList',[]);
        component.set('v.issuesList',[]);
        var militaryTuitionAssistance = component.find('educationBenefitsIssuesList');
        for(var i in militaryTuitionAssistance){
            if(militaryTuitionAssistance[i].get('v.checked')){
                list1.push(militaryTuitionAssistance[i].get('v.value'));
                count1++;
            }
        }  
        var issueDescription = component.find('issueDescription');
        for(var i in issueDescription){
            if(issueDescription[i].get('v.checked')){
                list2.push(issueDescription[i].get('v.value'));
                count2++;
            }
        }
        if(count1==0 || count2==0)
            isValid = false;
        if(count1==0){
            component.set('v.error1',true);
        }
        else{
            component.set('v.error1',false);
        }
        if(count2==0){
            component.set('v.error2',true);
        }
        else{
            component.set('v.error2',false);
        }
        if(isValid){
            component.set('v.educationalBenefitsList',list1);
            component.set('v.issuesList',list2);
            component.set("v.sectionName","complaint");
            window.scrollTo(0, 0);
        }
	},
    
    showChars1: function(component, event, helper) {
        var charsRemaining = 1000 - component.get("v.textArea1").length;
        component.set('v.charsRemainingForTextArea1',charsRemaining);
    },
    
     showChars2: function(component, event, helper) {
        var charsRemaining = 1000 - component.get("v.textArea2").length;
        component.set('v.charsRemainingForTextArea2',charsRemaining);
    },
    
    goToSection1 : function(component, event, helper) {
		component.set("v.sectionName","contactAndComplainant");
        //helper.showAppropriateHighlighting(component,'educationBenefitsInfo','');
        helper.showAppropriateHighlighting(component,1);
        window.scrollTo(0, 0);
	},
    
    goBackToSection4 : function(component, event, helper) {
        component.set("v.sectionName","education");
        helper.showAppropriateHighlighting(component,4);
        window.scrollTo(0, 0);
	},
    
    goToSection4 : function(component, event, helper) {
        var isValid = true;
        var text1 = component.find('complaintInfo')[0];
        var text2 = component.find('complaintInfo')[1];
        if(component.get("v.textArea1").length == 0){
            isValid = false;
            text1.setCustomValidity("Complete this field.");
            text1.focus();
        }
        else{
            text1.setCustomValidity("");
        }
        if(component.get("v.textArea2").length == 0){
            isValid = false;
            text2.setCustomValidity("Complete this field.");
            text2.focus();
        }
        else{
            text2.setCustomValidity("");
        }
        text1.reportValidity();
        text2.reportValidity();
        if(isValid){
            var schoolList = component.get('v.schoolList');
            if(schoolList == null || schoolList == undefined || schoolList.length == 0){
                var action = component.get('c.getSchoolList');
                component.set('v.spinner',true);
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        if(response.getReturnValue()!=null && response.getReturnValue()!=undefined){
                            component.set('v.schoolList',response.getReturnValue());
                            console.log(response.getReturnValue());
                        }
                    }
                    component.set('v.spinner',false);
                });
                $A.enqueueAction(action);
            }
            component.set("v.sectionName","education");
            helper.showAppropriateHighlighting(component,4);
            window.scrollTo(0, 0);
        }
	},
    
    goToSummary : function(component, event, helper) {
        var validForm = component.find('schoolInfo').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if(validForm){
            component.set("v.sectionName","summary");
            window.scrollTo(0, 0);
            component.set('v.hideSubmitButton',true);
        }
	},
    
    serviceAffiliationChange : function(component, event, helper) {
        var val = component.get('v.serviceAffiliation1');
        if(val == 'Service Member'){
            component.set('v.showServiceStatusPicklist',true);
            component.set('v.showMYCAA',false);
        }
        else if(val == 'Spouse or Family Member'){
            component.set('v.showServiceStatusPicklist',false);
            component.set('v.showMYCAA',true);
        }
        else{
        	component.set('v.showServiceStatusPicklist',false);
            component.set('v.showMYCAA',false);
        }
    },
    
    serviceAffiliationChangeForOthers : function(component, event, helper) {
        var val = component.get('v.serviceAffiliationForOther');
        if(val == 'Service Member'){
            component.set('v.showServiceStatusPicklistForOther',true);
            component.set('v.showMYCAAForOther',false);
        }
        else if(val == 'Spouse or Family Member'){
            component.set('v.showServiceStatusPicklistForOther',false);
            component.set('v.showMYCAAForOther',true);
        }
        else{
        	component.set('v.showServiceStatusPicklistForOther',false);
            component.set('v.showMYCAAForOther',false);
        }
    },
    
	hideContactPopup : function(component,event,helper){
		component.set("v.contactPopup",false);
		component.set("v.complainantName","");
	},
	
    complainantNameChange : function(component, event, helper) {
        var val = component.get("v.complainantName");
        if(val == component.get("v.notListed")){
            component.set("v.showComplainantInfo",true);
            component.set('v.caseFiledOnBehalfOfContact',{});
			component.set("v.contactPopup",false);
        }
		else if(val === "Create New Contact"){
			component.set("v.showComplainantInfo",false);
			component.set("v.contactPopup",true);
		}
        else{
			component.set("v.contactPopup",false);
            component.set("v.showComplainantInfo",false);
            var contactList = component.get('v.contactList');
            var complainantName = component.get('v.complainantName');
            if(contactList!=null && contactList != undefined){
                for(var i in contactList){
                    if(contactList[i].Id === complainantName){
                        component.set('v.caseFiledOnBehalfOfContact',contactList[i]);
						component.set('v.complaintStreet1',contactList[i].MailingStreet);
						component.set('v.complaintCity',contactList[i].MailingCity);
						component.set('v.complaintState',contactList[i].MailingState);
						component.set('v.complaintCountry',contactList[i].MailingCountry);
						component.set('v.complaintTelephone',contactList[i].Phone);
						component.set('v.complaintZip',contactList[i].MailingPostalCode);
						component.set('v.complainantEmail1',contactList[i].Email);
						component.set('v.complainantEmail2',contactList[i].Email);
						component.set('v.serviceStatusForOther',contactList[i].Service_Status__c);
						component.set('v.complainantServiceStatus',contactList[i].Service_Status__c);
						component.set('v.sponsorBatch',contactList[i].Branch__c);
						component.set('v.complainantPayGrade',contactList[i].Pay_Grade__c);
						component.set('v.complainantAge',contactList[i].Age__c);
						component.set('v.serviceAffiliationForOther',contactList[i].Service_Affiliation__c);
                        break;
                    }                
            	}
            }
        }
    },
    
    setMyCAA1ToYes : function(component,event,helper){
        component.set('v.myCAAStudent1','Yes');
    },
    
    setMyCAA1ToNo : function(component,event,helper){
        component.set('v.myCAAStudent1','No');
    },
    
    setMyCAA2ToYes : function(component,event,helper){
        component.set('v.myCAAStudent2','Yes');
    },
    
    setMyCAA2ToNo : function(component,event,helper){
        component.set('v.myCAAStudent2','No');
    },
    
    selectSchool : function(component,event,helper){
        var val = event.getSource().get('v.value');
        var schoolList = component.get('v.schoolList')
        for(var i in schoolList){
            if(schoolList[i].Id == val){
                component.set('v.selectedSchool',schoolList[i]);
                if(schoolList[i].BillingStreet!=null && schoolList[i].BillingStreet!=undefined)
                    component.set('v.schoolStreet1',schoolList[i].BillingStreet);
                if(schoolList[i].BillingCity!=null && schoolList[i].BillingCity!=undefined)
                    component.set('v.schoolCity',schoolList[i].BillingCity);
                if(schoolList[i].BillingState!=null && schoolList[i].BillingState!=undefined)
                    component.set('v.schoolState',schoolList[i].BillingState);
                if(schoolList[i].BillingCountry!=null && schoolList[i].BillingCountry!=undefined)
                    component.set('v.schoolCountry',schoolList[i].BillingCountry);
                if(schoolList[i].BillingPostalCode!=null && schoolList[i].BillingPostalCode!=undefined)
                    component.set('v.schoolZip',schoolList[i].BillingPostalCode);
                break;
            }
        }
    },
    
    goBack : function(component,event,helper){
        component.set('v.pageNo','page3');
    }
})