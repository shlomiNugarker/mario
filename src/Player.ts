import { Game } from './main'

export class Player {
  game: Game

  width: number
  height: number
  image: HTMLImageElement
  x: number
  y: number
  speed: number

  frameX: number
  frameY: number
  maxFrame: number

  fps: number
  frameInterval: number
  frameTimer: number

  state: 'STANDING' | 'RUNNING' | 'JUMPING' | 'FALLING'
  isJumping: boolean
  jumpHight: number
  jumpFromY: number

  constructor(game: Game) {
    this.game = game

    this.width = 16
    this.height = 16
    this.x = 0
    this.y = this.game.height - 16
    this.speed = 6

    this.image = document.getElementById('sprite') as HTMLImageElement
    this.frameX = 0
    this.frameY = 5.5
    this.maxFrame = 0

    this.fps = 20
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0

    this.state = 'STANDING'

    this.isJumping = false
    this.jumpHight = 70
    this.jumpFromY = this.y
  }

  update(input: string[], deltaTime: number) {
    this.move(input)
    this.handleSpriteAnimation(deltaTime)
  }

  setFrame(state: 'STANDING' | 'RUNNING' | 'JUMPING' | 'FALLING') {
    switch (state) {
      case 'STANDING':
        {
          this.frameX = 0
          this.frameY = 5.5
          this.maxFrame = 0
        }
        break

      case 'RUNNING':
        {
          this.frameX = 1
          this.frameY = 5.5
          this.maxFrame = 3
        }
        break

      case 'JUMPING':
        {
          this.frameX = 5
          this.frameY = 5.5
          this.maxFrame = 0
        }
        break

      case 'FALLING':
        {
          this.frameX = 5
          this.frameY = 5.5
          this.maxFrame = 0
        }
        break

      default:
        {
        }
        break
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  move(input: string[]) {
    if (!this.isOnGround() && !this.isJumping) {
      this.y += this.game.gravity
    }
    if (this.isJumping) {
      this.y -= 5
      if (this.jumpFromY - this.y > this.jumpHight) {
        this.isJumping = false
      }
    }

    if (input.length) {
      if (input.includes('ArrowRight')) {
        if (this.state !== 'RUNNING') this.setFrame('RUNNING')
        this.state = 'RUNNING'
        this.x += 5
      }

      if (input.includes('ArrowLeft')) {
        if (this.state !== 'RUNNING') this.setFrame('RUNNING')
        this.state = 'RUNNING'
        this.x -= 5
      }

      if (input.includes('ArrowUp') && this.isOnGround()) {
        if (this.state !== 'JUMPING') {
          this.state = 'JUMPING'
          this.setFrame('JUMPING')
          this.jumpFromY = this.y
          this.isJumping = true
        }
      }

      if (input.includes('ArrowDown')) {
        if (this.state !== 'FALLING') {
          this.state = 'FALLING'
          this.setFrame('FALLING')
        }
      }
    } else if (input.length === 0) {
      if (this.state !== 'STANDING') {
        this.state = 'STANDING'
        this.setFrame('STANDING')
      }
      if (this.isJumping) this.isJumping = false
    }
  }

  isOnGround() {
    return this.y >= this.game.height - 16
  }

  handleSpriteAnimation(deltaTime: number) {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.frameX < this.maxFrame) {
        this.frameX++
      } else {
        if (this.state === 'JUMPING') this.frameX = 5
        else if (this.state !== 'FALLING') this.frameX = 0
      }
    } else {
      this.frameTimer += deltaTime
    }
  }
}
