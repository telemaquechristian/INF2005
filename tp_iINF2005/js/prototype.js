function ajouetSection (){
	var titre = document.section1.titre.value;
	var description = document.section1.description.value;
	
	
	var sections = $.parseJSON(localStorage.getItem("sections"));
	if(sections == null)localStorage.setItem("sections",JSON.stringify([]));
	
	sections = $.parseJSON(localStorage.getItem("sections"));
	
	sections.push({
			'titre' : titre,
			'description' : description,
		});
	
	localStorage.setItem("sections",JSON.stringify(sections));
	
}

function afficherSection () {
	
	var sections = $.parseJSON(localStorage.getItem("sections"));
					for(i in sections){
						alert("titre : " + sections[i].titre + "\n" +
						"description : " + sections[i].description);
						
						}
}




