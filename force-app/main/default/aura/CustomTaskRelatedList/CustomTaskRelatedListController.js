({
	myAction : function(component, event, helper) {
		var action = component.get("c.fetchTasks");
        action.setParams({
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS" && response.getReturnValue()!=null) {
                var taskList = response.getReturnValue()
                component.set("v.listOfTask", taskList);
                if(taskList!=undefined && taskList!=''){
                    component.set("v.countOfTask", taskList.length);
                    helper.setTaskList(component,taskList);
                }
            }
        });
        $A.enqueueAction(action);
	},
    
    //Pagination Next Button Logic
    nextList : function(component, event, helper) 
    {
        var listOfCases = component.get("v.listOfTask");
        var lastRecordIndex = component.get("v.lastRecordIndex");
        var startingRecordIndex = component.get("v.startingRecordIndex");
        var maxRecordToShow = Number(component.get("v.maxRecordToShow"));
        var listOfCasesLimited = [];
        var counter = 0;
        
        for(var i=lastRecordIndex+1; i<lastRecordIndex+maxRecordToShow+1; i++)
        {	
            if(listOfCases.length > i)
            {
                listOfCasesLimited.push(listOfCases[i]);
                
            }
            counter ++ ;
        }
        startingRecordIndex = startingRecordIndex + counter;
        lastRecordIndex = lastRecordIndex + counter;
        
        component.set("v.startingRecordIndex",startingRecordIndex);
        component.set("v.lastRecordIndex",lastRecordIndex);
        
        component.set('v.listOfTaskLimited', listOfCasesLimited);
    },
    
    //Pagination Previous List button logic
    previousList : function(component, event, helper) 
    {
        var listOfCases = component.get("v.listOfTask");
        var lastRecordIndex = component.get("v.lastRecordIndex");
        var startingRecordIndex = component.get("v.startingRecordIndex");
        var maxRecordToShow = Number(component.get("v.maxRecordToShow"));
        var listOfCasesLimited = [];
        
        var counter = 0;
        for(var i= startingRecordIndex-maxRecordToShow; i < startingRecordIndex ; i++)
        {
            if(i > -1)
            {
                listOfCasesLimited.push(listOfCases[i]);
                counter ++;
            }
            else
            {
                startingRecordIndex++;
            }
        }
        startingRecordIndex = startingRecordIndex - counter;
        lastRecordIndex = lastRecordIndex - counter;
        
        component.set("v.startingRecordIndex",startingRecordIndex);
        component.set("v.lastRecordIndex",lastRecordIndex);
        component.set('v.listOfTaskLimited', listOfCasesLimited);
    },
})