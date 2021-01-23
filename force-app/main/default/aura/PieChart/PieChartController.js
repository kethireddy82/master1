({
    scriptsLoaded : function(component, event, helper) {
        var action = component.get("c.getAllTasksByStatus");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"  && response.getReturnValue()!=null) {               
                let val = response.getReturnValue() ;
                if(val != null)
                {                   
                    component.set("v.casesPresent", val.length);
                    var labelset=[] ;
                    var dataset=[] ;
                    val.forEach(function(key) {
                        labelset.push(key.label) ; 
                        dataset.push(key.count) ; 
                    });
                    /*     new Chart(document.getElementById("pie-chart"), {
                    type: 'pie',
                    data: {
                        labels:labelset,
                        datasets: [{
                            label: "Count of Case's",
                            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
                            data: dataset
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Total Cases by Status'
                        }
                    }
                }); */
                  if (val.length > 0)
                    {                    
                    	new Chart(document.getElementById("pie-chart"), {
                        type: 'doughnut',
                        data: {
                            labels:labelset,
                            datasets: [{
                                label: "Count of Case",
                                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
                                data: dataset
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                                text: 'Total Cases by Status'
                            }
                        }
                    });
                    }
                }
            }
        });
        $A.enqueueAction(action);        
    }
})