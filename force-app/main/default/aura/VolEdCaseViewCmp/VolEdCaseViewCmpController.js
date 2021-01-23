({
	 doInit : function(component, event, helper)  {
        var action = component.get('c.CaseInfo');
        action.setParams({
            
            "recordId" : component.get('v.recordId')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            console.log(state);
            if(state === "SUCCESS"){
                var rest = JSON.parse(response.getReturnValue())
                	component.set("v.cse",rest)
                }
        });
         $A.enqueueAction(action);
     }, 
    navigateToAccount: function(component, event, helper)  {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": component.get('v.cse.Account.Id'),
            "slideDevName": "Detail"
        });
        navEvt.fire();
    },
    navigateToContact: function(component, event, helper)  {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": component.get('v.cse.Contact.Id'),
            "slideDevName": "Detail"
        });
        navEvt.fire();
    }
})