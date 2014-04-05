function verifier(){
	
	if(localStorage.getItem("logOUT") == "true"){
		window.location.href = "authentification.html";
	} 
	
}

function deco(){
	
	
			localStorage.setItem("logIn",false);
			localStorage.setItem("logOUT",true);
			window.location.href = "deconection.html";
}
