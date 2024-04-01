import './style.css'
import { InputHandler } from './InputHandler'
import { Player } from './Player'

export class Game {
  width: number
  height: number
  gravity: number
  input: InputHandler
  player: Player

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.gravity = 5
    this.input = new InputHandler(this)
    this.player = new Player(this)
  }

  update(deltaTime: number) {
    this.player.update(this.input.keys, deltaTime)
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.player.draw(ctx)
  }
}

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const ctx = canvas.getContext('2d')!
canvas.width = 900
canvas.height = 500

const game = new Game(canvas.width, canvas.height)

let lastTime = 0
function animate(timeStamp: number) {
  const deltaTime = timeStamp - lastTime
  lastTime = timeStamp
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  game.update(deltaTime)
  game.draw(ctx)
  requestAnimationFrame(animate)
}

animate(0)
