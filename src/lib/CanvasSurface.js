/**
 * Canvas Rendering Surface.
 * It is a top level component that combines it all together and hides unnecessary details.
 *
 * @param {HTMLCanvasElement} canvas
 * @constructor
 */
function CanvasSurface(canvas)
{
    if ( ! (canvas instanceof HTMLCanvasElement) ) {
        throw new TypeError('Passed canvas is not HTMLCanvasElement!');
    }
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.factory = new CanvasUIFactory(this.context);
    this.elements = new UICollection();
    this.elements.add(this.factory.createLabel());
    this.eventHandler = new CanvasSurfaceEventHandler(this);
    this.eventHandler.bindHtmlCanvasEvents();

    /**
     * This is a flag for detecting if we are exporting
     * result image as final texture.
     *
     * If this is true, then we shouldn't show any
     * selection borders
     *
     * @type {boolean}
     * @private
     */
    this._isExportingRender = false;

    this.clearColor = '#FFFFFF';
}

/**
 * Returns UICollection related to the surface.
 * 
 * @returns {UICollection}
 */
CanvasSurface.prototype.getElements = function () {
    return this.elements;
};

/**
 * Creates new label element in ui collection of the surface and returns it.
 * 
 * @returns {UILabelElement}
 */
CanvasSurface.prototype.pushLabel = function () {
    var label = this.factory.createLabel();
    this.elements.add(label);
    this.elements.selectLast();

    this.eventHandler.triggerSelect(label);
    this.render();

    return label;
};

/**
 * Creates new image element in ui collection
 *
 * @param {Image} image
 */
CanvasSurface.prototype.pushImage = function (image) {
    var imageElement = this.factory.createImage(image);
    this.elements.add(imageElement);
    this.elements.selectLast();

    this.eventHandler.triggerSelect(imageElement);
    this.render();

    return imageElement;
};

/**
 * Clear the related canvas.
 */
CanvasSurface.prototype.clear = function () {
    this.context.fillStyle = this.clearColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

/**
 * Sets the clear color
 * 
 * @param {string} color
 */
CanvasSurface.prototype.setClearColor = function (color) {
    this.clearColor = color;
};

/**
 * Renders all of the elements on the surface.
 */
CanvasSurface.prototype.renderElements = function () {
    var selectedIndex = this.elements.getSelectedIndex();
    for (var i = 0; i < this.elements.length; i++) {
        this.elements.get(i).render();

        if (i == selectedIndex && ! this._isExportingRender) {
            new CanvasUISelectedView(this.context).render(this.elements.get(i));
        }
    }
};

/**
 * Clears the surface and renders it with all elements.
 */
CanvasSurface.prototype.render = function () {
    this.clear();
    this.renderElements();
};

/**
 * Generates an image from drawn content
 * @returns {Image}
 */
CanvasSurface.prototype.toImage = function () {

    this._isExportingRender = true;
    this.render();

    var image = new Image();
    image.src = this.canvas.toDataURL();

    this._isExportingRender = false;
    this.render();

    return image;
};

/**
 * Moves currently selected element to the background
 */
CanvasSurface.prototype.selectedToBackground = function () {
    this.elements.toStart(this.elements.getSelectedIndex());
};

/**
 * Moves currently selected element to the foreground
 */
CanvasSurface.prototype.selectedToForeground = function () {
    this.elements.toEnd(this.elements.getSelectedIndex());
};

/**
 * Removes currently selected element
 *
 * @return {UIElement}
 */
CanvasSurface.prototype.removeSelected = function () {
    var element = this.elements.remove(this.elements.getSelectedIndex());
    this.eventHandler.triggerDeselect();

    return element;
};

/**
 * Adds new event handler on selection of an element
 *
 * @param {UISelectedCallback} callback
 */
CanvasSurface.prototype.addSelectEventHandler = function (callback) {
    this.eventHandler.addSelectEventHandler(callback);
};

/**
 *
 * @param {Function} callback
 */
CanvasSurface.prototype.addDeselectEventHandler = function (callback) {
    this.eventHandler.addDeselectEventHandler(callback);
};

/**
 * Get canvas bound rectangle.
 * Kinda ugly method.
 *
 * @returns {{top: number, right: number, bottom: number, left: number}}
 */
CanvasSurface.prototype.getBounds = function () {
    return {
        top: 0,
        right: this.canvas.width,
        bottom: this.canvas.height,
        left: 0
    };
};

/**
 * Callback type for selecting and element
 *
 * @callback UISelectedCallback
 * @param {UIElement}
 */