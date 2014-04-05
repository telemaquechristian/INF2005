function valideInscription() {

	nom = document.inscription.Nom.value;
	prenom = document.inscription.Prenom.value;
	email = document.inscription.Email.value;
	confirmation = document.inscription.Confirmation.value;
	mpd = document.inscription.pwd.value;
	liste1 = "listeEtudiant.xml";
	liste2 = "ListeEtudiantEnRetard.xml";

	doublons();

}

function doublons() {
	
	var doublons = contain(email, liste1);

}

function contain(mail, chemin) {
	
	var resultat = true;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", chemin, true);
	
	xmlhttp.onreadystatechange = function() {

		if (xmlhttp.readyState == 4) {
			var xml = xmlhttp.responseXML;
			var docs = xml.getElementsByTagName("email");
		
			for ( i = 0; i < docs.length; i++) {
				if (mail == docs[i].firstChild.nodeValue) {
					resultat = false;
					messageErreur();
				}

			}
			
			if (resultat) {
				save(mail);
			}

		}

	};

	xmlhttp.send();
	return resultat;
}

function messageErreur() {
	alert("The email is already in the database!");
}

function save(mail) {
	
	
	if (mail != confirmation) {
		alert("The mail must be the same!");
	} else {
		alert("Inscription a été faite");
		
		localStorage.setItem("0",email);
		localStorage.setItem("1",mpd);
		localStorage.setItem("2","etudiant");

		
		
	}

}

function accueil(){
	var user = document.connection.email.value;
	var pwd = document.connection.pwd.value;
	var storedValue = localStorage.getItem("email");
	
	
	for(i =0 ; i < localStorage.length; i++){
		if((user == localStorage.getItem(""+i+""))&&(pwd == localStorage.getItem(""+(i+1)+""))){
			localStorage.setItem("logIn",true);
			localStorage.setItem("logOUT",false);
			window.location.href = "Accueil.html";
			
		}
	}
	
	if(true)alert("Code d'accès ou Mot de passe incorrect");
	
}

