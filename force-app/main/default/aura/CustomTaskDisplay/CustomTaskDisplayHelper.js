({
    fetchTaskHelper : function(component, event, helper) {
        component.set('v.mycolumns', [
            {label: 'Subject', fieldName: 'Subject', type: 'text'},
                {label: 'Status', fieldName: 'Status', type: 'text'},
                {label: 'Priority', fieldName: 'Priority', type: 'text'},
                {label: 'Description ', fieldName: 'Description__c', type: 'text '},
            {label:'Due Date', fieldName:'ActivityDate', type:'date'},
            ]);
        var action = component.get("c.fetchTasks");
        action.setParams({
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.taskList", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
})