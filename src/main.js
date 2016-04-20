//CHARGEMENT DES DIFFERENTES PHASES DU JEU
(function () {

	var jeu = new Phaser.Game(768, 640, Phaser.AUTO, '');
	jeu.state.add("Demarrage", demarrage);  // Boot
	jeu.state.add("Chargement", chargement);  // Loading
	jeu.state.add("Menu", menu);  // Menu de démarrage
	jeu.state.add("Jouer", jouer);  // Le jeu
	jeu.state.add("Perdant", perdu);  // la fin
	jeu.state.add("Gagnant", gagne);  // la victoire


	jeu.state.start("Demarrage");

})();
