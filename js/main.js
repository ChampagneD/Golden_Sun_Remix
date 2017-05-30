var RPG = RPG || {};

var game = new Phaser.Game(320, 320, Phaser.CANVAS);
game.state.add("BootState", new RPG.BootState());
game.state.add("LoadingState", new RPG.LoadingState());
game.state.add("WorldState", new RPG.WorldState());
game.state.add("BattleState", new RPG.BattleState());
game.state.start("BootState", true, false, "assets/levels/level1.json", "WorldState", {});