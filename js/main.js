var RPG = RPG || {};

var game = new Phaser.Game(640, 480, Phaser.CANVAS);
game.state.add("BootState", new RPG.BootState());
game.state.add("LoadingState", new RPG.LoadingState());
game.state.add("WorldState", new RPG.WorldState());
game.state.add("TownState", new RPG.TownState());
game.state.add("BattleState", new RPG.BattleState());
game.state.start("BootState", true, false, "assets/levels/Altin.json", "TownState", {});