var RPG = RPG || {};

RPG.MagicAttack = function (game_state, name, position, properties) {
    "use strict";
    RPG.Attack.call(this, game_state, name, position, properties);
   
    this.mana_cost = properties.mana_cost;
    this.damage = properties.damage;
    this.name = properties.name;
};

RPG.MagicAttack.prototype = Object.create(RPG.Attack.prototype);
RPG.MagicAttack.prototype.constructor = RPG.MagicAttack;

RPG.MagicAttack.prototype.hit = function (target) {
    "use strict";

    //Destroy the spell text
    this.game_state.prefabs.spell_menu.menu_items.forEach(function(items){
            items.kill();
    });

    switch(this.game_state.current_unit.name) {
        case "fighter":

            this.game_state.allow_attack = false;

            if (this.name == "Frost" || this.name == "DemonFire" || "Acheron") {

                this.game_state.current_unit.resetFrame = function(){
                    this.frame = 9;
                }

                this.AttackAnimation = this.game_state.current_unit.animations.play("MagicAttack");

                this.SpellAnimation = this.game_state.game.add.sprite(target.x - 40, target.y -60, this.name, 0);
                this.MagicAnimation = this.SpellAnimation.animations.add(this.name);
                this.MagicAnimation.play(this.name, 30,false);



                this.KillAnimation = function(){
                    this.SpellAnimation.kill();
                    this.SendDamage(target)
                    this.game_state.current_unit.resetFrame();
                }

                this.MagicAnimation.onComplete.add(this.KillAnimation, this);
            }
           
            break;

        case "mage":

            this.game_state.allow_attack = false;
            
            if (this.name == "Purgatory" || this.name == "Volcano" || this.name == "EarthForce") {

                this.game_state.current_unit.resetFrame = function(){
                    this.frame = 9;
                }

                this.AttackAnimation = this.game_state.current_unit.animations.play("MagicAttack");

                this.SpellAnimation = this.game_state.game.add.sprite(target.x - 40, target.y -60, this.name, 0);
                this.MagicAnimation = this.SpellAnimation.animations.add(this.name);
                this.MagicAnimation.play(this.name, 30,false);



                this.KillAnimation = function(){
                    this.SpellAnimation.kill();
                    this.SendDamage(target)
                    this.game_state.current_unit.resetFrame();
                }

                this.MagicAnimation.onComplete.add(this.KillAnimation, this);
            }

            if (this.name == "Meteor") {

                

                this.SpellAnimation = this.game_state.game.add.sprite(-70, 0, this.name, 0);
                this.SpellAnimation.width = this.game_state.game.width;
                this.SpellAnimation.height = this.game_state.game.height + 10;
                this.MagicAnimation = this.SpellAnimation.animations.add(this.name);
                this.MagicAnimation.play(this.name, 30,false);



                this.KillAnimation = function(){
                    this.SpellAnimation.kill();
                    this.SendDamage(target)
                    this.game_state.current_unit.resetFrame();
                }

                this.MagicAnimation.onComplete.add(this.KillAnimation, this);
            }

            break;

        case "ranger":

            this.game_state.allow_attack = false;

            this.game_state.current_unit.resetFrame = function(){
                    this.frame = 9;
            }

            this.AttackAnimation = this.game_state.current_unit.animations.play("MagicAttack");

            if (this.name == "Pyroclasm" || this.name == "DemonFire") {

                this.SpellAnimation = this.game_state.game.add.sprite(target.x - 40, target.y -60, this.name, 0);
                this.MagicAnimation = this.SpellAnimation.animations.add(this.name);
                this.MagicAnimation.play(this.name, 30,false);



                this.KillAnimation = function(){
                    this.SpellAnimation.kill();
                    this.SendDamage(target)
                    this.game_state.current_unit.resetFrame();
                }

                this.MagicAnimation.onComplete.add(this.KillAnimation, this);
            }

            break;
        default: 
            
            break;
        
    }

    
};

RPG.MagicAttack.prototype.SendDamage = function (target){

    var damage, attack_multiplier, defense_multiplier, action_message_position, action_message_text, attack_message;
    // the attack multiplier for magic attacks is higher
    attack_multiplier = this.game_state.game.rnd.realInRange(0.9, 1.3);
    defense_multiplier = this.game_state.game.rnd.realInRange(0.8, 1.2);
    // calculate damage using the magic attack stat
    damage = Math.max(0, Math.round((attack_multiplier * this.damage) - (defense_multiplier * target.stats.defense)));

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

}
