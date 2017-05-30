var RPG = RPG || {};

RPG.Player = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.walking_speed = +properties.walking_speed;
    
    this.animations.add("walking_down", [6, 7, 8], 10, true);
    this.animations.add("walking_left", [9, 10, 11], 10, true);
    this.animations.add("walking_right", [3, 4, 5], 10, true);
    this.animations.add("walking_up", [0, 1, 2], 10, true);
    
    this.stopped_frames = [7, 10, 4, 1, 7];

    this.game_state.game.physics.arcade.enable(this);
    this.body.setSize(16, 16, 0, 8);
    this.body.collideWorldBounds = true;

    this.cursors = this.game_state.game.input.keyboard.createCursorKeys();
};

RPG.Player.prototype = Object.create(RPG.Prefab.prototype);
RPG.Player.prototype.constructor = RPG.Player;

RPG.Player.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision_back);
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision_front);
    
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