'use strict';
window.Game.modules.objectStorage = (function () {
    var _storages = {
        },
        _key,
        _push,
        _getObjects,
        _removeObject,
        _clearObjects;

    _push = function (obj, type) {
        if(!_storages.hasOwnProperty(type)) {
            _storages[type] = [];
        }

        _storages[type].push(obj);
    };

    _getObjects = function (type) {
        if(!_storages.hasOwnProperty(type)) {
            return [];
        }
        
        return _storages[type];
    };

    _removeObject = function (index, type) {
        if(!_storages.hasOwnProperty(type)) {
            throw new Error('Storage "' + type + '" not found!');
        }

        _storages[type].splice(index, 1);
    };

    _clearObjects = function () {
        for (_key in _storages) {
            if(_storages.hasOwnProperty(_key)) {
                _storages[_key] = [];
            }
        }
    };

    return {
        push: _push,
        getObjects: _getObjects,
        removeObject: _removeObject,
        clearObjects: _clearObjects
    };
})();