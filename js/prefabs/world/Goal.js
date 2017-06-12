var RPG = RPG || {};

RPG.Goal = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.town = properties.town;

    this.nextState = properties.State;
    
    this.game_state.game.physics.arcade.enable(this);
    
    this.anchor.setTo(0.5);

};

RPG.Goal.prototype = Object.create(RPG.Prefab.prototype);
RPG.Goal.prototype.constructor = RPG.Goal;

RPG.Goal.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_goal, null, this);
};

RPG.Goal.prototype.reach_goal = function () {
    "use strict";
    // start the next level
    if (this.nextState != "WorldState") {
        console.log(this.game_state.prefabs);
        this.game_state.player_position = {x: this.game_state.prefabs.player.position.x + 32, y: this.game_state.prefabs.player.position.y}
    }
    this.game_state.game.state.start("BootState", false, false, this.town, this.nextState, {party_data: this.game_state.party_data, inventory: this.game_state.inventory});
};

