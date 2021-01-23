({
	doInit : function(component, event, helper) {
		var action = component.get('c.getPicklistValues'); 
        action.setParams({
            ObjectApi_name:'Case',
            Field_name:'Status'
        });
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            if(state == 'SUCCESS') {
                component.set('v.steps', a.getReturnValue());
            }
        });
        $A.enqueueAction(action);
        
        var actionCase = component.get('c.getCaseDetails'); 
        actionCase.setParams({
            caseRecordId:component.get('v.recordId')
        });
        actionCase.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            if(state == 'SUCCESS' && a.getReturnValue()!=null) {
                component.set('v.caseObject', a.getReturnValue());
            }
        });
        $A.enqueueAction(actionCase);
	}
})