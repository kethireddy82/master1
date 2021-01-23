({
    fetchAccHelper : function(component, event, helper) {
        component.set('v.mycolumns', [
            {label: 'Account Name', fieldName: 'Status', type: 'text'},
                {label: 'TaskSubType', fieldName: 'TaskSubtype', type: 'text'},
                {label: 'Subject', fieldName: 'Subject', type: 'text'}
            ]);
        var action = component.get("c.fetchTasks");       
        action.setParams({
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.acctList", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
})