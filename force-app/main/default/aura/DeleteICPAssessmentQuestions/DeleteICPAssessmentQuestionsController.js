({
	doInit : function(component, event, helper) {
		var action = component.get("c.getAssessMentsList");
         action.setParams({
        	ICPId: component.get('v.recordId')
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if(state === "SUCCESS"){
                if(JSON.parse(response.getReturnValue()).length >0){
                	component.set('v.data', JSON.parse(response.getReturnValue()));     
                } else {
                    component.set('v.ICPMessage','No New Assessment Found to delete');
                }
            	   
            }
            
        });
        $A.enqueueAction(action);
        
        component.set('v.columns', [
            {label: 'Assessment Name', fieldName: 'Name', type: 'text'},
            {label: 'Status', fieldName: 'Status__c', type: 'text'}
            ]);
            
	},
    updateSelectedText: function (cmp, event) {
        var selectedRows = event.getParam('selectedRows');
        cmp.set('v.assessmentlist', selectedRows);
    },
    deleteQuestions: function(component, event, helper) {
        var navService = component.find("navService");
        var action = component.get("c.deleteAssessmentQuestions");
         action.setParams({
        	ICPId: JSON.stringify(component.get('v.assessmentlist'))
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                if(response.getReturnValue() ==='success'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "type": "Success",
                        "message": "The records has been deleted successfully."
                    });
                    toastEvent.fire();
                    var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                        "recordId": component.get('v.recordId'),
                        "slideDevName": "Detail"
                    });
                    navEvt.fire(); 
                    
                } else {
                    component.set('v.ICPMessage',response.getReturnValue());
                }
            }
        });
        $A.enqueueAction(action);
    }
})