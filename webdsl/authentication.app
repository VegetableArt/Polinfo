module authentication



 access control rules
    rule page root(){ true }
    rule page parties(){ 
    	true
     }
    rule page politicians(){ 
    	true
     }
     rule page getPolitician(pol: Politician){
     	true
     }
     rule page getParty( par: Party ){
     	true
     }
    
     rule page authenticationApi(){
     	true
     }
     rule page logoutApi(){
     	true
     }
     rule page checkLogin(){
     	true
     }
     rule page addPartyNew(){
     	true
     }
     rule page addPolNew(){
     	true
     }
     rule page addParty(par: Party){
     	true
     }
     rule page addPol(po: Politician){
     	true
     }
     rule page removePol(po: Politician){
     	true
     }
     rule page removeParty(par: Party){
     	true
     }
  
  
section authentication and such
	principal is Account with credentials username, password

	function principal() : Account{
	  return securityContext.principal;
	}
	



service authenticationApi(){
  if( getHttpMethod() == "POST" ){
    var body := readRequestBody();
    var o := JSONObject( body );
    
    
    var username := o.getString("username");
    var password := (o.getString("password") as Secret);
    
    var result := authenticate(username,password);
    
    var msgs := JSONArray();
    var msg := JSONObject();
    
    if(result == false){
    	msg.put( "message", "auth_fail" );
    }else{
    	msg.put( "message", "auth_success" );
    }
    msgs.put( msg  );
    return msgs;
  }
}

service logoutApi(){
  if( getHttpMethod() == "GET" ){
    var msgs := JSONArray();
    var msg := JSONObject();
    msg.put("message","logout_successful");
    securityContext.principal := null;
    msgs.put(msg);
    return msgs;
  }
}
service checkLogin(){
  if( getHttpMethod() == "GET" ){
    var msgs := JSONArray();
    var msg := JSONObject();
	if(principal()!=null){
    	msg.put("message","logged_in");
    	msg.put("username", principal().username);
    }else{
    	msg.put("message","not_logged_in");
    }
    msgs.put(msg);
    return msgs;
  }
}


