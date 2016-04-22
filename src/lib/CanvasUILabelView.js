/**
 *
 * @param {CanvasRenderingContext2D} context
 * @constructor
 */
function CanvasUILabelView(context) {
    CanvasUIElementView.call(this, context);
}

CanvasUILabelView.prototype = Object.create(CanvasUIElementView.prototype);

/**
 * Renders text element
 *
 * @param {UILabelElement} element
 */
CanvasUILabelView.prototype.render = function (element) {
    // Our text size fits bounds
    var fontSize = element.getSize().getHeight();

    this.context.font = fontSize + "px " + element.getFont();
    this.context.fillStyle = element.getColor();
    this.context.textBaseline = 'hanging';

    this.context.fillText(
        element.getText(),
        element.getPosition().getX(),
        element.getPosition().getY(),
        element.getSize().getWidth()
    );
};