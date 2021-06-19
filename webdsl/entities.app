module entities

section data definition
	  entity Account{
	    username : String (length=50) 
	    password : Secret
	  }
  	  entity Name {
	  	name : String (length=30)
	  }
  	  entity Party : Name{
	    url : URL
	    politicians -> Set<Politician>  (inverse=Politician.party)
	  	shortDesc : String(length=300)
	  	longDesc : WikiText (length=2000)
	  }
	  
	  entity Politician : Name{
	  	party -> Party
	  	desc : WikiText (length=1000)
	  	number : Int
	  }
	  
	  
section initialize some sample data
init{
    var aa1 := Account { username := "admin" password := ("admin" as Secret).digest() };
    var aa2 := Account { username := "user2" password := ("user2" as Secret).digest() };
    aa1.save();aa2.save();
    
    var pa1 := Party { 
    	name := "VVD" 
	    	shortDesc:="De VVD is de grootste politieke partij in de Tweede Kamer. Bekijk onze standpunten, verhalen achter politici en ontdek hoe je mee kunt doen met de VVD."
	    	longDesc:="This is the long description of VVD."
	    	url :="http://vvd.nl"
    	};
    var pa2 := Party { 
    	name := "GroenLinks" 
	    	shortDesc:="Al 30 jaar strijdt GroenLinks voor een inclusieve samenleving waarin we solidair zijn met elkaar en met de volgende generaties. Doe je mee?"
	    	longDesc:="This is the long description of GroenLinks."
	    	url:="http://groenlinks.nl"
    	};
    pa1.save();pa2.save();
    
    var po1 := Politician { name := "Mark Rutte" party := pa1 number:=1 desc:="Minister-president van Nederland."};
    var po2 := Politician { name := "Rob Jetten" party := pa2 number:=1 desc:="Tweede Kamerlid."};
    var po3 := Politician { name := "Jolande Sap" party := pa2 number:=2 desc:="Fractievoorzitter Tweede Kamer."};
    po1.save();po2.save();po3.save();
    
    
    
  }
  
  