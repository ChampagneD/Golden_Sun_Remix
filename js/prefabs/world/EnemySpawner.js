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
    this.overlapping = this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.check_for_spawn, null, this);
};

RPG.EnemySpawner.prototype.check_for_spawn = function () {
    "use strict";
    var spawn_chance, encounter_index, enemy_encounter;
    // check for spawn only once for overlap
    if (!this.overlapping) {
        spawn_chance = this.game_state.game.rnd.frac();
        // check if the enemy spawn probability is less than the generated random number for each spawn
        for (encounter_index = 0; encounter_index < this.game_state.level_data.enemy_encounters.length; encounter_index += 1) {
            enemy_encounter = this.game_state.level_data.enemy_encounters[encounter_index];
            if (spawn_chance <= enemy_encounter.probability) {
                // save current player position for later
                this.game_state.player_position = this.game_state.prefabs.player.position;
                // call battle state
                this.game_state.game.state.start("BootState", false, false, "assets/levels/battle.json", "BattleState", {encounter: enemy_encounter, party_data: this.game_state.party_data, inventory: this.game_state.inventory});
                break;
            }
        }
    }
};