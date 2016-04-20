//CODE PRINCIPAL DU JEU

var jouer = (function () {
	var _jeu;
	var jouer = function (jeu) {
		_jeu = jeu;
	}

	jouer.prototype = {
		preload: function () {

		},

		create: function () {

			//LANCEMENT DE LA MUSIQUE

			this.musique = _jeu.add.audio('musique');
			this.musique.play();

			// COMPOSANTS JEU

			//initialisation score et vie
			_jeu.vie = 3;
			_jeu.score = 0;


			// Démarrer le système de physique Arcade
			_jeu.physics.startSystem(Phaser.Physics.ARCADE);

			//Definition de l'input

			_jeu.clavier = this.input.keyboard;

			//CREATION CHAT + ENNEMI + OBJETS

			// Créer le sprite Schrody
			this.chat = _jeu.add.sprite(64, 64 * 9, 'chat');
			// Le point d'ancrage(0,0) du chat est maintenant au centre
			this.chat.anchor.setTo(0.5, 0.5);
			//animation d'attente par defaut
			this.chat.animations.play('attend');
			//taille du sprite chat
			this.chat.scale.setTo(0.75, 0.75);


			// Permet à la physique de s'appliquer sur le Chat
			_jeu.physics.enable(this.chat); // Création du body
			//vitesse du chat
			this.chat.vitesse = 2.5;

			//créer les sprites boite (groupe physique)

			this.pgBoite = _jeu.add.physicsGroup(Phaser.Physics.ARCADE);
			this.pgBoite.create(64 * 2, 64 * 1.5, "boite1"); //en haut à gauche 0 H
			this.pgBoite.create(64 * 5, 64 * 4, "boite2"); // milieu 1 Random
			this.pgBoite.create(64 * 11, 64 * 1.5, "boite1"); // en haut à droite 2 V
			this.pgBoite.create(64 * 11, 64 * 9, "boite1"); // en bas à droite 3 H
			this.pgBoite.setAll('anchor.x', 0.5); // ancre du sprite au milieu
			this.pgBoite.setAll('anchor.y', 0.5);
			this.pgBoite.setAll("scale", new Phaser.Point(0.75, 0.75));
			this.pgBoite.setAll("body.immovable", true); //retire la physique

			this.pgBoite.children[0].body.velocity.x = 75;
			this.pgBoite.children[3].body.velocity.x = 75;
			this.pgBoite.children[1].body.velocity.y = 75;
			this.pgBoite.children[2].body.velocity.y = 75;


			//créer les objets poison à ramasser (groupe physique)

			this.pgPoison = _jeu.add.physicsGroup(Phaser.Physics.ARCADE);
			this.pgPoison.create(64 * 9.5, 64 * 5.5, "poison");
			this.pgPoison.create(64 * 9.5, 64 * 7, "poison");
			this.pgPoison.create(64 * 3, 64 * 4, "poison");
			this.pgPoison.create(64 * 1, 64 * 1.5, "poison");
			this.pgPoison.create(64 * 8.5, 64 * 4, "poison");
			this.pgPoison.create(64 * 7.5, 64 * 5.5, "poison");
			this.pgPoison.setAll("scale", new Phaser.Point(0.5, 0.5));
			this.pgPoison.setAll('anchor.x', 0.5); // ancre du sprite au milieu
			this.pgPoison.setAll('anchor.y', 0.5);



			//ANIMATIONS

			// Animations de Schrody ()

			this.chat.animations.add('gauche', [3,12,13], 15, true);	//anim gauche
			this.chat.animations.add('droite', [2,10,11], 15, true);	//anim droite
			this.chat.animations.add('haut', [1,8,9], 15, true);	//anim haut
			this.chat.animations.add('bas', [0,6,7], 15, true);		//anim bas
			this.chat.animations.add('attend', [4,5], 2, true);	//anim idle


			//CREATION NIVEAU

			// Création du niveau à partir du tilemap
			this.niveau = _jeu.add.tilemap('niveau');

			// Ajoute le tileset dans le niveau
			this.niveau.addTilesetImage('tuiles');
			// Crée la couche à partir du niveau
			this.couche = this.niveau.createLayer('niveau1');
			// Active les collisions sur la couche avec les tuiles ayant l'id de 2 à 9
			this.niveau.setCollisionBetween(2, 9, true, this.couche);

			// Affiche les info de debugage des collisions
			//this.couche.debug = true;

			// Le chat et les boites apparaissent maintenant au dessus du niveau
			_jeu.world.bringToTop(this.chat);
			_jeu.world.bringToTop(this.pgPoison);
			_jeu.world.bringToTop(this.pgBoite);


			 // UI

			this.bandeau = _jeu.add.sprite(0 ,0, 'bandeau');
			this.bandeau.height = 14;
			this.bandeau.width = 768;
			this.bandeau.alpha = 0.75;


			// TEXTE UI

			//style du texte
			var monStyle = { font: "14px", fontWeight: "bold", fill: "#000" };

			//affichage texte temps
			_jeu.txtTemps = _jeu.add.text(100,0, "Temps : 00:00", monStyle);

			//affichage texte vie
			_jeu.txtVie = _jeu.add.text(360,0, "Vie : 3", monStyle);

			//affichage texte score
			_jeu.txtScore = _jeu.add.text(600,0, "Score : 0", monStyle);

			//demarrage du temps de jeu
			_jeu.tempsDebut = _jeu.time.now;

		},

		update: function () {

			//GESTION MOUVEMENT SCHRODY

			//velocité du chat ( https://phaser.io/docs/2.3.0/Phaser.Physics.Arcade.Body.html )
			this.chat.body.velocity.x = 0;
			this.chat.body.velocity.y = 0;

			//definition des commandes clavier (WASD et flèches)
			if(_jeu.clavier.isDown(Phaser.Keyboard.A) || _jeu.clavier.isDown(Phaser.Keyboard.LEFT))
			{
				this.chat.animations.play('gauche');
				this.chat.body.velocity.x =-1;
			}
			else if(_jeu.clavier.isDown(Phaser.Keyboard.D) || _jeu.clavier.isDown(Phaser.Keyboard.RIGHT))
			{
				this.chat.animations.play('droite');
				this.chat.body.velocity.x =1;
			}
			else if(_jeu.clavier.isDown(Phaser.Keyboard.W) || _jeu.clavier.isDown(Phaser.Keyboard.UP))
			{
				this.chat.animations.play('haut');
				this.chat.body.velocity.y =-1;
			}
			else if(_jeu.clavier.isDown(Phaser.Keyboard.S) || _jeu.clavier.isDown(Phaser.Keyboard.DOWN))
			{
				this.chat.animations.play('bas');
				this.chat.body.velocity.y =1;
			} else {
				this.chat.animations.play('attend'); //animation d'attente
				this.chat.body.velocity.y =0;
				this.chat.body.velocity.x =0;
			}

			this.chat.x += (this.chat.body.velocity.x * this.chat.vitesse); //vitesse du chat appliquée a la vélocité
			this.chat.y += (this.chat.body.velocity.y * this.chat.vitesse);

			//GESTION COLLISIONS

			//Schrody
			_jeu.physics.arcade.collide(this.chat, this.couche); //avec le décor
			_jeu.physics.arcade.collide(this.chat, this.pgPoison, this.collectePoison); //avec les objets à ramasser
			_jeu.physics.arcade.collide(this.chat, this.pgBoite, this.collisionEnnemi); // avec les ennemis

			//Boite radioactive
			_jeu.physics.arcade.overlap(this.pgBoite.children[1], this.verifVelocite);
			_jeu.physics.arcade.overlap(this.pgBoite.children[1], this.pgBoite, this.collisionMurRandom);
			_jeu.physics.arcade.overlap(this.pgBoite.children[1], this.couche, this.collisionMurRandom);

			//boite horizontale
			_jeu.physics.arcade.overlap(this.pgBoite.children[0], this.couche, this.collisionMurH);
			_jeu.physics.arcade.overlap(this.pgBoite.children[0], this.pgBoite, this.collisionMurH);

			_jeu.physics.arcade.overlap(this.pgBoite.children[3], this.couche, this.collisionMurH);
			_jeu.physics.arcade.overlap(this.pgBoite.children[3], this.pgBoite, this.collisionMurH);

			//boite verticale
			_jeu.physics.arcade.overlap(this.pgBoite.children[2], this.couche, this.collisionMurV);
			_jeu.physics.arcade.overlap(this.pgBoite.children[2], this.pgBoite, this.collisionMurV);

			//MISE A JOUR DU TIMER

			var temps = new Date(_jeu.time.now - _jeu.tempsDebut);
			var min = ('0' + temps.getMinutes()).slice(-2);
			var sec = ('0' + temps.getSeconds()).slice(-2);
			_jeu.txtTemps.setText("Temps : "+min+":"+sec);

			//MISE A JOUR SCORE
			_jeu.txtScore.setText("Score : "+ _jeu.score);

			//MISE A JOUR VIE
			_jeu.txtVie.setText("Vie : "+ _jeu.vie);


		},

		render: function() {
			//debug du chat Schrody
			//_jeu.debug.bodyInfo(this.chat, 0, 20);
		},

		//recupération des objets
		collectePoison: function(chat, poison) {
			poison.destroy(); // detruit le sprite poison
			this.objet = _jeu.add.audio('bruitage'); //lancement du bruitage
			this.objet.play();
			_jeu.score +=100; //rajoute 100 points

			//charger le statut gagnant
			if(_jeu.score == 600){
				_jeu.state.start("Gagnant", false);
			}

		},

		//collision pour la boite au deplacement aleatoire
		collisionMurRandom: function(boite1, boite2) {
			if(boite1 != boite2){
				switch (Math.ceil(Math.random() * 4)) { //direction aléatoire
					case 1:
						boite1.body.velocity.x = 75;
						break;
					case 2:
						boite1.body.velocity.x = -75;
						break;
					case 3:
						boite1.body.velocity.y = 75;
						break;
					case 4:
						boite1.body.velocity.y = -75;
						break;

				}
			}
		},

		//Collision avec les ennemis
		collisionEnnemi: function(chat, boite) {

			chat.position.x = 64;
			chat.position.y = 64*9;

			_jeu.vie-=1;
			//charger le statut game over
			if(_jeu.vie == 0){
				_jeu.state.start("Perdant", false);
			}

		},

		// Gestion blocked de body : https://phaser.io/docs/2.3.0/Phaser.Physics.Arcade.Body.html#blocked
		//collision pour les boites à deplacement horizontal
		collisionMurH: function(boite1, boite2) {

			if(boite1 != boite2){

				if(boite1.body.blocked.right == true)
					boite1.body.velocity.x = -75;
				else if(boite1.body.blocked.left == true)
					boite1.body.velocity.x = 75;
			 }
		},

		//collision pour les boites à deplacement vertical
		collisionMurV: function(boite1, boite2) {
			if(boite1 != boite2){
				console.log(boite1.body.blocked);
				if(boite1.body.blocked.up == true)
					boite1.body.velocity.y = 75;
				else if(boite1.body.blocked.down == true)
					boite1.body.velocity.y = -75;
			}
		},

		//verification de la velocité de la boite au déplacement a léatoire
		verifVelocite : function(element){
			//console.log(element);
			//console.log(this.collisionMurRandom);
			if(element.body.velocity.x <45 && element.body.velocity.y <45)
			{
			   this.collisionMurRandom(element);
			}
		}

	};

	return jouer;

})();
