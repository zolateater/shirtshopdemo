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
    new CanvasSurfaceEventHandler(this).bindAll();
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
 * Get canvas bound rectangle
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

    // TODO: color styles


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
        throw new TypeError('Canvas UI Element View error! Context does not have type CanvasRenderingContext2D!');
    }

    /**
     * @type {CanvasRenderingContext2D}
     */
    this.context = context;
}

CanvasUISelectedView.prototype = Object.create(CanvasUIElementView.prototype);

CanvasUISelectedView.prototype.render = function (element) {

    var iconResizeWidth = 15;
    this.context.font = iconResizeWidth + "px Arial";
    this.context.fillStyle = "#2e6da4";
    this.context.textBaseline = 'bottom';

    this.context.fillText(
        '\u21f2',
        element.getPosition().getX() + element.getSize().getWidth() - iconResizeWidth + 2,
        element.getPosition().getY() + element.getSize().getHeight(),
        iconResizeWidth
    );

    //this.⇘
    this.context.strokeStyle = "#2e6da4";
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


Size.prototype.resizeBy = function (deltaWidth, deltaHeight) {
    this.width += deltaWidth;
    this.height += deltaHeight;

    if (this.width < Size.minWidth) {
        this.width = Size.minWidth;
    }

    if (this.height < Size.minHeight) {
        this.height = Size.minHeight;
    }
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
 * Minimal width
 * @type {number}
 */
Size.minWidth = 40;

/**
 * Minimal height
 * @type {number}
 */
Size.minHeight = 40;

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
 * Fetches index by passed offset
 *
 * @param offsetX
 * @param offsetY
 * @returns {*}
 */
UICollection.prototype.fetchIndexByOffset = function (offsetX, offsetY) {
    var matchedIndex = null;
    this.elements.forEach(function (el, index) {
        if (el.isOffsetIn(offsetX, offsetY)) {
            matchedIndex = index;
        }
    });
    return matchedIndex;
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
 * Returns object containing information about how far is passed offset from point (0, 0)
 *
 * @param clientX
 * @param clientY
 * @returns {{top: number, left: number}}
 */
UIElement.prototype.getClickOffset = function (clientX, clientY) {
    var position = this.getPosition();
    return {
        top: clientX - position.getX(),
        left: clientY - position.getY()
    }
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
function CanvasSurfaceEventHandler (surface)
{
    this.surface = surface;
    this.isMouseDown = false;
    this.isMovingClick = false;
    this.isResizingClick = false;
    this.lastClickOffset = null;
    this.lastResizeCoordinates = null;
}

/**
 * Binds all events to the canvas
 * @param e
 */
CanvasSurfaceEventHandler.prototype.bindAll = function (e) {
    this.surface.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.surface.canvas.addEventListener('touchstart', this.handleMouseDown.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    document.addEventListener('touchend', this.handleMouseUp.bind(this));
    this.surface.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.surface.canvas.addEventListener('touchmove', this.handleMouseMove.bind(this));
};

/**
 * Handler for mouse down event
 *
 * @param e
 */
CanvasSurfaceEventHandler.prototype.handleMouseDown = function (e) {
    this.isMouseDown = true;

    // Quick hack
    if (e instanceof TouchEvent) {
        e = e.touches[0];
    }

    var localCoordinates = this.toLocalCoordinates(e.clientX, e.clientY);
    var oldSelectedElement = this.surface.elements.selectedIndex;
    var newSelectedIndex = this.surface.elements.fetchIndexByOffset(localCoordinates.x, localCoordinates.y);
    var newSelectedElement = this.surface.elements.get(newSelectedIndex);

    var doWeHaveSomethingSelected = newSelectedIndex !== null;
    var isCurrentlySelectedWasSelectedBefore = doWeHaveSomethingSelected && oldSelectedElement == newSelectedIndex;

    if (!doWeHaveSomethingSelected) {
        this.surface.elements.deselect();
        this.surface.render();

        return;
    }

    // We remember here the last click offset relatively selected element
    this.lastClickOffset = newSelectedElement.getClickOffset(localCoordinates.x, localCoordinates.y);

    // Is it a click starting resize operation ?
    this.isResizingClick = isCurrentlySelectedWasSelectedBefore && this.isResizePossible(newSelectedElement, localCoordinates.x, localCoordinates.y);

    if (this.isResizingClick) {
        this.lastResizeCoordinates = localCoordinates;
        this.setResizableState(true);
    }
    // It is a click for moving
    else {
        this.isMovingClick = true;
        this.surface.elements.select(newSelectedIndex);
        this.setMovableState(true);
    }

    this.surface.render();
};

/**
 *
 * Handler for mouse up event
 *
 * @param e
 */
CanvasSurfaceEventHandler.prototype.handleMouseUp = function (e) {
    this.isMouseDown = false;
    this.isResizingClick = false;
    this.isMovingClick = false;
};

/**
 * Transforms coordinates to coordinates inside canvas
 *
 * @param clientX
 * @param clientY
 * @returns {{x: number, y: number}}
 */
CanvasSurfaceEventHandler.prototype.toLocalCoordinates = function (clientX, clientY) {
    var viewportOffset = this.surface.canvas.getBoundingClientRect();
    // these are relative to the viewport, i.e. the window
    var top = viewportOffset.top;
    var left = viewportOffset.left;
    var topOffset = clientY - top;
    var leftOffset = clientX - left;

    return {
        x: leftOffset,
        y: topOffset
    };
};

/**
 * Handler for mouse move event
 *
 * @param e
 */
CanvasSurfaceEventHandler.prototype.handleMouseMove = function (e) {

    // Quick hack
    if (e instanceof TouchEvent) {
        e = e.touches[0];
    }

    var selectedIndex = this.surface.elements.getSelectedIndex();
    var localCoordinates = this.toLocalCoordinates(e.clientX, e.clientY);
    var elementHoverIndex = this.surface.elements.fetchIndexByOffset(localCoordinates.x, localCoordinates.y);

    // It is simple mouse move,
    // we have nothing more to do here
    if (!this.isMouseDown) {
        this.handleMouseMoveWithoutMouseDown(elementHoverIndex, selectedIndex, localCoordinates);
        return;
    }

    var selectedElement = this.surface.elements.getSelectedElement();

    // If we are here, then we have button pressed and we must resize!
    if (this.isResizingClick) {
        var newSizeDelta = {
            width: localCoordinates.x - this.lastResizeCoordinates.x,
            height: localCoordinates.y - this.lastResizeCoordinates.y
        };

        this.lastResizeCoordinates = localCoordinates;

        var size = selectedElement.getSize();
        size.resizeBy(newSizeDelta.width, newSizeDelta.height);
    }
    // Nah, it's just moving an element.
    else if (this.isMovingClick) {
        selectedElement.moveTo(new Position(
            localCoordinates.x - this.lastClickOffset.top,
            localCoordinates.y - this.lastClickOffset.left
        ));
    }

    this.surface.render();
};

/**
 * Adds movable html class to the canvas element.
 *
 * @param bool
 */
CanvasSurfaceEventHandler.prototype.setMovableState = function (bool) {
    if (bool) {
        this.surface.canvas.classList.add('movable');
        this.surface.canvas.classList.remove('resizable');
    }
    else {
        this.surface.canvas.classList.remove('movable');
    }
};

/**
 * Adds resizable html class to the canvas element.
 *
 * @param bool
 */
CanvasSurfaceEventHandler.prototype.setResizableState = function (bool) {
    if (bool) {
        this.surface.canvas.classList.remove('movable');
        this.surface.canvas.classList.add('resizable');
    }
    else {
        this.surface.canvas.classList.remove('resizable');
    }
};

/**
 * Handles mouse move event when mouse button is not pressed
 *
 * @param elementHoverIndex
 * @param selectedIndex
 * @param mouseCoordinates
 */
CanvasSurfaceEventHandler.prototype.handleMouseMoveWithoutMouseDown = function (elementHoverIndex, selectedIndex, mouseCoordinates) {
    if (elementHoverIndex == selectedIndex) {
        // What state is cursor in?
        var resizeState = this.isResizePossible(this.surface.elements.getSelectedElement(), mouseCoordinates.x, mouseCoordinates.y);
        this.readyForResize = resizeState;
        if (resizeState) {
            this.setResizableState(true);
        }
        else {
            this.setMovableState(true);
        }
    }
    else {
        this.setMovableState(false);
        this.setResizableState(false);
    }
};


/**
 * Returns true if passed coordinates are located on position of drag icon of an element
 *
 * @param element
 * @param x
 * @param y
 */
CanvasSurfaceEventHandler.prototype.isResizePossible = function(element, x, y) {
    var dragIconSize = 10;

    var tempElementData = {
        position: new Position(
            element.getPosition().getX() + element.getSize().getWidth() - dragIconSize,
            element.getPosition().getY() + element.getSize().getHeight() - dragIconSize
        ),
        size: new Size(dragIconSize, dragIconSize)
    };

    var tempElement = new UIElement(tempElementData.position, tempElementData.size);
    return tempElement.isOffsetIn(x, y);
};
document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('canvas');
    window.surface = new CanvasSurface(canvas);

    surface.render();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhbnZhc1N1cmZhY2UuanMiLCJDYW52YXNVSUVsZW1lbnRWaWV3LmpzIiwiQ2FudmFzVUlGYWN0b3J5LmpzIiwiQ2FudmFzVUlJbWFnZVZpZXcuanMiLCJDYW52YXNVSUxhYmVsVmlldy5qcyIsIkNhbnZhc1VJU2VsZWN0ZWRWaWV3LmpzIiwiUG9zaXRpb24uanMiLCJTaXplLmpzIiwiVUlDb2xsZWN0aW9uLmpzIiwiVUlFbGVtZW50LmpzIiwiVUlFbGVtZW50Vmlldy5qcyIsIlVJSW1hZ2VFbGVtZW50LmpzIiwiVUlMYWJlbEVsZW1lbnQuanMiLCJDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ2FudmFzIFJlbmRlcmluZyBTdXJmYWNlLlxyXG4gKiBJdCBpcyBhIHRvcCBsZXZlbCBjb21wb25lbnQgdGhhdCBjb21iaW5lcyBpdCBhbGwgdG9nZXRoZXIgYW5kIGhpZGVzIHVubmVjZXNzYXJ5IGRldGFpbHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTENhbnZhc0VsZW1lbnR9IGNhbnZhc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENhbnZhc1N1cmZhY2UoY2FudmFzKVxyXG57XHJcbiAgICBpZiAoICEgKGNhbnZhcyBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSApIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQYXNzZWQgY2FudmFzIGlzIG5vdCBIVE1MQ2FudmFzRWxlbWVudCEnKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgdGhpcy5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB0aGlzLmZhY3RvcnkgPSBuZXcgQ2FudmFzVUlGYWN0b3J5KHRoaXMuY29udGV4dCk7XHJcbiAgICB0aGlzLmVsZW1lbnRzID0gbmV3IFVJQ29sbGVjdGlvbigpO1xyXG4gICAgdGhpcy5lbGVtZW50cy5hZGQodGhpcy5mYWN0b3J5LmNyZWF0ZUxhYmVsKCkpO1xyXG4gICAgbmV3IENhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIodGhpcykuYmluZEFsbCgpO1xyXG59XHJcblxyXG4vKipcclxuICogQ2xlYXIgdGhlIHJlbGF0ZWQgY2FudmFzXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcIiNGRkZGRkZcIjtcclxuICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIGFsbCBlbGVtZW50cyBvbiB0aGUgc3VyZmFjZVxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucmVuZGVyRWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IHRoaXMuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5nZXQoaSkucmVuZGVyKCk7XHJcbiAgICAgICAgaWYgKGkgPT0gc2VsZWN0ZWRJbmRleCkge1xyXG4gICAgICAgICAgICBuZXcgQ2FudmFzVUlTZWxlY3RlZFZpZXcodGhpcy5jb250ZXh0KS5yZW5kZXIodGhpcy5lbGVtZW50cy5nZXQoaSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIHN1cmZhY2Ugd2l0aCBhbGwgZWxlbWVudHNcclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMucmVuZGVyRWxlbWVudHMoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgY2FudmFzIGJvdW5kIHJlY3RhbmdsZVxyXG4gKlxyXG4gKiBAcmV0dXJucyB7e3RvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlciwgbGVmdDogbnVtYmVyfX1cclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgIHJpZ2h0OiB0aGlzLmNhbnZhcy53aWR0aCxcclxuICAgICAgICBib3R0b206IHRoaXMuY2FudmFzLmhlaWdodCxcclxuICAgICAgICBsZWZ0OiAwXHJcbiAgICB9O1xyXG59OyIsIi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENhbnZhc1VJRWxlbWVudFZpZXcoY29udGV4dCkge1xyXG4gICAgaWYgKCFjb250ZXh0IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FudmFzIFVJIEVsZW1lbnQgVmlldyBlcnJvciEgQ29udGV4dCBpcyBub3QgYSBjb250ZXh0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG59XHJcblxyXG5DYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVUlFbGVtZW50Vmlldy5wcm90b3R5cGUpO1xyXG5cclxuQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHJcbn07IiwiLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FudmFzVUlGYWN0b3J5KGNvbnRleHQpXHJcbntcclxuICAgIGlmICggISAoY29udGV4dCBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW52YXMgcmVuZGVyaW5nIGNvbnRleHQgbXVzdCBiZSBpbnN0YW5jZSBvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQhIChmYWN0b3J5IGNyZWF0aW5nKScpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBsYWJlbCBlbGVtZW50LCB3aGljaCBpcyByZWFkeSB0byBiZSByZW5kZXJlZCBvbiB0aGUgY2FudmFzXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtVSUxhYmVsRWxlbWVudH1cclxuICovXHJcbkNhbnZhc1VJRmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlTGFiZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbGFiZWwgPSBuZXcgVUlMYWJlbEVsZW1lbnQobmV3IFBvc2l0aW9uKDAsIDUwKSk7XHJcbiAgICBsYWJlbC5zZXRWaWV3KG5ldyBDYW52YXNVSUxhYmVsVmlldyh0aGlzLmNvbnRleHQpKTtcclxuXHJcbiAgICByZXR1cm4gbGFiZWw7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhbiBpbWFnZSBlbGVtZW50LCB3aGljaCBpcyByZWFkeSB0byBiZSByZW5kZXJlZCBvbiB0aGUgY2FudmFzXHJcbiAqXHJcbiAqIEBwYXJhbSB7SW1hZ2V9IGltYWdlXHJcbiAqL1xyXG5DYW52YXNVSUZhY3RvcnkucHJvdG90eXBlLmNyZWF0ZUltYWdlID0gZnVuY3Rpb24gKGltYWdlKSB7XHJcbiAgICB2YXIgaW1hZ2VFbGVtZW50ID0gbmV3IFVJSW1hZ2VFbGVtZW50KG51bGwsIG51bGwsIGltYWdlKTtcclxuICAgIGltYWdlRWxlbWVudC5zZXRWaWV3KG5ldyBDYW52YXNVSUltYWdlVmlldyh0aGlzLmNvbnRleHQpKTtcclxuXHJcbiAgICByZXR1cm4gaW1hZ2VFbGVtZW50O1xyXG59OyIsIi8qKlxyXG4gKiBWaWV3IG9mIGFuIGltYWdlIGVsZW1lbnQgb24gdGhlIGNhbnZhc1xyXG4gKlxyXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENhbnZhc1VJSW1hZ2VWaWV3KGNvbnRleHQpIHtcclxuICAgIENhbnZhc1VJRWxlbWVudFZpZXcuY2FsbCh0aGlzLCBjb250ZXh0KTtcclxufVxyXG5cclxuQ2FudmFzVUlJbWFnZVZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7IiwiLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FudmFzVUlMYWJlbFZpZXcoY29udGV4dCkge1xyXG4gICAgQ2FudmFzVUlFbGVtZW50Vmlldy5jYWxsKHRoaXMsIGNvbnRleHQpO1xyXG59XHJcblxyXG5DYW52YXNVSUxhYmVsVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge1VJRWxlbWVudH0gZWxlbWVudFxyXG4gKi9cclxuQ2FudmFzVUlMYWJlbFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICB2YXIgZm9udFNpemUgPSBlbGVtZW50LmdldFNpemUoKS5nZXRIZWlnaHQoKTtcclxuXHJcbiAgICAvLyBUT0RPOiBjb2xvciBzdHlsZXNcclxuXHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSBmb250U2l6ZSArIFwicHggQXJpYWxcIjtcclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcclxuICAgIHRoaXMuY29udGV4dC50ZXh0QmFzZWxpbmUgPSAnaGFuZ2luZyc7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0VGV4dCgpLFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRYKCksXHJcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFkoKSxcclxuICAgICAgICBlbGVtZW50LmdldFNpemUoKS5nZXRXaWR0aCgpXHJcbiAgICApO1xyXG59OyIsIi8qKlxyXG4gKiBCYXNlIHZpZXcgZm9yIHNlbGVjdGVkIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIGNvbnRleHRcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDYW52YXNVSVNlbGVjdGVkVmlldyhjb250ZXh0KSB7XHJcbiAgICBpZiAoIWNvbnRleHQgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW52YXMgVUkgRWxlbWVudCBWaWV3IGVycm9yISBDb250ZXh0IGRvZXMgbm90IGhhdmUgdHlwZSBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQhJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG59XHJcblxyXG5DYW52YXNVSVNlbGVjdGVkVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcclxuXHJcbkNhbnZhc1VJU2VsZWN0ZWRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cclxuICAgIHZhciBpY29uUmVzaXplV2lkdGggPSAxNTtcclxuICAgIHRoaXMuY29udGV4dC5mb250ID0gaWNvblJlc2l6ZVdpZHRoICsgXCJweCBBcmlhbFwiO1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiIzJlNmRhNFwiO1xyXG4gICAgdGhpcy5jb250ZXh0LnRleHRCYXNlbGluZSA9ICdib3R0b20nO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChcclxuICAgICAgICAnXFx1MjFmMicsXHJcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSArIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCkgLSBpY29uUmVzaXplV2lkdGggKyAyLFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCkgKyBlbGVtZW50LmdldFNpemUoKS5nZXRIZWlnaHQoKSxcclxuICAgICAgICBpY29uUmVzaXplV2lkdGhcclxuICAgICk7XHJcblxyXG4gICAgLy90aGlzLuKHmFxyXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gXCIjMmU2ZGE0XCI7XHJcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlUmVjdChcclxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpLFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCksXHJcbiAgICAgICAgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSxcclxuICAgICAgICBlbGVtZW50LmdldFNpemUoKS5nZXRIZWlnaHQoKVxyXG4gICAgKTtcclxufTsiLCIvKipcclxuICogUG9zaXRpb24gaW4gMkQgc3BhY2VcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBQb3NpdGlvbih4LCB5KSB7XHJcbiAgICB0aGlzLnggPSAreCB8fCAwO1xyXG4gICAgdGhpcy55ID0gK3kgfHwgMDtcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5Qb3NpdGlvbi5wcm90b3R5cGUuZ2V0WCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMueDtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuUG9zaXRpb24ucHJvdG90eXBlLmdldFkgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hhbmdlcyBwb3NpdGlvbnMgb2YgYW4gb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YVhcclxuICogQHBhcmFtIHtudW1iZXJ9IGRlbHRhWVxyXG4gKiBAcmV0dXJuIFBvc2l0aW9uXHJcbiAqL1xyXG5Qb3NpdGlvbi5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uKGRlbHRhWCwgZGVsdGFZKSB7XHJcbiAgICB2YXIgbmV3WFBvcyA9IHRoaXMueCArIGRlbHRhWDtcclxuICAgIHZhciBuZXdZUG9zID0gdGhpcy55ICsgZGVsdGFZO1xyXG5cclxuICAgIHJldHVybiBuZXcgUG9zaXRpb24obmV3WFBvcywgbmV3WVBvcyk7XHJcbn07IiwiLyoqXHJcbiAqIFNpemUgb2YgdGhlIHJlY3RhbmdsZSBzdXJyb3VuZGluZyB0aGUgb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gU2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB0aGlzLndpZHRoID0gK3dpZHRoIHx8IFNpemUuZGVmYXVsdFdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSAraGVpZ2h0IHx8IFNpemUuZGVmYXVsdEhlaWdodDtcclxufVxyXG5cclxuU2l6ZS5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLndpZHRoO1xyXG59O1xyXG5cclxuU2l6ZS5wcm90b3R5cGUuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XHJcbn07XHJcblxyXG5cclxuU2l6ZS5wcm90b3R5cGUucmVzaXplQnkgPSBmdW5jdGlvbiAoZGVsdGFXaWR0aCwgZGVsdGFIZWlnaHQpIHtcclxuICAgIHRoaXMud2lkdGggKz0gZGVsdGFXaWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ICs9IGRlbHRhSGVpZ2h0O1xyXG5cclxuICAgIGlmICh0aGlzLndpZHRoIDwgU2l6ZS5taW5XaWR0aCkge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBTaXplLm1pbldpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmhlaWdodCA8IFNpemUubWluSGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBTaXplLm1pbkhlaWdodDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbmNyZWFzZXMgdGhlIHNpemUgYnkgbXVsdGlwbGllclxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlwbGllclxyXG4gKiBAcmV0dXJucyB7U2l6ZX1cclxuICovXHJcblNpemUucHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24obXVsdGlwbGllcikge1xyXG4gICAgcmV0dXJuIG5ldyBTaXplKHRoaXMud2lkdGggKiBtdWx0aXBsaWVyLCB0aGlzLmhlaWdodCAqIG11bHRpcGxpZXIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1pbmltYWwgd2lkdGhcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcblNpemUubWluV2lkdGggPSA0MDtcclxuXHJcbi8qKlxyXG4gKiBNaW5pbWFsIGhlaWdodFxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuU2l6ZS5taW5IZWlnaHQgPSA0MDtcclxuXHJcbi8qKlxyXG4gKiBjb25zdCBmb3IgZGVmYXVsdCB3aWR0aFxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuU2l6ZS5kZWZhdWx0V2lkdGggPSA1MDtcclxuXHJcbi8qKlxyXG4gKiBjb25zdCBmb3IgZGVmYXVsdCBoZWlnaHRcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcblNpemUuZGVmYXVsdEhlaWdodCA9IDUwOyIsIi8qKlxyXG4gKiBDb2xsZWN0aW9uIGZvciBVSSBlbGVtZW50cy5cclxuICpcclxuICogSXQgaXMgcHVycG9zZWQgZm9yIGtlZXBpbmcgdWkgZWxlbWVudHMgd2l0aCBjb3JyZWN0IG9yZGVyXHJcbiAqIEFsc28gc3VwcG9ydHMgc2VsZWN0aW9uIHJlbWVtYmVyaW5nXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gVUlDb2xsZWN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcclxuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbGVuZ3RoJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmVsZW1lbnRzLmxlbmd0aFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQdXNoZXMgZWxlbWVudCB0byB0aGUgdG9wIGxheWVyIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7VUlFbGVtZW50fSBlbGVtZW50XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgIGlmICggISAoZWxlbWVudCBpbnN0YW5jZW9mIFVJRWxlbWVudCkgKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRWxlbWVudCBpbiBVSUNvbGxlY3Rpb24gbXVzdCBoYXZlIFVJRWxlbWVudCB0eXBlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYXJyYXkgd2l0aCBhbGwgZWxlbWVudHMgaW4gaXRcclxuICpcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgZWxlbWVudCB3aXRoIHBhc3NlZCBpbmRleCBmcm9tIHRoZSBjb2xsZWN0aW9uIGFuZCByZXR1cm5zIGl0XHJcbiAqXHJcbiAqIEByZXR1cm4ge1VJRWxlbWVudH1cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XHJcbiAgICB9XHJcbiAgICBpZiAoaW5kZXggPT0gdGhpcy5zZWxlY3RlZEluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5kZXNlbGVjdCgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKVswXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTd2FwcyBwbGFjZXMgb2YgdHdvIGVsZW1lbnRzIGluIHRoZSBjb2xsZWN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSBpbmRleDFcclxuICogQHBhcmFtIGluZGV4MlxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5zd2FwID0gZnVuY3Rpb24gKGluZGV4MSwgaW5kZXgyKSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4MSkgfHwgIXRoaXMuaGFzKGluZGV4MikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0ZW1wID0gdGhpcy5lbGVtZW50c1tpbmRleDFdO1xyXG4gICAgdGhpcy5lbGVtZW50c1tpbmRleDFdICA9IHRoaXMuZWxlbWVudHNbaW5kZXgyXTtcclxuICAgIHRoaXMuZWxlbWVudHNbaW5kZXgyXSA9IHRlbXA7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgaW5kZXggZXhpc3RzIGluIGNvbGxlY3Rpb25cclxuICpcclxuICogQHBhcmFtIGluZGV4XHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIHJldHVybiBpbmRleCA+PSAwIHx8IGluZGV4IDwgdGhpcy5sZW5ndGg7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGluZGV4XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbaW5kZXhdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZvcmdldHMgd2hpY2ggZWxlbWVudCB3YXMgc2VsZWN0ZWRcclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZGVzZWxlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gaW5kZXhcclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHNlbGVjdGVkIGVsZW1lbnRcclxuICpcclxuICogQHJldHVybnMge1VJRWxlbWVudHxudWxsfVxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXRTZWxlY3RlZEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbdGhpcy5zZWxlY3RlZEluZGV4XVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBpbmRleCBvZiBzZWxlY3RlZCBlbGVtZW50XHJcbiAqIElmIG5vbmUsIHJldHVybnMgLTFcclxuICpcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRJbmRleCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSW5kZXg7XHJcbn07XHJcblxyXG4vKipcclxuICogRmV0Y2hlcyBlbGVtZW50IGJ5IHBhc3NlZCBvZmZzZXRcclxuICpcclxuICogQHBhcmFtIG9mZnNldFhcclxuICogQHBhcmFtIG9mZnNldFlcclxuICogQHJldHVybnMge1VJRWxlbWVudHxudWxsfVxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5mZXRjaEVsZW1lbnRCeU9mZnNldCA9IGZ1bmN0aW9uIChvZmZzZXRYLCBvZmZzZXRZKSB7XHJcbiAgICB2YXIgbWF0Y2hlZEVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGlmIChlbC5pc09mZnNldEluKG9mZnNldFgsIG9mZnNldFkpKSB7XHJcbiAgICAgICAgICAgIG1hdGNoZWRFbGVtZW50ID0gZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWF0Y2hlZEVsZW1lbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogRmV0Y2hlcyBpbmRleCBieSBwYXNzZWQgb2Zmc2V0XHJcbiAqXHJcbiAqIEBwYXJhbSBvZmZzZXRYXHJcbiAqIEBwYXJhbSBvZmZzZXRZXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5mZXRjaEluZGV4QnlPZmZzZXQgPSBmdW5jdGlvbiAob2Zmc2V0WCwgb2Zmc2V0WSkge1xyXG4gICAgdmFyIG1hdGNoZWRJbmRleCA9IG51bGw7XHJcbiAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpbmRleCkge1xyXG4gICAgICAgIGlmIChlbC5pc09mZnNldEluKG9mZnNldFgsIG9mZnNldFkpKSB7XHJcbiAgICAgICAgICAgIG1hdGNoZWRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdGNoZWRJbmRleDtcclxufTsiLCIvKipcclxuICogU29tZSBlbGVtZW50IG9mIHVzZXIgaW50ZXJmYWNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7UG9zaXRpb258dW5kZWZpbmVkfSBwb3NpdGlvblxyXG4gKiBAcGFyYW0ge1NpemV8dW5kZWZpbmVkfSBzaXplXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gVUlFbGVtZW50KHBvc2l0aW9uLCBzaXplKVxyXG57XHJcbiAgICBpZiAoICEgKHBvc2l0aW9uIGluc3RhbmNlb2YgUG9zaXRpb24pICkge1xyXG4gICAgICAgIHBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgaWYgKCAhIChzaXplIGluc3RhbmNlb2YgUG9zaXRpb24pKSB7XHJcbiAgICAgICAgc2l6ZSA9IG5ldyBTaXplKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgdmlldyBvZiB0aGUgZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge1VJRWxlbWVudFZpZXd9IHZpZXdcclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUuc2V0VmlldyA9IGZ1bmN0aW9uKHZpZXcpIHtcclxuICAgIGlmICggISAodmlldyBpbnN0YW5jZW9mIFVJRWxlbWVudFZpZXcpICkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZpZXcgbXVzdCBoYXZlIFVJRWxlbWVudFZpZXcgdHlwZSEnKTtcclxuICAgIH1cclxuICAgIHRoaXMudmlldyA9IHZpZXc7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBjdXJyZW50IHZpZXcgb2YgdGhlIGVsZW1lbnRcclxuICpcclxuICogQHJldHVybnMge1VJRWxlbWVudFZpZXd8dW5kZWZpbmVkfVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRWaWV3ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmlldztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIHRoZSBlbGVtZW50IHVzaW5nIGl0cyB2aWV3XHJcbiAqL1xyXG5VSUVsZW1lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy52aWV3KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdWaWV3IGlzIG5vdCBzZXQhJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy52aWV3LnJlbmRlcih0aGlzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufSBwb3NpdGlvblxyXG4gKiBAcmV0dXJucyB7VUlFbGVtZW50fVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5tb3ZlVG8gPSBmdW5jdGlvbihwb3NpdGlvbikge1xyXG4gICAgaWYgKCFwb3NpdGlvbiBpbnN0YW5jZW9mIFBvc2l0aW9uKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbmV3IHBvc2l0aW9uIG11c3QgaGF2ZSBQb3NpdGlvbiB0eXBlIScpXHJcbiAgICB9XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnRcclxuICpcclxuICogQHJldHVybnMge1Bvc2l0aW9ufVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb247XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgc2l6ZSBvZiB0aGUgZWxlbWVudFxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50XHJcbiAqXHJcbiAqIEByZXR1cm5zIHtTaXplfVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2l6ZTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIHBhc3NlZCBvZmZzZXQgbWF0Y2hlcyBlbGVtZW50IHBvc2l0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSBjbGllbnRYXHJcbiAqIEBwYXJhbSBjbGllbnRZXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5pc09mZnNldEluID0gZnVuY3Rpb24gKGNsaWVudFgsIGNsaWVudFkpXHJcbntcclxuICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XHJcbiAgICB2YXIgY3VycmVudFNpemUgPSB0aGlzLmdldFNpemUoKTtcclxuXHJcbiAgICBpZiAoY3VycmVudFBvc2l0aW9uLmdldFgoKSA+IGNsaWVudFggfHwgY3VycmVudFBvc2l0aW9uLmdldFgoKSArIGN1cnJlbnRTaXplLmdldFdpZHRoKCkgPCBjbGllbnRYKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGN1cnJlbnRQb3NpdGlvbi5nZXRZKCkgPiBjbGllbnRZIHx8IGN1cnJlbnRQb3NpdGlvbi5nZXRZKCkgKyBjdXJyZW50U2l6ZS5nZXRIZWlnaHQoKSA8IGNsaWVudFkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCBob3cgZmFyIGlzIHBhc3NlZCBvZmZzZXQgZnJvbSBwb2ludCAoMCwgMClcclxuICpcclxuICogQHBhcmFtIGNsaWVudFhcclxuICogQHBhcmFtIGNsaWVudFlcclxuICogQHJldHVybnMge3t0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyfX1cclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0Q2xpY2tPZmZzZXQgPSBmdW5jdGlvbiAoY2xpZW50WCwgY2xpZW50WSkge1xyXG4gICAgdmFyIHBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbigpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0b3A6IGNsaWVudFggLSBwb3NpdGlvbi5nZXRYKCksXHJcbiAgICAgICAgbGVmdDogY2xpZW50WSAtIHBvc2l0aW9uLmdldFkoKVxyXG4gICAgfVxyXG59OyIsIi8qKlxyXG4gKiBPYmplY3QsIHdoaWNoIGRlZmluZXMgaG93IHRvIHJlbmRlciBzcGVjaWZpYyBVSUVsZW1lbnRcclxuICogVGhpcyBvYmplY3Qga25vd3MgZXZlcnl0aGluZyBhYm91dCBhbiBvYmplY3QgaXQgbmVlZHMgdG8gZHJhdy5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBVSUVsZW1lbnRWaWV3KClcclxue1xyXG5cclxufVxyXG4vKipcclxuICpcclxuICogQHBhcmFtIFVJRWxlbWVudFxyXG4gKi9cclxuVUlFbGVtZW50Vmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKFVJRWxlbWVudCkge1xyXG4gICAgdGhyb3cgVHlwZUVycm9yKCdZb3Ugc2hvdWxkIG5vdCBiZSB1c2luZyBhbiBhYnN0cmFjdCBvYmplY3QgZm9yIHJlbmRlcmluZyEnKTtcclxufTtcclxuIiwiLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7UG9zaXRpb258bnVsbH0gcG9zaXRpb25cclxuICogQHBhcmFtIHtTaXplfG51bGx9IHNpemVcclxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2VcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBVSUltYWdlRWxlbWVudChwb3NpdGlvbiwgc2l6ZSwgaW1hZ2UpXHJcbntcclxuICAgIFVJRWxlbWVudC5jYWxsKHRoaXMsIHBvc2l0aW9uLCBzaXplKTtcclxuXHJcbiAgICBpZiAoICEgKGltYWdlIGluc3RhbmNlb2YgSW1hZ2UpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkltYWdlIG11c3QgaGF2ZSBhbiBpbWFnZSB0eXBlIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7XHJcbn1cclxuXHJcblVJSW1hZ2VFbGVtZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVUlFbGVtZW50LnByb3RvdHlwZSk7XHJcblxyXG4vKipcclxuICpcclxuICogQHJldHVybnMge0ltYWdlfVxyXG4gKi9cclxuVUlJbWFnZUVsZW1lbnQucHJvdG90eXBlLmdldEltYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaW1hZ2U7XHJcbn07IiwiLyoqXHJcbiAqIENsYXNzIGZvciBjcmVhdGluZ1xyXG4gKlxyXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufG51bGx9IHBvc2l0aW9uXHJcbiAqIEBwYXJhbSB7U2l6ZXxudWxsfSBzaXplXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAqIEBwYXJhbSB7Kn0gc3R5bGVcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBVSUxhYmVsRWxlbWVudChwb3NpdGlvbiwgc2l6ZSwgdGV4dCwgc3R5bGUpIHtcclxuICAgIFVJRWxlbWVudC5hcHBseSh0aGlzLCBbcG9zaXRpb24sIHNpemVdKTtcclxuXHJcbiAgICBpZiAoIXRleHQpIHtcclxuICAgICAgICB0ZXh0ID0gVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgIHRoaXMuc3R5bGUgPSBzdHlsZTtcclxufVxyXG5cclxuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShVSUVsZW1lbnQucHJvdG90eXBlKTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIGEgdGV4dCBvZiB0aGUgY3VycmVudCBVSUxhYmVsRWxlbWVudFxyXG4gKlxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLmdldFRleHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHMgYSB0ZXh0IG9mIHRoZSBjdXJyZW50IFVJTGFiZWxFbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAqL1xyXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuc2V0VGV4dCA9IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG59O1xyXG5cclxuVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFRleHQgPSBcItCS0LLQtdC00LjRgtC1INGC0LXQutGB0YIuLi5cIjsiLCJmdW5jdGlvbiBDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyIChzdXJmYWNlKVxyXG57XHJcbiAgICB0aGlzLnN1cmZhY2UgPSBzdXJmYWNlO1xyXG4gICAgdGhpcy5pc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc01vdmluZ0NsaWNrID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzUmVzaXppbmdDbGljayA9IGZhbHNlO1xyXG4gICAgdGhpcy5sYXN0Q2xpY2tPZmZzZXQgPSBudWxsO1xyXG4gICAgdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMgPSBudWxsO1xyXG59XHJcblxyXG4vKipcclxuICogQmluZHMgYWxsIGV2ZW50cyB0byB0aGUgY2FudmFzXHJcbiAqIEBwYXJhbSBlXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5iaW5kQWxsID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZU1vdXNlRG93bi5iaW5kKHRoaXMpKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXAuYmluZCh0aGlzKSk7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlLmJpbmQodGhpcykpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXIgZm9yIG1vdXNlIGRvd24gZXZlbnRcclxuICpcclxuICogQHBhcmFtIGVcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmhhbmRsZU1vdXNlRG93biA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB0aGlzLmlzTW91c2VEb3duID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBRdWljayBoYWNrXHJcbiAgICBpZiAoZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHtcclxuICAgICAgICBlID0gZS50b3VjaGVzWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBsb2NhbENvb3JkaW5hdGVzID0gdGhpcy50b0xvY2FsQ29vcmRpbmF0ZXMoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xyXG4gICAgdmFyIG9sZFNlbGVjdGVkRWxlbWVudCA9IHRoaXMuc3VyZmFjZS5lbGVtZW50cy5zZWxlY3RlZEluZGV4O1xyXG4gICAgdmFyIG5ld1NlbGVjdGVkSW5kZXggPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZmV0Y2hJbmRleEJ5T2Zmc2V0KGxvY2FsQ29vcmRpbmF0ZXMueCwgbG9jYWxDb29yZGluYXRlcy55KTtcclxuICAgIHZhciBuZXdTZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZ2V0KG5ld1NlbGVjdGVkSW5kZXgpO1xyXG5cclxuICAgIHZhciBkb1dlSGF2ZVNvbWV0aGluZ1NlbGVjdGVkID0gbmV3U2VsZWN0ZWRJbmRleCAhPT0gbnVsbDtcclxuICAgIHZhciBpc0N1cnJlbnRseVNlbGVjdGVkV2FzU2VsZWN0ZWRCZWZvcmUgPSBkb1dlSGF2ZVNvbWV0aGluZ1NlbGVjdGVkICYmIG9sZFNlbGVjdGVkRWxlbWVudCA9PSBuZXdTZWxlY3RlZEluZGV4O1xyXG5cclxuICAgIGlmICghZG9XZUhhdmVTb21ldGhpbmdTZWxlY3RlZCkge1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZS5lbGVtZW50cy5kZXNlbGVjdCgpO1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZS5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdlIHJlbWVtYmVyIGhlcmUgdGhlIGxhc3QgY2xpY2sgb2Zmc2V0IHJlbGF0aXZlbHkgc2VsZWN0ZWQgZWxlbWVudFxyXG4gICAgdGhpcy5sYXN0Q2xpY2tPZmZzZXQgPSBuZXdTZWxlY3RlZEVsZW1lbnQuZ2V0Q2xpY2tPZmZzZXQobG9jYWxDb29yZGluYXRlcy54LCBsb2NhbENvb3JkaW5hdGVzLnkpO1xyXG5cclxuICAgIC8vIElzIGl0IGEgY2xpY2sgc3RhcnRpbmcgcmVzaXplIG9wZXJhdGlvbiA/XHJcbiAgICB0aGlzLmlzUmVzaXppbmdDbGljayA9IGlzQ3VycmVudGx5U2VsZWN0ZWRXYXNTZWxlY3RlZEJlZm9yZSAmJiB0aGlzLmlzUmVzaXplUG9zc2libGUobmV3U2VsZWN0ZWRFbGVtZW50LCBsb2NhbENvb3JkaW5hdGVzLngsIGxvY2FsQ29vcmRpbmF0ZXMueSk7XHJcblxyXG4gICAgaWYgKHRoaXMuaXNSZXNpemluZ0NsaWNrKSB7XHJcbiAgICAgICAgdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMgPSBsb2NhbENvb3JkaW5hdGVzO1xyXG4gICAgICAgIHRoaXMuc2V0UmVzaXphYmxlU3RhdGUodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICAvLyBJdCBpcyBhIGNsaWNrIGZvciBtb3ZpbmdcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaXNNb3ZpbmdDbGljayA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zdXJmYWNlLmVsZW1lbnRzLnNlbGVjdChuZXdTZWxlY3RlZEluZGV4KTtcclxuICAgICAgICB0aGlzLnNldE1vdmFibGVTdGF0ZSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN1cmZhY2UucmVuZGVyKCk7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogSGFuZGxlciBmb3IgbW91c2UgdXAgZXZlbnRcclxuICpcclxuICogQHBhcmFtIGVcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmhhbmRsZU1vdXNlVXAgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgdGhpcy5pc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1Jlc2l6aW5nQ2xpY2sgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNNb3ZpbmdDbGljayA9IGZhbHNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRyYW5zZm9ybXMgY29vcmRpbmF0ZXMgdG8gY29vcmRpbmF0ZXMgaW5zaWRlIGNhbnZhc1xyXG4gKlxyXG4gKiBAcGFyYW0gY2xpZW50WFxyXG4gKiBAcGFyYW0gY2xpZW50WVxyXG4gKiBAcmV0dXJucyB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnRvTG9jYWxDb29yZGluYXRlcyA9IGZ1bmN0aW9uIChjbGllbnRYLCBjbGllbnRZKSB7XHJcbiAgICB2YXIgdmlld3BvcnRPZmZzZXQgPSB0aGlzLnN1cmZhY2UuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgLy8gdGhlc2UgYXJlIHJlbGF0aXZlIHRvIHRoZSB2aWV3cG9ydCwgaS5lLiB0aGUgd2luZG93XHJcbiAgICB2YXIgdG9wID0gdmlld3BvcnRPZmZzZXQudG9wO1xyXG4gICAgdmFyIGxlZnQgPSB2aWV3cG9ydE9mZnNldC5sZWZ0O1xyXG4gICAgdmFyIHRvcE9mZnNldCA9IGNsaWVudFkgLSB0b3A7XHJcbiAgICB2YXIgbGVmdE9mZnNldCA9IGNsaWVudFggLSBsZWZ0O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgeDogbGVmdE9mZnNldCxcclxuICAgICAgICB5OiB0b3BPZmZzZXRcclxuICAgIH07XHJcbn07XHJcblxyXG4vKipcclxuICogSGFuZGxlciBmb3IgbW91c2UgbW92ZSBldmVudFxyXG4gKlxyXG4gKiBAcGFyYW0gZVxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlTW91c2VNb3ZlID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAvLyBRdWljayBoYWNrXHJcbiAgICBpZiAoZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHtcclxuICAgICAgICBlID0gZS50b3VjaGVzWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZWxlY3RlZEluZGV4ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmdldFNlbGVjdGVkSW5kZXgoKTtcclxuICAgIHZhciBsb2NhbENvb3JkaW5hdGVzID0gdGhpcy50b0xvY2FsQ29vcmRpbmF0ZXMoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xyXG4gICAgdmFyIGVsZW1lbnRIb3ZlckluZGV4ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmZldGNoSW5kZXhCeU9mZnNldChsb2NhbENvb3JkaW5hdGVzLngsIGxvY2FsQ29vcmRpbmF0ZXMueSk7XHJcblxyXG4gICAgLy8gSXQgaXMgc2ltcGxlIG1vdXNlIG1vdmUsXHJcbiAgICAvLyB3ZSBoYXZlIG5vdGhpbmcgbW9yZSB0byBkbyBoZXJlXHJcbiAgICBpZiAoIXRoaXMuaXNNb3VzZURvd24pIHtcclxuICAgICAgICB0aGlzLmhhbmRsZU1vdXNlTW92ZVdpdGhvdXRNb3VzZURvd24oZWxlbWVudEhvdmVySW5kZXgsIHNlbGVjdGVkSW5kZXgsIGxvY2FsQ29vcmRpbmF0ZXMpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2VsZWN0ZWRFbGVtZW50ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmdldFNlbGVjdGVkRWxlbWVudCgpO1xyXG5cclxuICAgIC8vIElmIHdlIGFyZSBoZXJlLCB0aGVuIHdlIGhhdmUgYnV0dG9uIHByZXNzZWQgYW5kIHdlIG11c3QgcmVzaXplIVxyXG4gICAgaWYgKHRoaXMuaXNSZXNpemluZ0NsaWNrKSB7XHJcbiAgICAgICAgdmFyIG5ld1NpemVEZWx0YSA9IHtcclxuICAgICAgICAgICAgd2lkdGg6IGxvY2FsQ29vcmRpbmF0ZXMueCAtIHRoaXMubGFzdFJlc2l6ZUNvb3JkaW5hdGVzLngsXHJcbiAgICAgICAgICAgIGhlaWdodDogbG9jYWxDb29yZGluYXRlcy55IC0gdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMueVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMubGFzdFJlc2l6ZUNvb3JkaW5hdGVzID0gbG9jYWxDb29yZGluYXRlcztcclxuXHJcbiAgICAgICAgdmFyIHNpemUgPSBzZWxlY3RlZEVsZW1lbnQuZ2V0U2l6ZSgpO1xyXG4gICAgICAgIHNpemUucmVzaXplQnkobmV3U2l6ZURlbHRhLndpZHRoLCBuZXdTaXplRGVsdGEuaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIC8vIE5haCwgaXQncyBqdXN0IG1vdmluZyBhbiBlbGVtZW50LlxyXG4gICAgZWxzZSBpZiAodGhpcy5pc01vdmluZ0NsaWNrKSB7XHJcbiAgICAgICAgc2VsZWN0ZWRFbGVtZW50Lm1vdmVUbyhuZXcgUG9zaXRpb24oXHJcbiAgICAgICAgICAgIGxvY2FsQ29vcmRpbmF0ZXMueCAtIHRoaXMubGFzdENsaWNrT2Zmc2V0LnRvcCxcclxuICAgICAgICAgICAgbG9jYWxDb29yZGluYXRlcy55IC0gdGhpcy5sYXN0Q2xpY2tPZmZzZXQubGVmdFxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3VyZmFjZS5yZW5kZXIoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIG1vdmFibGUgaHRtbCBjbGFzcyB0byB0aGUgY2FudmFzIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSBib29sXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5zZXRNb3ZhYmxlU3RhdGUgPSBmdW5jdGlvbiAoYm9vbCkge1xyXG4gICAgaWYgKGJvb2wpIHtcclxuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5hZGQoJ21vdmFibGUnKTtcclxuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ3Jlc2l6YWJsZScpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QucmVtb3ZlKCdtb3ZhYmxlJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyByZXNpemFibGUgaHRtbCBjbGFzcyB0byB0aGUgY2FudmFzIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSBib29sXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5zZXRSZXNpemFibGVTdGF0ZSA9IGZ1bmN0aW9uIChib29sKSB7XHJcbiAgICBpZiAoYm9vbCkge1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LnJlbW92ZSgnbW92YWJsZScpO1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LmFkZCgncmVzaXphYmxlJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ3Jlc2l6YWJsZScpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXMgbW91c2UgbW92ZSBldmVudCB3aGVuIG1vdXNlIGJ1dHRvbiBpcyBub3QgcHJlc3NlZFxyXG4gKlxyXG4gKiBAcGFyYW0gZWxlbWVudEhvdmVySW5kZXhcclxuICogQHBhcmFtIHNlbGVjdGVkSW5kZXhcclxuICogQHBhcmFtIG1vdXNlQ29vcmRpbmF0ZXNcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmhhbmRsZU1vdXNlTW92ZVdpdGhvdXRNb3VzZURvd24gPSBmdW5jdGlvbiAoZWxlbWVudEhvdmVySW5kZXgsIHNlbGVjdGVkSW5kZXgsIG1vdXNlQ29vcmRpbmF0ZXMpIHtcclxuICAgIGlmIChlbGVtZW50SG92ZXJJbmRleCA9PSBzZWxlY3RlZEluZGV4KSB7XHJcbiAgICAgICAgLy8gV2hhdCBzdGF0ZSBpcyBjdXJzb3IgaW4/XHJcbiAgICAgICAgdmFyIHJlc2l6ZVN0YXRlID0gdGhpcy5pc1Jlc2l6ZVBvc3NpYmxlKHRoaXMuc3VyZmFjZS5lbGVtZW50cy5nZXRTZWxlY3RlZEVsZW1lbnQoKSwgbW91c2VDb29yZGluYXRlcy54LCBtb3VzZUNvb3JkaW5hdGVzLnkpO1xyXG4gICAgICAgIHRoaXMucmVhZHlGb3JSZXNpemUgPSByZXNpemVTdGF0ZTtcclxuICAgICAgICBpZiAocmVzaXplU3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRSZXNpemFibGVTdGF0ZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW92YWJsZVN0YXRlKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2V0TW92YWJsZVN0YXRlKGZhbHNlKTtcclxuICAgICAgICB0aGlzLnNldFJlc2l6YWJsZVN0YXRlKGZhbHNlKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIHBhc3NlZCBjb29yZGluYXRlcyBhcmUgbG9jYXRlZCBvbiBwb3NpdGlvbiBvZiBkcmFnIGljb24gb2YgYW4gZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0gZWxlbWVudFxyXG4gKiBAcGFyYW0geFxyXG4gKiBAcGFyYW0geVxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaXNSZXNpemVQb3NzaWJsZSA9IGZ1bmN0aW9uKGVsZW1lbnQsIHgsIHkpIHtcclxuICAgIHZhciBkcmFnSWNvblNpemUgPSAxMDtcclxuXHJcbiAgICB2YXIgdGVtcEVsZW1lbnREYXRhID0ge1xyXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgUG9zaXRpb24oXHJcbiAgICAgICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRYKCkgKyBlbGVtZW50LmdldFNpemUoKS5nZXRXaWR0aCgpIC0gZHJhZ0ljb25TaXplLFxyXG4gICAgICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WSgpICsgZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KCkgLSBkcmFnSWNvblNpemVcclxuICAgICAgICApLFxyXG4gICAgICAgIHNpemU6IG5ldyBTaXplKGRyYWdJY29uU2l6ZSwgZHJhZ0ljb25TaXplKVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgdGVtcEVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KHRlbXBFbGVtZW50RGF0YS5wb3NpdGlvbiwgdGVtcEVsZW1lbnREYXRhLnNpemUpO1xyXG4gICAgcmV0dXJuIHRlbXBFbGVtZW50LmlzT2Zmc2V0SW4oeCwgeSk7XHJcbn07IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcclxuICAgIHdpbmRvdy5zdXJmYWNlID0gbmV3IENhbnZhc1N1cmZhY2UoY2FudmFzKTtcclxuXHJcbiAgICBzdXJmYWNlLnJlbmRlcigpO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
