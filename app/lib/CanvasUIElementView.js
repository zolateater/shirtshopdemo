/**
 *
 * @param {CanvasRenderingContext2D} context
 * @constructor
 */
function CanvasUIElementView(context) {
    if (!context instanceof CanvasRenderingContext2D) {
        throw new TypeError('Canvas UI Element View error! Context is not a context');
    }
    this.context = context;
}

CanvasUIElementView.prototype = Object.create(UIElementView.prototype);

CanvasUIElementView.prototype.render = function (element) {

};