var RPG = RPG || {};

RPG.menuState = function () {
    "use strict";
    Phaser.State.call(this);
};

RPG.menuState.prototype = Object.create(Phaser.State.prototype);
RPG.menuState.prototype.constructor = RPG.menuState;

RPG.menuState.prototype.init = function (level_data, extra_parameters, dialogue_data, dialogue_file) {
    "use strict";
    this.level_data = level_data;
    this.extra_parameters = extra_parameters;
    this.dialogue_data = dialogue_data;
    this.dialogue_file = dialogue_file;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

};

RPG.menuState.prototype.create = function() {

    var style = { font: "65px Golden_Sun_Font", fill: "black"};

    game.stage.backgroundColor = '#ffffff';

    var button_play = game.add.button(100, 150-40, 'button', this.start, this, 2, 0, 1);
    button_play.anchor.set(0.5);
    var button_options = game.add.button(100, 200-40, 'button', this.start, this, 5, 3, 4);
    button_options.anchor.set(0.5);
    var button_credit = game.add.button(100, 250-40, 'button', this.start, this, 8, 6, 7);
    button_credit.anchor.set(0.5);

    this.text = new Text(this, this.game, 500, 200, "Move with ZQSD talk with E and chose combat action with SPACEBAR", style);

   };

RPG.menuState.prototype.start = function(menu_State) {
      game.stage.backgroundColor = '#000000';
      window.menuPlayed = true;
      this.game.state.start('BootState', true, false, "assets/levels/Altin.json", "TownState", {}, "assets/Dialogue/DialogueAltin.json");
   };

RPG.menuState.prototype.credit = function() {
      game.state.start('credit');
   };
