'use strict';
window.Game.entities.bonus = (function () { 
    var _sprite = window.Game.entities.sprite,
        _bonus;

    _bonus = function (position) {
        this.sprite = new _sprite.Sprite('./../../content/img/bonus.png', [0, 0], [62, 72], 12,[0,1,2,3,4,5,6,5,4,3,2,1,0],'vertical', false);
        this.pos = position;
    };
    return{
        Bonus:_bonus
    };
})();