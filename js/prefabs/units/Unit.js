var RPG = RPG || {};

RPG.Unit = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.stats = Object.create(properties.stats);
    
    this.attacked_animation = this.game_state.game.add.tween(this);
    this.attacked_animation.to({tint: 0xFF0000}, 200);
    this.attacked_animation.onComplete.add(this.restore_tint, this);
    
    this.act_turn = 0;
};

RPG.Unit.prototype = Object.create(RPG.Prefab.prototype);
RPG.Unit.prototype.constructor = RPG.Unit;

RPG.Unit.prototype.receive_damage = function (damage) {
    "use strict";
    this.stats.health -= damage;
    this.attacked_animation.start();
    if (this.stats.health <= 0) {
        this.stats.health = 0;
        this.kill();
    }
};

RPG.Unit.prototype.restore_tint = function () {
    "use strict";
    this.tint = 0xFFFFFF;
};

RPG.Unit.prototype.calculate_act_turn = function (current_turn) {
    "use strict";
    // calculate the act turn based on the unit speed
    this.act_turn = current_turn + Math.ceil(100 / this.stats.speed);
};