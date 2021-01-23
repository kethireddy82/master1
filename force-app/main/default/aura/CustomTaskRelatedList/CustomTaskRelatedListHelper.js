({
	setTaskList : function(component,taskList){
        component.set("v.listOfTask", taskList);
        var maxRecordToShow = Number(component.get("v.maxRecordToShow"));
        var listOfCasesLimited = [];
        var totalNumberOfRecords=0;
        
        component.set("v.startingRecordIndex",0);
        component.set("v.lastRecordIndex",maxRecordToShow-1);
        
        
        if(taskList!=null&&taskList!=undefined){
            component.set("v.totalNumberOfRecords", taskList.length);//setting the count of cases
            totalNumberOfRecords=taskList.length;
            if(taskList.length>0){
                //Display the component only when there are records available
                //component.set("v.showCases", true);
            }else{
                component.set("v.isError", true);
                component.set("v.ErrorMessage", 'No Task Exist');
            }
        }else{
            component.set("v.totalNumberOfRecords", 0);
            component.set("v.isError", true);
            component.set("v.ErrorMessage",'Open Task Exist');
        }
        //looping over the list
        for(var i=0; i< maxRecordToShow; i++)
        {
            if(i<totalNumberOfRecords){
                listOfCasesLimited.push(taskList[i]);  
            } 
        }
        component.set('v.listOfTaskLimited', listOfCasesLimited);//setting the initial cases to be displayed
        component.set("v.showSpinner", false);
    },
})