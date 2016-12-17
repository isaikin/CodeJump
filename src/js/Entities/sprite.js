'use strict';
window.Game.entities.sprite = (function () {
    var _sprite;

    _sprite = function (url, pos, size, speed, frames, dir, once) {
        this.pos = pos;
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this._index = 0;
        this.url = url;
        this.dir = dir || 'horizontal';
        this.once = once;
    };

    _sprite.prototype = {
        update: function(dt) {
            this._index += this.speed*dt;
        }
    };
    return {
        Sprite: _sprite
    };
})();