
/**
 *
 * @param {HTMLCanvasElement} canvas
 * @constructor
 */
function CanvasSurface(canvas)
{
    if (!canvas instanceof HTMLCanvasElement) {
        throw new TypeError('Passed canvas is not HTMLCanvasElement!');
    }
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
}
function CanvasUIElementView() {

}


function CanvasUIFactory()
{

}
/**
 * Position in 2D space
 *
 * @param {number} x
 * @param {number} y
 * @constructor
 */
function Position(x, y) {
    this.x = +x || 0;
    this.y = +y || 0;
}

/**
 *
 * @returns {number}
 */
Position.prototype.getX = function() {
    return this.x;
};

/**
 *
 * @returns {number}
 */
Position.prototype.getY = function() {
    return this.y;
};

/**
 * Changes positions of an object
 *
 * @param {number} deltaX
 * @param {number} deltaY
 * @return Position
 */
Position.prototype.move = function(deltaX, deltaY) {
    var newXPos = this.x + deltaX;
    var newYPos = this.y + deltaY;

    return new Position(newXPos, newYPos);
};
/**
 * Size of the rectangle surrounding the object
 *
 * @param {number} width
 * @param {number} height
 * @constructor
 */
function Size(width, height) {
    this.width = +width || Size.defaultWidth;
    this.height = +height || Size.defaultHeight;
}

Size.prototype.getWidth = function() {
    return this.width;
};

Size.prototype.getHeight = function() {
    return this.height;
};

/**
 *
 * @param {number} multiplier
 * @returns {Size}
 */
Size.prototype.multiply = function(multiplier) {
    return new Size(this.width * multiplier, this.height * multiplier);
};

/**
 * const for default width
 * @type {number}
 */
Size.defaultWidth = 10;

/**
 * const for default height
 * @type {number}
 */
Size.defaultHeight = 10;
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
/**
 * Object, which defines how to render specific UIElement
 * This object knows everything about an object it needs to draw.
 *
 * @constructor
 */
function UIElementView()
{

}
/**
 *
 * @param UIElement
 */
UIElementView.prototype.render = function (UIElement) {
    throw TypeError('You should not be using an abstract object for rendering!');
};

/**
 * Class for creating
 *
 * @param {Position|null} position
 * @param {Size|null} size
 * @param {string} text
 * @param {*} style
 * @constructor
 */
function UILabelElement(position, size, text, style) {
    UIElement.call(this, position, size);

    this.text = text;
    this.style = style;
}

/**
 * Gets a text of the current UILabelElement
 *
 * @returns {string}
 */
UILabelElement.prototype.getText = function () {
    return this.text;
};

/**
 * Sets a text of the current UILabelElement
 *
 * @param {string} text
 */
UILabelElement.prototype.setText = function (text) {
    this.text = text;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwibGliL0NhbnZhc1N1cmZhY2UuanMiLCJsaWIvQ2FudmFzVUlFbGVtZW50Vmlldy5qcyIsImxpYi9DYW52YXNVSUZhY3RvcnkuanMiLCJsaWIvUG9zaXRpb24uanMiLCJsaWIvU2l6ZS5qcyIsImxpYi9VSUVsZW1lbnQuanMiLCJsaWIvVUlFbGVtZW50Vmlldy5qcyIsImxpYi9VSUxhYmVsRWxlbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiIsIi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBjYW52YXNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDYW52YXNTdXJmYWNlKGNhbnZhcylcclxue1xyXG4gICAgaWYgKCFjYW52YXMgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Bhc3NlZCBjYW52YXMgaXMgbm90IEhUTUxDYW52YXNFbGVtZW50IScpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxufSIsImZ1bmN0aW9uIENhbnZhc1VJRWxlbWVudFZpZXcoKSB7XHJcblxyXG59XHJcblxyXG4iLCJmdW5jdGlvbiBDYW52YXNVSUZhY3RvcnkoKVxyXG57XHJcblxyXG59IiwiLyoqXHJcbiAqIFBvc2l0aW9uIGluIDJEIHNwYWNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gUG9zaXRpb24oeCwgeSkge1xyXG4gICAgdGhpcy54ID0gK3ggfHwgMDtcclxuICAgIHRoaXMueSA9ICt5IHx8IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuUG9zaXRpb24ucHJvdG90eXBlLmdldFggPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLng7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcblBvc2l0aW9uLnByb3RvdHlwZS5nZXRZID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy55O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoYW5nZXMgcG9zaXRpb25zIG9mIGFuIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsdGFYXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YVlcclxuICogQHJldHVybiBQb3NpdGlvblxyXG4gKi9cclxuUG9zaXRpb24ucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbihkZWx0YVgsIGRlbHRhWSkge1xyXG4gICAgdmFyIG5ld1hQb3MgPSB0aGlzLnggKyBkZWx0YVg7XHJcbiAgICB2YXIgbmV3WVBvcyA9IHRoaXMueSArIGRlbHRhWTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uKG5ld1hQb3MsIG5ld1lQb3MpO1xyXG59OyIsIi8qKlxyXG4gKiBTaXplIG9mIHRoZSByZWN0YW5nbGUgc3Vycm91bmRpbmcgdGhlIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFNpemUod2lkdGgsIGhlaWdodCkge1xyXG4gICAgdGhpcy53aWR0aCA9ICt3aWR0aCB8fCBTaXplLmRlZmF1bHRXaWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gK2hlaWdodCB8fCBTaXplLmRlZmF1bHRIZWlnaHQ7XHJcbn1cclxuXHJcblNpemUucHJvdG90eXBlLmdldFdpZHRoID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy53aWR0aDtcclxufTtcclxuXHJcblNpemUucHJvdG90eXBlLmdldEhlaWdodCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aXBsaWVyXHJcbiAqIEByZXR1cm5zIHtTaXplfVxyXG4gKi9cclxuU2l6ZS5wcm90b3R5cGUubXVsdGlwbHkgPSBmdW5jdGlvbihtdWx0aXBsaWVyKSB7XHJcbiAgICByZXR1cm4gbmV3IFNpemUodGhpcy53aWR0aCAqIG11bHRpcGxpZXIsIHRoaXMuaGVpZ2h0ICogbXVsdGlwbGllcik7XHJcbn07XHJcblxyXG4vKipcclxuICogY29uc3QgZm9yIGRlZmF1bHQgd2lkdGhcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcblNpemUuZGVmYXVsdFdpZHRoID0gMTA7XHJcblxyXG4vKipcclxuICogY29uc3QgZm9yIGRlZmF1bHQgaGVpZ2h0XHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5TaXplLmRlZmF1bHRIZWlnaHQgPSAxMDsiLCIvKipcclxuICogU29tZSBlbGVtZW50IG9mIHVzZXIgaW50ZXJmYWNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7UG9zaXRpb258dW5kZWZpbmVkfSBwb3NpdGlvblxyXG4gKiBAcGFyYW0ge1NpemV8dW5kZWZpbmVkfSBzaXplXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gVUlFbGVtZW50KHBvc2l0aW9uLCBzaXplKVxyXG57XHJcbiAgICBpZiAoIXBvc2l0aW9uIGluc3RhbmNlb2YgUG9zaXRpb24pIHtcclxuICAgICAgICBwb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuICAgIGlmICghc2l6ZSBpbnN0YW5jZW9mIFBvc2l0aW9uKSB7XHJcbiAgICAgICAgc2l6ZSA9IG5ldyBTaXplKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgdmlldyBvZiBhbiBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7VUlFbGVtZW50Vmlld30gdmlld1xyXG4gKi9cclxuVUlFbGVtZW50LnNldFZpZXcgPSBmdW5jdGlvbih2aWV3KSB7XHJcbiAgICBpZiAoIXZpZXcgaW5zdGFuY2VvZiBVSUVsZW1lbnRWaWV3KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVmlldyBtdXN0IGhhdmUgVUlFbGVtZW50VmlldyB0eXBlIScpO1xyXG4gICAgfVxyXG4gICAgdGhpcy52aWV3ID0gdmlldztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIHRoZSBlbGVtZW50IHVzaW5nIGl0cyB2aWV3XHJcbiAqL1xyXG5VSUVsZW1lbnQucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLnZpZXcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ1ZpZXcgaXMgbm90IHNldCEnKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufSBwb3NpdGlvblxyXG4gKiBAcmV0dXJucyB7VUlFbGVtZW50fVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5tb3ZlVG8gPSBmdW5jdGlvbihwb3NpdGlvbikge1xyXG4gICAgaWYgKCFwb3NpdGlvbiBpbnN0YW5jZW9mIFBvc2l0aW9uKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbmV3IHBvc2l0aW9uIG11c3QgaGF2ZSBQb3NpdGlvbiB0eXBlIScpXHJcbiAgICB9XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnRcclxuICpcclxuICogQHJldHVybnMge1Bvc2l0aW9ufVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb247XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgc2l6ZSBvZiB0aGUgZWxlbWVudFxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICpcclxuICpcclxuICogQHJldHVybnMge1NpemV9XHJcbiAqL1xyXG5VSUVsZW1lbnQucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zaXplO1xyXG59OyIsIi8qKlxyXG4gKiBPYmplY3QsIHdoaWNoIGRlZmluZXMgaG93IHRvIHJlbmRlciBzcGVjaWZpYyBVSUVsZW1lbnRcclxuICogVGhpcyBvYmplY3Qga25vd3MgZXZlcnl0aGluZyBhYm91dCBhbiBvYmplY3QgaXQgbmVlZHMgdG8gZHJhdy5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBVSUVsZW1lbnRWaWV3KClcclxue1xyXG5cclxufVxyXG4vKipcclxuICpcclxuICogQHBhcmFtIFVJRWxlbWVudFxyXG4gKi9cclxuVUlFbGVtZW50Vmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKFVJRWxlbWVudCkge1xyXG4gICAgdGhyb3cgVHlwZUVycm9yKCdZb3Ugc2hvdWxkIG5vdCBiZSB1c2luZyBhbiBhYnN0cmFjdCBvYmplY3QgZm9yIHJlbmRlcmluZyEnKTtcclxufTtcclxuIiwiLyoqXHJcbiAqIENsYXNzIGZvciBjcmVhdGluZ1xyXG4gKlxyXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufG51bGx9IHBvc2l0aW9uXHJcbiAqIEBwYXJhbSB7U2l6ZXxudWxsfSBzaXplXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAqIEBwYXJhbSB7Kn0gc3R5bGVcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBVSUxhYmVsRWxlbWVudChwb3NpdGlvbiwgc2l6ZSwgdGV4dCwgc3R5bGUpIHtcclxuICAgIFVJRWxlbWVudC5jYWxsKHRoaXMsIHBvc2l0aW9uLCBzaXplKTtcclxuXHJcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyBhIHRleHQgb2YgdGhlIGN1cnJlbnQgVUlMYWJlbEVsZW1lbnRcclxuICpcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5nZXRUZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIGEgdGV4dCBvZiB0aGUgY3VycmVudCBVSUxhYmVsRWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gKi9cclxuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLnNldFRleHQgPSBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcclxufTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
