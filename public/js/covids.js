let viruses = []
let canvasSize = (400, 400)

function Entity(x, y) {
  this.x = x
  this.y = y
}

function MovableEntity(x, y) {
  Entity.call()
}

function CollectableEntity(x, y) {
  Entity.call()
}

function Vaccine(x, y) {
  CollectableEntity.call(x,y)
}

function Mask(x, y) {
  CollectableEntity.call(x,y)
}

function Ship(x, y, player) {
  MovableEntity.call(x,y)
  this.player = player
}

function Virus(x, y, size, variant) {
  MovableEntity.call(x,y)
  this.size = size
  this.variant = variant
}

Object.setPrototypeOf(MovableEntity.prototype, Entity.prototype)
Object.setPrototypeOf(CollectableEntity.prototype, Entity.prototype)
Object.setPrototypeOf(Vaccine.prototype, CollectableEntity.prototype)
Object.setPrototypeOf(Mask.prototype, CollectableEntity.prototype)
Object.setPrototypeOf(Ship.prototype, MovableEntity.prototype)
Object.setPrototypeOf(Virus.prototype, MovableEntity.prototype)

MovableEntity.prototype.Move = function(dx,dy) {
  
}

function setup() {
}