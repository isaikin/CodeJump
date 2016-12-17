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
        _enemie = window.Game.entities.enemies,
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
            var x = _player.pos[0] + _player.sprite.size[0] / 2,
                y = _player.pos[1] + _player.sprite.size[1] / 2;
            _objectStorage.push(new _bullet.Bullet([x,y], './../../content/img/Untitled.png', [0, 0], [254, 113], [9,8,7,6,5,4,3,2,1]), _settings.Entities.bullet);
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
            './../../content/img/Untitled.png'
        ]);
        _resources.onReady(_update);
        _gameOverFlag = false;
        window.setInterval(_bonusStart, 4000);
        _SpeedBullt = 100;
    };
    _update = function () {
        var dt = (Date.now() - _lastTime) / 1000.0;
 
        _gameTime += dt;
     
        _lastTime =Date.now();
        _canvas.clearCanvas();
        _updateEntities(dt);
        _canvas.renderEntity(_player);
        _canvas.render(_objectStorage.getObjects(_settings.Entities.bullet));
        _handleInput(dt);
        if(!_gameOverFlag) {
            _requestAnimFrame(_update);
        }
    };
    _updateEntities = function (dt){
        var bullet,
            i;
       
       for(i = 0; i < _objectStorage.getObjects(_settings.Entities.bullet).length;i++) {
           bullet = _objectStorage.getObjects(_settings.Entities.bullet)[i];
           bullet.sprite.update(dt);
           bullet.pos[0] += _settings.BULLET_SPEED * dt;
       };
    };

    return {
        initialize:_initialize,
    };
})();