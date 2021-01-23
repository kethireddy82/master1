public with sharing class AccountChartController {  
   public list<string> label{get;set;}  
   public list<integer> data{get;set;}  
   public list<string> Lead_Label{get;set;}  
   public list<Integer> Lead_Data{get;set;}  
   public list<string> Account_Label{get;set;}  
   public list<Integer> Account_Data{get;set;}  
   public list<opportunity> oppList{get;set;}  
   public AccountChartController (){  
     label=new list<string>();  
     data=new list<integer>();  
     Lead_Label=new List<string>();  
     Lead_Data=new List<integer>();  
     Account_Label=new List<string>();  
     Account_Data=new List<integer>();  
     generateData();  
     GenerateLeadData();  
     GenerateAccountData();  
   }  
    public void generateData(){  
   AggregateResult[] groupedResults = [SELECT StageName, Count(Id) cnt FROM Opportunity group by StageName];  
     for (AggregateResult ar : groupedResults)   
     {  
        label.add((string)ar.get('StageName'));  
        data.add((integer)ar.get('cnt'));  
     }  
   }  
   public void GenerateLeadData(){  
     AggregateResult[] groupedResults = [SELECT Status, Count(Id) cnt FROM Lead group by Status limit 5];  
     system.debug(groupedResults);  
     for (AggregateResult ar : groupedResults)   
     {  
        Lead_Label.add((string)ar.get('Status'));  
        Lead_Data.add((integer)ar.get('cnt'));  
     }  
     system.debug(Lead_Label);  
     system.debug(Lead_Data);  
   }  
   public void GenerateAccountData(){  
     AggregateResult[] groupedResults = [SELECT AccountSource, Count(Id) cnt FROM Account group by AccountSource ];  
     system.debug(groupedResults);  
     for (AggregateResult ar : groupedResults)   
     {  
        Account_Label.add((string)ar.get('AccountSource'));  
        Account_Data.add((integer)ar.get('cnt'));  
     }  
   }  
 }