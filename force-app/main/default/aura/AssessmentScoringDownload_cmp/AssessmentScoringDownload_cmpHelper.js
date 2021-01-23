({
	convertArrayOfObjectsToCSV : function(component){
        component.set("v.showSpinner",true);
        var objectRecords = component.get('v.assessmentScoreRecords');
        var csvStringResult, counter, keys, columnDivider, lineDivider,mainHeaders;

        // check if "objectRecords" parameter is null, then return from function
        if (objectRecords == null || !objectRecords.length) {
            return null;
        }

        // store ,[comma] in columnDivider variable for separate CSV values and
        // for start next line use '\n' [new line] in lineDivider variable
        columnDivider = ',';
        lineDivider =  '\n';
        mainHeaders = 'School Profile,School Profile,"Recruiting, Marketing & Advertising","Recruiting, Marketing & Advertising","Recruiting, Marketing & Advertising","Recruiting, Marketing & Advertising","Recruiting, Marketing & Advertising","Recruiting, Marketing & Advertising","Recruiting, Marketing & Advertising","Recruiting, Marketing & Advertising","Recruiting, Marketing & Advertising","Recruiting, Marketing & Advertising","Recruiting, Marketing & Advertising","Recruiting, Marketing & Advertising","Recruiting, Marketing & Advertising","Recruiting, Marketing & Advertising","Recruiting, Marketing & Advertising","Recruiting, Marketing & Advertising",Financial Matters,Financial Matters,Financial Matters,Financial Matters,Financial Matters,Financial Matters,Financial Matters,Financial Matters,Financial Matters,Financial Matters,Financial Matters,Financial Matters,Financial Matters,Financial Matters,Financial Matters,Financial Matters,Financial Matters,Financial Matters,Financial Matters,Accreditation,Accreditation,Accreditation,Accreditation,Accreditation,Accreditation,Degree Plans & Post-Graduate Opportunities,Degree Plans & Post-Graduate Opportunities,Degree Plans & Post-Graduate Opportunities,Total Findings,Total Findings,Total Findings,Total Findings,Total Findings';
		
        // in the keys variable store fields API Names as a key
        // this labels use in CSV file header
        keys = ['OPEID__c','School_Name__c','WV1__c','WV2a__c','WV2b__c','WV2c__c','WV2d__c','WV2e__c','WV2f__c','SA11__c','SA12__c','SA5__c','WV4a__c','WV4b__c','WV4e__c','SA13__c','WV4c__c','WV4d__c','SA6__c','WV6a__c','WV6b__c','WV6c__c','WV6d__c','WV6e__c','WV6f__c','SA8__c','SA7__c','WV7__c','WV8__c','WV9__c','WV10a__c','WV10b__c','WV10c__c','WV10d__c','WV10e__c','WV11__c','WV12__c','SA9__c','SA1__c','WV13__c','WV14__c','WV15__c','SA2__c','WV16__c','SA3__c','SA4__c','SA10__c','Count_of_0_s__c','Count_of_1_s__c','Count_of_2_s__c','Count_of_1_s__c + Count_of_2_s__c'];
        var headers = ['OPEID','School Name','WV1','WV2a','WV2b','WV2c','WV2d','WV2e','WV2f','SA11','SA12','SA5','WV4a','WV4b','WV4e','SA13','WV4c','WV4d','SA6','WV6a','WV6b','WV6c','WV6d','WV6e','WV6f','SA8','SA7','WV7','WV8','WV9','WV10a','WV10b','WV10c','WV10d','WV10e','WV11','WV12','SA9','SA1','WV13','WV14','WV15','SA2','WV16','SA3','SA4','SA10','Count of 0\'s','Count of 1\'s','Count of 2\'s','Total Findings'];
        var WV1_1 = 0,WV1_2 = 0,WV1_Total = 0,WV2a_1 = 0,WV2a_2 = 0,WV2a_Total = 0,WV2b_1 = 0,WV2b_2 = 0,WV2b_Total = 0;
        var WV2c_1 = 0,WV2c_2 = 0,WV2c_Total = 0,WV2d_1 = 0,WV2d_2 = 0,WV2d_Total = 0,WV2e_1 = 0,WV2e_2 = 0,WV2e_Total = 0;
        var WV2f_1 = 0,WV2f_2 = 0,WV2f_Total = 0,WV4a_1 = 0,WV4a_2 = 0,WV4a_Total = 0,WV4b_1 = 0,WV4b_2 = 0,WV4b_Total = 0;
        var WV4c_1 = 0,WV4c_2 = 0,WV4c_Total = 0,WV4d_1 = 0,WV4d_2 = 0,WV4d_Total = 0,WV4e_1 = 0,WV4e_2 = 0,WV4e_Total = 0;
        var WV6a_1 = 0,WV6a_2 = 0,WV6a_Total = 0,WV6b_1 = 0,WV6b_2 = 0,WV6b_Total = 0,WV6c_1 = 0,WV6c_2 = 0,WV6c_Total = 0;
        var WV6d_1 = 0,WV6d_2 = 0,WV6d_Total = 0,WV6e_1 = 0,WV6e_2 = 0,WV6e_Total = 0,WV6f_1 = 0,WV6f_2 = 0,WV6f_Total = 0,WV7_1 = 0,WV7_2 = 0,WV7_Total = 0;
        var WV8_1 = 0,WV8_2 = 0,WV8_Total = 0,WV9_1 = 0,WV9_2 = 0,WV9_Total = 0,WV10a_1 = 0,WV10a_2 = 0,WV10a_Total = 0;
        var WV10b_1 = 0,WV10b_2 = 0,WV10b_Total = 0,WV10c_1 = 0,WV10c_2 = 0,WV10c_Total = 0,WV10d_1 = 0,WV10d_2 = 0,WV10d_Total = 0;
        var WV10e_1 = 0,WV10e_2 = 0,WV10e_Total = 0,WV11_1 = 0,WV11_2 = 0,WV11_Total = 0,WV12_1 = 0,WV12_2 = 0,WV12_Total = 0;
        var WV13_1 = 0,WV13_2 = 0,WV13_Total = 0,WV14_1 = 0,WV14_2 = 0,WV14_Total = 0,WV15_1 = 0,WV15_2 = 0,WV15_Total = 0;
        var WV16_1 = 0,WV16_2 = 0,WV16_Total = 0,SA1_1 = 0,SA1_2 = 0,SA1_Total = 0,SA2_1 = 0,SA2_2 = 0,SA2_Total = 0;
        var SA3_1 = 0,SA3_2 = 0,SA3_Total = 0,SA4_1 = 0,SA4_2 = 0,SA4_Total = 0,SA5_1 = 0,SA5_2 = 0,SA5_Total = 0;
        var SA6_1 = 0,SA6_2 = 0,SA6_Total = 0,SA7_1 = 0,SA7_2 = 0,SA7_Total = 0,SA8_1 = 0,SA8_2 = 0,SA8_Total = 0;
        var SA9_1 = 0,SA9_2 = 0,SA9_Total = 0,SA10_1 = 0,SA10_2 = 0,SA10_Total = 0,SA11_1 = 0,SA11_2 = 0,SA11_Total = 0;
        var SA12_1 = 0,SA12_2 = 0,SA12_Total = 0,SA13_1 = 0,SA13_2 = 0,SA13_Total = 0;
        csvStringResult = '';
        csvStringResult += lineDivider;
        csvStringResult += mainHeaders;
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
                if(sTempkey == keys.length - 1){
                    var total = objectRecords[i]['Count_of_1_s__c'] + objectRecords[i]['Count_of_2_s__c']; 
                    csvStringResult += '"'+ total +'"';
                }
                else{
                    if(objectRecords[i][skey] == null || objectRecords[i][skey] == undefined)
                        csvStringResult += '""';
                    else{
                        var value = objectRecords[i][skey];
                        csvStringResult += '"'+ value +'"';
                        switch(skey){
                            case "WV1__c" : if(value == 1)WV1_1++;
                                else if(value == 2)WV1_2++;
                                break;
                            case "WV2a__c" : if(value == 1)WV2a_1++;
                                else if(value == 2)WV2a_2++;
                                break;
                            case "WV2b__c" : if(value == 1)WV2b_1++;
                                else if(value == 2)WV2b_2++;
                                break;
                            case "WV2c__c" : if(value == 1)WV2c_1++;
                                else if(value == 2)WV2c_2++;
                                break;
                            case "WV2d__c" : if(value == 1)WV2d_1++;
                                else if(value == 2)WV2d_2++;
                                break;
                            case "WV2e__c" : if(value == 1)WV2e_1++;
                                else if(value == 2)WV2e_2++;
                                break;
                            case "WV2f__c" : if(value == 1)WV2f_1++;
                                else if(value == 2)WV2f_2++;
                                break;
                            case "WV4a__c" : if(value == 1)WV4a_1++;
                                else if(value == 2)WV4a_2++;
                                break;
                            case "WV4b__c" : if(value == 1)WV4b_1++;
                                else if(value == 2)WV4b_2++;
                                break;
                            case "WV4c__c" : if(value == 1)WV4c_1++;
                                else if(value == 2)WV4c_2++;
                                break;
                            case "WV4d__c" : if(value == 1)WV4d_1++;
                                else if(value == 2)WV4d_2++;
                                break;
                            case "WV4e__c" : if(value == 1)WV4e_1++;
                                else if(value == 2)WV4e_2++;
                                break;
                            case "WV6a__c" : if(value == 1)WV6a_1++;
                                else if(value == 2)WV6a_2++;
                                break;
                            case "WV6b__c" : if(value == 1)WV6b_1++;
                                else if(value == 2)WV6b_2++;
                                break;
                            case "WV6c__c" : if(value == 1)WV6c_1++;
                                else if(value == 2)WV6c_2++;
                                break;
                            case "WV6d__c" : if(value == 1)WV6d_1++;
                                else if(value == 2)WV6d_2++;
                                break;
                            case "WV6e__c" : if(value == 1)WV6e_1++;
                                else if(value == 2)WV6e_2++;
                                break;
                            case "WV6f__c" : if(value == 1)WV6f_1++;
                                else if(value == 2)WV6f_2++;
                                break;
                            case "WV7__c" : if(value == 1)WV7_1++;
                                else if(value == 2)WV7_2++;
                                break;
                            case "WV8__c" : if(value == 1)WV8_1++;
                                else if(value == 2)WV8_2++;
                                break;
                            case "WV9__c" : if(value == 1)WV9_1++;
                                else if(value == 2)WV9_2++;
                                break;
                            case "WV10a__c" : if(value == 1)WV10a_1++;
                                else if(value == 2)WV10a_2++;
                                break;
                            case "WV10b__c" : if(value == 1)WV10b_1++;
                                else if(value == 2)WV10b_2++;
                                break;
                            case "WV10c__c" : if(value == 1)WV10c_1++;
                                else if(value == 2)WV10c_2++;
                                break;
                            case "WV10d__c" : if(value == 1)WV10d_1++;
                                else if(value == 2)WV10d_2++;
                                break;
                            case "WV10e__c" : if(value == 1)WV10e_1++;
                                else if(value == 2)WV10e_2++;
                                break;
                            case "WV11__c" : if(value == 1)WV11_1++;
                                else if(value == 2)WV11_2++;
                                break;
                            case "WV12__c" : if(value == 1)WV12_1++;
                                else if(value == 2)WV12_2++;
                                break;
                            case "WV13__c" : if(value == 1)WV13_1++;
                                else if(value == 2)WV13_2++;
                                break;
                            case "WV14__c" : if(value == 1)WV14_1++;
                                else if(value == 2)WV14_2++;
                                break;
                            case "WV15__c" : if(value == 1)WV15_1++;
                                else if(value == 2)WV15_2++;
                                break;
                            case "WV16__c" : if(value == 1)WV16_1++;
                                else if(value == 2)WV16_2++;
                                break;
                            case "SA1__c" : if(value == 1)SA1_1++;
                                else if(value == 2)SA1_2++;
                                break;
                            case "SA2__c" : if(value == 1)SA2_1++;
                                else if(value == 2)SA2_2++;
                                break;
                            case "SA3__c" : if(value == 1)SA3_1++;
                                else if(value == 2)SA3_2++;
                                break;
                            case "SA4__c" : if(value == 1)SA4_1++;
                                else if(value == 2)SA4_2++;
                                break;
                            case "SA5__c" : if(value == 1)SA5_1++;
                                else if(value == 2)SA5_2++;
                                break;
                            case "SA6__c" : if(value == 1)SA6_1++;
                                else if(value == 2)SA6_2++;
                                break;
                            case "SA7__c" : if(value == 1)SA7_1++;
                                else if(value == 2)SA7_2++;
                                break;
                            case "SA8__c" : if(value == 1)SA8_1++;
                                else if(value == 2)SA8_2++;
                                break;
                            case "SA9__c" : if(value == 1)SA9_1++;
                                else if(value == 2)SA9_2++;
                                break;
                            case "SA10__c" : if(value == 1)SA10_1++;
                                else if(value == 2)SA10_2++;
                                break;
                            case "SA11__c" : if(value == 1)SA11_1++;
                                else if(value == 2)SA11_2++;
                                break;
                            case "SA12__c" : if(value == 1)SA12_1++;
                                else if(value == 2)SA12_2++;
                                break;
                            case "SA13__c" : if(value == 1)SA13_1++;
                                else if(value == 2)SA13_2++;
                                break;
                        }
                    }
                }
                counter++;
            }
            csvStringResult += lineDivider;
        }
		csvStringResult += lineDivider;
        WV1_Total = WV1_1 + WV1_2;
        WV2a_Total = WV2a_1 + WV2a_2;
        WV2b_Total = WV2b_1 + WV2b_2;
        WV2c_Total = WV2c_1 + WV2c_2;
        WV2d_Total = WV2d_1 + WV2d_2;
        WV2e_Total = WV2e_1 + WV2e_2;
        WV2f_Total = WV2f_1 + WV2f_2;
        WV4a_Total = WV4a_1 + WV4a_2;
        WV4b_Total = WV4b_1 + WV4b_2;
        WV4c_Total = WV4c_1 + WV4c_2;
        WV4d_Total = WV4d_1 + WV4d_2;
        WV4e_Total = WV4e_1 + WV4e_2;
        WV6a_Total = WV6a_1 + WV6a_2;
        WV6b_Total = WV6b_1 + WV6b_2;
        WV6c_Total = WV6c_1 + WV6c_2;
        WV6d_Total = WV6d_1 + WV6d_2;
        WV6e_Total = WV6e_1 + WV6e_2;
        WV6f_Total = WV6f_1 + WV6f_2;
        WV7_Total = WV7_1 + WV7_2;
        WV8_Total = WV8_1 + WV8_2;
        WV9_Total = WV9_1 + WV9_2;
        WV10a_Total = WV10a_1 + WV10a_2;
        WV10b_Total = WV10b_1 + WV10b_2;
        WV10c_Total = WV10c_1 + WV10c_2;
        WV10d_Total = WV10d_1 + WV10d_2;
        WV10e_Total = WV10e_1 + WV10e_2;
        WV11_Total = WV11_1 + WV11_2;
        WV12_Total = WV12_1 + WV12_2;
        WV13_Total = WV13_1 + WV13_2;
        WV14_Total = WV14_1 + WV14_2;
        WV15_Total = WV15_1 + WV15_2;
        WV16_Total = WV16_1 + WV16_2;
        SA1_Total = SA1_1 + SA1_2;
        SA2_Total = SA2_1 + SA2_2;
        SA3_Total = SA3_1 + SA3_2;
        SA4_Total = SA4_1 + SA4_2;
        SA5_Total = SA5_1 + SA5_2;
        SA6_Total = SA6_1 + SA6_2;
        SA7_Total = SA7_1 + SA7_2;
        SA8_Total = SA8_1 + SA8_2;
        SA9_Total = SA9_1 + SA9_2;
        SA10_Total = SA10_1 + SA10_2;
        SA11_Total = SA11_1 + SA11_2;
        SA12_Total = SA12_1 + SA12_2;
        SA13_Total = SA13_1 + SA13_2;
        csvStringResult += '"","","'+WV1_1+'","'+WV2a_1+'","'+WV2b_1+'","'+WV2c_1+'","'+WV2d_1+'","'+WV2e_1+'","'+WV2f_1+'","'+SA11_1+'","'+SA12_1+'","'+SA5_1+'","'+WV4a_1+'","'+WV4b_1+'","'+WV4e_1+'","'+SA13_1+'","'+WV4c_1+'","'+WV4d_1+'","'+SA6_1+'","'+WV6a_1+'","'+WV6b_1+'","'+WV6c_1+'","'+WV6d_1+'","'+WV6e_1+'","'+WV6f_1+'","'+SA8_1+'","'+SA7_1+'","'+WV7_1+'","'+WV8_1+'","'+WV9_1+'","'+WV10a_1+'","'+WV10b_1+'","'+WV10c_1+'","'+WV10d_1+'","'+WV10e_1+'","'+WV11_1+'","'+WV12_1+'","'+SA9_1+'","'+SA1_1+'","'+WV13_1+'","'+WV14_1+'","'+WV15_1+'","'+SA2_1+'","'+WV16_1+'","'+SA3_1+'","'+SA4_1+'","'+SA10_1+'",""';
        csvStringResult += lineDivider;
        csvStringResult += '"","","'+WV1_2+'","'+WV2a_2+'","'+WV2b_2+'","'+WV2c_2+'","'+WV2d_2+'","'+WV2e_2+'","'+WV2f_2+'","'+SA11_2+'","'+SA12_2+'","'+SA5_2+'","'+WV4a_2+'","'+WV4b_2+'","'+WV4e_2+'","'+SA13_2+'","'+WV4c_2+'","'+WV4d_2+'","'+SA6_2+'","'+WV6a_2+'","'+WV6b_2+'","'+WV6c_2+'","'+WV6d_2+'","'+WV6e_2+'","'+WV6f_2+'","'+'","'+SA8_2+'","'+SA7_2+'","'+WV7_2+'","'+WV8_2+'","'+WV9_2+'","'+WV10a_2+'","'+WV10b_2+'","'+WV10c_2+'","'+WV10d_2+'","'+WV10e_2+'","'+WV11_2+'","'+WV12_2+'","'+SA9_2+'","'+SA1_2+'","'+WV13_2+'","'+WV14_2+'","'+WV15_2+'","'+SA2_2+'","'+WV16_2+'","'+SA3_2+'","'+SA4_2+'","'+SA10_2+'",""';
        csvStringResult += lineDivider;
        csvStringResult += '"","","'+WV1_Total+'","'+WV2a_Total+'","'+WV2b_Total+'","'+WV2c_Total+'","'+WV2d_Total+'","'+WV2e_Total+'","'+WV2f_Total+'","'+SA11_Total+'","'+SA12_Total+'","'+SA5_Total+'","'+WV4a_Total+'","'+WV4b_Total+'","'+WV4e_Total+'","'+SA13_Total+'","'+WV4c_Total+'","'+WV4d_Total+'","'+SA6_Total+'","'+WV6a_Total+'","'+WV6b_Total+'","'+WV6c_Total+'","'+WV6d_Total+'","'+WV6e_Total+'","'+WV6f_Total+'","'+SA8_Total+'","'+SA7_Total+'","'+WV7_Total+'","'+WV8_Total+'","'+WV9_Total+'","'+WV10a_Total+'","'+WV10b_Total+'","'+WV10c_Total+'","'+WV10d_Total+'","'+WV10e_Total+'","'+WV11_Total+'","'+WV12_Total+'","'+SA9_Total+'","'+SA1_Total+'","'+WV13_Total+'","'+WV14_Total+'","'+WV15_Total+'","'+SA2_Total+'","'+WV16_Total+'","'+SA3_Total+'","'+SA4_Total+'","'+SA10_Total+'",""';
        csvStringResult += lineDivider;
        component.set("v.showSpinner",false);
        return csvStringResult;
    },
})