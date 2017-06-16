var RPG = RPG || {};

RPG.DjinnAttack = function (game_state, name, position, properties) {
    "use strict";
    RPG.Attack.call(this, game_state, name, position, properties);
   
    this.damage = properties.damage;
    this.name = properties.name;
};

RPG.DjinnAttack.prototype = Object.create(RPG.Attack.prototype);
RPG.DjinnAttack.prototype.constructor = RPG.DjinnAttack;

RPG.DjinnAttack.prototype.hit = function (target) {
    "use strict";

    //Destroy the spell text
    this.game_state.prefabs.djinn_menu.menu_items.forEach(function(items){
            items.kill();
    });

    switch(this.game_state.current_unit.name) {
        case "fighter":

            this.game_state.allow_attack = false;

            if (this.name == "Jupiter") {

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

RPG.DjinnAttack.prototype.SendDamage = function (target){

    var damage, attack_multiplier, defense_multiplier, action_message_position, action_message_text, attack_message;
    // the attack multiplier for magic attacks is higher
    attack_multiplier = this.game_state.game.rnd.realInRange(0.9, 1.3);
    defense_multiplier = this.game_state.game.rnd.realInRange(0.8, 1.2);
    // calculate damage using the magic attack stat
    damage = Math.max(0, Math.round((attack_multiplier * this.damage) - (defense_multiplier * target.stats.defense)));

    // apply damage
    target.receive_damage(damage);
    
    this.show_message(target, damage);

}
