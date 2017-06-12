var RPG = RPG || {};

RPG.PlayerTown = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.walking_speed = +properties.walking_speed;

    this.TEXT_STYLE = {font: "14px Arial", fill: "#FFFFFF"};
    
    this.animations.add("walking_down", [84, 85, 86, 87, 88, 89], 10, true);
    this.animations.add("walking_left", [95, 94, 93, 92, 91, 90], 10, true);
    this.animations.add("walking_right", [108, 109, 110, 111, 112, 113], 10, true);
    this.animations.add("walking_up", [126, 127, 128, 129, 130, 131], 10, true);
    this.animations.add("walking_up_left", [107, 106, 105, 104, 103, 102], 10, true);
    this.animations.add("walking_up_right", [101, 100, 99, 98, 97, 96], 10, true);
    this.animations.add("walking_down_left", [120, 121, 122, 123, 124, 125], 10, true);
    this.animations.add("walking_down_right", [114, 115, 116, 117, 118, 119], 10, true);
    this.animations.add("dont_move", [1, 2, 3, 4, 5, 6], 4, true);
    
    this.stopped_frames = [119, 0, 0, 0, 0];

    this.body.setSize(18, 13, 9, 20);
    this.body.collideWorldBounds = true;

    this.game_state.game.camera.follow(this);

    this.inventory_state = false;

    this.cursors = this.game_state.game.input.keyboard.addKeys({'up': Phaser.KeyCode.Z, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.Q, 'right': Phaser.KeyCode.D, 'inventory': Phaser.KeyCode.I});
};

RPG.PlayerTown.prototype = Object.create(RPG.Prefab.prototype);
RPG.PlayerTown.prototype.constructor = RPG.PlayerTown;

RPG.PlayerTown.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision_back);
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision_front);

    this.cursors.inventory.onDown.add(this.InventoryMenu, this)

    if (this.cursors.left.isDown && this.cursors.up.isDown){
        // move left
        this.body.velocity.y = -this.walking_speed;
        // move up
        this.body.velocity.x = -this.walking_speed;
        this.animations.play("walking_up_left");

    } else if (this.cursors.right.isDown && this.cursors.up.isDown){
        // move right
        this.body.velocity.y = -this.walking_speed;
        // move up
        this.body.velocity.x = +this.walking_speed;
        this.animations.play("walking_up_right");

    } else if (this.cursors.left.isDown && this.cursors.down.isDown){
        // move left
        this.body.velocity.x = -this.walking_speed;
        // move down
        this.body.velocity.y = +this.walking_speed;
        this.animations.play("walking_down_left");

    } else if (this.cursors.right.isDown && this.cursors.down.isDown){
        // move right
        this.body.velocity.x = +this.walking_speed;
        // move down
        this.body.velocity.y = +this.walking_speed;
        this.animations.play("walking_down_right");

    } else if (this.cursors.left.isDown && this.body.velocity.x <= 0) {
        // move left
        this.body.velocity.x = -this.walking_speed;
        if (this.body.velocity.y === 0) {
            this.animations.play("walking_left");
        }
    } else if (this.cursors.right.isDown && this.body.velocity.x >= 0) {
        // move right
        this.body.velocity.x = +this.walking_speed;
        if (this.body.velocity.y === 0) {
            this.animations.play("walking_right");
        }
    } else {
        this.body.velocity.x = 0;
    }

    if (this.cursors.up.isDown && this.body.velocity.y <= 0) {
        // move up
        this.body.velocity.y = -this.walking_speed;
        if (this.body.velocity.x === 0) {
            this.animations.play("walking_up");
        }
    } else if (this.cursors.down.isDown && this.body.velocity.y >= 0) {
        // move down
        this.body.velocity.y = +this.walking_speed;
        if (this.body.velocity.x === 0) {
            this.animations.play("walking_down");
        }
    } else {
        this.body.velocity.y = 0;
    }
    
    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
        // stop current animation
        //this.animations.stop();
        //this.frame = this.stopped_frames[this.body.facing];
        this.animations.play("dont_move");
    }
};

// Create an inventory and destroy it aswell
RPG.PlayerTown.prototype.InventoryMenu = function(){
    "use strict"
    var players_menu, position, player_menu_character, player_menu_items, action_index;
    
    if (this.inventory_state == false) {
        this.inventory_state = true;
        this.inventory_bg = this.game_state.add.image(160, 0, "inventory_bg");
        this.inventory_bg.scale.setTo(0.5, 1);

        this.game_state.groups["inventory"].add(this.inventory_bg);
        position = {x: 175, y: 10}

        player_menu_items = [];
        action_index = 0;

        player_menu_character = [   
                                    {text: "Fighter", item_constructor: RPG.MenuItem.prototype.constructor},
                                    {text: "Mage", item_constructor: RPG.MenuItem.prototype.constructor},
                                    {text: "Ranger", item_constructor: RPG.MenuItem.prototype.constructor},
                                    {text: "items", item_constructor: RPG.MenuItem.prototype.constructor}
                                ];

        player_menu_character.forEach(function (action) {
            player_menu_items.push(new action.item_constructor(this.game_state, action.text + "_menu_item", {x: position.x, y: position.y + action_index * 20}, {group: "inventory", text: action.text, style: Object.create(this.TEXT_STYLE)}));
            action_index += 1;

        }, this);

        players_menu = new RPG.Menu(this.game_state, "inventory_menu", position, {group: "inventory", menu_items: player_menu_items});

    } else { 
        this.inventory_state = false;
        this.game_state.groups.inventory.destroy(true, true);
        console.log(this.game_state.groups)
    }
};