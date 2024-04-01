import './style.css'
import { InputHandler } from './InputHandler'
import { Player } from './Player'

export class Game {
  width: number
  height: number
  gravity: number
  ground: number
  input: InputHandler
  player: Player
  ctx: CanvasRenderingContext2D
  skyColor = 'lightBlue'

  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.gravity = 5
    this.ground = this.height - 16
    this.input = new InputHandler()
    this.player = new Player(this)
  }

  update(deltaTime: number) {
    this.player.update(this.input.keys, deltaTime)
  }

  draw() {
    this.player.draw(this.ctx)
  }
}

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const ctx = canvas.getContext('2d')!
canvas.width = 900
canvas.height = 500

const game = new Game(canvas.width, canvas.height, ctx)

let lastTime = 0
function animate(timeStamp: number) {
  const deltaTime = timeStamp - lastTime
  lastTime = timeStamp
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  game.update(deltaTime)
  ctx.fillStyle = game.skyColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  game.draw()
  requestAnimationFrame(animate)
}

animate(0)
