function loadxml() {

	var fileChooser = document.getElementById('xml');
	var ok = isXml(fileChooser);
	if (!ok) {
		alert("***Your select file must be a extension .xml ***");
	}
	
	valide(fileChooser);
	

}

function isXml(input) {
	var value = input.value;
	var res = value.substr(value.lastIndexOf('.')) == '.xml';
	if (!res) {
		input.value = "";
	}
	return res;
}

function valide(input) {
	var path = input.value;
	alert(path);
	var xmlDoc = loadXMLDoc(path);
	 
	var nom = xmlDoc.getElementsByTagName("nom")[0].childNodes[0].text;
	var prenom = xmlDoc.getElementsByTagName("prenom")[0].childNodes[0].text;
	var mail = xmlDoc.getElementsByTagName("mail")[0].childNodes[0].text;
	var resultat = new String();
	//for ( i = 0; i < x.length; i++) {
		//resultat += x[i].childNodes[0].nodeValue;

	//}
	alert(nom +"-"+prenom+"-"+mail);
}


function loadXMLDoc(dname) {
	 xmlDoc;
	if (window.XMLHttpRequest) {
       xhttp = new XMLHttpRequest();
    } else {    
       xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", dname, false);
    alert("here");
    xhttp.send();
    xmlDoc = xhttp.responseXML;
    return xmlDoc; 
}