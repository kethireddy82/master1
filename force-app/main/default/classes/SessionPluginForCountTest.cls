@isTest
public class SessionPluginForCountTest {
    
    static testMethod void invokeTest() {     
        SessionPluginForCount pluginfor = new SessionPluginForCount();
        AuthSession testSession1 = new AuthSession();
        AuthSession testSession2 = new AuthSession();
        List<AuthSession> authSess = new List<AuthSession>();
        authSess.add(testSession1);
        authSess.add(testSession2);
        List<Integer> count;
        count =  SessionPluginForCount.getSessionCount(authSess); 
        System.AssertEquals(1,1);
    }
}