liste1 = "listeEtudiant.xml";
liste2 = "ListeEtudiantEnRetard.xml";

function listeEtudiant1() {

	ajouterEtudiant("listeEtudiant.xml");
}

function listeEtudiant2() {
	ajouterEtudiant("ListeEtudiantEnRetard.xml");
}

function ajouterEtudiant(chemin) {

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", chemin, true);
	var Students = [];
	localStorage.setItem("students", JSON.stringify(Students));
	xmlhttp.onreadystatechange = function() {

		if (xmlhttp.readyState == 4) {
			var xml = xmlhttp.responseXML;
			var docsnom = xml.getElementsByTagName("nom");
			var docsprenom = xml.getElementsByTagName("prenom");
			var docs = xml.getElementsByTagName("email");
			var docsmpd = xml.getElementsByTagName("motdepasse");
			var resultat = true;

			for ( i = 0; i < docs.length; i++) {
				nom = docsnom[i].firstChild.nodeValue;
				prenom = docsprenom[i].firstChild.nodeValue;
				mail = docs[i].firstChild.nodeValue;
				motdepasse = docsmpd[i].firstChild.nodeValue;
				if (!(uniciteCourriel(mail, docs, (i + 1)))) {

					messageErreur(mail);
					resultat = false;

				}

				Students = $.parseJSON(localStorage.getItem("students"));
				Students.push({
					'nom' : nom,
					'prenom' : prenom,
					'email' : mail,
					'motdepasse' : motdepasse,
				});

				localStorage.setItem("students", JSON.stringify(Students));

			}
		}

	};

	xmlhttp.send();

}

function uniciteCourriel(courriel, collection, index) {

	var unicite = true;
	for ( j = index; j < collection.length; j++)
		if (courriel == collection[j].firstChild.nodeValue) {
			unicite = false;

		}

	return unicite;
}

function messageErreur(mail) {

	alert("*** " + mail + " n'est pas unique ***");
}

function afficheEtudiant() {

	var tmp = $.parseJSON(localStorage.getItem("students"));
	select = document.getElementById('listB');
	for (z in tmp) {
		var option = document.createElement('option');
		option.value = tmp[z].nom + " " + tmp[z].prenom;
		option.innerHTML = tmp[z].nom + " " + tmp[z].prenom;
		select.appendChild(option);
	}
	localStorage.setItem("students", "nundefined");
}

