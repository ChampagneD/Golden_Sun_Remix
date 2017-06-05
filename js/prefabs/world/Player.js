var RPG = RPG || {};

RPG.Player = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.walking_speed = +properties.walking_speed;

    this.TEXT_STYLE = {font: "14px Arial", fill: "#FFFFFF"};
    
    this.animations.add("walking_down", [6, 7, 8], 10, true);
    this.animations.add("walking_left", [9, 10, 11], 10, true);
    this.animations.add("walking_right", [3, 4, 5], 10, true);
    this.animations.add("walking_up", [0, 1, 2], 10, true);
    
    this.stopped_frames = [7, 10, 4, 1, 7];

    this.game_state.game.physics.arcade.enable(this);
    this.body.setSize(16, 16, 0, 8);
    this.body.collideWorldBounds = true;

    this.player_tile_pos = {
        x: null,
        y: null
    };

    this.game_state.layers.background_back.getTileXY(this.game_state.prefabs.player.position.x, this.game_state.prefabs.player.position.y, this.player_tile_pos);

    this.player_previous_tile_pos = {
        x: this.player_tile_pos.x,
        y: this.player_tile_pos.y
    };

    this.spawn_chance;
    this.encounter_index;
    this.enemy_encounter;

    this.inventory_state = false;

    this.cursors = this.game_state.game.input.keyboard.addKeys({'up': Phaser.KeyCode.Z, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.Q, 'right': Phaser.KeyCode.D, 'inventory': Phaser.KeyCode.I});
};

RPG.Player.prototype = Object.create(RPG.Prefab.prototype);
RPG.Player.prototype.constructor = RPG.Player;

RPG.Player.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision_back);
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision_front);

    this.battleProbability();

    this.cursors.inventory.onDown.add(this.InventoryMenu, this)

    
    if (this.cursors.left.isDown && this.body.velocity.x <= 0) {
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
        this.animations.stop();
        this.frame = this.stopped_frames[this.body.facing];
    }
};

RPG.Player.prototype.battleProbability = function(){
    "use strict";

    if ((this.player_tile_pos.x != this.player_previous_tile_pos.x) || (this.player_tile_pos.y != this.player_previous_tile_pos.y)) {
        this.player_previous_tile_pos.x = this.player_tile_pos.x;
        this.player_previous_tile_pos.y = this.player_tile_pos.y;

        this.spawn_chance = this.game_state.game.rnd.frac();
        if (this.spawn_chance <= 0.08) {
            this.spawn_chance = this.game_state.game.rnd.frac();
            // check if the enemy spawn probability is less than the generated random number for each spawn
            for (this.encounter_index = 0; this.encounter_index < this.game_state.level_data.enemy_encounters.length; this.encounter_index += 1) {
                this.enemy_encounter = this.game_state.level_data.enemy_encounters[this.encounter_index];
                if (this.spawn_chance <= this.enemy_encounter.probability) {
                    // save current player position for later
                    this.game_state.player_position = this.game_state.prefabs.player.position;
                    // call battle state
                    this.game_state.game.state.start("BootState", false, false, "assets/levels/battle.json", "BattleState", {encounter: this.enemy_encounter, party_data: this.game_state.party_data, inventory: this.game_state.inventory});
                    break;
                }
            }
        }
    }

    this.player_tile_pos = this.game_state.layers.background_back.getTileXY(this.game_state.prefabs.player.position.x, 
                                                                            this.game_state.prefabs.player.position.y, this.player_tile_pos);


};

// Create an inventory and destroy it aswell
RPG.Player.prototype.InventoryMenu = function(){
    "use strict"
    var players_menu, position, player_menu_character, player_menu_items, action_index;
    
    if (this.inventory_state == false) {
        console.log(this.game_state.groups)
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
