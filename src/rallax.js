let listening = false
let targets = []

const defaultOptions = {
  speed: 0.3,
  disable: () => window.innerWidth < 400,
  onDisable: () => {},
  enable: () => {},
  onEnable: () => {}
}

class RallaxObj {
  constructor(target, { speed, disable, onDisable, enable, onEnable }) {
    this.speed = speed || defaultOptions.speed
    this.disable = disable || defaultOptions.disable
    this.onDisable = onDisable || defaultOptions.onDisable
    this.enable = enable || defaultOptions.enable
    this.onEnable = onEnable || defaultOptions.onEnable

    this.active = true
    this.target = target

    if (typeof target === 'string') {
      this.target = document.querySelector(`${target}`)
    }

    this.winHeight = window.innerHeight
    this.getRect()

    this.startScroll = this.targetR.top - this.winHeight > 0
      ? this.targetR.top - this.winHeight
      : 0
  }

  stop() {
    this.active = false
    this.onDisable()
  }

  start() {
    this.active = true
    this.onEnable()
  }

  getTranslation() {
    const dist = window.scrollY - this.startScroll
    return dist * this.speed
  }

  getRect() {
    this.targetR = this.target.getBoundingClientRect()
    return this.targetR
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
}

const controller = targets => {
  requestAnimationFrame(() => {
    targets.forEach(obj => {
      if (obj.disable() && obj.active) {
        return obj.stop()
      }

      if (!obj.active && obj.enable()) {
        obj.start()
      }

      if (obj.active) {
        obj.move()
      }
    })
  })
}

export default (target, userOptions = {}) => {
  const rallax = new RallaxObj(target, userOptions)
  targets.push(rallax)

  if (!listening) {
    addListener()
    listening = true
  }

  return rallax
}