var RPG = RPG || {};

RPG.InventoryMenuItem = function (game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);
};

RPG.InventoryMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.InventoryMenuItem.prototype.constructor = RPG.InventoryMenuItem;

RPG.InventoryMenuItem.prototype.select = function () {
    "use strict";
    // select only if there are remaining items
    if (this.game_state.prefabs.inventory.items.length > 0) {
        // disable actions menu
        this.game_state.prefabs.actions_menu.disable();
        this.game_state.prefabs.actions_menu.hide();
        // enable enemy units menu so the player can choose the target
        this.game_state.prefabs.items_menu.show();
        this.game_state.prefabs.items_menu.enable();
    }
};