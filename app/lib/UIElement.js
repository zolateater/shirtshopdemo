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
 * Sets the view of an element
 *
 * @param {UIElementView} view
 */
UIElement.setView = function(view) {
    if (!view instanceof UIElementView) {
        throw new TypeError('View must have UIElementView type!');
    }
    this.view = view;
};

/**
 * Renders the element using its view
 */
UIElement.render = function () {
    if (!this.view) {
        throw new ReferenceError('View is not set!');
    }
};

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

/**
 * Returns position of an element
 *
 * @returns {Position}
 */
UIElement.prototype.getPosition = function() {
    return this.position;
};

/**
 * Sets the size of the element
 */
UIElement.prototype.setSize = function(size) {
    this.size = size;
};


/**
 *
 *
 * @returns {Size}
 */
UIElement.prototype.getSize = function () {
    return this.size;
};