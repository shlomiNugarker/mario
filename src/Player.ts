import { Game } from './main'

export class Player {
  game: Game
  image: HTMLImageElement

  constructor(game: Game) {
    this.game = game
    this.image = document.getElementById('sprite') as HTMLImageElement
  }

  update(input: string[], deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {}
}
