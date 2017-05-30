var RPG = RPG || {};

RPG.ItemMenuItem = function (game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);
};

RPG.ItemMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.ItemMenuItem.prototype.constructor = RPG.ItemMenuItem;

RPG.ItemMenuItem.prototype.select = function () {
    "use strict";
    // disable actions menu
    this.game_state.prefabs.items_menu.disable();
    // enable player units menu so the player can choose the target
    this.game_state.prefabs.player_units_menu.enable();
    // save selected item
    this.game_state.current_item = this.text;
};