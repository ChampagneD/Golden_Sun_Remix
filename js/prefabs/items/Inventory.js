var RPG = RPG || {};

RPG.Inventory = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.item_classes = {
        "potion": RPG.Potion.prototype.constructor
    };

    this.items = [];
};

RPG.Inventory.prototype = Object.create(RPG.Prefab.prototype);
RPG.Inventory.prototype.constructor = RPG.Inventory;

RPG.Inventory.prototype.create_menu = function (position) {
    "use strict";
    var menu_items, item_index, item, menu_item, items_menu;
    // create units menu items
    item_index = 0;
    menu_items = [];
    for (item_index = 0; item_index < this.items.length; item_index += 1) {
        item = this.items[item_index];
        menu_item = new RPG.ItemMenuItem(this.game_state, item.name + "_menu_item", {x: position.x, y: position.y + item_index * 20}, {group: "hud", text: item.name, style: Object.create(this.game_state.TEXT_STYLE)});
        menu_items.push(menu_item);
    }
    // create units menu
    items_menu = new RPG.Menu(this.game_state, "items_menu", position, {group: "hud", menu_items: menu_items});
    items_menu.hide();
};

RPG.Inventory.prototype.collect_item = function (item_object) {
    "use strict";
    var item;
    // create item prefab
    item = new this.item_classes[item_object.type](this.game_state, item_object.type + this.items.length, {x: 0, y: 0}, item_object.properties);
    this.items.push(item);
};

RPG.Inventory.prototype.use_item = function (item_name, target) {
    "use strict";
    var item_index;
    // remove item from items list
    for (item_index = 0; item_index < this.items.length; item_index += 1) {
        if (this.items[item_index].name === item_name) {
            this.items[item_index].use(target);
            this.items.splice(item_index, 1);
            break;
        }
    }
};