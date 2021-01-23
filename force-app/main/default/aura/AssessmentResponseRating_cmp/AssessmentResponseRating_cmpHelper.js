({
	fetchResponse : function(component) {
		var fetchQuestionsAndResponses = component.get("c.getAssessmentQuestionsAndResponse");
        fetchQuestionsAndResponses.setParams({
            "recordId" : component.get("v.recordId")
        });
        fetchQuestionsAndResponses.setCallback(this,function(response){
            component.set("v.showSpinner",false);
            var state = response.getState();
            if(state == "SUCCESS"){
                var responseValue = response.getReturnValue();
                if(responseValue!=null){
                	component.set("v.assessmentQuestions",responseValue);
                    if(responseValue[0].status == $A.get("$Label.c.Status_Rate_Response") || responseValue[0].status == $A.get("$Label.c.ReadyForWebVerification")){
                        component.set("v.readOnlyField",true);
                    }
                    component.set("v.lastQuestion",responseValue.length+1);
                    this.populateRatingsValues(component,responseValue);
                    this.setProgressBar(component);
                }
                else{
                    component.set("v.showError",true);
                    component.set("v.errorMessage",$A.get("$Label.c.AssessmentIncomplete"));
                }
            }
        });
        $A.enqueueAction(fetchQuestionsAndResponses);
	},
    
	setReviewTableValues : function(component){
		component.set("v.showSpinner",true);
		var assessmentQuestions = component.get("v.assessmentQuestions");
		var ratings = component.get("v.ratings");
		var reviewTableValues = [];
		if(ratings!=null && ratings!=undefined && assessmentQuestions!=null && assessmentQuestions!=undefined){
			for(var j = 0 ; j < assessmentQuestions.length ; j++){
				var detailtemp = {};
                detailtemp = {no:'',question:'',response:'',rating:'',multipleChoice:false,responses:[]};
				detailtemp.no = assessmentQuestions[j].questionNo;
				detailtemp.question = assessmentQuestions[j].assessmentQuestion.Question__c;
                if(assessmentQuestions[j].assessmentQuestion.Type__c == 'Free Text'){
                    if(assessmentQuestions[j].assessmentResponse!=null,assessmentQuestions[j].assessmentResponse.length > 0, assessmentQuestions[j].assessmentResponse[0].Response__c!=null){
						detailtemp.multipleChoice = false;
                        detailtemp.response = assessmentQuestions[j].assessmentResponse[0].Response__c;
					}
				}
				else{
					if(assessmentQuestions[j].surveyQuesChoice!=null && assessmentQuestions[j].surveyQuesChoice.length > 0){
						var responseValue=[];
						for(var k = 0; k < assessmentQuestions[j].surveyQuesChoice.length ; k++){
							if(assessmentQuestions[j].surveyQuesChoice[k].Checked){
								responseValue.push(assessmentQuestions[j].surveyQuesChoice[k].label);
							}
						}
                        detailtemp.multipleChoice = true;
						detailtemp.responses = responseValue;
					}
					
				}
				for(var i = 0 ;  i < ratings.length ; i++){
					if(ratings[i].questionId == assessmentQuestions[j].questionId){
						detailtemp.rating = ratings[i].rating;
						break;
					}
				}
				reviewTableValues.push(detailtemp);
			}
		}
		component.set("v.reviewTableValues",reviewTableValues);
		component.set("v.showSpinner",false);
	},
	
    setProgressBar : function(component) {
        var stepsData = [];
        var surveyQuestionsAndResponses = component.get("v.assessmentQuestions");
        if(surveyQuestionsAndResponses.length != 0){
            var i = 1;
            for(i in surveyQuestionsAndResponses){
                i++;
                var detailtemp = {};
                detailtemp = {id:'',label:''};
                detailtemp.label = 'Question No '+ i;
                detailtemp.value = i;
                stepsData.push(detailtemp);
            }
			var detailtemp = {};
			detailtemp = {id:'',label:''};
			detailtemp.label = 'Review and submit';
			detailtemp.value = ++i;
			stepsData.push(detailtemp);
        }
        var stepsPreComponents = [[
            "lightning:progressIndicator",
            {
                "currentStep" : component.getReference('v.currentQuestion')
            }
        ]];        
        // Add the steps
        for (var index in stepsData) {
            var step = stepsData[index];
            stepsPreComponents.push([
                "lightning:progressStep",
                {
                    "label":step.label,
                    "value":step.value
                }
            ]);
        }
        $A.createComponents(
            stepsPreComponents,
            function(components, status, errorMessage){
                if (status === "SUCCESS") {
                    var progressIndicator = components.shift();
                    progressIndicator.set('v.body',components);
                    component.set('v.progressIndicator',progressIndicator);
                } 
            }
        );
    },
    
    setPreviousAndCurrentRatings : function(component,questionNo){
        if(questionNo!=null && questionNo!=undefined){
            var assessmentQuestions = component.get("v.assessmentQuestions");
            var questionId = assessmentQuestions[questionNo].questionId;
            var ratings = component.get("v.ratings");
            if(ratings!=null && ratings!=undefined){
                for(var i = 0 ;  i < ratings.length ; i++){
                    if(ratings[i].questionId == questionId){
                        component.set("v.rating",ratings[i].rating);
                        break;
                    }
                }
            }
        }
    },
    
    populateRatingsValues : function(component,responseValue){
        var responseRatings = [];
        if(responseValue!=null &&  responseValue!=undefined){
            for(var i=0 ; i < responseValue.length ; i++){
                var tempRating = {};
                tempRating.questionId = responseValue[i].questionId;
                tempRating.responseId = responseValue[i].responseId;
                tempRating.ratingsId = responseValue[i].ratingsId;
                if(responseValue[i].ratingValues!=null && responseValue[i].ratingValues!=undefined && responseValue[i].ratingValues.length!=0){
                    if(responseValue[i].ratingPresent){
                        for(var j = 0 ; j < responseValue[i].ratingValues.length ; j++){
                            var checkCondition = responseValue[i].ratingValues[j].Checked;
                            if(checkCondition == true){
                                tempRating.rating = responseValue[i].ratingValues[j].value;
                                break;
                            }
                        }
                    }
                    else{
                    	tempRating.rating = responseValue[i].ratingValues[0].value;
                    }
                }
                responseRatings.push(tempRating);
            }
            component.set("v.ratings",responseRatings);
        }
        
    }
})