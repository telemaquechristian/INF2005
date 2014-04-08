function listeuser() {

	var e1 = $.parseJSON(localStorage.getItem("students"));
	fullList = document.getElementsByName('listB')[0];
	//alert(fullList);

	for (q in e1)
	fullList.options[fullList.options.length] = new Option(e1[q].nom + " " + e1[q].prenom, fullList.options.length);

	var estnull = localStorage.getItem("studentsLater");
 	if (estnull != null) {
		var e2 = $.parseJSON(estnull);
		for (r in e2)
		fullList.options[fullList.options.length] = new Option(e2[r].nom + " " + e2[r].prenom, fullList.options.length);
	}
	
estnull  = localStorage.getItem("demo");
if (estnull != null || estnull != []) {
	var d = $.parseJSON(estnull);
	for (g in d)
		fullList.options[fullList.options.length] = new Option(e2[g].nom + " " + e2[g].prenom, fullList.options.length);
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

}
