({
    getICPObj : function(component, event, helper){
        component.set('v.showSpinner',true);
        var action = component.get('c.getWebVerificationResponseObjects');
        action.setParams({
            'recordId': component.get('v.recordId')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var responseValue = response.getReturnValue();
                if(responseValue!=null && responseValue!=undefined){
                    if(responseValue.webVerificationObject!= null && responseValue.webVerificationObject.Status__c === $A.get("$Label.c.WebVerificationAssessmentStatus")){
                        if(responseValue.listOfCheckListValues!=null && responseValue.listOfCheckListValues!= undefined && responseValue.listOfCheckListValues.length == 4){
                            component.set('v.accountName',responseValue.listOfCheckListValues[0]);
                            component.set('v.opeId',responseValue.listOfCheckListValues[1]);
                            component.set('v.userName',responseValue.listOfCheckListValues[2]);
                            component.set('v.dateValue',responseValue.listOfCheckListValues[3]);
                        }
                        if(responseValue.listOfWebVerificationResponses!=null && responseValue.listOfWebVerificationResponses!=undefined && responseValue.listOfWebVerificationResponses.length > 0){
                            var total = 0;
                            var maxScore = 0;
                            for(var i in responseValue.listOfWebVerificationResponses){
                                total += responseValue.listOfWebVerificationResponses[i].QuestionScore__c;
                                maxScore += responseValue.listOfWebVerificationResponses[i].Max_Score__c;
                            }
                            var normalizedScore = Math.round( (total / maxScore * 100) * 100) / 100;
                            console.log(normalizedScore);
                            component.set('v.listOfResponses',responseValue.listOfWebVerificationResponses);
                            component.set('v.totalScore',total);
                            component.set('v.totalMaxScore',maxScore);
                            component.set('v.normalizedScore',normalizedScore);
                        }
                        else{
                            
                            $A.get("e.force:closeQuickAction").fire();
                            //component.set("v.showError",true);
                        }
                    }
                    else{
                        component.set("v.showError",true);
                    }
                }
            }
            component.set('v.showSpinner',false);
        });
        $A.enqueueAction(action);
    },
    
    convertArrayOfObjectsToCSV : function(component){
        var objectRecords = component.get('v.listOfResponses');
        var csvStringResult, counter, keys, columnDivider, lineDivider;

        // check if "objectRecords" parameter is null, then return from function
        if (objectRecords == null || !objectRecords.length) {
            return null;
        }

        // store ,[comma] in columnDivider variable for separate CSV values and
        // for start next line use '\n' [new line] in lineDivider variable
        columnDivider = ',';
        lineDivider =  '\n';
		
        // in the keys valirable store fields API Names as a key
        // this labels use in CSV file header
        keys = ['Name','Question__c','Picklist_options__c','Yes_No__c','Answer_Score__c','Question_Weight__c','QuestionScore__c','Max_Score__c' ];
        var headers = ['Question No','Question Text','Possible Answers','Answer','Answer Score','Question Weight','Question Score','Max Score'];
        var header1 = ['Instituition Name', 'OPEID','Compliance Analyst Name','Date'];
        var header2 = ['Total Score', 'Max Score','Normalized Score'];
        var opeId = '';
        if(component.get('v.opeId')!=undefined && component.get('v.opeId')!=null){
            opeId = component.get('v.opeId');
        }
        var header1Values=[component.get('v.accountName'),opeId,component.get('v.userName'),component.get('v.dateValue')];
        csvStringResult = '';
        csvStringResult += header1.join(columnDivider);
        csvStringResult += lineDivider;
        counter = 0;
        for(var i in header1Values){
            if(counter > 0){
                csvStringResult += columnDivider;
            }
            csvStringResult += '"'+ header1Values[i]+'"';
            counter++;
        }
        csvStringResult += lineDivider;
        csvStringResult += lineDivider;
        csvStringResult += headers.join(columnDivider);
        csvStringResult += lineDivider;

        for(var i=0; i < objectRecords.length; i++){
            counter = 0;

            for(var sTempkey in keys) {
                var skey = keys[sTempkey] ;
                // add , [comma] after every String value,. [except first]
                if(counter > 0){
                    csvStringResult += columnDivider;
                }

                csvStringResult += '"'+ objectRecords[i][skey]+'"';

                counter++;

            }

            csvStringResult += lineDivider;
        }
		csvStringResult += lineDivider;
        csvStringResult += header2.join(columnDivider);
        csvStringResult += lineDivider;
        var header2Values=[component.get('v.totalScore'),component.get('v.totalMaxScore'),component.get('v.normalizedScore')];
        counter = 0;
        for(var i in header2Values){
            if(counter > 0){
                csvStringResult += columnDivider;
            }
            csvStringResult += '"'+ header2Values[i]+'"';
            counter++;
        }
        return csvStringResult;
    },
})