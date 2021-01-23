({
	doInit : function(component, event, helper) {
		helper.fetchResponse(component);
	},
    
    goToPrevious : function(component, event, helper){
        var currentQuestion = component.get("v.currentQuestion");
        component.set("v.currentQuestion",currentQuestion-1);
		helper.setPreviousAndCurrentRatings(component,currentQuestion-2);
    },
    
    goToNext : function(component, event, helper){
        var currentQuestion = component.get("v.currentQuestion");
		var lastQuestion = component.get("v.lastQuestion");
        component.set("v.currentQuestion",currentQuestion+1);
		if(currentQuestion+1!=lastQuestion){
			helper.setPreviousAndCurrentRatings(component,currentQuestion);
		}
		else{
			helper.setReviewTableValues(component);
		}
    },
    
    checkRating : function(component,event,helper){
        var currentQuestion = component.get("v.currentQuestion");
        var assessmentQuestions = component.get("v.assessmentQuestions");
        var questionId = assessmentQuestions[currentQuestion-1].questionId;
    	var rating = component.get("v.rating");
        var ratings = component.get("v.ratings");
        if(ratings!=null && ratings!=undefined){
            for(var i = 0 ;  i < ratings.length ; i++){
                if(ratings[i].questionId == questionId){
                    ratings[i].rating = rating;
                    break;
                }
            }
            component.set("v.ratings",ratings);
        }
	},
 
    finalSubmit : function(component,event,helper){
        var ratings = component.get("v.ratings");
        var mainResponseWrapper = '{"ratingResponse":'+JSON.stringify(ratings)+'}';
        var saveResponse = component.get("c.saveRatings");
        saveResponse.setParams({
            "ratingsData" : mainResponseWrapper,
            "recordId" : component.get('v.recordId')
        });
        saveResponse.setCallback(this,function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
                $A.get("e.force:closeQuickAction").fire();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Success!',
                    message : 'Your response was submitted successfully',
                    type: 'success'
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
            }
            if(state == "ERROR"){
                var errors = a.getError();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error!',
                    message : errors[0].pageErrors[0].message,
                    type: 'error'
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(saveResponse);
    },
    
    printTableData : function(component,event,helper){
        //var printData = '<html><body><h1>'+component.get("v.assessmentRecord").Name+'</h1><br/>'+document.getElementById('printContent').innerHTML+'</body></html>';
        var printDataValue = {};
		printDataValue = {result:[]};
        var arrayList = [];
        var reviewTableValues = component.get('v.reviewTableValues');
        for(var i = 0 ; i < reviewTableValues.length ; i++){
            var printDataResult = {};
			printDataResult = {no:'',question:'',response:'',rating:'',multipleChoice:false,responses:[]};
            printDataResult.no = reviewTableValues[i].no;
            printDataResult.question = reviewTableValues[i].question;
            printDataResult.response = reviewTableValues[i].response;
            printDataResult.rating = reviewTableValues[i].rating;
            printDataResult.multipleChoice = reviewTableValues[i].multipleChoice;
            printDataResult.responses = reviewTableValues[i].responses;
            arrayList.push(printDataResult);
        }
        printDataValue.result = arrayList;
        var printData = printDataValue;
        component.set("v.showSpinner",true);
        var print = component.get("c.printTable");
        print.setParams({
            "recordId" : component.get("v.recordId"),
            "data" : JSON.stringify(printData)
        });
        print.setCallback(this,function(response){
            var state = response.getState();
            console.log(state);
            if(state == "SUCCESS"){
                component.set("v.showFrame",true);
                var printURL = '/apex/AssessmentResponseRating_vfpage?Id='+ component.get("v.recordId");
                console.log(encodeURI(printURL));
                component.set("v.printURL",encodeURI(printURL));
                window.setTimeout(
                    $A.getCallback(function(){
                        component.set("v.showFrame",false);
                    	component.set("v.printURL","");
                    }),2000
                );
            }
            if(state == "ERROR"){
                var errors = response.getError();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error!',
                    message : errors[0].pageErrors[0].message,
                    type: 'error'
                });
                toastEvent.fire();
            }
            component.set("v.showSpinner",false);
        });
        $A.enqueueAction(print);
    }
})