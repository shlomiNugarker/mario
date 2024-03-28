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

  currState: 'STANDING' | 'RUNNING' | 'JUMPING'

  constructor(game: Game) {
    this.game = game

    this.width = 16
    this.height = 16
    this.x = 0
    this.y = this.game.height - 16
    this.speed = 6

    this.image = document.getElementById('sprite') as HTMLImageElement
    this.frameX = 5
    this.frameY = 5.5
    this.maxFrame = 0

    this.fps = 20
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0

    this.currState = 'STANDING'
  }

  update(input: string[], deltaTime: number) {
    this.handleFrameAnimation(input)
    this.handleSpriteAnimation(deltaTime)
  }

  setFrame(state: 'STANDING' | 'RUNNING' | 'JUMPING') {
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

  handleFrameAnimation(input: string[]) {
    if (input.includes('ArrowRight')) {
      if (this.currState !== 'RUNNING') this.setFrame('RUNNING')
      this.currState = 'RUNNING'
      this.x += 5
    }
    if (input.includes('ArrowLeft')) {
      if (this.currState !== 'RUNNING') this.setFrame('RUNNING')
      this.currState = 'RUNNING'
      this.x -= 5
    }
    if (input.includes('ArrowUp')) {
      if (this.currState !== 'JUMPING') this.setFrame('JUMPING')
      this.currState = 'JUMPING'
      this.y -= 6
    }
    if (input.includes('ArrowDown')) {
      if (!this.isOnGround()) {
        this.y += 6
      }
    } else {
      if (this.currState !== 'STANDING') {
        this.setFrame('STANDING')
        this.currState = 'STANDING'
      }
    }
  }

  isOnGround() {
    return this.y >= this.game.height - 16
  }

  handleSpriteAnimation(deltaTime: number) {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.frameX < this.maxFrame) this.frameX++
      else {
        if (this.currState === 'JUMPING') this.frameX = 5
        else this.frameX = 0
      }
    } else {
      this.frameTimer += deltaTime
    }
  }
}
