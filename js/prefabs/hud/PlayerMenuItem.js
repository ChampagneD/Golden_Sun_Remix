var RPG = RPG || {};

RPG.PlayerMenuItem = function (game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);

    if (this.game_state.i < 3) {
        this.game_state["PlayerMenuItem"+this.game_state.i] = this;
        this.game_state.i++;
    }
        
    this.prefab = this.game_state.prefabs[properties.text];

    this.healthMax = this.prefab.stats["maxHealth"];
    this.manaMax = this.prefab.stats["maxMana"];

    this.player_unit_health = new HealthBar(this.game, {
                                                            width: this.healthMax,
                                                            height: 10,
                                                            x: 550,
                                                            y: this.game_state.party_data[this._text].position.y - 50,
                                                            bg: {
                                                                color: "red"
                                                            },
                                                            bar: {
                                                                color: "#00cc33"
                                                            },
                                                            flipped: true
                                                        });
    this.player_unit_mana = new HealthBar(this.game, {
                                                            width: this.manaMax,
                                                            height: 10,
                                                            x: 550,
                                                            y: this.game_state.party_data[this._text].position.y - 38,
                                                            bg: {
                                                                color: "red"
                                                            },
                                                            bar: {
                                                                color: "blue"
                                                            },
                                                            flipped: true
                                                        });

    switch(this._text) {
        case "Isaac":
            if (this.game_state.damageFighter) {
                this.damageFighter = (this.game_state.damageFighter * 100) / this.game_state.PlayerMenuItem0.healthMax;
                this.damageFighter = 100 - this.damageFighter;
                this.player_unit_health.setPercent(this.damageFighter);
                
            } 
            if (this.game_state.party_data.Isaac.properties.stats.mana) {
                this.manaFighter = (this.game_state.party_data.Isaac.properties.stats.mana * 100) / this.game_state.PlayerMenuItem0.manaMax;
                this.game_state.PlayerMenuItem0.player_unit_mana.setPercent(this.manaFighter);
            }
            break;

        case "Sheba":
            if (this.game_state.damageMage) {
                this.damageMage = (this.game_state.damageMage * 100) / this.healthMax;
                this.damageMage = 100 - this.damageMage;
                this.player_unit_health.setPercent(this.damageMage);
                
            }
            if (this.game_state.party_data.Sheba.properties.stats.mana) {
                this.manaMage = (this.game_state.party_data.Sheba.properties.stats.mana * 100) / this.game_state.PlayerMenuItem1.manaMax;
                this.game_state.PlayerMenuItem1.player_unit_mana.setPercent(this.manaMage);
            }
            break;

        case "Jenna":
            if (this.game_state.damageRanger) {
                this.damageRanger = (this.game_state.damageRanger * 100) / this.healthMax;
                this.damageRanger = 100 - this.damageRanger;
                this.player_unit_health.setPercent(this.damageRanger);
                
            }
            if (this.game_state.party_data.Jenna.properties.stats.mana) {
                this.manaRanger = (this.game_state.party_data.Jenna.properties.stats.mana * 100) / this.game_state.PlayerMenuItem2.manaMax;
                this.game_state.PlayerMenuItem2.player_unit_mana.setPercent(this.manaRanger);
            }
            break;
    }

};

RPG.PlayerMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.PlayerMenuItem.prototype.constructor = RPG.PlayerMenuItem;

RPG.PlayerMenuItem.prototype.select = function () {
    "use strict";
    var player_unit;
    // get selected player unit
    player_unit = this.game_state.prefabs[this.text];
    // use current selected item on selected unit
    this.game_state.prefabs.inventory.use_item(this.game_state.current_item, player_unit);
    
    // show actions menu again
    this.game_state.prefabs.items_menu.disable();
    this.game_state.prefabs.items_menu.hide();
    this.game_state.prefabs.actions_menu.show();
    this.game_state.prefabs.actions_menu.enable();
};

RPG.PlayerMenuItem.prototype.update = function(){


};