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

	contain(email, liste1);
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
			if (containListe2(mail) == true) {
				resultat = false;
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

function containListe2(mail) {
	var veri = $.parseJSON(localStorage.getItem("studentsLater"));

	for (w in veri) {
		if (mail == tmp[w].email) {
			messageErreur();
			return true;
		}
	}
	return false;
}

function save(mail) {

	if (mail != confirmation) {
		alert("The mail must be the same!");
	} else {
		alert("Inscription a été faite");

		StudentsLater = $.parseJSON(localStorage.getItem("studentsLater"));
		StudentsLater.push({
			'nom' : nom,
			'prenom' : prenom,
			'email' : email,
			'motdepasse' : confirmation,
		});
		
		localStorage.setItem("studentsLater", JSON.stringify(StudentsLater));
		copyobj();
	}

}

function copyobj(){
	var cop =  $.parseJSON(localStorage.getItem("studentsLater"));
	localStorage.setItem("copy", JSON.stringify(cop));
	
}
function accueil() {
	user = document.connection.email.value;
	pwd = document.connection.pwd.value;
	var alluser = $.parseJSON(localStorage.getItem("students"));
	var alluserlater = $.parseJSON(localStorage.getItem("studentsLater"));

	connectionProf();
	connectionDemo();

	for (a in alluser) {
		if (user == alluser[a].email && pwd == alluser[a].motdepasse) {
			localStorage.setItem("logIn", "true");
			localStorage.setItem("logOUT", "false");
			window.location.href = "AccueilEtudiant.html";
		}

	}

	for (b in alluserlater) {
		if (user == alluserlater[b].email && pwd == alluserlater[b].motdepasse) {
			localStorage.setItem("logIn", "true");
			localStorage.setItem("logOUT", "false");
			window.location.href = "AccueilEtudiant.html";
		}

	}

	
	afficherProchainLogIn();
veriferTempslog();
}

function connectionProf() {

	emailProf = "professeur.professeur@courrier.uqam.ca";
	mpdProf = "12345";

	if (emailProf == user && mpdProf == pwd) {
		localStorage.setItem("logIn", "true");
		localStorage.setItem("logOUT", "false");
		window.location.href = "Accueil.html";

	}

}

function connectionDemo(){
	emailDemo = "demo.demo@courrier.uqam.ca";
	mpdDemo = "12345";

	if (emailDemo == user && mpdDemo == pwd) {
		localStorage.setItem("logIn", "true");
		localStorage.setItem("logOUT", "false");
		window.location.href = "Accueil.html";

	}

	
}

function veriferTempslog() {

	alert("Code d'accès ou Mot de passe incorrect");
	if (localStorage.getItem("compteur") == 1) {
		localStorage.setItem("compteur", 2);
	} else if (localStorage.getItem("compteur") == 2) {
		localStorage.setItem("compteur", 3);
	} else if ((localStorage.getItem("compteur") == 3) && localStorage.getItem("blockMinute2") > new Date().getMinutes()) {
		localStorage.setItem("block", "true");
		var temps = parseInt((new Date().getMinutes()));

		localStorage.setItem("nextLog", ((temps + 10) % 60));

	} else {
		init();
	}
}

function afficherProchainLogIn() {
	var nextime = parseInt(localStorage.getItem("nextLog"));
	var minutes = parseInt((new Date().getMinutes()) % 60);
	if (nextime >= 0 && nextime < 10 && minutes != 0 && minutes > 0 && minutes < 10) {
		nextime += 60;
		minutes += 60;
	} else if (nextime >= 0 && nextime < 10 && minutes != 0 && minutes > 50) {
		nextime += 60;

	}

	if (localStorage.getItem("block") == "true" && minutes < nextime) {

		var acce = nextime - minutes;
		alert("** Your next login in " + acce + " minute");
		localStorage.setItem("compteur", 1);
		window.location.href = "Accueil.html";
	}
	
}

function init() {
	localStorage.setItem("compteur", 1);
	localStorage.setItem("block", null);
	var m = new Date().getMinutes();
	localStorage.setItem("blockMinute1", m);
	localStorage.setItem("blockMinute2", (m + 5));
	localStorage.setItem("nextLog", -1);
}

