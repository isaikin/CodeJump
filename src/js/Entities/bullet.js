'use strict';
window.Game.entities.bullet = (function () {
    var _sprite = window.Game.entities.sprite,
        _bullet;


    _bullet = function (position, url, pos, size, speed, frames,bulletSpeed) {
        this.sprite = new _sprite.Sprite(url, pos, size, speed, frames);
        this.pos = position;
        this.bulletSpeed = bulletSpeed;
    };

    return {
        Bullet: _bullet
    };
})();