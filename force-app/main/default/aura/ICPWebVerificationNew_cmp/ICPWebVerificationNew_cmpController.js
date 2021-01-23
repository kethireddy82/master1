({
	doInit : function(component, event, helper) {
        component.set('v.showSpinner',true);
		var action = component.get('c.getICPObject');
        action.setParams({
            'recordId' : component.get('v.recordId')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                if(response.getReturnValue()!=null && response.getReturnValue()!=undefined){
                    component.set('v.icpObject',response.getReturnValue());
                    if(response.getReturnValue().Assessment__r!=null && response.getReturnValue().Assessment__r!=undefined){
                        
                        /*else if(response.getReturnValue().Assessment__r[0].Status__c == $A.get("$Label.c.WebVerificationAssessmentStatus")){
                            component.set('v.showMessage',true);
                            component.set('v.showRatingMessage',false);
                        }*/
                        if(response.getReturnValue().Status__c == $A.get("$Label.c.CompletedStatus")){
                            component.set('v.showMessage',true);
                            component.set('v.showRatingMessage',false);
                        }
                        else if(response.getReturnValue().Status__c != $A.get("$Label.c.ReadyForWebVerification")){
                            component.set('v.showMessage',false);
                            component.set('v.showRatingMessage',true);
                        }
                        else{
                            component.set('v.showMessage',false);
                            component.set('v.showRatingMessage',false);
                            var appEvent = $A.get("e.c:WebVerificationPopupOpen_Event");
                            appEvent.setParams({ 
                                "icpObject" : component.get('v.icpObject'),
                                "readOnly" : false,
                            	"recordId" : component.get("v.recordId")
                            });
                            appEvent.fire();
                            $A.get("e.force:closeQuickAction").fire();
                        }
                    }
                    else{
                       	component.set('v.showMessage',false);
                        component.set('v.showMessage',false);
                        var appEvent = $A.get("e.c:WebVerificationPopupOpen_Event");
                        appEvent.setParams({ 
                            "icpObject" : component.get('v.icpObject'),
                            "readOnly" : false,
                            "recordId" : component.get("v.recordId")
                        });
                        appEvent.fire();
                        $A.get("e.force:closeQuickAction").fire();
                    }
                }
            }
            component.set('v.showSpinner',false);
        });
        $A.enqueueAction(action);
	},
    
    openRecord : function(component,event,helper){
        event.preventDefault();
        component.set('v.showMessage',false);
        var appEvent = $A.get("e.c:WebVerificationPopupOpen_Event");
        appEvent.setParams({ 
            "icpObject" : component.get('v.icpObject'),
            "readOnly" : true,
            "recordId" : component.get("v.recordId")
        });
        appEvent.fire();
        $A.get("e.force:closeQuickAction").fire();
    }
})