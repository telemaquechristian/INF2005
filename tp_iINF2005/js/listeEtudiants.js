liste1 = "listeEtudiant.xml";
liste2 = "ListeEtudiantEnRetard.xml";


//function listeEtudiant1() {
//	lirefichier(liste1);
//}

function lirefichier(path_document) {

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", path_document, true);

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
					break;
				} else {
					

					ajouetEtudiant(nom, prenom, mail, motdepasse);
				}
			}

			if (resultat) {
				afficheEtudiant(xml);
			}

		}

	};

	xmlhttp.send();

}

function uniciteCourriel(courriel, collection, index) {

	var unicite = true;
	for ( i = index; i < collection.length; i++)
		if (courriel == collection[i].firstChild.nodeValue) {
			unicite = false;
		}
	;
	return unicite;
}

function messageErreur(mail) {

	alert("*** " + mail + " n'est pas unique ***");
}

function afficheEtudiant(xml) {
	var nom = xml.getElementsByTagName("nom");
	var prenom = xml.getElementsByTagName("prenom");

	select = document.getElementById('listB');
	for (i in nom) {
		var option = document.createElement('option');
		option.value = nom[i].firstChild.nodeValue + " " + prenom[i].firstChild.nodeValue;
		option.innerHTML = nom[i].firstChild.nodeValue + " " + prenom[i].firstChild.nodeValue;
		select.appendChild(option);
	}

}



