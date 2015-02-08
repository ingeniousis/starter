'use strict';

String.format = function (format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

// Extends String class with format method
if (!String.prototype.format) {
    String.prototype.format = function () {
        var content = this;
        for (var i = 0; i < arguments.length; i++) {
            var replacement = '{' + i + '}';
            content = content.replace(replacement, arguments[i]);
        }
        return content;
    };
}

if (!Array.prototype.unique) {
    Array.prototype.unique = function () {
        var array = this;
        return $.grep(array, function (el, index) {
            return index == $.inArray(el, array);
        });
    };
}

if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function () {
        var array = this;
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };
}

if (!Array.prototype.last) {
    Array.prototype.last = function () {
        return this[this.length - 1];
    };
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function (element) {
        var index = this.indexOf(element);
        if (index != -1) {
            this.splice(index, 1);
        }
    };
}

// Prototype for the indexOf method in case the browser does not support it
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (find, i) {
        if (i === undefined) i = 0;
        if (i < 0) return -1;
        for (var n = this.length; i < n; i++)
            if (i in this && this[i] === find)
                return i;
        return -1;
    };
}

// Find an element in an array via predicate
if (!Array.prototype.FindIndex) {
    Array.prototype.FindIndex = function (fun) {
        var len = this.length >>> 0;
        if (typeof fun != "function")
            throw new TypeError();
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this)
                if (fun.call(thisp, this[i], i, this))
                    return i;
        }
    };
}

// Prototype for the forEach method in case the browser does not support it
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fun) {
        var len = this.length >>> 0;
        if (typeof fun != "function")
            throw new TypeError();
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this)
                fun.call(thisp, this[i], i, this);
        }
    };
}