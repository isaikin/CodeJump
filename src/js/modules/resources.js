'use strict';
window.Game.modules.resources= (function() {
    var _presourceCache = {},
        readyCallbacks = [],
        _load,
        _loading,
        _get,
        _onReady,
        _isReady;

    _loading = function (urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        }
        else {
            _load(urlOrArr);
        }
    }

    _load = function (url) {
        var img;

        if(_presourceCache[url]) {
            return _presourceCache[url];
        }
        else {
            img = new Image();
            img.onload = function() {
                _presourceCache[url] = img;
                if(_isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            _presourceCache[url] = false;
            img.src = url;
        }
    }

    _get = function (url) {
        return _presourceCache[url];
    }

    _isReady = function () {
        var ready = true,
            k;

        for(k in _presourceCache) {
            if(_presourceCache.hasOwnProperty(k) &&
               !_presourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    _onReady = function (func) {
        readyCallbacks.push(func);
    }

    return { 
        load: _loading,
        get: _get,
        onReady: _onReady,
        isReady: _isReady
    };
})();