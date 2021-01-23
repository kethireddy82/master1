public class SessionPluginForCount 
{    
    @InvocableMethod(label='Get Session Count' description='This plug-in returns the no of concurrent sessions for the current user' category='Identity')
    public static List<Integer> getSessionCount(List<AuthSession> sessions) 
    {
        List<Integer> session_count = new List<Integer>();
        Integer count = 0;
        String userid   = UserInfo.getUserId();
        sessions = [Select Id, ParentId, SessionType from AuthSession where UsersId=:userid];
        for (AuthSession s : sessions)
        {
            // Count only parent and non-temp sessions
            if(s.ParentId == null && s.SessionType != 'TempUIFrontdoor' )
            {
                count++;
            }
        }
        session_count.add(count);
        return session_count;
    } 
}