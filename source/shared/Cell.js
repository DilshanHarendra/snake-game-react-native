export function Cell(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.color = color;

  this.setX = function (x) {
    this.x = x;
  };
  this.setY = function (y) {
    this.y = y;
  };
}
