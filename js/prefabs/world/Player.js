var RPG = RPG || {};

RPG.Player = function (game_state, name, position, properties) {
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
    this.scale.setTo(1.5, 1.5);
    this.body.collideWorldBounds = true;

    this.game_state.game.camera.follow(this);

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

    this.Isaac_Footstep = this.game_state.game.add.audio('Footstep_SFX', 1, false);

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

    if (this.cursors.left.isDown && this.cursors.up.isDown){
        // move left
        this.body.velocity.y = -this.walking_speed;
        // move up
        this.body.velocity.x = -this.walking_speed;
        this.animations.play("walking_up_left");
        this.Isaac_Footstep.play('', 0, 0.5, false, false);
        this.Isaac_Footstep._sound.playbackRate.value = 2;

    } else if (this.cursors.right.isDown && this.cursors.up.isDown){
        // move right
        this.body.velocity.y = -this.walking_speed;
        // move up
        this.body.velocity.x = +this.walking_speed;
        this.animations.play("walking_up_right");
        this.Isaac_Footstep.play('', 0, 0.5, false, false);
        this.Isaac_Footstep._sound.playbackRate.value = 2;

    } else if (this.cursors.left.isDown && this.cursors.down.isDown){
        // move left
        this.body.velocity.x = -this.walking_speed;
        // move down
        this.body.velocity.y = +this.walking_speed;
        this.animations.play("walking_down_left");
        this.Isaac_Footstep.play('', 0, 0.5, false, false);
        this.Isaac_Footstep._sound.playbackRate.value = 2;

    } else if (this.cursors.right.isDown && this.cursors.down.isDown){
        // move right
        this.body.velocity.x = +this.walking_speed;
        // move down
        this.body.velocity.y = +this.walking_speed;
        this.animations.play("walking_down_right");
        this.Isaac_Footstep.play('', 0, 0.5, false, false);
        this.Isaac_Footstep._sound.playbackRate.value = 2;

    } else if (this.cursors.left.isDown && this.body.velocity.x <= 0) {
        // move left
        this.body.velocity.x = -this.walking_speed;
        if (this.body.velocity.y === 0) {
            this.animations.play("walking_left");
            this.Isaac_Footstep.play('', 0, 0.5, false, false);
            this.Isaac_Footstep._sound.playbackRate.value = 2;
        }
    } else if (this.cursors.right.isDown && this.body.velocity.x >= 0) {
        // move right
        this.body.velocity.x = +this.walking_speed;
        if (this.body.velocity.y === 0) {
            this.animations.play("walking_right");
            this.Isaac_Footstep.play('', 0, 0.5, false, false);
        this.Isaac_Footstep._sound.playbackRate.value = 2;
        }
    } else {
        this.body.velocity.x = 0;
    }

    if (this.cursors.up.isDown && this.body.velocity.y <= 0) {
        // move up
        this.body.velocity.y = -this.walking_speed;
        if (this.body.velocity.x === 0) {
            this.animations.play("walking_up");
            this.Isaac_Footstep.play('', 0, 0.5, false, false);
            this.Isaac_Footstep._sound.playbackRate.value = 2;
        }
    } else if (this.cursors.down.isDown && this.body.velocity.y >= 0) {
        // move down
        this.body.velocity.y = +this.walking_speed;
        if (this.body.velocity.x === 0) {
            this.animations.play("walking_down");
            this.Isaac_Footstep.play('', 0, 0.5, false, false);
            this.Isaac_Footstep._sound.playbackRate.value = 2;
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
                    this.game_state.sound.stopAll();
                    this.game_state.game.state.start("BootState", false, false, "assets/levels/battle.json", "BattleState", {encounter: this.enemy_encounter, party_data: this.game_state.party_data, inventory: this.game_state.inventory}, this.game_state.dialogue_file);
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
        this.inventory_state = true;
        this.inventory_bg = this.game_state.add.image(160, 0, "inventory_bg");
        this.inventory_bg.scale.setTo(0.5, 1);

        this.game_state.groups["inventory"].add(this.inventory_bg);
        position = {x: 175, y: 10}

        player_menu_items = [];
        action_index = 0;

        player_menu_character = [   
                                    {text: "Isaac", item_constructor: RPG.MenuItem.prototype.constructor},
                                    {text: "Sheba", item_constructor: RPG.MenuItem.prototype.constructor},
                                    {text: "Jenna", item_constructor: RPG.MenuItem.prototype.constructor},
                                    {text: "Djinns", item_constructor: RPG.MenuItem.prototype.constructor},
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
