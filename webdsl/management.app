module management


	service addParty(par:Party){
		if(principal()!=null && principal().username == "admin"){
			if( getHttpMethod() == "POST" ){
	    		var body := readRequestBody();
	    		var o := JSONObject( body );
			    par.name := o.getString("name");
			    par.url := o.getString("url");
			    par.shortDesc := o.getString("shortDesc");
			    par.longDesc := o.getString("longDesc");
		 		par.save(); 
		 		var a := JSONArray();
		 		var ao := JSONObject();
			  	ao.put("message","success");
			  	a.put(ao);
		 	}
		}
	}


	service addPartyNew(){
	  	if(principal()!=null && principal().username == "admin"){
		  	if( getHttpMethod() == "POST" ){
				var par := Party{};
	    		var body := readRequestBody();
	    		var o := JSONObject( body );
			    par.name := o.getString("name");
			    par.url := o.getString("url");
			    par.shortDesc := o.getString("shortDesc");
			    par.longDesc := o.getString("longDesc");
		 		par.save();
		 		var a := JSONArray();
		 		var ao := JSONObject();
			  	ao.put("message","success");
			  	a.put(ao); 
		 	}
		}
	}


	service removeParty(par:Party){
		if(principal()!=null && principal().username == "admin"){
			if( getHttpMethod() == "GET" ){
	    		par.delete();
		 	}
		}
	}


	service addPol(po:Politician){
		if(principal()!=null && principal().username == "admin"){
		  	if( getHttpMethod() == "POST" ){
	    		var body := readRequestBody();
	    		var o := JSONObject( body );
				for(pa:Party where pa.id == o.getString("party").parseUUID()){
				    po.name := o.getString("name");
				    po.desc := o.getString("desc");
				    po.party := pa;
				    po.number := o.getInt("number");
			 		po.save(); 
			 		var a := JSONArray();
			 		var ao := JSONObject();
				  	ao.put("message","success");
				  	a.put(ao);
		   		}
		 	}
		}
	}


	service addPolNew(){
		if(principal()!=null && principal().username == "admin"){
		  	if( getHttpMethod() == "POST" ){
				var po := Politician{};
	    		var body := readRequestBody();
	    		var o := JSONObject( body );
				for(pa:Party where pa.id == o.getString("party").parseUUID()){
				    po.name := o.getString("name");
				    po.desc := o.getString("desc");
				    po.party := pa;
				    po.number := o.getInt("number");
			 		po.save(); 
			 		var a := JSONArray();
			 		var ao := JSONObject();
				  	ao.put("message","success");
				  	a.put(ao);
		   		}
		 	}
		}
    }


	service removePol(po:Politician){
		if(principal()!=null && principal().username == "admin"){
			if( getHttpMethod() == "GET" ){
	    		po.delete();
		 	}
		}
	}
