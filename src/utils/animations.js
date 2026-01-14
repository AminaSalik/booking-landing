/* =========================
   Particle System
========================= */
export class ParticleSystem {
  constructor() {
    this.particles = []
    this.container = document.getElementById("particles")
    this.mouseX = 0
    this.mouseY = 0

    if (!this.container) return

    this.init()
  }

  init() {
    for (let i = 0; i < 50; i++) {
      this.createParticle()
    }

    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
    })

    this.animate()
  }

  createParticle() {
    const particle = document.createElement("div")
    particle.className = "particle"

    const size = Math.random() * 4 + 1
    const x = Math.random() * window.innerWidth
    const y = Math.random() * window.innerHeight

    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`

    particle.x = x
    particle.y = y
    particle.speedX = (Math.random() - 0.5) * 0.6
    particle.speedY = (Math.random() - 0.5) * 0.6

    this.container.appendChild(particle)
    this.particles.push(particle)
  }

  animate() {
    this.particles.forEach((particle) => {
      particle.x += particle.speedX
      particle.y += particle.speedY

      const dx = this.mouseX - particle.x
      const dy = this.mouseY - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 120) {
        const force = (120 - distance) / 120
        particle.x -= dx * force * 0.01
        particle.y -= dy * force * 0.01
      }

      particle.style.left = `${particle.x}px`
      particle.style.top = `${particle.y}px`
    })

    requestAnimationFrame(() => this.animate())
  }
}

/* =========================
   Image Hover / Tilt Controller
========================= */
export class OrbController {
  constructor() {
    this.element = document.getElementById("centralOrb")
    if (!this.element) return

    this.init()
  }

  init() {
    this.element.addEventListener("mousemove", (e) => {
      const rect = this.element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 20
      const rotateY = -(x - centerX) / 20

      this.element.style.transform = `
        perspective(800px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.05)
      `
    })

    this.element.addEventListener("mouseleave", () => {
      this.element.style.transform = `
        perspective(800px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `
    })
  }
}

/* =========================
   Background Controller
========================= */
export class BackgroundController {
  constructor() {
    this.shapes = document.querySelectorAll(".shape")
  }
}

/* =========================
   Button Hover Controller
========================= */
export class ButtonController {
  constructor() {
    this.buttons = document.querySelectorAll(".btn")
    this.init()
  }

  init() {
    this.buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        btn.style.transform = "translateY(-2px) scale(1.02)"
      })

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translateY(0) scale(1)"
      })
    })
  }
}
