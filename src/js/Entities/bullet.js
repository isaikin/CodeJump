'use strict';
window.Game.entities.bullet = (function () {
    var _sprite = window.Game.entities.sprite,
        _bullet;


    _bullet = function (position, url, pos, size, speed, frames, dir, once) {
        this.sprite = new _sprite.Sprite(url, pos, size, speed, frames, dir, once);
        this.pos = position;
    };

    return {
        Bullet: _bullet
    };
})();