var RPG = RPG || {};

RPG.MagicAttack = function (game_state, name, position, properties) {
    "use strict";
    RPG.Attack.call(this, game_state, name, position, properties);
   
    this.mana_cost = properties.mana_cost;
    this.damage = properties.damage;
};

RPG.MagicAttack.prototype = Object.create(RPG.Attack.prototype);
RPG.MagicAttack.prototype.constructor = RPG.MagicAttack;

RPG.MagicAttack.prototype.hit = function (target) {
    "use strict";

    //Destroy the spell text
    this.game_state.prefabs.spell_menu.menu_items.forEach(function(items){
            items.kill();
    });

    var damage, attack_multiplier, defense_multiplier, action_message_position, action_message_text, attack_message;
    // the attack multiplier for magic attacks is higher
    attack_multiplier = this.game_state.game.rnd.realInRange(0.9, 1.3);
    defense_multiplier = this.game_state.game.rnd.realInRange(0.8, 1.2);
    // calculate damage using the magic attack stat
    damage = Math.max(0, Math.round((attack_multiplier * this.damage) - (defense_multiplier * target.stats.defense)));
    
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

    // apply damage
    target.receive_damage(damage);
    
    // reduce the unit mana
    this.game_state.current_unit.stats.mana -= this.mana_cost;

    //Set the percentage of mana of the player 
    switch(this.game_state.current_unit.name) {
        case "fighter":

            this.game_state.party_data.fighter.properties.stats.mana = this.game_state.current_unit.stats.mana
            this.manaFighter = (this.game_state.party_data.fighter.properties.stats.mana * 100) / this.game_state.PlayerMenuItem0.manaMax;
            this.game_state.PlayerMenuItem0.player_unit_mana.setPercent(this.manaFighter);
            break;

        case "mage":

            this.game_state.party_data.mage.properties.stats.mana = this.game_state.current_unit.stats.mana;
            this.manaMage = (this.game_state.party_data.mage.properties.stats.mana * 100) / this.game_state.PlayerMenuItem1.manaMax;
            this.game_state.PlayerMenuItem1.player_unit_mana.setPercent(this.manaMage); 
            break;

        case "ranger":

            this.game_state.party_data.ranger.properties.stats.mana = this.game_state.current_unit.stats.mana
            this.manaRanger = (this.game_state.party_data.ranger.properties.stats.mana * 100) / this.game_state.PlayerMenuItem2.manaMax;
            this.game_state.PlayerMenuItem2.player_unit_mana.setPercent(this.manaRanger);
            break;
    }
    
    this.show_message(target, damage);
};