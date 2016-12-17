'use strict';
window.Game.modules.canvas = (function(){
    var _canvas = document.getElementById('canvas'),
        _ctx = _canvas.getContext('2d'),
        _clearCanvas,
        _settings = window.Game.settings,
        _render,
        _renderEntity,
        _renderEntities,
        _resources = window.Game.modules.resources,
        _renderSprite;

    _canvas.width = _settings.CANVAS_WIDTH;
    _canvas.height = _settings.CANVAS_HEIGHT;

    _clearCanvas = function(){
        _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
    };

    _renderEntities = function (list) {
        for(var i=0; i<list.length; i++) {
            _renderEntity(list[i]);
        }
    };

    _render = function(entities) {
        _renderEntities(entities);
    };

    _renderEntity = function (entity) {
        _ctx.save();
        _ctx.translate(entity.pos[0], entity.pos[1]);
        _renderSprite.call(entity.sprite);
        _ctx.restore();
    };

    _renderSprite = function () {
        var frame,
            max,
            idx,
            x,
            y;

        if(this.speed > 0) {
            max = this.frames.length;
            idx = Math.floor(this._index);
            frame = this.frames[idx % max];

            if(this.once && idx >= max) {
                this.done = true;
                return;
            }
        }
        else {
            frame = 0;
        }

        x = this.pos[0];
        y = this.pos[1];

        if(this.dir === 'vertical') {
            y += frame * this.size[1];
        }
        else {
            x += frame * this.size[0];
        }

        _ctx.drawImage(_resources.get(this.url),
                        x, y,
                        this.size[0], this.size[1],
                        0, 0,
                        this.size[0], this.size[1]);
    };
    return {
        clearCanvas: _clearCanvas,
        render: _render,
        renderEntity:_renderEntity,
    };
})();