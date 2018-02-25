var bootState = {
		
  preload: function () {

    game.load.image('tiles', 'tilesets/test_tiles_16.png');
            
    game.load.spritesheet('sprite_sheet', 'tilesets/test_tiles_16.png', 16, 16, 5);
    game.load.image('player_sprite', 'assets/player_16.png');
      	  
    game.load.image('enemy_sprite', 'assets/enemy.png');
    game.load.image('highlight_sprite', 'assets/highlight_16.png');           

  },

  create: function () {
	  game.state.start('menu');
  }
}