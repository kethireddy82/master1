/*
 This is a trigger which will help us to generate a log on the contact object if the Contact's role has been updated 
*/

trigger contactTrigger on Contact (after insert ,after update,before update) { 
    if(trigger.isInsert)
     {
         //Helper class to create log.
         ContactLogClass.generateLog(trigger.new);
     }
     if(trigger.isupdate)
     {
         if(trigger.isAfter)
         {
             //Helper class to create log.
             ContactLogClass.generateLog(trigger.new,trigger.oldmap);
         }
         if(trigger.isBefore)
         {
             ContactLogClass.updateMostRecentContactRole(trigger.new,trigger.oldmap);
         }           
     }
}