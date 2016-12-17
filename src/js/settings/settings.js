'use strict'
window.Game.settings = (function () {
    var _canvasWidth,
        _canvasHeight,
        _enemySpeed,
        _playerSpeed,
        _bulletSpeed,
        _entities;

    _canvasWidth = document.documentElement.clientWidth - 100;
    _canvasHeight = document.documentElement.clientHeight - 100;
    _playerSpeed = 100;
    _bulletSpeed = 200;
    _entities = {
        enemies : 0,
        bullet : 1,
        explosions:2,
        bonus:3
    };
    return {
        CANVAS_WIDTH : _canvasWidth,
        CANVAS_HEIGHT :_canvasHeight,
        PLAYER_SPEED : _playerSpeed,
        BULLET_SPEED : _bulletSpeed,
        Entities: _entities
    };
})();