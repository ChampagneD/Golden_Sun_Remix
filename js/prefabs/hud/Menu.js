var RPG = RPG || {};

RPG.Menu = function (game_state, name, position, properties) {
    "use strict";
    var live_index, life;
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.visible = false;
    
    this.menu_items = properties.menu_items;
    
    this.current_item_index = 0;
};

RPG.Menu.prototype = Object.create(RPG.Prefab.prototype);
RPG.Menu.prototype.constructor = RPG.Menu;

RPG.Menu.prototype.process_input = function (event) {
    "use strict";
    switch (event.keyCode) {
    case Phaser.Keyboard.UP:
        if (this.current_item_index > 0) {
            // navigate to previous item
            this.move_selection(this.current_item_index - 1);
        }
        break;
    case Phaser.Keyboard.DOWN:
        if (this.current_item_index < this.menu_items.length - 1) {
            // navigate to next item
            this.move_selection(this.current_item_index + 1);
        }
        break;
    case Phaser.Keyboard.SPACEBAR:
        this.menu_items[this.current_item_index].select();
        break;
    }
};

RPG.Menu.prototype.move_selection = function (item_index) {
    "use strict";
    this.menu_items[this.current_item_index].selection_out();
    this.current_item_index = item_index;
    this.menu_items[this.current_item_index].selection_over();
};

RPG.Menu.prototype.find_item_index = function (text) {
    "use strict";
    var item_index;
    for (item_index = 0; item_index < this.menu_items.length; item_index += 1) {
        if (this.menu_items[item_index].text === text) {
            return item_index;
        }
    }
};

RPG.Menu.prototype.remove_item = function (index) {
    "use strict";
    var menu_item;
    menu_item = this.menu_items[index];
    // remove menu item
    this.menu_items.splice(index, 1);
    // update current_item_index if necessary
    if (this.current_item_index === index) {
        this.current_item_index = 0;
    }
    return menu_item;
};

RPG.Menu.prototype.enable = function () {
    "use strict";
    if (this.menu_items.length > 0) {
        this.menu_items[this.current_item_index].selection_out();
        this.current_item_index = 0;
        this.menu_items[this.current_item_index].selection_over();
    }
    this.game_state.game.input.keyboard.addCallbacks(this, this.process_input);
};

RPG.Menu.prototype.disable = function () {
    "use strict";
    if (this.menu_items.length > 0) {
        this.menu_items[this.current_item_index].selection_out();
    }
    this.current_item_index = 0;
};

RPG.Menu.prototype.show = function () {
    "use strict";
    this.menu_items.forEach(function (menu_item) {
        menu_item.visible = true;
    }, this);
};

RPG.Menu.prototype.hide = function () {
    "use strict";
    this.menu_items.forEach(function (menu_item) {
        menu_item.visible = false;
    }, this);
};