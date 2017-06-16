var RPG = RPG || {};

RPG.DjinnAttackMenuItem = function (game_state, name, position, properties) {
    "use strict";

    RPG.MenuItem.call(this, game_state, name, position, properties);

};

RPG.DjinnAttackMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.DjinnAttackMenuItem.prototype.constructor = RPG.DjinnAttackMenuItem;

RPG.DjinnAttackMenuItem.prototype.select = function () {
    "use strict";

    this.current_unit_djinns = this.game_state.party_data[this.game_state.current_unit.name].properties;

    if (this.current_unit_djinns.djinns) {
        // disable actions menu
         this.game_state.prefabs.actions_menu.disable();
        // enable enemy units menu so the player can choose the target
        
        var actions, actions_menu_items, action_index, djinn_menu, line_spacing, last_text_length;

        actions = [];

        var positionSpell = {x: 180, y: 370};

        for(var key in this.current_unit_djinns.djinns){
            actions.push({text: this.current_unit_djinns.djinns[key].text, item_constructor: RPG.DjinnChoiceMenuItem.prototype.constructor, djinn: this.current_unit_djinns.djinns[key]});

        }

        actions_menu_items = [];
        action_index = 0;

        actions.forEach(function (action) {

            if (last_text_length) {
                if (last_text_length > 11) {
                    line_spacing = 40;
                }   else line_spacing = 20;
            } else line_spacing = 20

            actions_menu_items.push(new action.item_constructor(this.game_state, action.text + "_menu_item", {x: positionSpell.x, y: positionSpell.y + action_index * line_spacing}, {group: "hud", text: action.text, style: Object.create(this.game_state.TEXT_STYLE), djinn: action.djinn}));
            action_index += 1;

            last_text_length = action.text.length;
        }, this);

        djinn_menu = new RPG.Menu(this.game_state, "djinn_menu", positionSpell, {group: "hud", menu_items: actions_menu_items});

        this.game_state.prefabs.djinn_menu.enable();
    }
};