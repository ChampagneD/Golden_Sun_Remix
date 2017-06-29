var RPG = RPG || {};

RPG.Potion = function (game_state, name, position, properties) {
    "use strict";
    RPG.Item.call(this, game_state, name, position, properties);
    
    this.health_power = properties.health_power;
};

RPG.Potion.prototype = Object.create(RPG.Item.prototype);
RPG.Potion.prototype.constructor = RPG.Potion;

RPG.Potion.prototype.use = function (target) {
    "use strict";
    RPG.Item.prototype.use.call(this);
    target.stats.health += this.health_power;

    this.game_state.Heal.play();

    //The player health increase
    switch(target.name) {
        case "Isaac":
            this.game_state.damageFighter -= this.health_power;
            break;

        case "Sheba":
            this.game_state.damageMage -= this.health_power;
            break;

        case "Jenna":
            this.game_state.damageRanger -= this.health_power;
            break;
    }

    switch(target.name) {
        case "Isaac":
            this.damageFighter = (this.game_state.damageFighter * 100) / this.game_state.PlayerMenuItem0.healthMax;
            this.damageFighter = 100 - this.damageFighter;
            this.game_state.PlayerMenuItem0.player_unit_health.setPercent(this.damageFighter); 
            break;

        case "Shiba":
            this.damageMage = (this.game_state.damageMage * 100) / this.game_state.PlayerMenuItem1.healthMax;
            this.damageMage = 100 - this.damageMage;
            this.game_state.PlayerMenuItem1.player_unit_health.setPercent(this.damageMage); 
            break;

        case "Jenna":
            this.damageRanger = (this.game_state.damageRanger * 100) / this.game_state.PlayerMenuItem2.healthMax;
            this.damageRanger = 100 - this.damageRanger;
            this.game_state.PlayerMenuItem2.player_unit_health.setPercent(this.damageRanger);
            break;
    }
};