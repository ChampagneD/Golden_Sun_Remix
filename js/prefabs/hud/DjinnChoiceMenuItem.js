var RPG = RPG || {};

RPG.DjinnChoiceMenuItem = function (game_state, name, position, properties) {
    "use strict";

    RPG.MenuItem.call(this, game_state, name, position, properties);
    this.damage = properties.djinn.damage;
    this.DjinnName = properties.djinn.name; 

};

RPG.DjinnChoiceMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.DjinnChoiceMenuItem.prototype.constructor = RPG.DjinnChoiceMenuItem;

RPG.DjinnChoiceMenuItem.prototype.select = function () {
    "use strict";
    // disable actions menu
    this.game_state.prefabs.djinn_menu.disable();
    // enable enemy units menu so the player can choose the target
    this.game_state.prefabs.enemy_units_menu.enable();
    // save current attack
    this.game_state.current_attack = new RPG.DjinnAttack(this.game_state, this.game_state.current_unit.name + "_attack", {x: 0, y: 0}, {group: "attacks", damage: this.damage, owner_name: this.game_state.current_unit.name, name: this.DjinnName});

};

RPG.DjinnChoiceMenuItem.prototype.unSelect = function() {

    this.game_state.prefabs.actions_menu.enable();
    this.game_state.prefabs.djinn_menu.disable();

    this.game_state.prefabs.djinn_menu.menu_items.forEach(function(items){
            items.kill();
    });

}
