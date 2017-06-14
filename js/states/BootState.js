var RPG = RPG || {};

RPG.BootState = function () {
    "use strict";
    Phaser.State.call(this);
};

RPG.BootState.prototype = Object.create(Phaser.State.prototype);
RPG.BootState.prototype.constructor = RPG.BootState;

RPG.BootState.prototype.init = function (level_file, next_state, extra_parameters, dialogue_file) {
    "use strict";
    this.level_file = level_file;
    this.next_state = next_state;
    this.extra_parameters = extra_parameters;
    this.dialogue_file = dialogue_file;
};

RPG.BootState.prototype.preload = function () {
    "use strict";
    this.load.text("level1", this.level_file);
    this.load.text("dialogue1", this.dialogue_file);
};

RPG.BootState.prototype.create = function () {
    "use strict";
    var level_text, level_data, dialogue_text, dialogue_data;
    level_text = this.game.cache.getText("level1");
    level_data = JSON.parse(level_text);

    dialogue_text = this.game.cache.getText("dialogue1");
    dialogue_data = JSON.parse(dialogue_text);

    this.game.state.start("LoadingState", true, false, level_data, this.next_state, this.extra_parameters, dialogue_data);
};