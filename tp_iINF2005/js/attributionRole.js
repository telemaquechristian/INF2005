function listeuser() {

	fullList = document.getElementsByName('listB')[0];
	showstudents();
	showsstudentsLater();
	//showdemo();
	//localStorage.setItem("demo", JSON.stringify([]));
}

function showstudents() {
	var e1 = $.parseJSON(localStorage.getItem("copy1"));
	for (q in e1)
	fullList.options[fullList.options.length] = new Option(e1[q].nom + " " + e1[q].prenom, fullList.options.length);
}

function showsstudentsLater() {
	var estnull = localStorage.getItem("copy");
	if (estnull != null) {
		var e2 = $.parseJSON(estnull);
		for (r in e2)
		fullList.options[fullList.options.length] = new Option(e2[r].nom + " " + e2[r].prenom, fullList.options.length);
	}
}

function showdemo() {
	var estnull = localStorage.getItem("demo");
	if (estnull != null || estnull != []) {
		var d = $.parseJSON(estnull);
		for (g in d)
		fullList.options[fullList.options.length] = new Option(d[g].nom + " " + d[g].prenom, fullList.options.length);
	};
}

function swap(listFrom, listTo) {
	fromList = document.getElementsByName(listFrom)[0];
	toList = document.getElementsByName(listTo)[0];
	while (fromList.selectedIndex != -1) {
		addOption(toList, fromList.options[fromList.selectedIndex]);
		fromList.options.remove(fromList.selectedIndex);
	}
}

function addOption(list, option) {
	list.options[list.options.length] = new Option(option.innerHTML, option.value);
	
	swapList(option.innerHTML);
}

function swapList(val) {
	var selection = document.attri.usr;
	var et = selection[0].checked;
	var dem = selection[1].checked;

	if (et) {

	} else if (dem) {

		searchDem(val, "copy1");
		searchDem(val, "copy");
	}
}

function searchDem(el, endroit) {

	var e1 = $.parseJSON(localStorage.getItem(endroit));
	for (q in e1)
	if (el == (e1[q].nom + " " + e1[q].prenom)) {

		var tdem = localStorage.getItem("demo");
		if (tdem != null || tdem != []) {
			var d = $.parseJSON(tdem);
			ad(d, e1[q]);
			e1.splice(q);
			//localStorage.setItem(endroit, JSON.stringify(e1));
		} else {
			localStorage.setItem("demo", JSON.stringify([]));
			var k = $.parseJSON(localStorage.getItem("demo"));
			ad(k, e1[q]);
			e1.splice(q);
			//localStorage.setItem(endroit, JSON.stringify(e1));
		}
	}

}

function ad(e1, e2) {

	e1.push({
		'nom' : e2.nom,
		'prenom' : e2.prenom,
		'email' : e2.email,
		'motdepasse' : e2.confirmation,
	});

	localStorage.setItem("demo", JSON.stringify(e1));
	
	
}

function showAttrib() {
	var selection = document.attri.usr;
	var dem = selection[1].checked;
	var selList = document.getElementsByName('listA')[0];
	if (dem) {
		
		var estnull = localStorage.getItem("demo");
		if (estnull != null || estnull != []) {
			var d = $.parseJSON(estnull);
			for (g in d)
			selList.options[selList.options.length] = new Option(d[g].nom + " " + d[g].prenom, selList.options.length);
		};
	}else{
		
		for(u in selList.options)selList.options.remove(u);
	}
}

