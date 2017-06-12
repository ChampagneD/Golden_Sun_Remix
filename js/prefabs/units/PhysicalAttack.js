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
    
    //calculate the percent of hp the player have
    if (!this.game_state.damageFighter) this.game_state.damageFighter = 0;

    if (!this.game_state.damageMage) this.game_state.damageMage = 0;

    if (!this.game_state.damageRanger) this.game_state.damageRanger = 0;

    this.game_state.enemy_turn = false;

    function moveCompletePlayer(){
        this.game_state.current_unit.body.moveTo(200, 50, Phaser.ANGLE_RIGHT);
    }
    function moveCompleteEnemy(){
        this.game_state.current_unit.body.moveTo(200, 50, Phaser.ANGLE_LEFT);
    }

    switch(this.game_state.current_unit.name) {
        case "fighter":
            this.game_state.current_unit.body.moveTo(200, 50, Phaser.ANGLE_LEFT)
            this.game_state.current_unit.body.onMoveComplete.addOnce(moveCompletePlayer, this);
            break;

        case "mage":
            this.game_state.current_unit.body.moveTo(200, 50, Phaser.ANGLE_LEFT)
            this.game_state.current_unit.body.onMoveComplete.addOnce(moveCompletePlayer, this);
            break;

        case "ranger":
            this.game_state.current_unit.body.moveTo(200, 50, Phaser.ANGLE_LEFT);
            this.game_state.current_unit.body.onMoveComplete.addOnce(moveCompletePlayer,this);
            break;
        default: 
            this.game_state.current_unit.body.moveTo(200, 50, Phaser.ANGLE_RIGHT)
            this.game_state.current_unit.body.onMoveComplete.addOnce(moveCompleteEnemy,this);
            break;
        
    }

    switch(target.name) {
        case "fighter":
            this.game_state.damageFighter += damage;
            break;

        case "mage":
            this.game_state.damageMage += damage;
            break;

        case "ranger":
            this.game_state.damageRanger += damage;
            break;
        
    }

    // apply damage
    target.receive_damage(damage);
    
    this.show_message(target, damage);
};