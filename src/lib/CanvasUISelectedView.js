/**
 * Base view for selected element
 *
 * @param {CanvasRenderingContext2D} context
 * @param {{color: string}, {size: int}} style - icon size and hex color string
 * @constructor
 */
function CanvasUISelectedView(context, style) {
    if ( ! (context instanceof CanvasRenderingContext2D)) {
        throw new TypeError('Canvas UI Element View error! Context does not have type CanvasRenderingContext2D!');
    }

    this.context = context;
    this.fillStyle = style.color || '#AAAAAA';
    this.resizeIconWidth = style.size || 15;
}

CanvasUISelectedView.prototype = Object.create(CanvasUIElementView.prototype);

CanvasUISelectedView.prototype.render = function (element) {

    this.context.font = this.resizeIconWidth + "px Arial";
    this.context.fillStyle = this.fillStyle;
    this.context.textBaseline = 'bottom';

    this.context.fillText(
        CanvasUISelectedView.ResizeSymbol,
        element.getPosition().getX() + element.getSize().getWidth() - this.resizeIconWidth,
        element.getPosition().getY() + element.getSize().getHeight(),
        this.resizeIconWidth
    );

    this.context.strokeStyle = this.fillStyle;
    this.context.strokeRect(
        element.getPosition().getX(),
        element.getPosition().getY(),
        element.getSize().getWidth(),
        element.getSize().getHeight()
    );
};

/**
 * @const ⇘
 * @type {string}
 */
CanvasUISelectedView.ResizeSymbol = '\u21f2';