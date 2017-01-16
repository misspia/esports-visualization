games = ['dota', 'lol', 'csgo', 'sc2'];
selectedGame = "dota";

function selectGame(el, game) {
	console.log(el);
	activeGameTab(el);
	
	switch(game){
		
		case games[0]:
			selectedGame = games[0];
			break;

		case games[1]:
			selectedGame = games[1];
			break;

		case games[2]:
			selectedGame = games[2];
			break;

		case games[3]:
			selectedGame = games[3];
			break;
	}

	renderViz(selectedGame);

}


gameTabs = document.querySelectorAll('#options .game');

function activeGameTab(el){

	for(i = 0; i < gameTabs.length; i++){
		gameTabs[i].classList.remove('active');
	}

	el.className += " active";
}
