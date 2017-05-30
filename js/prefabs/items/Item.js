var RPG = RPG || {};

RPG.Item = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
};

RPG.Item.prototype = Object.create(RPG.Prefab.prototype);
RPG.Item.prototype.constructor = RPG.Item;

RPG.Item.prototype.use = function () {
    "use strict";
    // by default the item is destroyed
    this.kill();
};

RPG.Item.prototype.kill = function () {
    "use strict";
    Phaser.Sprite.prototype.kill.call(this);
    var menu_item_index, menu_item;
    // remove item from the menu
    menu_item_index = this.game_state.prefabs.items_menu.find_item_index(this.name);
    menu_item = this.game_state.prefabs.items_menu.remove_item(menu_item_index);
    menu_item.kill();
};