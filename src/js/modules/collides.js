'use strict';
window.Game.modules.collides = (function () {
    var _collides,
        _boxCollides,
        _checkCollisions,
        _objectStorage = window.Game.modules.objectStorage,
        _settings = window.Game.settings,
        _sprite = window.Game.entities.sprite,
        _collides,
        _boxCollides;

     _collides = function (x, y, r, b, x2, y2, r2, b2) {
        return !(r <= x2 || x > r2 ||
             b <= y2 || y > b2);
    };
    _boxCollides = function (pos, size, pos2, size2) {
        return _collides(pos[0], pos[1],
                    pos[0] + size[0], pos[1] + size[1],
                    pos2[0], pos2[1],
                    pos2[0] + size2[0], pos2[1] + size2[1]);
    };
    _checkCollisions = function (player, callback, score, callbackBonus) {
        var i,
            j,
            bullet,
            enemy;
            for(i = 0; i < _objectStorage.getObjects(_settings.Entities.bullet).length; i++) {
                for(j = 0 ; j < _objectStorage.getObjects(_settings.Entities.enemy).length; j++) {
                    bullet = _objectStorage.getObjects(_settings.Entities.bullet)[i];
                    enemy = _objectStorage.getObjects(_settings.Entities.enemy)[j];
                    
                    if(_boxCollides(bullet.pos,[58,29], enemy.pos, [99,75])) {
                        _objectStorage.removeObject(i, _settings.Entities.bullet);
                        _objectStorage.removeObject(j, _settings.Entities.enemy);
                    }
                }
            }

            for(j = 0 ; j < _objectStorage.getObjects(_settings.Entities.enemy).length; j++) {
                    enemy = _objectStorage.getObjects(_settings.Entities.enemy)[j];
                    
                    if(_boxCollides(player.pos,[311,333], enemy.pos, [99,75])) {
                        callback();
                    }
                }

    };
    return{
        checkCollisions:_checkCollisions
    };
})();