public class ICPWebVerification_Controller {
	
	public class WrapperClass{
		@AuraEnabled public List<String> listOfCheckListValues;
		@AuraEnabled public List<ICPWebVerificationResponse> listOfWebVerificationResponses;
		@AuraEnabled public ICP_Web_Verification__c icpWebVerificationObj;
	}
    
    public class ICPWebVerificationResponse{
        @AuraEnabled public ICP_Web_Verification_Response__c webVerificationResponse;
        @AuraEnabled public List<responseAttachs> attachmentList;
    }
    
    public class responseAttachs{
        @AuraEnabled public string attachId {get;set;}
        @AuraEnabled public string attachName {get;set;}        
        @AuraEnabled public string attachType {get;set;}
        @AuraEnabled public string attachSize {get;set;}        
    }   
	
	public class BackEndScoringWrapper {
		@AuraEnabled public List<String> listOfCheckListValues;
        @AuraEnabled public ICP_Web_Verification__c webVerificationObject;
		@AuraEnabled public List<ICP_Web_Verification_Response__c> listOfWebVerificationResponses;
	}
	
    
    @AuraEnabled 
    public static Assessment__c getICPObject(String recordId){
        Assessment__c assessmentObject = new Assessment__c();
        if(String.isNotBlank(recordId)){
        	assessmentObject = [Select Id,Status__c,Account_Name__c,Account_OPE_Id__c,(Select Id,Status__c from Assessment__r) from Assessment__c where Id=:recordId];
        }
        return assessmentObject;
    }
    
	@AuraEnabled
    public static WrapperClass getCheckListValues(String recordId){
		Assessment__c assessmentObject = new Assessment__c();
        List<String> listOfCheckListValues = new List<String>();
		List<ICPWebVerificationResponse> listOfWebVerificationResponses = new List<ICPWebVerificationResponse>();
		List<ICP_Web_Verification_Response__c> responses = new List<ICP_Web_Verification_Response__c>();
        String userName = UserInfo.getFirstName()+' '+UserInfo.getLastName();
		WrapperClass wrapperClassObject = new WrapperClass();
        try{
            if(String.isNotBlank(recordId)){
                assessmentObject = [Select Id,Account_Name__c,Account_OPE_Id__c,(Select Id,Status__c from Assessment__r) from Assessment__c where Id=:recordId];
                if(assessmentObject!=null){
                    listOfCheckListValues.add(assessmentObject.Account_Name__c);
                    if(assessmentObject.Account_OPE_Id__c!=null){
                    	listOfCheckListValues.add(assessmentObject.Account_OPE_Id__c);
                    }
                    else{
                        listOfCheckListValues.add('');
                    }
                    listOfCheckListValues.add(userName);
                    listOfCheckListValues.add(String.valueOf(System.today().format()));
					if(!assessmentObject.Assessment__r.isEmpty()){
						wrapperClassObject.icpWebVerificationObj = assessmentObject.Assessment__r;
						listOfWebVerificationResponses = getWebVerificationResponses(assessmentObject.Assessment__r[0].id);
					}
					else{
						ICP_Web_Verification__c icpWebVerificationObj = new ICP_Web_Verification__c();
						icpWebVerificationObj.Compliance_Analyst_Name__c = userName;
						icpWebVerificationObj.Name = userName;
                        icpWebVerificationObj.Status__c = 'New';
						icpWebVerificationObj.Assessment__c = (Id)recordId;
						icpWebVerificationObj.Institution_Name__c = assessmentObject.Account_Name__c;
						icpWebVerificationObj.OPEID__c = assessmentObject.Account_OPE_Id__c;
						insert icpWebVerificationObj;
						if(icpWebVerificationObj.Id!=null){
							wrapperClassObject.icpWebVerificationObj = icpWebVerificationObj;
							ICP_Web_Verification_Response__c question1 = new ICP_Web_Verification_Response__c();
							question1.Name = '1';
							question1.Question_Display_Order__c = 1;
							question1.Question__c = 'Does the institution have a military-specific web page or section of their website?';
							question1.Picklist_options__c = 'a)Yes b)No c)N/A';
							question1.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question1.Answer_Score__c = 0;
							question1.Question_Weight__c = 0;
							question1.Question_Score__c = 0;
							question1.Max_Score__c = 0;
							responses.add(question1);

							ICP_Web_Verification_Response__c question2a = new ICP_Web_Verification_Response__c();
							question2a.Name = '2a';
							question2a.Question_Display_Order__c = 2;
							question2a.Question__c = 'DoD or Military Services’ insignias or logos?';
							question2a.Picklist_options__c = 'a)Yes b)No c)N/A d)Yes in Excess';
							question2a.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question2a.Answer_Score__c = 0;
							question2a.Question_Weight__c = 2;
							question2a.Question_Score__c = 0;
							question2a.Max_Score__c = 4;
							responses.add(question2a);

							ICP_Web_Verification_Response__c question2b = new ICP_Web_Verification_Response__c();
							question2b.Name = '2b';
							question2b.Question_Display_Order__c = 3;
							question2b.Question__c = 'Content inaccurately stating or implying a special partnership between the institution and the DoD or Military Services?';
							question2b.Picklist_options__c = 'a)Yes b)No c)N/A d)Yes in Excess';
							question2b.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question2b.Answer_Score__c = 0;
							question2b.Question_Weight__c = 5;
							question2b.Question_Score__c = 0;
							question2b.Max_Score__c = 10;
							responses.add(question2b);

							ICP_Web_Verification_Response__c question2c = new ICP_Web_Verification_Response__c();
							question2c.Name = '2c';
							question2c.Question_Display_Order__c = 4;
							question2c.Question__c = 'Embellished claims about the nature of otherwise legitimate partnerships?';
							question2c.Picklist_options__c = 'a)Yes b)No c)N/A d)Yes in Excess';
							question2c.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question2c.Answer_Score__c = 0;
							question2c.Question_Weight__c = 4;
							question2c.Question_Score__c = 0;
							question2c.Max_Score__c = 8;
							responses.add(question2c);

							ICP_Web_Verification_Response__c question2d = new ICP_Web_Verification_Response__c();
							question2d.Name = '2d';
							question2d.Question_Display_Order__c = 5;
							question2d.Question__c = 'Content stating or implying the DoD or Military Services endorse the institution?';
							question2d.Picklist_options__c = 'a)Yes b)No c)N/A d)Yes in Excess';
							question2d.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question2d.Answer_Score__c = 0;
							question2d.Question_Weight__c = 5;
							question2d.Question_Score__c = 0;
							question2d.Max_Score__c = 10;
							responses.add(question2d);

							ICP_Web_Verification_Response__c question2e = new ICP_Web_Verification_Response__c();
							question2e.Name = '2e';
							question2e.Question_Display_Order__c = 6;
							question2e.Question__c = 'Testimonies suggesting that a Military Service or commander endorses the institution?';
							question2e.Picklist_options__c = 'a)Yes b)No c)N/A d)Yes in Excess';
							question2e.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question2e.Answer_Score__c = 0;
							question2e.Question_Weight__c = 5;
							question2e.Question_Score__c = 0;
							question2e.Max_Score__c = 10;
							responses.add(question2e);

							ICP_Web_Verification_Response__c question2f = new ICP_Web_Verification_Response__c();
							question2f.Name = '2f';
							question2f.Question_Display_Order__c = 7;
							question2f.Question__c = 'Testimonies featuring Service members in uniform with their rank or other insignia visible?';
							question2f.Picklist_options__c = 'a)Yes b)No c)N/A';
							question2f.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question2f.Answer_Score__c = 0;
							question2f.Question_Weight__c = 3;
							question2f.Question_Score__c = 0;
							question2f.Max_Score__c = 6;
							responses.add(question2f);

							ICP_Web_Verification_Response__c question3 = new ICP_Web_Verification_Response__c();
							question3.Name = '3';
							question3.Question_Display_Order__c = 8;
							question3.Question__c = 'Does the institution mention the TA program on their website?';
							question3.Picklist_options__c = 'a)Yes b)No c)N/A';
							question3.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question3.Answer_Score__c = 0;
							question3.Question_Weight__c = 0;
							question3.Question_Score__c = 0;
							question3.Max_Score__c = 0;
							responses.add(question3);

							ICP_Web_Verification_Response__c question4a = new ICP_Web_Verification_Response__c();
							question4a.Name = '4a';
							question4a.Question_Display_Order__c = 9;
							question4a.Question__c = 'Identify TA funds as a source of financial aid for active duty military?';
							question4a.Picklist_options__c = 'a)Yes b)No c)N/A';
							question4a.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question4a.Answer_Score__c = 0;
							question4a.Question_Weight__c = 2;
							question4a.Question_Score__c = 0;
							question4a.Max_Score__c = 2;
							responses.add(question4a);

							ICP_Web_Verification_Response__c question4b = new ICP_Web_Verification_Response__c();
							question4b.Name = '4b';
							question4b.Question_Display_Order__c = 10;
							question4b.Question__c = 'Explain the process of applying for TA?';
							question4b.Picklist_options__c = 'a)Yes b)No c)N/A';
							question4b.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question4b.Answer_Score__c = 0;
							question4b.Question_Weight__c = 2;
							question4b.Question_Score__c = 0;
							question4b.Max_Score__c = 2;
							responses.add(question4b);

							ICP_Web_Verification_Response__c question4c = new ICP_Web_Verification_Response__c();
							question4c.Name = '4c';
							question4c.Question_Display_Order__c = 11;
							question4c.Question__c = 'Direct prospective students to speak with an Educational Services Officer, military counselor, or their Service?';
							question4c.Picklist_options__c = 'a)Yes b)No c)N/A';
							question4c.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question4c.Answer_Score__c = 0;
							question4c.Question_Weight__c = 4;
							question4c.Question_Score__c = 0;
							question4c.Max_Score__c = 4;
							responses.add(question4c);

							ICP_Web_Verification_Response__c question4d = new ICP_Web_Verification_Response__c();
							question4d.Name = '4d';
							question4d.Question_Display_Order__c = 12;
							question4d.Question__c = 'Provide links to the respective Military Services’ education portals?';
							question4d.Picklist_options__c = 'a)Yes b)No c)N/A';
							question4d.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question4d.Answer_Score__c = 0;
							question4d.Question_Weight__c = 2;
							question4d.Question_Score__c = 0;
							question4d.Max_Score__c = 2;
							responses.add(question4d);

							ICP_Web_Verification_Response__c question4e = new ICP_Web_Verification_Response__c();
							question4e.Name = '4e';
							question4e.Question_Display_Order__c = 13;
							question4e.Question__c = 'Provide accurate information?';
							question4e.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question4e.Picklist_options__c = 'a)Yes b)No c)N/A d)Egregiously No';
							question4e.Answer_Score__c = 0;
							question4e.Question_Weight__c = 5;
							question4e.Question_Score__c = 0;
							question4e.Max_Score__c = 10;
							responses.add(question4e);

							ICP_Web_Verification_Response__c question5 = new ICP_Web_Verification_Response__c();
							question5.Name = '5';
							question5.Question_Display_Order__c = 14;
							question5.Question__c = 'Does the institution have a page or a section for financial aid?';
							question5.Picklist_options__c = 'a)Yes b)No c)N/A';
							question5.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question5.Answer_Score__c = 0;
							question5.Question_Weight__c = 5;
							question5.Question_Score__c = 0;
							question5.Max_Score__c = 5;
							responses.add(question5);

							ICP_Web_Verification_Response__c question6a = new ICP_Web_Verification_Response__c();
							question6a.Name = '6a';
							question6a.Question_Display_Order__c = 15;
							question6a.Question__c = 'Explain the financial aid application process?';
							question6a.Picklist_options__c = 'a)Yes b)No c)N/A';
							question6a.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question6a.Answer_Score__c = 0;
							question6a.Question_Weight__c = 3;
							question6a.Question_Score__c = 0;
							question6a.Max_Score__c = 3;
							responses.add(question6a);

							ICP_Web_Verification_Response__c question6b = new ICP_Web_Verification_Response__c();
							question6b.Name = '6b';
							question6b.Question_Display_Order__c = 16;
							question6b.Question__c = 'Have a timeline for applying for financial aid?';
							question6b.Picklist_options__c = 'a)Yes b)No c)N/A';
							question6b.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question6b.Answer_Score__c = 0;
							question6b.Question_Weight__c = 5;
							question6b.Question_Score__c = 0;
							question6b.Max_Score__c = 5;
							responses.add(question6b);

							ICP_Web_Verification_Response__c question6c = new ICP_Web_Verification_Response__c();
							question6c.Name = '6c';
							question6c.Question_Display_Order__c = 17;
							question6c.Question__c = 'Contain a link to the Department of Education’s Federal Student Aid website?';
							question6c.Picklist_options__c = 'a)Yes b)No c)N/A';
							question6c.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question6c.Answer_Score__c = 0;
							question6c.Question_Weight__c = 5;
							question6c.Question_Score__c = 0;
							question6c.Max_Score__c = 5;
							responses.add(question6c);

							ICP_Web_Verification_Response__c question6d = new ICP_Web_Verification_Response__c();
							question6d.Name = '6d';
							question6d.Question_Display_Order__c = 18;
							question6d.Question__c = 'Have a link directing the student to the Free Application for Federal Student Aid (FAFSA)?';
							question6d.Picklist_options__c = 'a)Yes b)No c)N/A';
							question6d.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question6d.Answer_Score__c = 0;
							question6d.Question_Weight__c = 5;
							question6d.Question_Score__c = 0;
							question6d.Max_Score__c = 5;
							responses.add(question6d);

							ICP_Web_Verification_Response__c question6e = new ICP_Web_Verification_Response__c();
							question6e.Name = '6e';
							question6e.Question_Display_Order__c = 19;
							question6e.Question__c = 'Describes the different types of financial aid, directing the student to federal loans before private loans?';
							question6e.Picklist_options__c = 'a)Yes b)No c)N/A';
							question6e.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question6e.Answer_Score__c = 0;
							question6e.Question_Weight__c = 3;
							question6e.Question_Score__c = 0;
							question6e.Max_Score__c = 3;
							responses.add(question6e);
                            
                            ICP_Web_Verification_Response__c question6f = new ICP_Web_Verification_Response__c();
							question6f.Name = '6f';
							question6f.Question_Display_Order__c = 20;
							question6f.Question__c = 'Describes the different types of financial aid, directing the student to federal loans before private loans?';
							question6f.Picklist_options__c = 'a)Yes b)No c)N/A';
							question6f.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question6f.Answer_Score__c = 0;
							question6f.Question_Weight__c = 3;
							question6f.Question_Score__c = 0;
							question6f.Max_Score__c = 3;
							responses.add(question6f);

							ICP_Web_Verification_Response__c question7 = new ICP_Web_Verification_Response__c();
							question7.Name = '7';
							question7.Question_Display_Order__c = 20;
							question7.Question__c = 'Does the institution have a page or section of their website for the cost of attendance?';
							question7.Picklist_options__c = 'a)Yes b)No c)N/A';
							question7.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question7.Answer_Score__c = 0;
							question7.Question_Weight__c = 5;
							question7.Question_Score__c = 0;
							question7.Max_Score__c = 5;
							responses.add(question7);

							ICP_Web_Verification_Response__c question8a = new ICP_Web_Verification_Response__c();
							question8a.Name = '8a';
							question8a.Question_Display_Order__c = 21;
							question8a.Question__c = 'Tuition?';
							question8a.Picklist_options__c = 'a)Yes b)No c)N/A';
							question8a.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question8a.Answer_Score__c = 0;
							question8a.Question_Weight__c = 5;
							question8a.Question_Score__c = 0;
							question8a.Max_Score__c = 5;
							responses.add(question8a);

							ICP_Web_Verification_Response__c question8b = new ICP_Web_Verification_Response__c();
							question8b.Name = '8b';
							question8b.Question_Display_Order__c = 22;
							question8b.Question__c = 'Estimated fees?';
							question8b.Picklist_options__c = 'a)Yes b)No c)N/A';
							question8b.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question8b.Answer_Score__c = 0;
							question8b.Question_Weight__c = 4;
							question8b.Question_Score__c = 0;
							question8b.Max_Score__c = 4;
							responses.add(question8b);

							ICP_Web_Verification_Response__c question8c = new ICP_Web_Verification_Response__c();
							question8c.Name = '8c';
							question8c.Question_Display_Order__c = 23;
							question8c.Question__c = 'Estimated price of books and other course materials?';
							question8c.Picklist_options__c = 'a)Yes b)No c)N/A';
							question8c.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question8c.Answer_Score__c = 0;
							question8c.Question_Weight__c = 3;
							question8c.Question_Score__c = 0;
							question8c.Max_Score__c = 3;
							responses.add(question8c);

							ICP_Web_Verification_Response__c question8d = new ICP_Web_Verification_Response__c();
							question8d.Name = '8d';
							question8d.Question_Display_Order__c = 24;
							question8d.Question__c = 'Rate for room and board?';
							question8d.Picklist_options__c = 'a)Yes b)No c)N/A';
							question8d.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question8d.Answer_Score__c = 0;
							question8d.Question_Weight__c = 5;
							question8d.Question_Score__c = 0;
							question8d.Max_Score__c = 5;
							responses.add(question8d);

							ICP_Web_Verification_Response__c question8e = new ICP_Web_Verification_Response__c();
							question8e.Name = '8e';
							question8e.Question_Display_Order__c = 25;
							question8e.Question__c = 'Total estimated yearly cost including both program, and other living expenses?';
							question8e.Picklist_options__c = 'a)Yes b)No c)N/A';
							question8e.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question8e.Answer_Score__c = 0;
							question8e.Question_Weight__c = 4;
							question8e.Question_Score__c = 0;
							question8e.Max_Score__c = 4;
							responses.add(question8e);

							ICP_Web_Verification_Response__c question9 = new ICP_Web_Verification_Response__c();
							question9.Name = '9';
							question9.Question_Display_Order__c = 26;
							question9.Question__c = 'Does the institution require the user to disclose personal information before accessing the total cost of attendance?';
							question9.Picklist_options__c = 'a)Yes b)No c)N/A';
							question9.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question9.Answer_Score__c = 0;
							question9.Question_Weight__c = 5;
							question9.Question_Score__c = 0;
							question9.Max_Score__c = 5;
							responses.add(question9);

							ICP_Web_Verification_Response__c question10 = new ICP_Web_Verification_Response__c();
							question10.Name = '10';
							question10.Question_Display_Order__c = 27;
							question10.Question__c = 'Does the tuition listed on the website match the tuition information in the Voluntary Education Management Information System (VEMIS)?';
							question10.Picklist_options__c = 'a)Yes b)No c)N/A d)Egregiously No';
							question10.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question10.Answer_Score__c = 0;
							question10.Question_Weight__c = 5;
							question10.Question_Score__c = 0;
							question10.Max_Score__c = 10;
							responses.add(question10);

							ICP_Web_Verification_Response__c question11 = new ICP_Web_Verification_Response__c();
							question11.Name = '11';
							question11.Question_Display_Order__c = 28;
							question11.Question__c = 'Does the institution have a Net Price Calculator?';
							question11.Picklist_options__c = 'a)Yes b)No c)N/A';
							question11.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question11.Answer_Score__c = 0;
							question11.Question_Weight__c = 4;
							question11.Question_Score__c = 0;
							question11.Max_Score__c = 4;
							responses.add(question11);

							ICP_Web_Verification_Response__c question12 = new ICP_Web_Verification_Response__c();
							question12.Name = '12';
							question12.Question_Display_Order__c = 29;
							question12.Question__c = 'Does the Net Price Calculator require contact information?';
							question12.Picklist_options__c = 'a)Yes b)No c)N/A';
							question12.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question12.Answer_Score__c = 0;
							question12.Question_Weight__c = 5;
							question12.Question_Score__c = 0;
							question12.Max_Score__c = 5;
							responses.add(question12);

							ICP_Web_Verification_Response__c question13 = new ICP_Web_Verification_Response__c();
							question13.Name = '13';
							question13.Question_Display_Order__c = 30;
							question13.Question__c = 'Does the institution have a page listing their institutional accreditation?';
							question13.Picklist_options__c = 'a)Yes b)No c)N/A';
							question13.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question13.Answer_Score__c = 0;
							question13.Question_Weight__c = 5;
							question13.Question_Score__c = 0;
							question13.Max_Score__c = 5;
							responses.add(question13);

							ICP_Web_Verification_Response__c question14 = new ICP_Web_Verification_Response__c();
							question14.Name = '14';
							question14.Question_Display_Order__c = 31;
							question14.Question__c = 'Does the institutional accrediting agency’s website verify the accreditation status of the institution?';
							question14.Picklist_options__c = 'a)Yes b)No c)N/A';
							question14.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question14.Answer_Score__c = 0;
							question14.Question_Weight__c = 5;
							question14.Question_Score__c = 0;
							question14.Max_Score__c = 5;
							responses.add(question14);

							ICP_Web_Verification_Response__c question15 = new ICP_Web_Verification_Response__c();
							question15.Name = '15';
							question15.Question_Display_Order__c = 32;
							question15.Question__c = 'Does the institution provide additional information on programmatic accreditation?';
							question15.Picklist_options__c = 'a)Yes b)No c)N/A';
							question15.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question15.Answer_Score__c = 0;
							question15.Question_Weight__c = 5;
							question15.Question_Score__c = 0;
							question15.Max_Score__c = 5;
							responses.add(question15);

							ICP_Web_Verification_Response__c question16 = new ICP_Web_Verification_Response__c();
							question16.Name = '16';
							question16.Question_Display_Order__c = 33;
							question16.Question__c = 'Does the institution have the required Gainful Employment Disclosures?';
							question16.Picklist_options__c = 'a)Yes b)No c)N/A';
							question16.ICP_Web_Verification__c = icpWebVerificationObj.Id;
							question16.Answer_Score__c = 0;
							question16.Question_Weight__c = 5;
							question16.Question_Score__c = 0;
							question16.Max_Score__c = 5;
							responses.add(question16);
							
							insert responses;
							
							listOfWebVerificationResponses = getWebVerificationResponses(icpWebVerificationObj.Id);
						}
					}
                }
            }
			wrapperClassObject.listOfCheckListValues = listOfCheckListValues;
			wrapperClassObject.listOfWebVerificationResponses = listOfWebVerificationResponses;
        }
        catch(Exception e){
            System.debug(e.getMessage());
        }
        return wrapperClassObject;
    }
	
	@AuraEnabled
    public static BackEndScoringWrapper getWebVerificationResponseObjects(String recordId){
        List<String> listOfCheckListValues = new List<String>();
		List<ICP_Web_Verification_Response__c> listOfWebVerificationResponses = new List<ICP_Web_Verification_Response__c>();
		//List<ICP_Web_Verification_Response__c> responses = new List<ICP_Web_Verification_Response__c>();
        String userName = UserInfo.getFirstName()+' '+UserInfo.getLastName();
		BackEndScoringWrapper wrapperClassObject = new BackEndScoringWrapper();
        try{
            if(String.isNotBlank(recordId)){
                Assessment__c assessmentObject = [Select Id,Account_Name__c,Account_OPE_Id__c,(Select Id,Status__c from Assessment__r) from Assessment__c where Id=:recordId];
                if(assessmentObject!=null){
                    listOfCheckListValues.add(assessmentObject.Account_Name__c);
                    if(assessmentObject.Account_OPE_Id__c!=null){
                    	listOfCheckListValues.add(assessmentObject.Account_OPE_Id__c);
                    }
                    else{
                        listOfCheckListValues.add('');
                    }
                    listOfCheckListValues.add(userName);
                    listOfCheckListValues.add(String.valueOf(System.today().format()));
					if(!assessmentObject.Assessment__r.isEmpty()){
                        wrapperClassObject.webVerificationObject = assessmentObject.Assessment__r[0];
						listOfWebVerificationResponses = getWebVerificationResponsesWithoutAttachments(assessmentObject.Assessment__r[0].id);
                    }
                }
            }
			wrapperClassObject.listOfCheckListValues = listOfCheckListValues;
			wrapperClassObject.listOfWebVerificationResponses = listOfWebVerificationResponses;
        }
        catch(Exception e){
            System.debug(e.getMessage());
        }
        return wrapperClassObject;
    }
	
	public static List<ICP_Web_Verification_Response__c> getWebVerificationResponsesWithoutAttachments(Id recordId){
		List<ICP_Web_Verification_Response__c> listOfWebVerificationResponses = new List<ICP_Web_Verification_Response__c>();
		List<id> setOfWebverificationResponseIds = new List<id>();
		try{
			ICP_Web_Verification__c webVerificationObj = [SELECT Id, Name,Status__c,(Select id,Question_Display_Order__c,Question__c,Picklist_options__c,Name,URL__c,Comment__c,Yes_No__c,Answer_Score__c,Question_Weight__c,Max_Score__c,QuestionScore__c from ICP_Web_Verification_Responses__r order by Question_Display_Order__c asc)  FROM ICP_Web_Verification__c where id=:recordId];
			if(webVerificationObj!=null && !webVerificationObj.ICP_Web_Verification_Responses__r.isEmpty()){
                listOfWebVerificationResponses.addAll(webVerificationObj.ICP_Web_Verification_Responses__r);
			}
		}
		catch(Exception e){
		}
		return listOfWebVerificationResponses;
	}
	
	public static List<ICPWebVerificationResponse> getWebVerificationResponses(Id recordId){
		List<ICPWebVerificationResponse> listOfWebVerificationResponses = new List<ICPWebVerificationResponse>();
		List<id> setOfWebverificationResponseIds = new List<id>();
		try{
			ICP_Web_Verification__c webVerificationObj = [SELECT Id, Name,Status__c,(Select id,Name,URL__c,Comment__c,Yes_No__c,Answer_Score__c,Question_Weight__c,Max_Score__c from ICP_Web_Verification_Responses__r)  FROM ICP_Web_Verification__c where id=:recordId];
			if(webVerificationObj!=null && !webVerificationObj.ICP_Web_Verification_Responses__r.isEmpty()){
				for(ICP_Web_Verification_Response__c icpWebVerificationRes : webVerificationObj.ICP_Web_Verification_Responses__r){
					setOfWebverificationResponseIds.add(icpWebVerificationRes.id);
				}
				Map<Id,List<ContentDocumentLink>> reponseAttachListMap = new Map<Id,List<ContentDocumentLink>>();
				reponseAttachListMap = getListAttachment(setOfWebverificationResponseIds);
				for(ICP_Web_Verification_Response__c icpWebVerificationRes : webVerificationObj.ICP_Web_Verification_Responses__r){
					ICPWebVerificationResponse responseICPWebverification = new ICPWebVerificationResponse();
					responseICPWebverification.webVerificationResponse = icpWebVerificationRes;
					List<responseAttachs> wrapAssessmentAttachList = new List<responseAttachs>();
					if(reponseAttachListMap.containsKey(icpWebVerificationRes.id)){
						for(ContentDocumentLink tempAttach : reponseAttachListMap.get(icpWebVerificationRes.id)){
							responseAttachs wrapAttach = new responseAttachs();
							wrapAttach.attachId = tempAttach.ContentDocument.Id;
							wrapAttach.attachName = tempAttach.ContentDocument.Title;                            
							wrapAttach.attachSize = FileSizeToString(tempAttach.ContentDocument.ContentSize);
							wrapAttach.attachType = tempAttach.ContentDocument.FileType;                        
							wrapAssessmentAttachList.add(wrapAttach);
						}
					}
					responseICPWebverification.attachmentList = wrapAssessmentAttachList;
					listOfWebVerificationResponses.add(responseICPWebverification);
				}
			}
		}
		catch(Exception e){
		}
		return listOfWebVerificationResponses;
	}
    
    @AuraEnabled
    public static Map<Id,List<ContentDocumentLink>> getListAttachment(List<Id> newSet) {
        Map<Id,List<ContentDocumentLink>> reponseAttachListMap = new Map<Id,List<ContentDocumentLink>>();
        List<ContentDocumentLink> lstCDocLink = new List<ContentDocumentLink>();
        system.debug('==newSet=='+newSet);
        if(newSet.size() > 0)
            lstCDocLink = [SELECT ContentDocumentID,LinkedEntityId, ContentDocument.CreatedDate,ContentDocument.Title,  
                           ContentDocument.ContentSize,ContentDocument.FileType,ContentDocument.CreatedBy.Name, LinkedEntity.type, LinkedEntity.Name FROM ContentDocumentLink 
                           WHERE LinkedEntityId IN: newSet];
        if(lstCDocLink.size() > 0){
            for(ContentDocumentLink CVDocLink : lstCDocLink){
                if(reponseAttachListMap.containsKey(CVDocLink.LinkedEntityId)) {                    
                    List<sObject> contentList = reponseAttachListMap.get(CVDocLink.LinkedEntityId);
                    contentList.add(CVDocLink);
                    reponseAttachListMap.put(CVDocLink.LinkedEntityId, contentList);
                } else {
                    reponseAttachListMap.put(CVDocLink.LinkedEntityId, new List<sObject> { CVDocLink});
                }
            }
        }
        return reponseAttachListMap;
    }
    
    @AuraEnabled
    public static void saveWebVerificationResponses(List<ICP_Web_Verification_Response__c> responses,ICP_Web_Verification__c icpWebVerificationObj, Boolean needToUpdate){
        try{
            system.debug('Responses' +responses + 'Responses');
            if(!responses.isEmpty()){
                
                update responses;
            }
			if(icpWebVerificationObj!=null && needToUpdate){
				update icpWebVerificationObj;
			}
        }
        catch(Exception e){
            
        }
    }
    
    
    @AuraEnabled
    public static void deleteContentDoc(string contentDocId) {
        List<ContentDocument> cd = new List<ContentDocument>([SELECT Id, PublishStatus, Title, LatestPublishedVersionId
                                                              FROM ContentDocument where Id = : contentDocId]);
        if(cd.size() > 0)
            delete cd;
    }
    //Method to calculate the size
    public static String FileSizeToString(Long Value){
        if (Value < 1024)
            return string.valueOf(Value) + ' Bytes';
        else
            if (Value >= 1024 && Value < (1024*1024)){
            Decimal kb = Decimal.valueOf(Value);
            kb = kb.divide(1024,2);
            return string.valueOf(kb) + ' KB';
        }
        else
            if (Value >= (1024*1024) && Value < (1024*1024*1024)){
            Decimal mb = Decimal.valueOf(Value);
            mb = mb.divide((1024*1024),2);
            return string.valueOf(mb) + ' MB';
        }
        else{
            Decimal gb = Decimal.valueOf(Value);
            gb = gb.divide((1024*1024*1024),2);            
            return string.valueOf(gb) + ' GB';
        }    
    }
}