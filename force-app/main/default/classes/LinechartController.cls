public class LinechartController {
@AuraEnabled
    public static String getOpportunityJSON(){
       /* ID contactID = [select contactid from user where id =: UserInfo.getUserId()].contactID;
        System.debug('Abhishek ' + contactID);
        
        ID accountID = [select accountid from contact where id =: contactID].AccountId;
       List<case> lstopp = [SELECT Id, status FROM case where accountid =: accountID ]; */
        
      // List<case> lstopp = [SELECT Id, status FROM case where contactid =: contactID ];
      // 
      List<case> lstopp = [SELECT Id, status FROM case];
        Map<String,Integer> mapLeadSource = new Map<String,Integer>();
 
        for(case l : lstopp)
        {
            if(mapLeadSource.containsKey(l.status))
            {
                mapLeadSource.put(l.status, mapLeadSource.get(l.status)+1) ;
            }else{
                mapLeadSource.put(l.status, 0) ;
            }
        }
        system.debug('map values--'+mapLeadSource);
        list<RadarDataWrapper> radarData = new list<RadarDataWrapper>();
 
        for(String key : mapLeadSource.keySet())
        {
           RadarDataWrapper rdw = new RadarDataWrapper();
            rdw.name=key;
            rdw.y=mapLeadSource.get(key);
            radarData.add(rdw);
        }
        system.debug('rdw---'+radarData);
        return System.json.serialize(radarData);
        //return null;
    }
 
    /**
     * Wrapper class to serialize as JSON as return Value
     * */
    class RadarDataWrapper
    {
       @AuraEnabled
       public String name;
       @AuraEnabled
       public integer y;
 
    }
 
}