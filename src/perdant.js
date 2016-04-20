//ECRAN GAMEOVER

var perdu = (function(){
	var _jeu;
	var perdu = function(jeu){
	_jeu = jeu;
};

perdu.prototype = {
	preload: function(){

		_jeu.load.image("ecran_perdu", "assets/perdu.jpg");

	},
	create: function(){
		_jeu.ecran_perdu = _jeu.add.sprite(0, 0, "ecran_perdu");

	}
}
return perdu;

})();
