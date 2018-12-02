(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.rallax = factory());
}(this, (function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var listening = false;
  var targets = [];

  var defaultOptions = {
    speed: 0.3,
    disable: function disable() {
      return window.innerWidth < 400;
    },
    onDisable: function onDisable() {},
    enable: function enable() {},
    onEnable: function onEnable() {}
  };

  var addListener = function addListener() {
    window.addEventListener('scroll', function (event) {
      controller(targets);
    });
  };

  var controller = function controller(targets) {
    requestAnimationFrame(function () {
      targets.forEach(function (obj) {
        if (obj.disable() && obj.active) {
          return obj.stop();
        }

        if (!obj.active && obj.enable()) {
          obj.start();
        }

        if (obj.active) {
          obj.move();
        }
      });
    });
  };

  var RallaxObj = function () {
    function RallaxObj(target, _ref) {
      var speed = _ref.speed,
          disable = _ref.disable,
          onDisable = _ref.onDisable,
          enable = _ref.enable,
          onEnable = _ref.onEnable;
      classCallCheck(this, RallaxObj);

      this.speed = speed || defaultOptions.speed;
      this.disable = disable || defaultOptions.disable;
      this.onDisable = onDisable || defaultOptions.onDisable;
      this.enable = enable || defaultOptions.enable;
      this.onEnable = onEnable || defaultOptions.onEnable;

      this.active = true;
      this.target = target;

      if (typeof target === 'string') {
        this.target = document.querySelector('' + target);
      }

      this.winHeight = window.innerHeight;
      this.getRect();

      this.startScroll = this.targetR.top - this.winHeight > 0 ? this.targetR.top - this.winHeight : 0;
    }

    createClass(RallaxObj, [{
      key: 'stop',
      value: function stop() {
        this.active = false;
        this.onDisable();
      }
    }, {
      key: 'start',
      value: function start() {
        this.active = true;
        this.onEnable();
      }
    }, {
      key: 'getTranslation',
      value: function getTranslation() {
        var dist = window.scrollY - this.startScroll;
        return dist * this.speed;
      }
    }, {
      key: 'getRect',
      value: function getRect() {
        this.targetR = this.target.getBoundingClientRect();
        return this.targetR;
      }
    }, {
      key: 'move',
      value: function move() {
        this.target.style.transform = 'translateY(' + this.getTranslation() + 'px)';
      }
    }]);
    return RallaxObj;
  }();

  var rallax = (function (target) {
    var userOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var rallax = new RallaxObj(target, userOptions);
    targets.push(rallax);

    if (!listening) {
      addListener();
      listening = true;
    }

    return rallax;
  });

  return rallax;

})));
