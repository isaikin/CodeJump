'use strict';
window.Game.entities.player = (function () {
    var _sprite = window.Game.entities.sprite,
        _player;

    _player = function (position, url, pos, size, speed, heals) {
        this.sprite = new _sprite.Sprite(url, pos, size, speed);
        this.pos = position;
        this.heals = heals;
    };
    return{
        Player:_player
    };
})();