({
    doInit : function(component, event, helper) { 
        // get the fields API name and pass it to helper function  
        var controllingFieldAPI = component.get("v.controllingFieldAPI");
        var dependingFieldAPI = component.get("v.dependingFieldAPI");
        var objDetails = component.get("v.objDetail");
        // call the helper function
        helper.fetchPicklistValues(component,objDetails,controllingFieldAPI, dependingFieldAPI);
    },
    showValidation: function(component, event, helper) {
        component.set("v.IsCategoryNotFilled",true);
    },
    
    onControllerFieldChange: function(component, event, helper) {     
        var controllerValueKey = event.getSource().get("v.value"); 
    component.set("v.IsCategoryNotFilled",false);
        component.set("v.CategorySelected",true);
        if(controllerValueKey === 'Complaint'){
        	component.set("v.CategoryDescription" , 'This is for Complaint');    
        }
        if(controllerValueKey === 'Department of Education'){
        	component.set("v.CategoryDescription" , 'Department of Education');    
        }
        if(controllerValueKey === 'DoD MOU'){
        	component.set("v.CategoryDescription" , 'DoD MOU');    
        }
        if(controllerValueKey === 'General'){
        	component.set("v.CategoryDescription" , 'This is for General');    
        }
        if(controllerValueKey === 'Institutional Compliance Program'){
        	component.set("v.CategoryDescription" , 'Institutional Compliance Program');    
        }
        if(controllerValueKey === 'OSD/ Policy/Process'){
        	component.set("v.CategoryDescription" , 'OSD/ Policy/Process');    
        }
        if(controllerValueKey === 'Service/Policy/Process'){
        	component.set("v.CategoryDescription" , 'This is for Service/ Policy/Process');    
        } 
        if(controllerValueKey === 'VA'){
        	component.set("v.CategoryDescription" , 'VA');    
        }
        if(controllerValueKey === '--- None ---'){
            component.set("v.CategorySelected",false);
            component.set("v.IsCategoryNotFilled",true);
        	//component.set("v.CategoryDescription" , 'This is for Service/ Policy/Process');    
        } 	
            // get selected controller field value
        var depnedentFieldMap = component.get("v.depnedentFieldMap");
        
        if (controllerValueKey != '--- None ---') {
            var ListOfDependentFields = depnedentFieldMap[controllerValueKey];
            
            if(ListOfDependentFields.length > 0){
                component.set("v.bDisabledDependentFld" , false);  
                helper.fetchDepValues(component, ListOfDependentFields);    
            }else{
                component.set("v.bDisabledDependentFld" , true); 
                component.set("v.listDependingValues", ['--- None ---']);
            }  
            
        } else {
            component.set("v.listDependingValues", ['--- None ---']);
            component.set("v.bDisabledDependentFld" , true);
        }
        var onChange = component.getEvent('onChange');
		onChange.setParams({
			fieldLabel: component.find('conCountry').get('v.label'),
			fieldValue: component.find('conCountry').get('v.value')
		});
		onChange.fire();
    },
    handleChange: function (cmp, event) {
        // This will contain an array of the "value" attribute of the selected options
        var selectedOptionValue = event.getParam("value");
        //alert("Option selected with value: '" + selectedOptionValue.toString() + "'");
        var onChangeDependent = cmp.getEvent('onChangeDependent');
		onChangeDependent.setParams({
			fieldLabel: "",
			fieldValue: selectedOptionValue.toString()
		});
		onChangeDependent.fire();
    }
})