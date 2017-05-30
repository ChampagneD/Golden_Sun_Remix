var RPG = RPG || {};

RPG.PlayerMenuItem = function (game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);
    
    this.player_unit_health = new RPG.ShowStat(this.game_state, this.text + "_health", {x: 250, y: this.y}, {group: "hud", text: "", style: properties.style, prefab: this.text, stat: "health"});
    
    this.player_unit_mana = new RPG.ShowStat(this.game_state, this.text + "_health", {x: 280, y: this.y}, {group: "hud", text: "", style: properties.style, prefab: this.text, stat: "mana"});
};

RPG.PlayerMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.PlayerMenuItem.prototype.constructor = RPG.PlayerMenuItem;

RPG.PlayerMenuItem.prototype.select = function () {
    "use strict";
    var player_unit;
    // get selected player unit
    player_unit = this.game_state.prefabs[this.text];
    // use current selected item on selected unit
    this.game_state.prefabs.inventory.use_item(this.game_state.current_item, player_unit);
    
    // show actions menu again
    this.game_state.prefabs.items_menu.disable();
    this.game_state.prefabs.items_menu.hide();
    this.game_state.prefabs.actions_menu.show();
    this.game_state.prefabs.actions_menu.enable();
};