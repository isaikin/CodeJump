'use strict';
var _requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.Game.modules.main = (function () {
    var _canvas = window.Game.modules.canvas,
        _objectStorage = window.Game.modules.objectStorage,
        _resources = window.Game.modules.resources,
        _settings = window.Game.settings,
        _initialize,
        _update,
        _gameTime = 0 ,
        _lastTime,
        _updateEntities,
        _handleInput,
        _input = window.Game.modules.input,
        _player = new window.Game.entities.player.Player([100,0],'./../../content/img/player.png', [0, 0], [311, 333], [0]),
        _lastFire = Date.now(),
        _collides = window.Game.modules.collides,
        _bullet = window.Game.entities.bullet,
        _enemy = window.Game.entities.enemy,
        _gameOver,
        _reset,
        _gameOverFlag,
        _scoreElement = document.getElementById('score'),
        _updateScore,
        _score,
        _bonus = window.Game.entities.bonus,
        _bonusStart,
        _SpeedBullt,
        _SpeedBonus,
        _idSetIntervalBonus;

    _handleInput = function(dt) {
        if((_input.isDown('DOWN') || _input.isDown('s')) && _player.pos[1] + _settings.PLAYER_SPEED * dt < _settings.CANVAS_HEIGHT - 20) {
            _player.pos[1] += _settings.PLAYER_SPEED * dt;
        }

        if((_input.isDown('UP') || _input.isDown('w')) && _player.pos[1] - _settings.PLAYER_SPEED * dt > 0) {
            _player.pos[1] -= _settings.PLAYER_SPEED * dt;
        }

        if((_input.isDown('LEFT') || _input.isDown('a')) && _player.pos[0] - _settings.PLAYER_SPEED * dt > 0) {
            _player.pos[0] -= _settings.PLAYER_SPEED * dt;
        }

        if((_input.isDown('RIGHT') || _input.isDown('d')) && _player.pos[0] + _settings.PLAYER_SPEED * dt < _settings.CANVAS_WIDTH - 20) {
            _player.pos[0] += _settings.PLAYER_SPEED * dt;
        }

        if(_input.isDown('SPACE') && Date.now() - _lastFire > _SpeedBullt) {
            var x = _player.pos[0] + 175,
                y = _player.pos[1] + 1;
            _objectStorage.push(new _bullet.Bullet([x,y], './../../content/img/bulet.png', [0, 0], [58, 29], 0, [0]), _settings.Entities.bullet);
            var x = _player.pos[0] + 175,
                y = _player.pos[1] + 200;
            _objectStorage.push(new _bullet.Bullet([x,y], './../../content/img/bulet.png', [0, 0], [58, 29], 0, [0]), _settings.Entities.bullet)
            _lastFire = Date.now();
        }
        _lastTime = Date.now();
    };
    _gameOver = function () {
        document.getElementById('game-over').style.display = 'block';
        _gameOverFlag = true;
    };
    _initialize = function () {
        _lastTime = Date.now();
        _resources.load([
            './../../content/img/player.png',
            './../../content/img/bulet.png',
            './../../content/img/enemy.png'
        ]);
        _resources.onReady(_update);
        _gameOverFlag = false;
        _SpeedBullt = 1000;
    };
    _update = function () {
        var dt = (Date.now() - _lastTime) / 1000.0;
 
        _gameTime += dt;
         if(Math.random() < 1 - Math.pow(.993, _gameTime)) {
            _objectStorage.push(new _enemy.Enemy([_settings.CANVAS_WIDTH, Math.random() * (_settings.CANVAS_WIDTH - 100)], './../../content/img/enemy.png', [0, 0], [99, 75],
               0, [1]), _settings.Entities.enemy);
        }
        _lastTime =Date.now();
        _collides.checkCollisions();
        _canvas.clearCanvas();
        _updateEntities(dt);
        _canvas.renderEntity(_player);
        _canvas.render(_objectStorage.getObjects(_settings.Entities.bullet));
        _canvas.render(_objectStorage.getObjects(_settings.Entities.enemy));
        _handleInput(dt);
        if(!_gameOverFlag) {
            _requestAnimFrame(_update);
        }
    };
    _updateEntities = function (dt){
        var bullet,
            enemy,
            i;
       
       for(i = 0; i < _objectStorage.getObjects(_settings.Entities.bullet).length;i++) {
           bullet = _objectStorage.getObjects(_settings.Entities.bullet)[i];
           bullet.sprite.update(dt);
           bullet.pos[0] += _settings.BULLET_SPEED * dt;

           if( bullet.pos[0] > _settings.CANVAS_WIDTH || bullet.pos[1] > _settings.CANVAS_HEIGHT) {
               _objectStorage.removeObject(i, _settings.Entities.bullet);
           }
       };
       for(i = 0; i < _objectStorage.getObjects(_settings.Entities.enemy).length;i++) {
           enemy = _objectStorage.getObjects(_settings.Entities.enemy)[i];
           enemy.pos[0] -= 100 * dt;

           if( enemy.pos[0] > _settings.CANVAS_WIDTH || enemy.pos[1] > _settings.CANVAS_HEIGHT) {
               _objectStorage.removeObject(i, _settings.Entities.enemy);
           }
       };
    };

    return {
        initialize:_initialize,
    };
})();