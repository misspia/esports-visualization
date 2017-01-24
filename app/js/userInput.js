games = ['dota', 'lol', 'csgo', 'sc2'];
selectedGame = "dota";

function selectGame(el, game) {

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
      	setTimeout(function(){ 
			d3.select("#map svg").remove();
      	}, 100);

}


gameTabs = document.querySelectorAll('#games .game');

function activeGameTab(el){

	for(i = 0; i < gameTabs.length; i++){
		gameTabs[i].classList.remove('active');
	}

	el.className += " active";
}
