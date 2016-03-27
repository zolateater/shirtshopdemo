function CanvasUIFactory(context)
{
    if (!context instanceof CanvasRenderingContext2D) {
        throw new TypeError('Canvas rendering context must be instance of CanvasRenderingContext2D! (factory creating)');
    }
    this.context = context;
}

CanvasUIFactory.prototype.createLabel = function () {
    var label = new UILabelElement();
    label.setView(new CanvasUIElementView(this.context));

    return label;
};