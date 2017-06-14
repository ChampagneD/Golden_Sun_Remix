var RPG = RPG || {};

RPG.MagicAttackMenuItem = function (game_state, name, position, properties) {
    "use strict";

    RPG.MenuItem.call(this, game_state, name, position, properties);

};

RPG.MagicAttackMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.MagicAttackMenuItem.prototype.constructor = RPG.MagicAttackMenuItem;

RPG.MagicAttackMenuItem.prototype.select = function () {
    "use strict";

    if (this.game_state.current_unit.stats.mana > 15) {
        // disable actions menu
         this.game_state.prefabs.actions_menu.disable();
        // enable enemy units menu so the player can choose the target
        
        var actions, actions_menu_items, action_index, spell_menu, line_spacing, last_text_length;

        this.current_unit_spells = this.game_state.party_data[this.game_state.current_unit.name].properties;

        actions = [];

        var positionSpell = {x: 180, y: 370};

        for(var key in this.current_unit_spells.spells){
            actions.push({text: this.current_unit_spells.spells[key].text, item_constructor: RPG.MagicSpellMenuItem.prototype.constructor, spell: this.current_unit_spells.spells[key]});

        }

        actions_menu_items = [];
        action_index = 0;

        actions.forEach(function (action) {

            if (last_text_length) {
                if (last_text_length > 11) {
                    line_spacing = 40;
                }   else line_spacing = 20;
            } else line_spacing = 20

            actions_menu_items.push(new action.item_constructor(this.game_state, action.text + "_menu_item", {x: positionSpell.x, y: positionSpell.y + action_index * line_spacing}, {group: "hud", text: action.text, style: Object.create(this.game_state.TEXT_STYLE), spell: action.spell}));
            action_index += 1;

            last_text_length = action.text.length;
        }, this);

        spell_menu = new RPG.Menu(this.game_state, "spell_menu", positionSpell, {group: "hud", menu_items: actions_menu_items});

        this.game_state.prefabs.spell_menu.enable();
    };

};