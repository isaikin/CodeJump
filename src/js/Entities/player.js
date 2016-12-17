'use strict';
window.Game.entities.player = (function () {
    var _sprite = window.Game.entities.sprite,
        _player;

    _player = function (position, url, pos, size, speed, frames, dir, once) {
        this.sprite = new _sprite.Sprite(url, pos, size, speed, frames, dir, once);
        this.pos = position;
    };
    return{
        Player:_player
    };
})();