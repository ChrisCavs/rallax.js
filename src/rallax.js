let listening = false
let targets = []

const defaultOptions = {
  speed: 0.3,
  mobilePx: false
}

class RallaxObj {
  constructor(target, { speed, mobilePx }) {
    this.speed = speed || defaultOptions.speed
    this.mobilePx = mobilePx || defaultOptions.mobilePx
    this.mobileDisable = false
    this.conditions = []
    this.active = true
    this.target = target

    if (typeof target === 'string') {
      this.target = document.querySelector(`${target}`)
    }

    this.winHeight = window.innerHeight
    this.accumulated = 0
    this.getRect()

    this.startScroll = this.targetR.top - this.winHeight > 0
      ? this.targetR.top - this.winHeight
      : 0
  }

  // API
  stop() {
    this.active = false
  }

  start() {
    this.active = true
  }

  getSpeed() {
    return this.speed
  }

  changeSpeed(newSpeed) {
    if (this.inWindow() && newSpeed !== this.speed) {
      this.accumulated = this.getTranslation()
      this.startScroll = this.scrollY()
    }
    this.speed = newSpeed
  }

  when(condition, action) {
    this.conditions.push({condition, action})
    return this
  }

  // HELPERS
  scrollY() {
    return window.scrollY || window.pageYOffset
  }

  getTranslation() {
    const dist = this.scrollY() - this.startScroll
    const translation = (dist * this.speed) + this.accumulated
    return translation >= 0 ? translation : 0
  }

  getRect() {
    this.targetR = this.target.getBoundingClientRect()
    return this.targetR
  }

  inWindow() {
    this.getRect()
    const top = this.targetR.top
    const bottom = this.targetR.bottom

    return top < this.winHeight && bottom > 0
  }

  move() {
    this.target
      .style
      .transform = `translateY(${this.getTranslation()}px)`
  }
}

const addListener = () => {
  window.addEventListener('scroll', event => {
    controller(targets)
  })

  window.addEventListener('resize', event => {
    resize()
  })
}

const controller = targets => {
  requestAnimationFrame(() => {
    targets.forEach(obj => {
      if (obj.mobileDisable) return

      obj.conditions
        .forEach(({condition, action}) => {
          if (condition()) action()
        })

      if (obj.active) {
        obj.move()
      }
    })
  })
}

const resize = () => {
  const newSize = window.innerWidth

  targets.forEach(obj => {
    if (obj.mobilePx >= newSize) {
      obj.mobileDisable = true
    }
  })
}

export default (target, userOptions = {}) => {
  const rallax = new RallaxObj(target, userOptions)
  targets.push(rallax)
	resize()

  if (!listening) {
    addListener()
    listening = true
  }

  return rallax
}