application assignment2

imports authentication
imports entities
imports management
imports elib/elib-bootstrap/lib
imports elib/elib-utils/lib


page root(){
    output("Contact administrator for REST API usage instructions.")
  }

service parties(){
  var a := JSONArray();
if(principal()!=null && principal().username == "admin"){
  	for( po: Party ){
	    var o := JSONObject();
	    
	 //  	var s := "";
	 //    var sass := JSONArray();
	 //    for(poo:Politician where poo.party == po order by poo.number asc){
		//    		var os := JSONObject();
		//    		os.put("id", poo.id);
		//    		sass.put(os);
	 //    }
	 //    s:=sass.toString();
		// o.put( "politicians",  s);
	 //    o.put( "longdesc", po.longDesc );
	 //    
	    
	    
	    o.put( "id", po.id );
	    o.put( "name", po.name);
		o.put( "url",  po.url);
	    
	    o.put( "shortdesc", po.shortDesc );
	    a.put( o );
	  }
  }else{
  	var o := JSONObject();
  	o.put("message","not_authenticated");
  	a.put(o);
  }
	  
  return a;
}


service politicians(){
	var a := JSONArray();
	
	if(principal()!=null && principal().username == "admin"){
		  for( p: Politician ){
		    var o := JSONObject();
		    o.put( "id", p.id );
		    o.put( "name", p.name );
		    o.put( "party", p.party.id );
		    o.put( "number", p.number);
		    // o.put( "desc", p.desc);
		    a.put( o );
		  }
     }else{
		   var o := JSONObject();
		    o.put( "message", "not_authenticated" );
		    a.put( o );
	}
    
	  
  return a;
}

service getPolitician( pol: Politician ){
  var a := JSONArray();
  var o := JSONObject();

   if(principal()!=null && principal().username == "admin"){
    o.put( "id", pol.id );
    o.put( "name", pol.name );
    o.put( "number", pol.number );
    o.put( "party", pol.party.id );
    o.put( "desc", pol.desc );
  }else{
  	o.put("message","not_authenticated");
  }
  a.put(o);
  return a;
}


service getParty( par: Party ){
	var s := "";
	var a := JSONArray();
    var o := JSONObject();
	if(principal()!=null && principal().username == "admin"){
	    var sass := JSONArray();
	    for(poo:Politician where poo.party == par order by poo.number asc){
		   		var os := JSONObject();
		   		os.put("id", poo.id);
		   		sass.put(os);
	    }
	    s:=sass.toString();
	    
	    
	    
	    o.put( "id", par.id );
	    o.put( "name", par.name );
		o.put( "politicians",  s);
		o.put( "url",  par.url);
	    
	    o.put( "shortdesc", par.shortDesc );
	    o.put( "longdesc", par.longDesc );
    }else{
  	o.put("message","not_authenticated");
  }
  a.put(o);
  return a;
}


	