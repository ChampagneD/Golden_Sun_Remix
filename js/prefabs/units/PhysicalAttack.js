var RPG = RPG || {};

RPG.PhysicalAttack = function (game_state, name, position, properties) {
    "use strict";
    RPG.Attack.call(this, game_state, name, position, properties);
};

RPG.PhysicalAttack.prototype = Object.create(RPG.Attack.prototype);
RPG.PhysicalAttack.prototype.constructor = RPG.PhysicalAttack;

RPG.PhysicalAttack.prototype.hit = function (target) {
    "use strict";
    var damage, attack_multiplier, defense_multiplier, action_message_position, action_message_text, attack_message;
    // calculate random attack and defense multipliers
    attack_multiplier = this.game_state.game.rnd.realInRange(0.8, 1.2);
    defense_multiplier = this.game_state.game.rnd.realInRange(0.8, 1.2);
    // calculate damage
    damage = Math.max(0, Math.round((attack_multiplier * this.owner.stats.attack) - (defense_multiplier * target.stats.defense)));
    // apply damage
    target.receive_damage(damage);
    
    this.show_message(target, damage);
};