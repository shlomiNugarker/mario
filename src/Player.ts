import { Game } from './main'

export class Player {
  game: Game
  width: number
  height: number
  image: HTMLImageElement
  x: number
  y: number
  frameX: number
  frameY: number
  maxFrame: number

  constructor(game: Game) {
    this.game = game
    this.width = 16
    this.height = 16
    this.x = 0
    this.y = this.game.height - 16
    this.image = document.getElementById('sprite') as HTMLImageElement
    this.frameX = 0
    this.frameY = 5.5
    this.maxFrame = 0
  }

  update(input: string[], deltaTime: number) {}

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
}
