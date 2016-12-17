'use strict';
window.Game.entities.enemy = (function () {
    var _sprite = window.Game.entities.sprite,
        _enemy;

    _enemy = function (position, url, pos, size, speed, frames, dir, once) {
        this.sprite = new _sprite.Sprite(url, pos, size, speed, frames, dir, once);
        this.pos = position;
    };
    return{
        Enemy:_enemy
    };
})();