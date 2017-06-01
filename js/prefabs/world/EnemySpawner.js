var RPG = RPG || {};

RPG.EnemySpawner = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
    
    this.overlapping = true;

};

RPG.EnemySpawner.prototype = Object.create(RPG.Prefab.prototype);
RPG.EnemySpawner.prototype.constructor = RPG.EnemySpawner;

RPG.EnemySpawner.prototype.update = function () {
    "use strict";


};






