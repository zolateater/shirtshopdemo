/**
 * Some element of user interface
 *
 * @param {Position|undefined} position
 * @param {Size|undefined} size
 * @constructor
 */
function UIElement(position, size)
{
    if (!position instanceof Position) {
        position = new Position();
    }
    this.position = position;

    if (!size instanceof Position) {
        size = new Size();
    }
    this.size = size;
}

/**
 *
 * @param {Position} position
 * @returns {UIElement}
 */
UIElement.prototype.moveTo = function(position) {
    if (!position instanceof Position) {
        throw new TypeError('new position must have Position type!')
    }
    this.position = position;
    return this;
};

UIElement.prototype.move = function(x, y) {

};

UIElement.prototype.getPosition = function() {

};