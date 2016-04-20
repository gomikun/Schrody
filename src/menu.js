//CREATION DU MENU

var menu = (function () {
	var _jeu;
	var menu = function (jeu) {
		_jeu = jeu;

	};

	menu.prototype = {
		create: function()
		{

			//Bouton pour démarrer le jeu
			_jeu.bouton = _jeu.add.button(_jeu.world.centerX, _jeu.world.centerY, "bouton", this.demarrerJeu, this);
			_jeu.bouton.anchor.setTo(0.5,0.5);

			console.log(_jeu.bouton);
		},

		demarrerJeu : function(){
			console.log("Jouer..."); //Le jeu est démarré
			_jeu.state.start("Jouer");
		}


	};
	return menu;

})();
