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
 * Fetches element by passed offset
 *
 * @param offsetX
 * @param offsetY
 * @returns {UIElement|null}
 */
UICollection.prototype.fetchElementByOffset = function (offsetX, offsetY) {
    var matchedElement = null;
    this.elements.forEach(function (el) {
        if (el.isOffsetIn(offsetX, offsetY)) {
            matchedElement = el;
        }
    });

    return matchedElement;
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
 * Returns true if passed offset matches element position
 *
 * @param clientX
 * @param clientY
 * @returns {boolean}
 */
UIElement.prototype.isOffsetIn = function (clientX, clientY)
{
    var currentPosition = this.getPosition();
    var currentSize = this.getSize();

    if (currentPosition.getX() > clientX || currentPosition.getX() + currentSize.getWidth() < clientX) {
        return false;
    }
    if (currentPosition.getY() > clientY || currentPosition.getY() + currentSize.getHeight() < clientY) {
        return false;
    }

    return true;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhbnZhc1N1cmZhY2UuanMiLCJDYW52YXNVSUVsZW1lbnRWaWV3LmpzIiwiQ2FudmFzVUlGYWN0b3J5LmpzIiwiQ2FudmFzVUlJbWFnZVZpZXcuanMiLCJDYW52YXNVSUxhYmVsVmlldy5qcyIsIkNhbnZhc1VJU2VsZWN0ZWRWaWV3LmpzIiwiUG9zaXRpb24uanMiLCJTaXplLmpzIiwiVUlDb2xsZWN0aW9uLmpzIiwiVUlFbGVtZW50LmpzIiwiVUlFbGVtZW50Vmlldy5qcyIsIlVJSW1hZ2VFbGVtZW50LmpzIiwiVUlMYWJlbEVsZW1lbnQuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDYW52YXMgUmVuZGVyaW5nIFN1cmZhY2UuXHJcbiAqIEl0IGlzIGEgdG9wIGxldmVsIGNvbXBvbmVudCB0aGF0IGNvbWJpbmVzIGl0IGFsbCB0b2dldGhlciBhbmQgaGlkZXMgdW5uZWNlc3NhcnkgZGV0YWlscy5cclxuICpcclxuICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gY2FudmFzXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FudmFzU3VyZmFjZShjYW52YXMpXHJcbntcclxuICAgIGlmICggISAoY2FudmFzIGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpICkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Bhc3NlZCBjYW52YXMgaXMgbm90IEhUTUxDYW52YXNFbGVtZW50IScpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIHRoaXMuZmFjdG9yeSA9IG5ldyBDYW52YXNVSUZhY3RvcnkodGhpcy5jb250ZXh0KTtcclxuICAgIHRoaXMuZWxlbWVudHMgPSBuZXcgVUlDb2xsZWN0aW9uKCk7XHJcbiAgICB0aGlzLmVsZW1lbnRzLmFkZCh0aGlzLmZhY3RvcnkuY3JlYXRlTGFiZWwoKSk7XHJcbiAgICB0aGlzLmVsZW1lbnRzLnNlbGVjdCgwKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENsZWFyIHRoZSByZWxhdGVkIGNhbnZhc1xyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCIjRkZGRkZGXCI7XHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVuZGVycyBhbGwgZWxlbWVudHMgb24gdGhlIHN1cmZhY2VcclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnJlbmRlckVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNlbGVjdGVkSW5kZXggPSB0aGlzLmVsZW1lbnRzLmdldFNlbGVjdGVkSW5kZXgoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuZ2V0KGkpLnJlbmRlcigpO1xyXG4gICAgICAgIGlmIChpID09IHNlbGVjdGVkSW5kZXgpIHtcclxuICAgICAgICAgICAgbmV3IENhbnZhc1VJU2VsZWN0ZWRWaWV3KHRoaXMuY29udGV4dCkucmVuZGVyKHRoaXMuZWxlbWVudHMuZ2V0KGkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVuZGVycyBzdXJmYWNlIHdpdGggYWxsIGVsZW1lbnRzXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB0aGlzLnJlbmRlckVsZW1lbnRzKCk7XHJcbn07XHJcbiIsIi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENhbnZhc1VJRWxlbWVudFZpZXcoY29udGV4dCkge1xyXG4gICAgaWYgKCFjb250ZXh0IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FudmFzIFVJIEVsZW1lbnQgVmlldyBlcnJvciEgQ29udGV4dCBpcyBub3QgYSBjb250ZXh0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG59XHJcblxyXG5DYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVUlFbGVtZW50Vmlldy5wcm90b3R5cGUpO1xyXG5cclxuQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHJcbn07IiwiLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FudmFzVUlGYWN0b3J5KGNvbnRleHQpXHJcbntcclxuICAgIGlmICggISAoY29udGV4dCBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW52YXMgcmVuZGVyaW5nIGNvbnRleHQgbXVzdCBiZSBpbnN0YW5jZSBvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQhIChmYWN0b3J5IGNyZWF0aW5nKScpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBsYWJlbCBlbGVtZW50LCB3aGljaCBpcyByZWFkeSB0byBiZSByZW5kZXJlZCBvbiB0aGUgY2FudmFzXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtVSUxhYmVsRWxlbWVudH1cclxuICovXHJcbkNhbnZhc1VJRmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlTGFiZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbGFiZWwgPSBuZXcgVUlMYWJlbEVsZW1lbnQobmV3IFBvc2l0aW9uKDAsIDUwKSk7XHJcbiAgICBsYWJlbC5zZXRWaWV3KG5ldyBDYW52YXNVSUxhYmVsVmlldyh0aGlzLmNvbnRleHQpKTtcclxuXHJcbiAgICByZXR1cm4gbGFiZWw7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhbiBpbWFnZSBlbGVtZW50LCB3aGljaCBpcyByZWFkeSB0byBiZSByZW5kZXJlZCBvbiB0aGUgY2FudmFzXHJcbiAqXHJcbiAqIEBwYXJhbSB7SW1hZ2V9IGltYWdlXHJcbiAqL1xyXG5DYW52YXNVSUZhY3RvcnkucHJvdG90eXBlLmNyZWF0ZUltYWdlID0gZnVuY3Rpb24gKGltYWdlKSB7XHJcbiAgICB2YXIgaW1hZ2VFbGVtZW50ID0gbmV3IFVJSW1hZ2VFbGVtZW50KG51bGwsIG51bGwsIGltYWdlKTtcclxuICAgIGltYWdlRWxlbWVudC5zZXRWaWV3KG5ldyBDYW52YXNVSUltYWdlVmlldyh0aGlzLmNvbnRleHQpKTtcclxuXHJcbiAgICByZXR1cm4gaW1hZ2VFbGVtZW50O1xyXG59OyIsIi8qKlxyXG4gKiBWaWV3IG9mIGFuIGltYWdlIGVsZW1lbnQgb24gdGhlIGNhbnZhc1xyXG4gKlxyXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENhbnZhc1VJSW1hZ2VWaWV3KGNvbnRleHQpIHtcclxuICAgIENhbnZhc1VJRWxlbWVudFZpZXcuY2FsbCh0aGlzLCBjb250ZXh0KTtcclxufVxyXG5cclxuQ2FudmFzVUlJbWFnZVZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7IiwiLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FudmFzVUlMYWJlbFZpZXcoY29udGV4dCkge1xyXG4gICAgQ2FudmFzVUlFbGVtZW50Vmlldy5jYWxsKHRoaXMsIGNvbnRleHQpO1xyXG59XHJcblxyXG5DYW52YXNVSUxhYmVsVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge1VJRWxlbWVudH0gZWxlbWVudFxyXG4gKi9cclxuQ2FudmFzVUlMYWJlbFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICB2YXIgZm9udFNpemUgPSBlbGVtZW50LmdldFNpemUoKS5nZXRIZWlnaHQoKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZm9udCA9IGZvbnRTaXplICsgXCJweCBBcmlhbFwiO1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xyXG4gICAgdGhpcy5jb250ZXh0LnRleHRCYXNlbGluZSA9ICdoYW5naW5nJztcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQoXHJcbiAgICAgICAgZWxlbWVudC5nZXRUZXh0KCksXHJcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSxcclxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WSgpLFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKClcclxuICAgICk7XHJcbn07IiwiLyoqXHJcbiAqIEJhc2UgdmlldyBmb3Igc2VsZWN0ZWQgZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0gY29udGV4dFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENhbnZhc1VJU2VsZWN0ZWRWaWV3KGNvbnRleHQpIHtcclxuICAgIGlmICghY29udGV4dCBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbnZhcyBVSSBFbGVtZW50IFZpZXcgZXJyb3IhIENvbnRleHQgaXMgbm90IGEgY29udGV4dCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxufVxyXG5cclxuQ2FudmFzVUlTZWxlY3RlZFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7XHJcblxyXG5DYW52YXNVSVNlbGVjdGVkVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IFwiI0FBQUFGRlwiO1xyXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVJlY3QoXHJcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSxcclxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WSgpLFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCksXHJcbiAgICAgICAgZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KClcclxuICAgICk7XHJcbn07IiwiLyoqXHJcbiAqIFBvc2l0aW9uIGluIDJEIHNwYWNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gUG9zaXRpb24oeCwgeSkge1xyXG4gICAgdGhpcy54ID0gK3ggfHwgMDtcclxuICAgIHRoaXMueSA9ICt5IHx8IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuUG9zaXRpb24ucHJvdG90eXBlLmdldFggPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLng7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcblBvc2l0aW9uLnByb3RvdHlwZS5nZXRZID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy55O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoYW5nZXMgcG9zaXRpb25zIG9mIGFuIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsdGFYXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YVlcclxuICogQHJldHVybiBQb3NpdGlvblxyXG4gKi9cclxuUG9zaXRpb24ucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbihkZWx0YVgsIGRlbHRhWSkge1xyXG4gICAgdmFyIG5ld1hQb3MgPSB0aGlzLnggKyBkZWx0YVg7XHJcbiAgICB2YXIgbmV3WVBvcyA9IHRoaXMueSArIGRlbHRhWTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uKG5ld1hQb3MsIG5ld1lQb3MpO1xyXG59OyIsIi8qKlxyXG4gKiBTaXplIG9mIHRoZSByZWN0YW5nbGUgc3Vycm91bmRpbmcgdGhlIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFNpemUod2lkdGgsIGhlaWdodCkge1xyXG4gICAgdGhpcy53aWR0aCA9ICt3aWR0aCB8fCBTaXplLmRlZmF1bHRXaWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gK2hlaWdodCB8fCBTaXplLmRlZmF1bHRIZWlnaHQ7XHJcbn1cclxuXHJcblNpemUucHJvdG90eXBlLmdldFdpZHRoID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy53aWR0aDtcclxufTtcclxuXHJcblNpemUucHJvdG90eXBlLmdldEhlaWdodCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluY3JlYXNlcyB0aGUgc2l6ZSBieSBtdWx0aXBsaWVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aXBsaWVyXHJcbiAqIEByZXR1cm5zIHtTaXplfVxyXG4gKi9cclxuU2l6ZS5wcm90b3R5cGUubXVsdGlwbHkgPSBmdW5jdGlvbihtdWx0aXBsaWVyKSB7XHJcbiAgICByZXR1cm4gbmV3IFNpemUodGhpcy53aWR0aCAqIG11bHRpcGxpZXIsIHRoaXMuaGVpZ2h0ICogbXVsdGlwbGllcik7XHJcbn07XHJcblxyXG4vKipcclxuICogY29uc3QgZm9yIGRlZmF1bHQgd2lkdGhcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcblNpemUuZGVmYXVsdFdpZHRoID0gNTA7XHJcblxyXG4vKipcclxuICogY29uc3QgZm9yIGRlZmF1bHQgaGVpZ2h0XHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5TaXplLmRlZmF1bHRIZWlnaHQgPSA1MDsiLCIvKipcclxuICogQ29sbGVjdGlvbiBmb3IgVUkgZWxlbWVudHMuXHJcbiAqXHJcbiAqIEl0IGlzIHB1cnBvc2VkIGZvciBrZWVwaW5nIHVpIGVsZW1lbnRzIHdpdGggY29ycmVjdCBvcmRlclxyXG4gKiBBbHNvIHN1cHBvcnRzIHNlbGVjdGlvbiByZW1lbWJlcmluZ1xyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFVJQ29sbGVjdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmVsZW1lbnRzID0gW107XHJcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2xlbmd0aCcsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5lbGVtZW50cy5sZW5ndGhcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICogUHVzaGVzIGVsZW1lbnQgdG8gdGhlIHRvcCBsYXllciBvZiB0aGUgY29sbGVjdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge1VJRWxlbWVudH0gZWxlbWVudFxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICBpZiAoICEgKGVsZW1lbnQgaW5zdGFuY2VvZiBVSUVsZW1lbnQpICkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VsZW1lbnQgaW4gVUlDb2xsZWN0aW9uIG11c3QgaGF2ZSBVSUVsZW1lbnQgdHlwZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWxlbWVudHMucHVzaChlbGVtZW50KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFycmF5IHdpdGggYWxsIGVsZW1lbnRzIGluIGl0XHJcbiAqXHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGVsZW1lbnQgd2l0aCBwYXNzZWQgaW5kZXggZnJvbSB0aGUgY29sbGVjdGlvbiBhbmQgcmV0dXJucyBpdFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtVSUVsZW1lbnR9XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZGV4ID09IHRoaXMuc2VsZWN0ZWRJbmRleCkge1xyXG4gICAgICAgIHRoaXMuZGVzZWxlY3QoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLnNwbGljZShpbmRleCwgMSlbMF07XHJcbn07XHJcblxyXG4vKipcclxuICogU3dhcHMgcGxhY2VzIG9mIHR3byBlbGVtZW50cyBpbiB0aGUgY29sbGVjdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0gaW5kZXgxXHJcbiAqIEBwYXJhbSBpbmRleDJcclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuc3dhcCA9IGZ1bmN0aW9uIChpbmRleDEsIGluZGV4Mikge1xyXG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleDEpIHx8ICF0aGlzLmhhcyhpbmRleDIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdGVtcCA9IHRoaXMuZWxlbWVudHNbaW5kZXgxXTtcclxuICAgIHRoaXMuZWxlbWVudHNbaW5kZXgxXSAgPSB0aGlzLmVsZW1lbnRzW2luZGV4Ml07XHJcbiAgICB0aGlzLmVsZW1lbnRzW2luZGV4Ml0gPSB0ZW1wO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGluZGV4IGV4aXN0cyBpbiBjb2xsZWN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSBpbmRleFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICByZXR1cm4gaW5kZXggPj0gMCB8fCBpbmRleCA8IHRoaXMubGVuZ3RoO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBpbmRleFxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2luZGV4XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGb3JnZXRzIHdoaWNoIGVsZW1lbnQgd2FzIHNlbGVjdGVkXHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmRlc2VsZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gLTE7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGluZGV4XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBzZWxlY3RlZCBlbGVtZW50XHJcbiAqXHJcbiAqIEByZXR1cm5zIHtVSUVsZW1lbnR8bnVsbH1cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCAhPSAtMSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW3RoaXMuc2VsZWN0ZWRJbmRleF1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgaW5kZXggb2Ygc2VsZWN0ZWQgZWxlbWVudFxyXG4gKiBJZiBub25lLCByZXR1cm5zIC0xXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldFNlbGVjdGVkSW5kZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZldGNoZXMgZWxlbWVudCBieSBwYXNzZWQgb2Zmc2V0XHJcbiAqXHJcbiAqIEBwYXJhbSBvZmZzZXRYXHJcbiAqIEBwYXJhbSBvZmZzZXRZXHJcbiAqIEByZXR1cm5zIHtVSUVsZW1lbnR8bnVsbH1cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZmV0Y2hFbGVtZW50QnlPZmZzZXQgPSBmdW5jdGlvbiAob2Zmc2V0WCwgb2Zmc2V0WSkge1xyXG4gICAgdmFyIG1hdGNoZWRFbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBpZiAoZWwuaXNPZmZzZXRJbihvZmZzZXRYLCBvZmZzZXRZKSkge1xyXG4gICAgICAgICAgICBtYXRjaGVkRWxlbWVudCA9IGVsO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBtYXRjaGVkRWxlbWVudDtcclxufTsiLCIvKipcclxuICogU29tZSBlbGVtZW50IG9mIHVzZXIgaW50ZXJmYWNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7UG9zaXRpb258dW5kZWZpbmVkfSBwb3NpdGlvblxyXG4gKiBAcGFyYW0ge1NpemV8dW5kZWZpbmVkfSBzaXplXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gVUlFbGVtZW50KHBvc2l0aW9uLCBzaXplKVxyXG57XHJcbiAgICBpZiAoICEgKHBvc2l0aW9uIGluc3RhbmNlb2YgUG9zaXRpb24pICkge1xyXG4gICAgICAgIHBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgaWYgKCAhIChzaXplIGluc3RhbmNlb2YgUG9zaXRpb24pKSB7XHJcbiAgICAgICAgc2l6ZSA9IG5ldyBTaXplKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgdmlldyBvZiB0aGUgZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge1VJRWxlbWVudFZpZXd9IHZpZXdcclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUuc2V0VmlldyA9IGZ1bmN0aW9uKHZpZXcpIHtcclxuICAgIGlmICggISAodmlldyBpbnN0YW5jZW9mIFVJRWxlbWVudFZpZXcpICkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZpZXcgbXVzdCBoYXZlIFVJRWxlbWVudFZpZXcgdHlwZSEnKTtcclxuICAgIH1cclxuICAgIHRoaXMudmlldyA9IHZpZXc7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBjdXJyZW50IHZpZXcgb2YgdGhlIGVsZW1lbnRcclxuICpcclxuICogQHJldHVybnMge1VJRWxlbWVudFZpZXd8dW5kZWZpbmVkfVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRWaWV3ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmlldztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIHRoZSBlbGVtZW50IHVzaW5nIGl0cyB2aWV3XHJcbiAqL1xyXG5VSUVsZW1lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy52aWV3KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdWaWV3IGlzIG5vdCBzZXQhJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy52aWV3LnJlbmRlcih0aGlzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufSBwb3NpdGlvblxyXG4gKiBAcmV0dXJucyB7VUlFbGVtZW50fVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5tb3ZlVG8gPSBmdW5jdGlvbihwb3NpdGlvbikge1xyXG4gICAgaWYgKCFwb3NpdGlvbiBpbnN0YW5jZW9mIFBvc2l0aW9uKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbmV3IHBvc2l0aW9uIG11c3QgaGF2ZSBQb3NpdGlvbiB0eXBlIScpXHJcbiAgICB9XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnRcclxuICpcclxuICogQHJldHVybnMge1Bvc2l0aW9ufVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb247XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgc2l6ZSBvZiB0aGUgZWxlbWVudFxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50XHJcbiAqXHJcbiAqIEByZXR1cm5zIHtTaXplfVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2l6ZTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIHBhc3NlZCBvZmZzZXQgbWF0Y2hlcyBlbGVtZW50IHBvc2l0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSBjbGllbnRYXHJcbiAqIEBwYXJhbSBjbGllbnRZXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5pc09mZnNldEluID0gZnVuY3Rpb24gKGNsaWVudFgsIGNsaWVudFkpXHJcbntcclxuICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XHJcbiAgICB2YXIgY3VycmVudFNpemUgPSB0aGlzLmdldFNpemUoKTtcclxuXHJcbiAgICBpZiAoY3VycmVudFBvc2l0aW9uLmdldFgoKSA+IGNsaWVudFggfHwgY3VycmVudFBvc2l0aW9uLmdldFgoKSArIGN1cnJlbnRTaXplLmdldFdpZHRoKCkgPCBjbGllbnRYKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGN1cnJlbnRQb3NpdGlvbi5nZXRZKCkgPiBjbGllbnRZIHx8IGN1cnJlbnRQb3NpdGlvbi5nZXRZKCkgKyBjdXJyZW50U2l6ZS5nZXRIZWlnaHQoKSA8IGNsaWVudFkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07IiwiLyoqXHJcbiAqIE9iamVjdCwgd2hpY2ggZGVmaW5lcyBob3cgdG8gcmVuZGVyIHNwZWNpZmljIFVJRWxlbWVudFxyXG4gKiBUaGlzIG9iamVjdCBrbm93cyBldmVyeXRoaW5nIGFib3V0IGFuIG9iamVjdCBpdCBuZWVkcyB0byBkcmF3LlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFVJRWxlbWVudFZpZXcoKVxyXG57XHJcblxyXG59XHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gVUlFbGVtZW50XHJcbiAqL1xyXG5VSUVsZW1lbnRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoVUlFbGVtZW50KSB7XHJcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1lvdSBzaG91bGQgbm90IGJlIHVzaW5nIGFuIGFic3RyYWN0IG9iamVjdCBmb3IgcmVuZGVyaW5nIScpO1xyXG59O1xyXG4iLCIvKipcclxuICpcclxuICogQHBhcmFtIHtQb3NpdGlvbnxudWxsfSBwb3NpdGlvblxyXG4gKiBAcGFyYW0ge1NpemV8bnVsbH0gc2l6ZVxyXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWFnZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFVJSW1hZ2VFbGVtZW50KHBvc2l0aW9uLCBzaXplLCBpbWFnZSlcclxue1xyXG4gICAgVUlFbGVtZW50LmNhbGwodGhpcywgcG9zaXRpb24sIHNpemUpO1xyXG5cclxuICAgIGlmICggISAoaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW1hZ2UgbXVzdCBoYXZlIGFuIGltYWdlIHR5cGUhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxufVxyXG5cclxuVUlJbWFnZUVsZW1lbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShVSUVsZW1lbnQucHJvdG90eXBlKTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7SW1hZ2V9XHJcbiAqL1xyXG5VSUltYWdlRWxlbWVudC5wcm90b3R5cGUuZ2V0SW1hZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbWFnZTtcclxufTsiLCIvKipcclxuICogQ2xhc3MgZm9yIGNyZWF0aW5nXHJcbiAqXHJcbiAqIEBwYXJhbSB7UG9zaXRpb258bnVsbH0gcG9zaXRpb25cclxuICogQHBhcmFtIHtTaXplfG51bGx9IHNpemVcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICogQHBhcmFtIHsqfSBzdHlsZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFVJTGFiZWxFbGVtZW50KHBvc2l0aW9uLCBzaXplLCB0ZXh0LCBzdHlsZSkge1xyXG4gICAgVUlFbGVtZW50LmFwcGx5KHRoaXMsIFtwb3NpdGlvbiwgc2l6ZV0pO1xyXG5cclxuICAgIGlmICghdGV4dCkge1xyXG4gICAgICAgIHRleHQgPSBVSUxhYmVsRWxlbWVudC5kZWZhdWx0VGV4dDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xyXG59XHJcblxyXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRWxlbWVudC5wcm90b3R5cGUpO1xyXG5cclxuLyoqXHJcbiAqIEdldHMgYSB0ZXh0IG9mIHRoZSBjdXJyZW50IFVJTGFiZWxFbGVtZW50XHJcbiAqXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuZ2V0VGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyBhIHRleHQgb2YgdGhlIGN1cnJlbnQgVUlMYWJlbEVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICovXHJcblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5zZXRUZXh0ID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbn07XHJcblxyXG5VSUxhYmVsRWxlbWVudC5kZWZhdWx0VGV4dCA9IFwi0JLQstC10LTQuNGC0LUg0YLQtdC60YHRgi4uLlwiOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XHJcbiAgICB3aW5kb3cuc3VyZmFjZSA9IG5ldyBDYW52YXNTdXJmYWNlKGNhbnZhcyk7XHJcblxyXG4gICAgc3VyZmFjZS5yZW5kZXIoKTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
