'use strict';
window.Game.modules.input = (function() {
    var _pressedKeys = {},
    _eventReset = new Event('reset',{bubbles: false, cancelable: false}),
     _btnPlayAgain = document.getElementById('BtnPlayAgain');;

    function setKey(event, status) {
        var _code = event.keyCode,
            _key;

        switch(_code) {
            case 32:
                _key = 'SPACE'; break;
            case 37:
                _key = 'LEFT'; break;
            case 38:
                _key = 'UP'; break;
            case 39:
                _key = 'RIGHT'; break;
            case 40:
                _key = 'DOWN'; break;
            default:
                _key = String.fromCharCode(_code);
        }
        _pressedKeys[_key] = status;
    }

    document.addEventListener('keydown', function(e) {
        setKey(e, true);
    });

    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    });

    window.addEventListener('blur', function() {
        _pressedKeys = {};
    });
    _btnPlayAgain.addEventListener('click', function() {
        _eventReset.preventDefault();
    });
    return {
        isDown: function(key) {
            return _pressedKeys[key.toUpperCase()];
        },
        EventReset :_eventReset
    };
})();