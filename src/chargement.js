//CHARGEMENT ASSETS

var chargement = (function () {
	var _jeu;
	var chargement = function (jeu) {
		_jeu = jeu;
	}

	chargement.prototype = {
		preload: function () {
			//barre de chargement
			_jeu.barreChargement = _jeu.add.sprite(200, 240, "barre_chargement");
			_jeu.load.setPreloadSprite(_jeu.barreChargement);

			//CHARGEMENT DES SPRITES

			_jeu.load.spritesheet('chat', 'assets/schrody_sheet.png',64,64);
			_jeu.load.image('boite1', 'assets/boite.png');
			_jeu.load.image('boite2', 'assets/boite2.png');
			_jeu.load.image('bouton', 'assets/bouton.png');
			 _jeu.load.image('poison', 'assets/poison.png');
			 _jeu.load.image('bandeau', 'assets/marron.jpg');

			//CHARGEMENT POLICE

			//police du jeu

			//CHARGEMENT NIVEAU

			// Chargement du fichier json qui contient l'info du niveau
			_jeu.load.tilemap('niveau', 'assets/niveau1_schrody.json', '', Phaser.Tilemap.TILED_JSON);
			// Chargement de l'image des tuiles (tileset)
			//Source sprite bibliothèque : http://www.hbgames.org/forums/viewtopic.php?p=882463 -> http://imageshack.com/f/23/shelf001.png
			_jeu.load.image('tuiles', 'assets/tileset.jpg');

			//CHARGEMENT SONS

			// Bruit : https://www.freesound.org/people/Q.K./sounds/56270/
			_jeu.load.audio('bruitage', 'assets/boire.wav');
			//Musique : Mister Electric Demon - CHO7 // https://www.jamendo.com/fr/track/83413/cho7-31ko
			_jeu.load.audio('musique', 'assets/Mister_Electric_Demon_-_CHO7-31ko.mp3');
		},
		create: function () {
			_jeu.state.start("Menu", false);
			_jeu.barreChargement.destroy();
		}
	}

	return chargement;
})();
