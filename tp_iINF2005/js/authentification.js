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

		localStorage.setItem("0", email);
		localStorage.setItem("1", mpd);
		localStorage.setItem("2", "etudiant");

	}

}

function accueil() {
	var user = document.connection.email.value;
	var pwd = document.connection.pwd.value;
	var storedValue = localStorage.getItem("email");
 	afficherProchainLogIn();
	for ( i = 0; i < localStorage.length; i++) {

		if ((user == localStorage.getItem("" + i + "")) && (pwd == localStorage.getItem("" + (i + 1) + ""))) {
			localStorage.setItem("logIn", "true");
			localStorage.setItem("logOUT", "false");
			window.location.href = "Accueil.html";

		}
	}

	veriferTempslog();
}

function veriferTempslog() {

	alert("Code d'accès ou Mot de passe incorrect");

	if (localStorage.getItem("compteur") == 1) {
		localStorage.setItem("compteur", 2);
	} else if(localStorage.getItem("compteur") == 2){
		localStorage.setItem("compteur", 3);
	}else if ((localStorage.getItem("compteur") == 3) && localStorage.getItem("blockMinute2") > new Date().getMinutes()) {
		localStorage.setItem("block", "true");
		var temps = parseInt( (new Date().getMinutes()));

		localStorage.setItem("nextLog", ((temps + 10) % 60));

	} else {
		init();
	}
}

function afficherProchainLogIn() {
	var nextime = parseInt(localStorage.getItem("nextLog"));
	var minutes = parseInt((new Date().getMinutes()) % 60);
 	if (nextime >= 0 && nextime < 10 && minutes != 0 && minutes > 0 && minutes < 10){
		nextime += 60;
		minutes += 60;
	}else if (nextime >= 0 && nextime < 10 && minutes != 0 && minutes > 50 ){
		nextime += 60;
		;
	}
		
	
		
	if (localStorage.getItem("block") == "true" && minutes < nextime) {

		var acce = nextime - minutes;
		alert("** Your next login in " + acce + " minute");
		window.location.href = "Accueil.html";
	}

}

function init() {
	localStorage.setItem("compteur", 1);
	localStorage.setItem("block", false);
	var m = new Date().getMinutes();
	localStorage.setItem("blockMinute1", m);
	localStorage.setItem("blockMinute2", (m + 5));
	localStorage.setItem("nextLog", -1);
}

function delai() {

}
