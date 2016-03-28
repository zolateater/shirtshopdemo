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
    this.elements.select(0);
}

/**
 * Clear the related canvas
 */
CanvasSurface.prototype.clear = function () {
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

/**
 * Renders all elements on the surface
 */
CanvasSurface.prototype.renderElements = function () {
    var selectedIndex = this.elements.getSelectedIndex();
    for (var i = 0; i < this.elements.length; i++) {
        this.elements.get(i).render();
        if (i == selectedIndex) {
            new CanvasUISelectedView(this.context).render(this.elements.get(i));
        }
    }
};

/**
 * Renders surface with all elements
 */
CanvasSurface.prototype.render = function () {
    this.clear();
    this.renderElements();
};

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @constructor
 */
function CanvasUIElementView(context) {
    if (!context instanceof CanvasRenderingContext2D) {
        throw new TypeError('Canvas UI Element View error! Context is not a context');
    }

    /**
     * @type {CanvasRenderingContext2D}
     */
    this.context = context;
}

CanvasUIElementView.prototype = Object.create(UIElementView.prototype);

CanvasUIElementView.prototype.render = function (element) {

};
/**
 *
 * @param {CanvasRenderingContext2D} context
 * @constructor
 */
function CanvasUIFactory(context)
{
    if ( ! (context instanceof CanvasRenderingContext2D)) {
        throw new TypeError('Canvas rendering context must be instance of CanvasRenderingContext2D! (factory creating)');
    }
    this.context = context;
}

/**
 * Creates a label element, which is ready to be rendered on the canvas
 *
 * @returns {UILabelElement}
 */
CanvasUIFactory.prototype.createLabel = function () {
    var label = new UILabelElement(new Position(0, 50));
    label.setView(new CanvasUILabelView(this.context));

    return label;
};

/**
 * Creates an image element, which is ready to be rendered on the canvas
 *
 * @param {Image} image
 */
CanvasUIFactory.prototype.createImage = function (image) {
    var imageElement = new UIImageElement(null, null, image);
    imageElement.setView(new CanvasUIImageView(this.context));

    return imageElement;
};
/**
 * View of an image element on the canvas
 *
 * @param {CanvasRenderingContext2D} context
 * @constructor
 */
function CanvasUIImageView(context) {
    CanvasUIElementView.call(this, context);
}

CanvasUIImageView.prototype = Object.create(CanvasUIElementView.prototype);
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
 *
 * @param {UIElement} element
 */
CanvasUILabelView.prototype.render = function (element) {
    var fontSize = element.getSize().getHeight();

    this.context.font = fontSize + "px Arial";
    this.context.fillStyle = "#000000";
    this.context.textBaseline = 'hanging';

    this.context.fillText(
        element.getText(),
        element.getPosition().getX(),
        element.getPosition().getY(),
        element.getSize().getWidth()
    );
};
/**
 * Base view for selected element
 *
 * @param context
 * @constructor
 */
function CanvasUISelectedView(context) {
    if (!context instanceof CanvasRenderingContext2D) {
        throw new TypeError('Canvas UI Element View error! Context is not a context');
    }

    /**
     * @type {CanvasRenderingContext2D}
     */
    this.context = context;
}

CanvasUISelectedView.prototype = Object.create(CanvasUIElementView.prototype);

CanvasUISelectedView.prototype.render = function (element) {
    this.context.strokeStyle = "#AAAAFF";
    this.context.strokeRect(
        element.getPosition().getX(),
        element.getPosition().getY(),
        element.getSize().getWidth(),
        element.getSize().getHeight()
    );
};
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
 * Increases the size by multiplier
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
Size.defaultWidth = 50;

/**
 * const for default height
 * @type {number}
 */
Size.defaultHeight = 50;
/**
 * Collection for UI elements.
 *
 * It is purposed for keeping ui elements with correct order
 * Also supports selection remembering
 *
 * @constructor
 */
function UICollection() {
    var self = this;

    this.elements = [];
    this.selectedIndex = -1;

    Object.defineProperty(this, 'length', {
        get: function() {
            return self.elements.length
        }
    })
}

/**
 * Pushes element to the top layer of the collection
 *
 * @param {UIElement} element
 */
UICollection.prototype.add = function(element) {
    if ( ! (element instanceof UIElement) ) {
        throw new TypeError('Element in UICollection must have UIElement type');
    }

    this.elements.push(element);
};

/**
 * Returns array with all elements in it
 *
 * @returns {Array}
 */
UICollection.prototype.getAll = function() {
    return this.elements;
};

/**
 * Removes element with passed index from the collection and returns it
 *
 * @return {UIElement}
 */
UICollection.prototype.remove = function (index) {
    if (!this.has(index)) {
        throw new RangeError("Collection: index out of bounds!");
    }
    if (index == this.selectedIndex) {
        this.deselect();
    }
    return this.elements.splice(index, 1)[0];
};

/**
 * Swaps places of two elements in the collection
 *
 * @param index1
 * @param index2
 */
UICollection.prototype.swap = function (index1, index2) {
    if (!this.has(index1) || !this.has(index2)) {
        throw new RangeError("Collection: index out of bounds!");
    }

    var temp = this.elements[index1];
    this.elements[index1]  = this.elements[index2];
    this.elements[index2] = temp;
};

/**
 * Check if index exists in collection
 *
 * @param index
 * @returns {boolean}
 */
UICollection.prototype.has = function (index) {
    return index >= 0 || index < this.length;
};

/**
 *
 * @param index
 */
UICollection.prototype.get = function (index) {
    if (!this.has(index)) {
        throw new RangeError("Collection: index out of bounds!");
    }
    return this.elements[index];
};

/**
 * Forgets which element was selected
 */
UICollection.prototype.deselect = function () {
    this.selectedIndex = -1;
};

/**
 *
 * @param index
 */
UICollection.prototype.select = function (index) {
    if (!this.has(index)) {
        throw new RangeError("Collection: index out of bounds!");
    }
    this.selectedIndex = index;
};

/**
 * Returns selected element
 *
 * @returns {UIElement|null}
 */
UICollection.prototype.getSelectedElement = function () {
    if (this.selectedIndex != -1) {
        return this.elements[this.selectedIndex]
    }
    return null;
};

/**
 * Returns index of selected element
 * If none, returns -1
 *
 * @returns {number}
 */
UICollection.prototype.getSelectedIndex = function () {
    return this.selectedIndex;
};
/**
 * Some element of user interface
 *
 * @param {Position|undefined} position
 * @param {Size|undefined} size
 * @constructor
 */
function UIElement(position, size)
{
    if ( ! (position instanceof Position) ) {
        position = new Position();
    }
    this.position = position;

    if ( ! (size instanceof Position)) {
        size = new Size();
    }
    this.size = size;
}

/**
 * Sets the view of the element
 *
 * @param {UIElementView} view
 */
UIElement.prototype.setView = function(view) {
    if ( ! (view instanceof UIElementView) ) {
        throw new TypeError('View must have UIElementView type!');
    }
    this.view = view;
};

/**
 * Returns current view of the element
 *
 * @returns {UIElementView|undefined}
 */
UIElement.prototype.getView = function () {
    return this.view;
};

/**
 * Renders the element using its view
 */
UIElement.prototype.render = function () {
    if (!this.view) {
        throw new ReferenceError('View is not set!');
    }

    this.view.render(this);
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
 * Return the size of the element
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
 *
 * @param {Position|null} position
 * @param {Size|null} size
 * @param {Image} image
 * @constructor
 */
function UIImageElement(position, size, image)
{
    UIElement.call(this, position, size);

    if ( ! (image instanceof Image)) {
        throw new TypeError("Image must have an image type!");
    }

    this.image = image;
}

UIImageElement.prototype = Object.create(UIElement.prototype);

/**
 *
 * @returns {Image}
 */
UIImageElement.prototype.getImage = function () {
    return this.image;
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
    UIElement.apply(this, [position, size]);

    if (!text) {
        text = UILabelElement.defaultText;
    }

    this.text = text;
    this.style = style;
}

UILabelElement.prototype = Object.create(UIElement.prototype);

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

UILabelElement.defaultText = "Введите текст...";
document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('canvas');
    window.surface = new CanvasSurface(canvas);

    surface.render();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhbnZhc1N1cmZhY2UuanMiLCJDYW52YXNVSUVsZW1lbnRWaWV3LmpzIiwiQ2FudmFzVUlGYWN0b3J5LmpzIiwiQ2FudmFzVUlJbWFnZVZpZXcuanMiLCJDYW52YXNVSUxhYmVsVmlldy5qcyIsIkNhbnZhc1VJU2VsZWN0ZWRWaWV3LmpzIiwiUG9zaXRpb24uanMiLCJTaXplLmpzIiwiVUlDb2xsZWN0aW9uLmpzIiwiVUlFbGVtZW50LmpzIiwiVUlFbGVtZW50Vmlldy5qcyIsIlVJSW1hZ2VFbGVtZW50LmpzIiwiVUlMYWJlbEVsZW1lbnQuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENhbnZhcyBSZW5kZXJpbmcgU3VyZmFjZS5cclxuICogSXQgaXMgYSB0b3AgbGV2ZWwgY29tcG9uZW50IHRoYXQgY29tYmluZXMgaXQgYWxsIHRvZ2V0aGVyIGFuZCBoaWRlcyB1bm5lY2Vzc2FyeSBkZXRhaWxzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBjYW52YXNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDYW52YXNTdXJmYWNlKGNhbnZhcylcclxue1xyXG4gICAgaWYgKCAhIChjYW52YXMgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkgKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGFzc2VkIGNhbnZhcyBpcyBub3QgSFRNTENhbnZhc0VsZW1lbnQhJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIHRoaXMuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgdGhpcy5mYWN0b3J5ID0gbmV3IENhbnZhc1VJRmFjdG9yeSh0aGlzLmNvbnRleHQpO1xyXG4gICAgdGhpcy5lbGVtZW50cyA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcclxuICAgIHRoaXMuZWxlbWVudHMuYWRkKHRoaXMuZmFjdG9yeS5jcmVhdGVMYWJlbCgpKTtcclxuICAgIHRoaXMuZWxlbWVudHMuc2VsZWN0KDApO1xyXG59XHJcblxyXG4vKipcclxuICogQ2xlYXIgdGhlIHJlbGF0ZWQgY2FudmFzXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcIiNGRkZGRkZcIjtcclxuICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIGFsbCBlbGVtZW50cyBvbiB0aGUgc3VyZmFjZVxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucmVuZGVyRWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IHRoaXMuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5nZXQoaSkucmVuZGVyKCk7XHJcbiAgICAgICAgaWYgKGkgPT0gc2VsZWN0ZWRJbmRleCkge1xyXG4gICAgICAgICAgICBuZXcgQ2FudmFzVUlTZWxlY3RlZFZpZXcodGhpcy5jb250ZXh0KS5yZW5kZXIodGhpcy5lbGVtZW50cy5nZXQoaSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIHN1cmZhY2Ugd2l0aCBhbGwgZWxlbWVudHNcclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMucmVuZGVyRWxlbWVudHMoKTtcclxufTtcclxuIiwiLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FudmFzVUlFbGVtZW50Vmlldyhjb250ZXh0KSB7XHJcbiAgICBpZiAoIWNvbnRleHQgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW52YXMgVUkgRWxlbWVudCBWaWV3IGVycm9yISBDb250ZXh0IGlzIG5vdCBhIGNvbnRleHQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbn1cclxuXHJcbkNhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7XHJcblxyXG5DYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cclxufTsiLCIvKipcclxuICpcclxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDYW52YXNVSUZhY3RvcnkoY29udGV4dClcclxue1xyXG4gICAgaWYgKCAhIChjb250ZXh0IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbnZhcyByZW5kZXJpbmcgY29udGV4dCBtdXN0IGJlIGluc3RhbmNlIG9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCEgKGZhY3RvcnkgY3JlYXRpbmcpJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIGxhYmVsIGVsZW1lbnQsIHdoaWNoIGlzIHJlYWR5IHRvIGJlIHJlbmRlcmVkIG9uIHRoZSBjYW52YXNcclxuICpcclxuICogQHJldHVybnMge1VJTGFiZWxFbGVtZW50fVxyXG4gKi9cclxuQ2FudmFzVUlGYWN0b3J5LnByb3RvdHlwZS5jcmVhdGVMYWJlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBsYWJlbCA9IG5ldyBVSUxhYmVsRWxlbWVudChuZXcgUG9zaXRpb24oMCwgNTApKTtcclxuICAgIGxhYmVsLnNldFZpZXcobmV3IENhbnZhc1VJTGFiZWxWaWV3KHRoaXMuY29udGV4dCkpO1xyXG5cclxuICAgIHJldHVybiBsYWJlbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGFuIGltYWdlIGVsZW1lbnQsIHdoaWNoIGlzIHJlYWR5IHRvIGJlIHJlbmRlcmVkIG9uIHRoZSBjYW52YXNcclxuICpcclxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2VcclxuICovXHJcbkNhbnZhc1VJRmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlSW1hZ2UgPSBmdW5jdGlvbiAoaW1hZ2UpIHtcclxuICAgIHZhciBpbWFnZUVsZW1lbnQgPSBuZXcgVUlJbWFnZUVsZW1lbnQobnVsbCwgbnVsbCwgaW1hZ2UpO1xyXG4gICAgaW1hZ2VFbGVtZW50LnNldFZpZXcobmV3IENhbnZhc1VJSW1hZ2VWaWV3KHRoaXMuY29udGV4dCkpO1xyXG5cclxuICAgIHJldHVybiBpbWFnZUVsZW1lbnQ7XHJcbn07IiwiLyoqXHJcbiAqIFZpZXcgb2YgYW4gaW1hZ2UgZWxlbWVudCBvbiB0aGUgY2FudmFzXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FudmFzVUlJbWFnZVZpZXcoY29udGV4dCkge1xyXG4gICAgQ2FudmFzVUlFbGVtZW50Vmlldy5jYWxsKHRoaXMsIGNvbnRleHQpO1xyXG59XHJcblxyXG5DYW52YXNVSUltYWdlVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlKTsiLCIvKipcclxuICpcclxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDYW52YXNVSUxhYmVsVmlldyhjb250ZXh0KSB7XHJcbiAgICBDYW52YXNVSUVsZW1lbnRWaWV3LmNhbGwodGhpcywgY29udGV4dCk7XHJcbn1cclxuXHJcbkNhbnZhc1VJTGFiZWxWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUpO1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7VUlFbGVtZW50fSBlbGVtZW50XHJcbiAqL1xyXG5DYW52YXNVSUxhYmVsVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgIHZhciBmb250U2l6ZSA9IGVsZW1lbnQuZ2V0U2l6ZSgpLmdldEhlaWdodCgpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5mb250ID0gZm9udFNpemUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCIjMDAwMDAwXCI7XHJcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2hhbmdpbmcnO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChcclxuICAgICAgICBlbGVtZW50LmdldFRleHQoKSxcclxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpLFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCksXHJcbiAgICAgICAgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKVxyXG4gICAgKTtcclxufTsiLCIvKipcclxuICogQmFzZSB2aWV3IGZvciBzZWxlY3RlZCBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSBjb250ZXh0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FudmFzVUlTZWxlY3RlZFZpZXcoY29udGV4dCkge1xyXG4gICAgaWYgKCFjb250ZXh0IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FudmFzIFVJIEVsZW1lbnQgVmlldyBlcnJvciEgQ29udGV4dCBpcyBub3QgYSBjb250ZXh0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG59XHJcblxyXG5DYW52YXNVSVNlbGVjdGVkVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcclxuXHJcbkNhbnZhc1VJU2VsZWN0ZWRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gXCIjQUFBQUZGXCI7XHJcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlUmVjdChcclxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpLFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCksXHJcbiAgICAgICAgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSxcclxuICAgICAgICBlbGVtZW50LmdldFNpemUoKS5nZXRIZWlnaHQoKVxyXG4gICAgKTtcclxufTsiLCIvKipcclxuICogUG9zaXRpb24gaW4gMkQgc3BhY2VcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBQb3NpdGlvbih4LCB5KSB7XHJcbiAgICB0aGlzLnggPSAreCB8fCAwO1xyXG4gICAgdGhpcy55ID0gK3kgfHwgMDtcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5Qb3NpdGlvbi5wcm90b3R5cGUuZ2V0WCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMueDtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuUG9zaXRpb24ucHJvdG90eXBlLmdldFkgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hhbmdlcyBwb3NpdGlvbnMgb2YgYW4gb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YVhcclxuICogQHBhcmFtIHtudW1iZXJ9IGRlbHRhWVxyXG4gKiBAcmV0dXJuIFBvc2l0aW9uXHJcbiAqL1xyXG5Qb3NpdGlvbi5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uKGRlbHRhWCwgZGVsdGFZKSB7XHJcbiAgICB2YXIgbmV3WFBvcyA9IHRoaXMueCArIGRlbHRhWDtcclxuICAgIHZhciBuZXdZUG9zID0gdGhpcy55ICsgZGVsdGFZO1xyXG5cclxuICAgIHJldHVybiBuZXcgUG9zaXRpb24obmV3WFBvcywgbmV3WVBvcyk7XHJcbn07IiwiLyoqXHJcbiAqIFNpemUgb2YgdGhlIHJlY3RhbmdsZSBzdXJyb3VuZGluZyB0aGUgb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gU2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB0aGlzLndpZHRoID0gK3dpZHRoIHx8IFNpemUuZGVmYXVsdFdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSAraGVpZ2h0IHx8IFNpemUuZGVmYXVsdEhlaWdodDtcclxufVxyXG5cclxuU2l6ZS5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLndpZHRoO1xyXG59O1xyXG5cclxuU2l6ZS5wcm90b3R5cGUuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5jcmVhc2VzIHRoZSBzaXplIGJ5IG11bHRpcGxpZXJcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpcGxpZXJcclxuICogQHJldHVybnMge1NpemV9XHJcbiAqL1xyXG5TaXplLnByb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uKG11bHRpcGxpZXIpIHtcclxuICAgIHJldHVybiBuZXcgU2l6ZSh0aGlzLndpZHRoICogbXVsdGlwbGllciwgdGhpcy5oZWlnaHQgKiBtdWx0aXBsaWVyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBjb25zdCBmb3IgZGVmYXVsdCB3aWR0aFxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuU2l6ZS5kZWZhdWx0V2lkdGggPSA1MDtcclxuXHJcbi8qKlxyXG4gKiBjb25zdCBmb3IgZGVmYXVsdCBoZWlnaHRcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcblNpemUuZGVmYXVsdEhlaWdodCA9IDUwOyIsIi8qKlxyXG4gKiBDb2xsZWN0aW9uIGZvciBVSSBlbGVtZW50cy5cclxuICpcclxuICogSXQgaXMgcHVycG9zZWQgZm9yIGtlZXBpbmcgdWkgZWxlbWVudHMgd2l0aCBjb3JyZWN0IG9yZGVyXHJcbiAqIEFsc28gc3VwcG9ydHMgc2VsZWN0aW9uIHJlbWVtYmVyaW5nXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gVUlDb2xsZWN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcclxuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbGVuZ3RoJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmVsZW1lbnRzLmxlbmd0aFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQdXNoZXMgZWxlbWVudCB0byB0aGUgdG9wIGxheWVyIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7VUlFbGVtZW50fSBlbGVtZW50XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgIGlmICggISAoZWxlbWVudCBpbnN0YW5jZW9mIFVJRWxlbWVudCkgKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRWxlbWVudCBpbiBVSUNvbGxlY3Rpb24gbXVzdCBoYXZlIFVJRWxlbWVudCB0eXBlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYXJyYXkgd2l0aCBhbGwgZWxlbWVudHMgaW4gaXRcclxuICpcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgZWxlbWVudCB3aXRoIHBhc3NlZCBpbmRleCBmcm9tIHRoZSBjb2xsZWN0aW9uIGFuZCByZXR1cm5zIGl0XHJcbiAqXHJcbiAqIEByZXR1cm4ge1VJRWxlbWVudH1cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XHJcbiAgICB9XHJcbiAgICBpZiAoaW5kZXggPT0gdGhpcy5zZWxlY3RlZEluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5kZXNlbGVjdCgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKVswXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTd2FwcyBwbGFjZXMgb2YgdHdvIGVsZW1lbnRzIGluIHRoZSBjb2xsZWN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSBpbmRleDFcclxuICogQHBhcmFtIGluZGV4MlxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5zd2FwID0gZnVuY3Rpb24gKGluZGV4MSwgaW5kZXgyKSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4MSkgfHwgIXRoaXMuaGFzKGluZGV4MikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0ZW1wID0gdGhpcy5lbGVtZW50c1tpbmRleDFdO1xyXG4gICAgdGhpcy5lbGVtZW50c1tpbmRleDFdICA9IHRoaXMuZWxlbWVudHNbaW5kZXgyXTtcclxuICAgIHRoaXMuZWxlbWVudHNbaW5kZXgyXSA9IHRlbXA7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgaW5kZXggZXhpc3RzIGluIGNvbGxlY3Rpb25cclxuICpcclxuICogQHBhcmFtIGluZGV4XHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIHJldHVybiBpbmRleCA+PSAwIHx8IGluZGV4IDwgdGhpcy5sZW5ndGg7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGluZGV4XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbaW5kZXhdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZvcmdldHMgd2hpY2ggZWxlbWVudCB3YXMgc2VsZWN0ZWRcclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZGVzZWxlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gaW5kZXhcclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHNlbGVjdGVkIGVsZW1lbnRcclxuICpcclxuICogQHJldHVybnMge1VJRWxlbWVudHxudWxsfVxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXRTZWxlY3RlZEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbdGhpcy5zZWxlY3RlZEluZGV4XVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBpbmRleCBvZiBzZWxlY3RlZCBlbGVtZW50XHJcbiAqIElmIG5vbmUsIHJldHVybnMgLTFcclxuICpcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRJbmRleCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSW5kZXg7XHJcbn07IiwiLyoqXHJcbiAqIFNvbWUgZWxlbWVudCBvZiB1c2VyIGludGVyZmFjZVxyXG4gKlxyXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufHVuZGVmaW5lZH0gcG9zaXRpb25cclxuICogQHBhcmFtIHtTaXplfHVuZGVmaW5lZH0gc2l6ZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFVJRWxlbWVudChwb3NpdGlvbiwgc2l6ZSlcclxue1xyXG4gICAgaWYgKCAhIChwb3NpdGlvbiBpbnN0YW5jZW9mIFBvc2l0aW9uKSApIHtcclxuICAgICAgICBwb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuICAgIGlmICggISAoc2l6ZSBpbnN0YW5jZW9mIFBvc2l0aW9uKSkge1xyXG4gICAgICAgIHNpemUgPSBuZXcgU2l6ZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIHZpZXcgb2YgdGhlIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtVSUVsZW1lbnRWaWV3fSB2aWV3XHJcbiAqL1xyXG5VSUVsZW1lbnQucHJvdG90eXBlLnNldFZpZXcgPSBmdW5jdGlvbih2aWV3KSB7XHJcbiAgICBpZiAoICEgKHZpZXcgaW5zdGFuY2VvZiBVSUVsZW1lbnRWaWV3KSApIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdWaWV3IG11c3QgaGF2ZSBVSUVsZW1lbnRWaWV3IHR5cGUhJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgY3VycmVudCB2aWV3IG9mIHRoZSBlbGVtZW50XHJcbiAqXHJcbiAqIEByZXR1cm5zIHtVSUVsZW1lbnRWaWV3fHVuZGVmaW5lZH1cclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0VmlldyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXc7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVuZGVycyB0aGUgZWxlbWVudCB1c2luZyBpdHMgdmlld1xyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMudmlldykge1xyXG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignVmlldyBpcyBub3Qgc2V0IScpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmlldy5yZW5kZXIodGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtQb3NpdGlvbn0gcG9zaXRpb25cclxuICogQHJldHVybnMge1VJRWxlbWVudH1cclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUubW92ZVRvID0gZnVuY3Rpb24ocG9zaXRpb24pIHtcclxuICAgIGlmICghcG9zaXRpb24gaW5zdGFuY2VvZiBQb3NpdGlvbikge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ25ldyBwb3NpdGlvbiBtdXN0IGhhdmUgUG9zaXRpb24gdHlwZSEnKVxyXG4gICAgfVxyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBwb3NpdGlvbiBvZiBhbiBlbGVtZW50XHJcbiAqXHJcbiAqIEByZXR1cm5zIHtQb3NpdGlvbn1cclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIHNpemUgb2YgdGhlIGVsZW1lbnRcclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0aGUgc2l6ZSBvZiB0aGUgZWxlbWVudFxyXG4gKlxyXG4gKiBAcmV0dXJucyB7U2l6ZX1cclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnNpemU7XHJcbn07IiwiLyoqXHJcbiAqIE9iamVjdCwgd2hpY2ggZGVmaW5lcyBob3cgdG8gcmVuZGVyIHNwZWNpZmljIFVJRWxlbWVudFxyXG4gKiBUaGlzIG9iamVjdCBrbm93cyBldmVyeXRoaW5nIGFib3V0IGFuIG9iamVjdCBpdCBuZWVkcyB0byBkcmF3LlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFVJRWxlbWVudFZpZXcoKVxyXG57XHJcblxyXG59XHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gVUlFbGVtZW50XHJcbiAqL1xyXG5VSUVsZW1lbnRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoVUlFbGVtZW50KSB7XHJcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1lvdSBzaG91bGQgbm90IGJlIHVzaW5nIGFuIGFic3RyYWN0IG9iamVjdCBmb3IgcmVuZGVyaW5nIScpO1xyXG59O1xyXG4iLCIvKipcclxuICpcclxuICogQHBhcmFtIHtQb3NpdGlvbnxudWxsfSBwb3NpdGlvblxyXG4gKiBAcGFyYW0ge1NpemV8bnVsbH0gc2l6ZVxyXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWFnZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFVJSW1hZ2VFbGVtZW50KHBvc2l0aW9uLCBzaXplLCBpbWFnZSlcclxue1xyXG4gICAgVUlFbGVtZW50LmNhbGwodGhpcywgcG9zaXRpb24sIHNpemUpO1xyXG5cclxuICAgIGlmICggISAoaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW1hZ2UgbXVzdCBoYXZlIGFuIGltYWdlIHR5cGUhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxufVxyXG5cclxuVUlJbWFnZUVsZW1lbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShVSUVsZW1lbnQucHJvdG90eXBlKTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7SW1hZ2V9XHJcbiAqL1xyXG5VSUltYWdlRWxlbWVudC5wcm90b3R5cGUuZ2V0SW1hZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbWFnZTtcclxufTsiLCIvKipcclxuICogQ2xhc3MgZm9yIGNyZWF0aW5nXHJcbiAqXHJcbiAqIEBwYXJhbSB7UG9zaXRpb258bnVsbH0gcG9zaXRpb25cclxuICogQHBhcmFtIHtTaXplfG51bGx9IHNpemVcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICogQHBhcmFtIHsqfSBzdHlsZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFVJTGFiZWxFbGVtZW50KHBvc2l0aW9uLCBzaXplLCB0ZXh0LCBzdHlsZSkge1xyXG4gICAgVUlFbGVtZW50LmFwcGx5KHRoaXMsIFtwb3NpdGlvbiwgc2l6ZV0pO1xyXG5cclxuICAgIGlmICghdGV4dCkge1xyXG4gICAgICAgIHRleHQgPSBVSUxhYmVsRWxlbWVudC5kZWZhdWx0VGV4dDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xyXG59XHJcblxyXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRWxlbWVudC5wcm90b3R5cGUpO1xyXG5cclxuLyoqXHJcbiAqIEdldHMgYSB0ZXh0IG9mIHRoZSBjdXJyZW50IFVJTGFiZWxFbGVtZW50XHJcbiAqXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuZ2V0VGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyBhIHRleHQgb2YgdGhlIGN1cnJlbnQgVUlMYWJlbEVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICovXHJcblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5zZXRUZXh0ID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbn07XHJcblxyXG5VSUxhYmVsRWxlbWVudC5kZWZhdWx0VGV4dCA9IFwi0JLQstC10LTQuNGC0LUg0YLQtdC60YHRgi4uLlwiOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XHJcbiAgICB3aW5kb3cuc3VyZmFjZSA9IG5ldyBDYW52YXNTdXJmYWNlKGNhbnZhcyk7XHJcblxyXG4gICAgc3VyZmFjZS5yZW5kZXIoKTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
