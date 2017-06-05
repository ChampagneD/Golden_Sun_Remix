var RPG = RPG || {};

RPG.MagicSpellMenuItem = function (game_state, name, position, properties) {
    "use strict";

    RPG.MenuItem.call(this, game_state, name, position, properties);
    this.MANA_COST = properties.spell.MANA_COST;
    this.damage = properties.spell.damage;

};

RPG.MagicSpellMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.MagicSpellMenuItem.prototype.constructor = RPG.MagicSpellMenuItem;

RPG.MagicSpellMenuItem.prototype.select = function () {
    "use strict";

    // use only if the current unit has enough mana
    if (this.game_state.current_unit.stats.mana >= this.MANA_COST) {
        // disable actions menu
        this.game_state.prefabs.spell_menu.disable();
        // enable enemy units menu so the player can choose the target
        this.game_state.prefabs.enemy_units_menu.enable();
        // save current attack
        this.game_state.current_attack = new RPG.MagicAttack(this.game_state, this.game_state.current_unit.name + "_attack", {x: 0, y: 0}, {group: "attacks", mana_cost: this.MANA_COST, damage: this.damage, owner_name: this.game_state.current_unit.name});
    }
};