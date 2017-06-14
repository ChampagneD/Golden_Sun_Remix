var RPG = RPG || {};

RPG.NPC = function (game_state, name, position, properties) {
    "use strict";

    RPG.Prefab.call(this, game_state, name, position, properties);

    this.dialogue_data = game_state.dialogue_data;
    
    this.game_state.game.physics.arcade.enable(this);
    
    this.anchor.setTo(0.5);

    this.body.immovable = true;

    this.id = properties.id;

    this.player = this.game_state.groups.players.children[0];

    this.flipflop = false;

    this.cursors = this.game_state.game.input.keyboard.addKeys({"action": Phaser.KeyCode.SPACEBAR, 'up': Phaser.KeyCode.Z, 'down': Phaser.KeyCode.S, "talk": Phaser.KeyCode.E});

};

RPG.NPC.prototype = Object.create(RPG.Prefab.prototype);
RPG.NPC.prototype.constructor = RPG.NPC;

RPG.NPC.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.collide(this, this.game_state.groups.players);

    var distance = this.game.math.distance(this.player.x, this.player.y,
            this.x, this.y);

    if (distance < 25 && this.cursors.action.isDown) {
        if (!this.flipflop) {
            this.show_dialogue(this.id);
            this.flipflop = true;
        } else {
            this.flipflop = false;
        }
    }
};

RPG.NPC.prototype.show_dialogue = function ( id , callback) {
    "use strict";

    if (callback) {
        var s;

        var myObject = this;

        // build answers
        var choice = this.dialogue_data[id].choice,
        li = '';
        for(var j=0; j<choice.length; j++){
            li +='<li data-id="'+choice[j].id+'">'+choice[j].txt+'</li>';
        }
        $('.answer').html(li);

        $('.dialog p').text(this.dialogue_data[id].txt);

        $(".answer li").eq(0).addClass('selected');

        s = $('.answer li.selected');

        $(".dialog").fadeIn('400', function() {
            $("body").keydown(function(e) {

                // bas
                if (e.which == 83) {

                    s = $('.answer li.selected');
                    s.removeClass('selected');
                    if(s.next().length == 0){
                        s = $('.answer li').eq(0).addClass('selected');
                        s = $('.answer li.selected');
                    }else{
                        s.next().addClass('selected');
                        s = $('.answer li.selected');
                    }                                       
                }

                // haut : 90
                if (e.which == 90) {
                    s = $('.answer li.selected');
                    s.removeClass('selected');
                    if(s.prev().length == 0){
                        s = $('.answer li:last-child').addClass('selected');
                        s = $('.answer li.selected');
                    }else{
                        s.prev().addClass('selected');
                        s = $('.answer li.selected');
                    } 
                }
                // select answer
                if (e.which == 69){
                    if (s.data('id') != false) {
                        $( "body" ).off( "keydown");
                        $(".dialog").fadeOut('400', function() {
                            myObject.show_dialogue(s.data('id'), true);
                        });
                    } else {
                        $( "body" ).off( "keydown");
                        $(".dialog").fadeOut('400', function() {
                            return myObject.game_state.game.paused = false;
                        });      
                    }
                }
            });
        });

    } else if (this.cursors.action.isDown) {

        var s;

        var myObject = this;

        // build answers
        var choice = this.dialogue_data[id].choice,
        li = '';
        for(var j=0; j<choice.length; j++){
            li +='<li data-id="'+choice[j].id+'">'+choice[j].txt+'</li>';
        }
        $('.answer').html(li);

        $('.dialog p').text(this.dialogue_data[id].txt);

        $(".answer li").eq(0).addClass('selected');

        s = $('.answer li.selected');

        $(".dialog").fadeIn('400', function() {
            $("body").keydown(function(e) {

                // bas
                if (e.which == 83) {

                    s = $('.answer li.selected');
                    s.removeClass('selected');
                    if(s.next().length == 0){
                        s = $('.answer li').eq(0).addClass('selected');
                        s = $('.answer li.selected');
                    }else{
                        s.next().addClass('selected');
                        s = $('.answer li.selected');
                    }                                       
                }

                // haut : 90
                if (e.which == 90) {
                    s = $('.answer li.selected');
                    s.removeClass('selected');
                    if(s.prev().length == 0){
                        s = $('.answer li:last-child').addClass('selected');
                        s = $('.answer li.selected');
                    }else{
                        s.prev().addClass('selected');
                        s = $('.answer li.selected');
                    } 
                }
                // select answer
                if (e.which == 69){
                    if (s.data('id') != false) {
                        $( "body" ).off( "keydown");
                        $(".dialog").fadeOut('400', function() {
                            myObject.show_dialogue(s.data('id'), true);
                        });
                    } else {
                        $( "body" ).off( "keydown");
                        $(".dialog").fadeOut('400', function() {
                            return myObject.game_state.game.paused = false;
                        });      
                    }
                }
            });
        });   
    }

        this.game_state.game.paused = true;

};





