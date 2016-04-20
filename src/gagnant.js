//ECRAN VICTOIRE

var gagne = (function(){
	var _jeu;
	var gagne = function(jeu){
	_jeu = jeu;
};

gagne.prototype = {
	preload: function(){

		_jeu.load.image("ecran_gagneV", "assets/gagne_vivant.jpg");
		_jeu.load.image("ecran_gagneM", "assets/gagne_mort.jpg");


	},
	create: function(){
		switch (Math.ceil(Math.random() * 2)){
			case 1:
				_jeu.ecran_demarrage = _jeu.add.sprite(0, 0, "ecran_gagneV");
				break;
			case 2:
				_jeu.ecran_demarrage = _jeu.add.sprite(0, 0, "ecran_gagneM");
				break;
		}
	}
}
return gagne;

})();

