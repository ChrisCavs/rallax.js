# Rallax.js

[![rallax.js on NPM](https://img.shields.io/npm/v/rallax.js.svg?style=flat-square)](https://www.npmjs.com/package/rallax.js)

Dead-simple parallax scrolling.

[See a demo.](https://chriscavs.github.io/rallax-demo/)

## Usage

Follow these steps to get started:

1. [Overview](#overview)
2. [Install](#install)
3. [Import](#import)
4. [Call](#call)
5. [Review Options](#options)

### Overview

Rallax.js creates a parallax effect given a target HTML element and an image location.  It will create an `<img>` element, and position it `absolute` behind your target element.

As the user scrolls, the position of the `<img>` element will change relative to the target's location, creating the desired effect.

### Install

Using NPM, install Rallax, and save it to your `package.json` dependencies.

```bash
$ npm install rallax.js --save
```

### Import

Import Rallax, naming it according to your preference.

```es6
import rallax from 'rallax.js'
```

### Call

To generate the desired effect, call Rallax, passing in your target-selector, image location, and your desired options.

```es6
// target:            <div class="parallax"></div>
// image location:    "./test-image.jpg"

const options = { speed: 0.4 }

rallax(".parallax", "./test-image.jpg", options)
```

**Note**: Rallax.js does not make any assumptions regarding the styling of the target element.  **In order to see the effect, you must set either a transparent or slighty-transparent background on the target.**

## Options

You are not required to pass any options.  All options come with sensible defaults, shown below:

```es6
{
  speed: 0.3,
  offset: {},
  zIndex: -1000
}
```

Explanation of each option follows:

* [speed](#speed)
* [offset](#offset)
* [zIndex](#zIndex)
* [minPixels](#minPixels)
* [maxPixels](#maxPixels)

### speed

Accepts an `integer` between `0` and `1`.

At a speed of `0`, the image will scroll with the target.  
At a speed of `1`, the image will appear fixed in place.

### offset

Accepts an `object`.

The `offset` option works similar to the [background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) CSS property.  `offset` will specify the **center** of the image relative to the target element.

`offset` is declared with two of the following keys: `top`, `bot`, `left`, `right`, followed by a an `integer` representing the number of pixels.

```es6
// position the center of the image 10px from the top of the
// target, and 40 px from the left.

rallax(".parallax", "./test-image.jpg", {
  offset: {
    top: 10,
    left: 40
  }
})

// by default, the image will be centered relative to the target

rallax(".parallax", "./test-image.jpg")
```

### zIndex

Accepts an `integer`. 

`zIndex` specifies the [z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) property of the parallax image.

### maxPixels

Accepts an `integer`, specifying the maximum pixel width of the screen before 'turning off' the parallax effect.

Set `maxPixels` if you would like to turn off the parallax effect for very large screens.

Once turned off, the parallax image will appear as a background image for the target.

### minPixels

Accepts an `integer`, specifying the minimum pixel width of the screen before 'turning off' the parallax effect.

Set `minPixels` if you would like to turn off the parallax effect for very small screens (such as mobile devices).

Once turned off, the parallax image will appear as a background image for the target.

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