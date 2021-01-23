@isTest
private class OTPGeneratorTest {
 
    static testmethod void OTPGeneratorTests() {
      
        OTPGenerator plugin = new OTPGenerator();
     Map<String,Object> inputParams = new Map<String,Object>();
 
        string feedSubject = '123456';
       inputParams.put('OTP', feedSubject);   
        
          
 
        Process.PluginRequest request = new Process.PluginRequest(inputParams); 
        
        
        Process.PluginDescribeResult result = plugin.describe();
        
        plugin.invoke(request);
    } 
}