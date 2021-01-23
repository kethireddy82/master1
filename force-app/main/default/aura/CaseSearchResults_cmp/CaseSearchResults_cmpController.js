({
	setResult : function(component, event, helper) {
		var wrapperResponse = event.getParam("caseObj");
        if(wrapperResponse!=null && wrapperResponse!=undefined){
			component.set('v.caseObject',wrapperResponse);
            component.set('v.showCase',true);
            component.set('v.showCaseDetails',false);
            component.set('v.recordId','');
        }
	},
    
    clearList : function(component, event, helper) {
		component.set('v.showCase',false);
        component.set('v.showCaseDetails',false);
        component.set('v.recordId','');
	},
    
    viewCase : function(component, event, helper) {
        component.set('v.recordId',event.getSource().get('v.value'));
        event.getSource().set('v.variant','success');
        component.set('v.showCaseDetails',true);
	},
})