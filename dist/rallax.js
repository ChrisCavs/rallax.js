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
    mobilePx: false
  };

  var RallaxObj = function () {
    function RallaxObj(target, _ref) {
      var speed = _ref.speed,
          mobilePx = _ref.mobilePx;
      classCallCheck(this, RallaxObj);

      this.speed = speed || defaultOptions.speed;
      this.mobilePx = mobilePx || defaultOptions.mobilePx;
      this.mobileDisable = false;
      this.conditions = [];
      this.active = true;
      this.target = target;

      if (typeof target === 'string') {
        this.target = document.querySelector('' + target);
      }

      this.winHeight = window.innerHeight;
      this.accumulated = 0;
      this.getRect();

      this.startScroll = this.targetR.top - this.winHeight > 0 ? this.targetR.top - this.winHeight : 0;
    }

    // API


    createClass(RallaxObj, [{
      key: 'stop',
      value: function stop() {
        this.active = false;
      }
    }, {
      key: 'start',
      value: function start() {
        this.active = true;
      }
    }, {
      key: 'getSpeed',
      value: function getSpeed() {
        return this.speed;
      }
    }, {
      key: 'changeSpeed',
      value: function changeSpeed(newSpeed) {
        if (this.inWindow() && newSpeed !== this.speed) {
          this.accumulated = this.getTranslation();
          this.startScroll = this.scrollY();
        }
        this.speed = newSpeed;
      }
    }, {
      key: 'when',
      value: function when(condition, action) {
        this.conditions.push({ condition: condition, action: action });
        return this;
      }

      // HELPERS

    }, {
      key: 'scrollY',
      value: function scrollY() {
        return window.scrollY || window.pageYOffset;
      }
    }, {
      key: 'getTranslation',
      value: function getTranslation() {
        var dist = this.scrollY() - this.startScroll;
        var translation = dist * this.speed + this.accumulated;
        return translation >= 0 ? translation : 0;
      }
    }, {
      key: 'getRect',
      value: function getRect() {
        this.targetR = this.target.getBoundingClientRect();
        return this.targetR;
      }
    }, {
      key: 'inWindow',
      value: function inWindow() {
        this.getRect();
        var top = this.targetR.top;
        var bottom = this.targetR.bottom;

        return top < this.winHeight && bottom > 0;
      }
    }, {
      key: 'move',
      value: function move() {
        this.target.style.transform = 'translateY(' + this.getTranslation() + 'px)';
      }
    }]);
    return RallaxObj;
  }();

  var addListener = function addListener() {
    window.addEventListener('scroll', function (event) {
      controller(targets);
    });

    window.addEventListener('resize', function (event) {
      resize();
    });
  };

  var controller = function controller(targets) {
    requestAnimationFrame(function () {
      targets.forEach(function (obj) {
        if (obj.mobileDisable) return;

        obj.conditions.forEach(function (_ref2) {
          var condition = _ref2.condition,
              action = _ref2.action;

          if (condition()) action();
        });

        if (obj.active) {
          obj.move();
        }
      });
    });
  };

  var resize = function resize() {
    var newSize = window.innerWidth;

    targets.forEach(function (obj) {
      if (obj.mobilePx >= newSize) {
        obj.mobileDisable = true;
      }
    });
  };

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
