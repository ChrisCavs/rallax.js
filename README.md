# Rallax.js

[![rallax.js on NPM](https://img.shields.io/npm/v/rallax.js.svg?style=flat-square)](https://www.npmjs.com/package/rallax.js)

Dead-simple parallax scrolling.

[See a demo.](https://chriscavs.github.io/rallax-demo/)

## Usage

Follow these steps to get started:

1. [Overview](#overview)
2. [Install](#install)
3. [Call](#call)
4. [Review Options](#options)
5. [Review API](#api)
6. [Handling Page Refresh](#handlingPageRefresh)

### Overview

Want to create dynamic parallax scrolling effects on your web page, without relying on jQuery?

Rallax.js makes it easy to create a parallax effect on a target HTML element, with great performance and a robust API.  Make either a basic scrolling parallax, or change it up with automatic callbacks ([when](#when) method), start/stop, speed changes, and mobile handling.

### Install

Using NPM, install Rallax, and save it to your `package.json` dependencies.

```bash
$ npm install rallax.js --save
```

Then, import Rallax, naming it according to your preference.

```es6
import rallax from 'rallax.js'
```

### Call

To generate the desired effect, call Rallax, passing in your element/target-selector and your desired options.

```es6
const options = { speed: 0.4 }
const parallax = rallax('.parallax', options)

// or:

const target = document.querySelector('.parallax')
const parallax = rallax(target, { speed: 0.4 })
```

**Note**: Rallax.js does not make any assumptions regarding the styling of the target element.

## Options

You are not required to pass any options.  All options come with sensible defaults, shown below:

```es6
{
  speed: 0.3,
  mobilePx: false
}
```

Explanation of each option follows:

* [speed](#speed)
* [mobilePx](#mobilePx)

### speed

Accepts a `float` number.

At a speed of `0`, the target will scroll like a static element.
At a speed of `1`, the target will appear fixed (will move at the speed of scroll).
At even higher speeds, the target will move quicker than the speed of scroll.

### mobilePx

Accepts an `integer`, as number of pixels.

Pass this option if you want parallax for this target to automatically be disabled at a certain screen width.

## API

Calling Rallax will return an object with a set of methods defined.  Those methods are:

* [stop](#stop)
* [start](#start)
* [getSpeed](#getspeed)
* [changeSpeed](#changeSpeed)
* [when](#when)

### stop

Calling `stop()` will pause the parallax effect on the target until the next time you call `start()`.

```es6
const parallax = rallax('.parallax')

if (condition) {
  parallax.stop()
}
```

### start

Calling `start()` will re-enable the parallax effect if you had previously disabled it.  **Note:** calling `start()` will not re-enable the effect if you have disabled it with the [mobilePx](#mobilePx) option.

```es6
const parallax = rallax('.parallax')
parallax.stop()

// some time later

parallax.start()
```

### getSpeed

Returns the current speed of the target.

### changeSpeed (speed)

Accepts a `float`.

Calling `changeSpeed` will change the speed of the target parallax effect.

```es6
// initialize the target at a speed of 0.6
const parallax = rallax('.parallax', { speed: 0.6 })

// change speed to 1, making the target appear fixed
parallax.changeSpeed(1)
```

### when (condition, action)

Accepts a condition `function` and an action `function`.

Calling `when` will queue a condition and action onto the target, which will be evaluated before the target is scrolled.  The `when` method is useful for setting up all kinds of special effects.

`when` methods can be chained together.

```es6
const parallax = rallax('.parallax')

// after reaching a certain position in the document, 
// increase the target's speed
parallax.when(
  () => window.scrollY > 400,
  () => parallax.changeSpeed(1)
)

// stop the parallax after a certain period of time
const startTime = new Date().getTime()

parallax.when(
  () => {
    const newTime = new Date().getTime()
    return newTime - startTime > 4000
  },
  () => parallax.stop()
)
```

## Handling Page Refresh

Rallax.js will adapt to the refreshing of the page, and place targets where they would be normally if they were to scroll to the point of refresh.

**However**, if using [changeSpeed](#changeSpeed) in conjunction with [when](#when) methods/conditionals, it's important to scroll to the top of the page when the user refreshes.  Code to handle such a situation:

```es6
window.onbeforeunload = () => {
  window.scrollTo(0, 0)
  // alternatively, you can put an animation function here
  // that will bring user to the top of page
}
```

## Browser Support

Rallax depends on the following browser APIs:

* [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

Consequently, it supports the following natively:

* Chrome 24+
* Firefox 23+
* Safari 6.1+
* Opera 15+
* IE 10+
* iOS Safari 7.1+

## License

[MIT](https://opensource.org/licenses/MIT). © 2018 Christopher Cavalea
