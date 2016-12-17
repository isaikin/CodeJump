'use strict';
window.Game.modules.collides = (function () {
    var _collides,
        _boxCollides,
        _checkCollisions,
        _objectStorage = window.Game.modules.objectStorage,
        _settings = window.Game.settings,
        _sprite = window.Game.entities.sprite;

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
            pos,
            size,
            pos2,
            size2,
            j;

        for(i = 0; i<_objectStorage.getObjects(_settings.ENTITIES.enemies).length; i++) {
            pos = _objectStorage.getObjects(_settings.ENTITIES.enemies)[i].pos;
            size = _objectStorage.getObjects(_settings.ENTITIES.enemies)[i].sprite.size;

            for(j = 0; j <_objectStorage.getObjects(_settings.ENTITIES.bullet).length; j++) {
                pos2 = _objectStorage.getObjects(_settings.ENTITIES.bullet)[j].pos;
                size2 = _objectStorage.getObjects(_settings.ENTITIES.bullet)[j].sprite.size;
                if(_boxCollides(pos, size, pos2, size2)) {
                    _objectStorage.removeObject(i, _settings.ENTITIES.enemies);
                    i--;
                    score += 100;
                    _objectStorage.push({
                        pos: pos,
                        sprite: new _sprite.Sprite('./../../content/img/sprites.png',
                                       [0, 117],
                                       [39, 39],
                                       16,
                                       [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                       null,
                                       true)
                    },_settings.ENTITIES.explosions);

                    _objectStorage.removeObject(j, _settings.ENTITIES.bullet);
                    break;
                }
            }
            if(_boxCollides(pos, size, player.pos, player.sprite.size)) {
                callback();
            }
        }

        for(i = 0; i<_objectStorage.getObjects(_settings.ENTITIES.bonus).length; i++) {
                pos = _objectStorage.getObjects(_settings.ENTITIES.bonus)[i].pos;
                size = _objectStorage.getObjects(_settings.ENTITIES.bonus)[i].sprite.size;
                if(_boxCollides(pos, size, player.pos, player.sprite.size)) {
                    callbackBonus();
                    _objectStorage.removeObject(i, _settings.ENTITIES.bonus);   
                }
            }
        return score;
    };
    return{
        checkCollisions:_checkCollisions
    };
})();