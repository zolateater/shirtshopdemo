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
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

/**
 * Renders all of the elements on the surface.
 */
CanvasSurface.prototype.renderElements = function () {
    var selectedIndex = this.elements.getSelectedIndex();
    for (var i = 0; i < this.elements.length; i++) {
        this.elements.get(i).render();
        if (i == selectedIndex) {
            // TODO: check if we are creating texture
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
 * Ugly method.
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
/**
 * This class is responsible for handling DOM events and triggering application events
 * Kinda ugly code here
 *
 * @param {CanvasSurface} surface
 * @constructor
 */
function CanvasSurfaceEventHandler (surface)
{
    this.surface = surface;
    this.isMouseDown = false;
    this.isMovingClick = false;
    this.isResizingClick = false;
    this.lastClickOffset = null;
    this.lastResizeCoordinates = null;

    this.handlers = {
        onSelect: [],
        onDeselect: []
    }
}

/**
 * Binds all event handlers to the HTML canvas
 * 
 * @param e
 */
CanvasSurfaceEventHandler.prototype.bindHtmlCanvasEvents = function (e) {
    this.surface.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.surface.canvas.addEventListener('touchstart', this.handleMouseDown.bind(this));

    // We binding this event to the whole document to stop moving
    // if user tries to drag an element out of the canvas
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    document.addEventListener('touchend', this.handleMouseUp.bind(this));

    this.surface.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.surface.canvas.addEventListener('touchmove', this.handleMouseMove.bind(this));
};

/**
 * Triggers select event.
 * This means that all assigned handlers will be executed.
 *
 * TODO: Abandon JavaScript and learn TypeScript
 *
 * @param {UIElement} element
 */
CanvasSurfaceEventHandler.prototype.triggerSelect = function (element) {
    for (var key in this.handlers.onSelect) {
        var callback = this.handlers.onSelect[key];

        if (callback instanceof Function) {
            callback(element);
        }
    }
};

/**
 * Triggers deselect event.
 * This means that all assigned handlers will be executed.
 */
CanvasSurfaceEventHandler.prototype.triggerDeselect = function () {
    for (var key in this.handlers.onDeselect) {
        var callback = this.handlers.onDeselect[key];
        if (callback instanceof Function) {
            callback();
        }
    }
};

/**
 * Adds new handler on element selection event
 *
 * @param {function} callback
 */
CanvasSurfaceEventHandler.prototype.addSelectEventHandler = function (callback) {
    this.handlers.onSelect.push(callback);
};

/**
 * Adds new handler on element deselection event
 *
 * @param {function} callback
 */
CanvasSurfaceEventHandler.prototype.addDeselectEventHandler = function (callback) {
    this.handlers.onDeselect.push(callback);
};


/**
 * Handler for the mousedown event
 *
 * @param e
 */
CanvasSurfaceEventHandler.prototype.handleMouseDown = function (e) {
    this.isMouseDown = true;

    // Quick hack
    if (typeof TouchEvent != "undefined" && e instanceof TouchEvent) {
        e = e.touches[0];
    }

    var localCoordinates = this.toLocalCoordinates(e.clientX, e.clientY);
    var oldSelectedElement = this.surface.getElements().getSelectedIndex();
    var newSelectedIndex = this.surface.elements.fetchIndexByOffset(localCoordinates.x, localCoordinates.y);
    var newSelectedElement = this.surface.elements.get(newSelectedIndex);

    var doWeHaveSomethingSelected = newSelectedIndex !== null;
    var isCurrentlySelectedWasSelectedBefore = doWeHaveSomethingSelected &&
        oldSelectedElement == newSelectedIndex;

    if (!doWeHaveSomethingSelected) {

        // If we had something selected before,
        // it means it is time to call deselect handlers
        if (oldSelectedElement != null) {
            this.triggerDeselect();
        }

        this.surface.elements.deselect();
        this.surface.render();

        return;
    }

    if (!isCurrentlySelectedWasSelectedBefore) {
        this.triggerSelect(newSelectedElement);
    }

    // We remember here the last click offset relatively selected element
    this.lastClickOffset = newSelectedElement.getClickOffset(localCoordinates.x, localCoordinates.y);

    // Is it a click starting resize operation ?
    this.isResizingClick = isCurrentlySelectedWasSelectedBefore &&
        this.isResizePossible(newSelectedElement, localCoordinates.x, localCoordinates.y);

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
 * @param {MouseEvent} e
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
    if (typeof TouchEvent != "undefined" && e instanceof TouchEvent) {
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
    // Nah, it's just moving
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
        element.getPosition().getX() + element.getSize().getWidth() - iconResizeWidth,
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
function ResourceLoader() {
    
}
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
 * It is purposed for remembering some data.
 * Functional declaration is used for its visibility only.
 *
 * @constructor
 */
function Storage() {
    throw new TypeError("This is not for creating objects!");
}

Storage._content = {};

/**
 * Remembers any value
 *
 * @param {string} key
 * @param {*} value
 */
Storage.remember = function (key, value) {
    Storage._content[key] = value;
};

/**
 * Allows you to get what you want but only if you remember this earlier
 * 
 * @param {string} key
 * @param {string} content
 */
Storage.get = function (key, content) {
    var somethingYouWant = Storage._content[key];

    if (typeof somethingYouWant == 'undefined') {
        throw new ReferenceError("We have nothing to return using key: " + key);
    }

    return somethingYouWant;
};

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
 * Selects the last element in the collection
 */
UICollection.prototype.selectLast = function () {
    this.selectedIndex = this.length ? this.length - 1 : -1;
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
        throw new TypeError("Image must have Image type!");
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

    var buttonAddElement = document.getElementById('btnAddText');
    buttonAddElement.addEventListener('click', function () {
        surface.pushLabel();
        var elemens = surface.getElements();
        surface.getElements().select(elemens.length - 1);
        surface.render();
    });




    surface.render();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhbnZhc1N1cmZhY2UuanMiLCJDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLmpzIiwiQ2FudmFzVUlFbGVtZW50Vmlldy5qcyIsIkNhbnZhc1VJRmFjdG9yeS5qcyIsIkNhbnZhc1VJSW1hZ2VWaWV3LmpzIiwiQ2FudmFzVUlMYWJlbFZpZXcuanMiLCJDYW52YXNVSVNlbGVjdGVkVmlldy5qcyIsIlBvc2l0aW9uLmpzIiwiUmVzb3VyY2VMb2FkZXIuanMiLCJTaXplLmpzIiwiU3RvcmFnZS5qcyIsIlVJQ29sbGVjdGlvbi5qcyIsIlVJRWxlbWVudC5qcyIsIlVJRWxlbWVudFZpZXcuanMiLCJVSUltYWdlRWxlbWVudC5qcyIsIlVJTGFiZWxFbGVtZW50LmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDblRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDYW52YXMgUmVuZGVyaW5nIFN1cmZhY2UuXG4gKiBJdCBpcyBhIHRvcCBsZXZlbCBjb21wb25lbnQgdGhhdCBjb21iaW5lcyBpdCBhbGwgdG9nZXRoZXIgYW5kIGhpZGVzIHVubmVjZXNzYXJ5IGRldGFpbHMuXG4gKlxuICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gY2FudmFzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzU3VyZmFjZShjYW52YXMpXG57XG4gICAgaWYgKCAhIChjYW52YXMgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Bhc3NlZCBjYW52YXMgaXMgbm90IEhUTUxDYW52YXNFbGVtZW50IScpO1xuICAgIH1cbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLmZhY3RvcnkgPSBuZXcgQ2FudmFzVUlGYWN0b3J5KHRoaXMuY29udGV4dCk7XG4gICAgdGhpcy5lbGVtZW50cyA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcbiAgICB0aGlzLmVsZW1lbnRzLmFkZCh0aGlzLmZhY3RvcnkuY3JlYXRlTGFiZWwoKSk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIgPSBuZXcgQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlcih0aGlzKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5iaW5kSHRtbENhbnZhc0V2ZW50cygpO1xufVxuXG4vKipcbiAqIFJldHVybnMgVUlDb2xsZWN0aW9uIHJlbGF0ZWQgdG8gdGhlIHN1cmZhY2UuXG4gKiBcbiAqIEByZXR1cm5zIHtVSUNvbGxlY3Rpb259XG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmdldEVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBsYWJlbCBlbGVtZW50IGluIHVpIGNvbGxlY3Rpb24gb2YgdGhlIHN1cmZhY2UgYW5kIHJldHVybnMgaXQuXG4gKiBcbiAqIEByZXR1cm5zIHtVSUxhYmVsRWxlbWVudH1cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucHVzaExhYmVsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBsYWJlbCA9IHRoaXMuZmFjdG9yeS5jcmVhdGVMYWJlbCgpO1xuICAgIHRoaXMuZWxlbWVudHMuYWRkKGxhYmVsKTtcbiAgICB0aGlzLmVsZW1lbnRzLnNlbGVjdExhc3QoKTtcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXJTZWxlY3QobGFiZWwpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICByZXR1cm4gbGFiZWw7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGltYWdlIGVsZW1lbnQgaW4gdWkgY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSB7SW1hZ2V9IGltYWdlXG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnB1c2hJbWFnZSA9IGZ1bmN0aW9uIChpbWFnZSkge1xuICAgIHZhciBpbWFnZUVsZW1lbnQgPSB0aGlzLmZhY3RvcnkuY3JlYXRlSW1hZ2UoaW1hZ2UpO1xuICAgIHRoaXMuZWxlbWVudHMuYWRkKGltYWdlRWxlbWVudCk7XG4gICAgdGhpcy5lbGVtZW50cy5zZWxlY3RMYXN0KCk7XG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyU2VsZWN0KGltYWdlRWxlbWVudCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICAgIHJldHVybiBpbWFnZUVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENsZWFyIHRoZSByZWxhdGVkIGNhbnZhcy5cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiI0ZGRkZGRlwiO1xuICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbn07XG5cbi8qKlxuICogUmVuZGVycyBhbGwgb2YgdGhlIGVsZW1lbnRzIG9uIHRoZSBzdXJmYWNlLlxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5yZW5kZXJFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IHRoaXMuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmVsZW1lbnRzLmdldChpKS5yZW5kZXIoKTtcbiAgICAgICAgaWYgKGkgPT0gc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgd2UgYXJlIGNyZWF0aW5nIHRleHR1cmVcbiAgICAgICAgICAgIG5ldyBDYW52YXNVSVNlbGVjdGVkVmlldyh0aGlzLmNvbnRleHQpLnJlbmRlcih0aGlzLmVsZW1lbnRzLmdldChpKSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIENsZWFycyB0aGUgc3VyZmFjZSBhbmQgcmVuZGVycyBpdCB3aXRoIGFsbCBlbGVtZW50cy5cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLnJlbmRlckVsZW1lbnRzKCk7XG59O1xuXG5cbi8qKlxuICogQWRkcyBuZXcgZXZlbnQgaGFuZGxlciBvbiBzZWxlY3Rpb24gb2YgYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7VUlTZWxlY3RlZENhbGxiYWNrfSBjYWxsYmFja1xuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5hZGRTZWxlY3RFdmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5hZGRTZWxlY3RFdmVudEhhbmRsZXIoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuYWRkRGVzZWxlY3RFdmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5hZGREZXNlbGVjdEV2ZW50SGFuZGxlcihjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIEdldCBjYW52YXMgYm91bmQgcmVjdGFuZ2xlLlxuICogVWdseSBtZXRob2QuXG4gKlxuICogQHJldHVybnMge3t0b3A6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIGxlZnQ6IG51bWJlcn19XG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IDAsXG4gICAgICAgIHJpZ2h0OiB0aGlzLmNhbnZhcy53aWR0aCxcbiAgICAgICAgYm90dG9tOiB0aGlzLmNhbnZhcy5oZWlnaHQsXG4gICAgICAgIGxlZnQ6IDBcbiAgICB9O1xufTtcblxuLyoqXG4gKiBDYWxsYmFjayB0eXBlIGZvciBzZWxlY3RpbmcgYW5kIGVsZW1lbnRcbiAqXG4gKiBAY2FsbGJhY2sgVUlTZWxlY3RlZENhbGxiYWNrXG4gKiBAcGFyYW0ge1VJRWxlbWVudH1cbiAqLyIsIi8qKlxuICogVGhpcyBjbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgRE9NIGV2ZW50cyBhbmQgdHJpZ2dlcmluZyBhcHBsaWNhdGlvbiBldmVudHNcbiAqIEtpbmRhIHVnbHkgY29kZSBoZXJlXG4gKlxuICogQHBhcmFtIHtDYW52YXNTdXJmYWNlfSBzdXJmYWNlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlciAoc3VyZmFjZSlcbntcbiAgICB0aGlzLnN1cmZhY2UgPSBzdXJmYWNlO1xuICAgIHRoaXMuaXNNb3VzZURvd24gPSBmYWxzZTtcbiAgICB0aGlzLmlzTW92aW5nQ2xpY2sgPSBmYWxzZTtcbiAgICB0aGlzLmlzUmVzaXppbmdDbGljayA9IGZhbHNlO1xuICAgIHRoaXMubGFzdENsaWNrT2Zmc2V0ID0gbnVsbDtcbiAgICB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcyA9IG51bGw7XG5cbiAgICB0aGlzLmhhbmRsZXJzID0ge1xuICAgICAgICBvblNlbGVjdDogW10sXG4gICAgICAgIG9uRGVzZWxlY3Q6IFtdXG4gICAgfVxufVxuXG4vKipcbiAqIEJpbmRzIGFsbCBldmVudCBoYW5kbGVycyB0byB0aGUgSFRNTCBjYW52YXNcbiAqIFxuICogQHBhcmFtIGVcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuYmluZEh0bWxDYW52YXNFdmVudHMgPSBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKSk7XG5cbiAgICAvLyBXZSBiaW5kaW5nIHRoaXMgZXZlbnQgdG8gdGhlIHdob2xlIGRvY3VtZW50IHRvIHN0b3AgbW92aW5nXG4gICAgLy8gaWYgdXNlciB0cmllcyB0byBkcmFnIGFuIGVsZW1lbnQgb3V0IG9mIHRoZSBjYW52YXNcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwLmJpbmQodGhpcykpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVNb3VzZVVwLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlLmJpbmQodGhpcykpO1xufTtcblxuLyoqXG4gKiBUcmlnZ2VycyBzZWxlY3QgZXZlbnQuXG4gKiBUaGlzIG1lYW5zIHRoYXQgYWxsIGFzc2lnbmVkIGhhbmRsZXJzIHdpbGwgYmUgZXhlY3V0ZWQuXG4gKlxuICogVE9ETzogQWJhbmRvbiBKYXZhU2NyaXB0IGFuZCBsZWFybiBUeXBlU2NyaXB0XG4gKlxuICogQHBhcmFtIHtVSUVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUudHJpZ2dlclNlbGVjdCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuaGFuZGxlcnMub25TZWxlY3QpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5oYW5kbGVycy5vblNlbGVjdFtrZXldO1xuXG4gICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogVHJpZ2dlcnMgZGVzZWxlY3QgZXZlbnQuXG4gKiBUaGlzIG1lYW5zIHRoYXQgYWxsIGFzc2lnbmVkIGhhbmRsZXJzIHdpbGwgYmUgZXhlY3V0ZWQuXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnRyaWdnZXJEZXNlbGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5oYW5kbGVycy5vbkRlc2VsZWN0KSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuaGFuZGxlcnMub25EZXNlbGVjdFtrZXldO1xuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogQWRkcyBuZXcgaGFuZGxlciBvbiBlbGVtZW50IHNlbGVjdGlvbiBldmVudFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmFkZFNlbGVjdEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHRoaXMuaGFuZGxlcnMub25TZWxlY3QucHVzaChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIEFkZHMgbmV3IGhhbmRsZXIgb24gZWxlbWVudCBkZXNlbGVjdGlvbiBldmVudFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmFkZERlc2VsZWN0RXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5oYW5kbGVycy5vbkRlc2VsZWN0LnB1c2goY2FsbGJhY2spO1xufTtcblxuXG4vKipcbiAqIEhhbmRsZXIgZm9yIHRoZSBtb3VzZWRvd24gZXZlbnRcbiAqXG4gKiBAcGFyYW0gZVxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5oYW5kbGVNb3VzZURvd24gPSBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuaXNNb3VzZURvd24gPSB0cnVlO1xuXG4gICAgLy8gUXVpY2sgaGFja1xuICAgIGlmICh0eXBlb2YgVG91Y2hFdmVudCAhPSBcInVuZGVmaW5lZFwiICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGUgPSBlLnRvdWNoZXNbMF07XG4gICAgfVxuXG4gICAgdmFyIGxvY2FsQ29vcmRpbmF0ZXMgPSB0aGlzLnRvTG9jYWxDb29yZGluYXRlcyhlLmNsaWVudFgsIGUuY2xpZW50WSk7XG4gICAgdmFyIG9sZFNlbGVjdGVkRWxlbWVudCA9IHRoaXMuc3VyZmFjZS5nZXRFbGVtZW50cygpLmdldFNlbGVjdGVkSW5kZXgoKTtcbiAgICB2YXIgbmV3U2VsZWN0ZWRJbmRleCA9IHRoaXMuc3VyZmFjZS5lbGVtZW50cy5mZXRjaEluZGV4QnlPZmZzZXQobG9jYWxDb29yZGluYXRlcy54LCBsb2NhbENvb3JkaW5hdGVzLnkpO1xuICAgIHZhciBuZXdTZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZ2V0KG5ld1NlbGVjdGVkSW5kZXgpO1xuXG4gICAgdmFyIGRvV2VIYXZlU29tZXRoaW5nU2VsZWN0ZWQgPSBuZXdTZWxlY3RlZEluZGV4ICE9PSBudWxsO1xuICAgIHZhciBpc0N1cnJlbnRseVNlbGVjdGVkV2FzU2VsZWN0ZWRCZWZvcmUgPSBkb1dlSGF2ZVNvbWV0aGluZ1NlbGVjdGVkICYmXG4gICAgICAgIG9sZFNlbGVjdGVkRWxlbWVudCA9PSBuZXdTZWxlY3RlZEluZGV4O1xuXG4gICAgaWYgKCFkb1dlSGF2ZVNvbWV0aGluZ1NlbGVjdGVkKSB7XG5cbiAgICAgICAgLy8gSWYgd2UgaGFkIHNvbWV0aGluZyBzZWxlY3RlZCBiZWZvcmUsXG4gICAgICAgIC8vIGl0IG1lYW5zIGl0IGlzIHRpbWUgdG8gY2FsbCBkZXNlbGVjdCBoYW5kbGVyc1xuICAgICAgICBpZiAob2xkU2VsZWN0ZWRFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckRlc2VsZWN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZGVzZWxlY3QoKTtcbiAgICAgICAgdGhpcy5zdXJmYWNlLnJlbmRlcigpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWlzQ3VycmVudGx5U2VsZWN0ZWRXYXNTZWxlY3RlZEJlZm9yZSkge1xuICAgICAgICB0aGlzLnRyaWdnZXJTZWxlY3QobmV3U2VsZWN0ZWRFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBXZSByZW1lbWJlciBoZXJlIHRoZSBsYXN0IGNsaWNrIG9mZnNldCByZWxhdGl2ZWx5IHNlbGVjdGVkIGVsZW1lbnRcbiAgICB0aGlzLmxhc3RDbGlja09mZnNldCA9IG5ld1NlbGVjdGVkRWxlbWVudC5nZXRDbGlja09mZnNldChsb2NhbENvb3JkaW5hdGVzLngsIGxvY2FsQ29vcmRpbmF0ZXMueSk7XG5cbiAgICAvLyBJcyBpdCBhIGNsaWNrIHN0YXJ0aW5nIHJlc2l6ZSBvcGVyYXRpb24gP1xuICAgIHRoaXMuaXNSZXNpemluZ0NsaWNrID0gaXNDdXJyZW50bHlTZWxlY3RlZFdhc1NlbGVjdGVkQmVmb3JlICYmXG4gICAgICAgIHRoaXMuaXNSZXNpemVQb3NzaWJsZShuZXdTZWxlY3RlZEVsZW1lbnQsIGxvY2FsQ29vcmRpbmF0ZXMueCwgbG9jYWxDb29yZGluYXRlcy55KTtcblxuICAgIGlmICh0aGlzLmlzUmVzaXppbmdDbGljaykge1xuICAgICAgICB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcyA9IGxvY2FsQ29vcmRpbmF0ZXM7XG4gICAgICAgIHRoaXMuc2V0UmVzaXphYmxlU3RhdGUodHJ1ZSk7XG4gICAgfVxuICAgIC8vIEl0IGlzIGEgY2xpY2sgZm9yIG1vdmluZ1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmlzTW92aW5nQ2xpY2sgPSB0cnVlO1xuICAgICAgICB0aGlzLnN1cmZhY2UuZWxlbWVudHMuc2VsZWN0KG5ld1NlbGVjdGVkSW5kZXgpO1xuICAgICAgICB0aGlzLnNldE1vdmFibGVTdGF0ZSh0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLnN1cmZhY2UucmVuZGVyKCk7XG59O1xuXG4vKipcbiAqXG4gKiBIYW5kbGVyIGZvciBtb3VzZSB1cCBldmVudFxuICpcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZVxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5oYW5kbGVNb3VzZVVwID0gZnVuY3Rpb24gKGUpIHtcbiAgICB0aGlzLmlzTW91c2VEb3duID0gZmFsc2U7XG4gICAgdGhpcy5pc1Jlc2l6aW5nQ2xpY2sgPSBmYWxzZTtcbiAgICB0aGlzLmlzTW92aW5nQ2xpY2sgPSBmYWxzZTtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyBjb29yZGluYXRlcyB0byBjb29yZGluYXRlcyBpbnNpZGUgY2FudmFzXG4gKlxuICogQHBhcmFtIGNsaWVudFhcbiAqIEBwYXJhbSBjbGllbnRZXG4gKiBAcmV0dXJucyB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUudG9Mb2NhbENvb3JkaW5hdGVzID0gZnVuY3Rpb24gKGNsaWVudFgsIGNsaWVudFkpIHtcbiAgICB2YXIgdmlld3BvcnRPZmZzZXQgPSB0aGlzLnN1cmZhY2UuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIC8vIHRoZXNlIGFyZSByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnQsIGkuZS4gdGhlIHdpbmRvd1xuICAgIHZhciB0b3AgPSB2aWV3cG9ydE9mZnNldC50b3A7XG4gICAgdmFyIGxlZnQgPSB2aWV3cG9ydE9mZnNldC5sZWZ0O1xuICAgIHZhciB0b3BPZmZzZXQgPSBjbGllbnRZIC0gdG9wO1xuICAgIHZhciBsZWZ0T2Zmc2V0ID0gY2xpZW50WCAtIGxlZnQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBsZWZ0T2Zmc2V0LFxuICAgICAgICB5OiB0b3BPZmZzZXRcbiAgICB9O1xufTtcblxuLyoqXG4gKiBIYW5kbGVyIGZvciBtb3VzZSBtb3ZlIGV2ZW50XG4gKlxuICogQHBhcmFtIGVcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlTW91c2VNb3ZlID0gZnVuY3Rpb24gKGUpIHtcblxuICAgIC8vIFF1aWNrIGhhY2tcbiAgICBpZiAodHlwZW9mIFRvdWNoRXZlbnQgIT0gXCJ1bmRlZmluZWRcIiAmJiBlIGluc3RhbmNlb2YgVG91Y2hFdmVudCkge1xuICAgICAgICBlID0gZS50b3VjaGVzWzBdO1xuICAgIH1cblxuICAgIHZhciBzZWxlY3RlZEluZGV4ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmdldFNlbGVjdGVkSW5kZXgoKTtcbiAgICB2YXIgbG9jYWxDb29yZGluYXRlcyA9IHRoaXMudG9Mb2NhbENvb3JkaW5hdGVzKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICB2YXIgZWxlbWVudEhvdmVySW5kZXggPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZmV0Y2hJbmRleEJ5T2Zmc2V0KGxvY2FsQ29vcmRpbmF0ZXMueCwgbG9jYWxDb29yZGluYXRlcy55KTtcblxuICAgIC8vIEl0IGlzIHNpbXBsZSBtb3VzZSBtb3ZlLFxuICAgIC8vIHdlIGhhdmUgbm90aGluZyBtb3JlIHRvIGRvIGhlcmVcbiAgICBpZiAoIXRoaXMuaXNNb3VzZURvd24pIHtcbiAgICAgICAgdGhpcy5oYW5kbGVNb3VzZU1vdmVXaXRob3V0TW91c2VEb3duKGVsZW1lbnRIb3ZlckluZGV4LCBzZWxlY3RlZEluZGV4LCBsb2NhbENvb3JkaW5hdGVzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZ2V0U2VsZWN0ZWRFbGVtZW50KCk7XG5cbiAgICAvLyBJZiB3ZSBhcmUgaGVyZSwgdGhlbiB3ZSBoYXZlIGJ1dHRvbiBwcmVzc2VkIGFuZCB3ZSBtdXN0IHJlc2l6ZSFcbiAgICBpZiAodGhpcy5pc1Jlc2l6aW5nQ2xpY2spIHtcbiAgICAgICAgdmFyIG5ld1NpemVEZWx0YSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiBsb2NhbENvb3JkaW5hdGVzLnggLSB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcy54LFxuICAgICAgICAgICAgaGVpZ2h0OiBsb2NhbENvb3JkaW5hdGVzLnkgLSB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcy55XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMgPSBsb2NhbENvb3JkaW5hdGVzO1xuXG4gICAgICAgIHZhciBzaXplID0gc2VsZWN0ZWRFbGVtZW50LmdldFNpemUoKTtcbiAgICAgICAgc2l6ZS5yZXNpemVCeShuZXdTaXplRGVsdGEud2lkdGgsIG5ld1NpemVEZWx0YS5oZWlnaHQpO1xuICAgIH1cbiAgICAvLyBOYWgsIGl0J3MganVzdCBtb3ZpbmdcbiAgICBlbHNlIGlmICh0aGlzLmlzTW92aW5nQ2xpY2spIHtcbiAgICAgICAgc2VsZWN0ZWRFbGVtZW50Lm1vdmVUbyhuZXcgUG9zaXRpb24oXG4gICAgICAgICAgICBsb2NhbENvb3JkaW5hdGVzLnggLSB0aGlzLmxhc3RDbGlja09mZnNldC50b3AsXG4gICAgICAgICAgICBsb2NhbENvb3JkaW5hdGVzLnkgLSB0aGlzLmxhc3RDbGlja09mZnNldC5sZWZ0XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHRoaXMuc3VyZmFjZS5yZW5kZXIoKTtcbn07XG5cbi8qKlxuICogQWRkcyBtb3ZhYmxlIGh0bWwgY2xhc3MgdG8gdGhlIGNhbnZhcyBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSBib29sXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnNldE1vdmFibGVTdGF0ZSA9IGZ1bmN0aW9uIChib29sKSB7XG4gICAgaWYgKGJvb2wpIHtcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QuYWRkKCdtb3ZhYmxlJyk7XG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LnJlbW92ZSgncmVzaXphYmxlJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ21vdmFibGUnKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEFkZHMgcmVzaXphYmxlIGh0bWwgY2xhc3MgdG8gdGhlIGNhbnZhcyBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSBib29sXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnNldFJlc2l6YWJsZVN0YXRlID0gZnVuY3Rpb24gKGJvb2wpIHtcbiAgICBpZiAoYm9vbCkge1xuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ21vdmFibGUnKTtcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QuYWRkKCdyZXNpemFibGUnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LnJlbW92ZSgncmVzaXphYmxlJyk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBIYW5kbGVzIG1vdXNlIG1vdmUgZXZlbnQgd2hlbiBtb3VzZSBidXR0b24gaXMgbm90IHByZXNzZWRcbiAqXG4gKiBAcGFyYW0gZWxlbWVudEhvdmVySW5kZXhcbiAqIEBwYXJhbSBzZWxlY3RlZEluZGV4XG4gKiBAcGFyYW0gbW91c2VDb29yZGluYXRlc1xuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5oYW5kbGVNb3VzZU1vdmVXaXRob3V0TW91c2VEb3duID0gZnVuY3Rpb24gKGVsZW1lbnRIb3ZlckluZGV4LCBzZWxlY3RlZEluZGV4LCBtb3VzZUNvb3JkaW5hdGVzKSB7XG4gICAgaWYgKGVsZW1lbnRIb3ZlckluZGV4ID09IHNlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgLy8gV2hhdCBzdGF0ZSBpcyBjdXJzb3IgaW4/XG4gICAgICAgIHZhciByZXNpemVTdGF0ZSA9IHRoaXMuaXNSZXNpemVQb3NzaWJsZSh0aGlzLnN1cmZhY2UuZWxlbWVudHMuZ2V0U2VsZWN0ZWRFbGVtZW50KCksIG1vdXNlQ29vcmRpbmF0ZXMueCwgbW91c2VDb29yZGluYXRlcy55KTtcbiAgICAgICAgaWYgKHJlc2l6ZVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJlc2l6YWJsZVN0YXRlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRNb3ZhYmxlU3RhdGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0TW92YWJsZVN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRSZXNpemFibGVTdGF0ZShmYWxzZSk7XG4gICAgfVxufTtcblxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBwYXNzZWQgY29vcmRpbmF0ZXMgYXJlIGxvY2F0ZWQgb24gcG9zaXRpb24gb2YgZHJhZyBpY29uIG9mIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gZWxlbWVudFxuICogQHBhcmFtIHhcbiAqIEBwYXJhbSB5XG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmlzUmVzaXplUG9zc2libGUgPSBmdW5jdGlvbihlbGVtZW50LCB4LCB5KSB7XG4gICAgdmFyIGRyYWdJY29uU2l6ZSA9IDEwO1xuXG4gICAgdmFyIHRlbXBFbGVtZW50RGF0YSA9IHtcbiAgICAgICAgcG9zaXRpb246IG5ldyBQb3NpdGlvbihcbiAgICAgICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRYKCkgKyBlbGVtZW50LmdldFNpemUoKS5nZXRXaWR0aCgpIC0gZHJhZ0ljb25TaXplLFxuICAgICAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFkoKSArIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldEhlaWdodCgpIC0gZHJhZ0ljb25TaXplXG4gICAgICAgICksXG4gICAgICAgIHNpemU6IG5ldyBTaXplKGRyYWdJY29uU2l6ZSwgZHJhZ0ljb25TaXplKVxuICAgIH07XG5cbiAgICB2YXIgdGVtcEVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KHRlbXBFbGVtZW50RGF0YS5wb3NpdGlvbiwgdGVtcEVsZW1lbnREYXRhLnNpemUpO1xuICAgIHJldHVybiB0ZW1wRWxlbWVudC5pc09mZnNldEluKHgsIHkpO1xufTsiLCIvKipcbiAqXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENhbnZhc1VJRWxlbWVudFZpZXcoY29udGV4dCkge1xuICAgIGlmICghY29udGV4dCBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW52YXMgVUkgRWxlbWVudCBWaWV3IGVycm9yISBDb250ZXh0IGlzIG5vdCBhIGNvbnRleHQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfVxuICAgICAqL1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG59XG5cbkNhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7XG5cbkNhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cbn07IiwiLyoqXG4gKlxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW52YXNVSUZhY3RvcnkoY29udGV4dClcbntcbiAgICBpZiAoICEgKGNvbnRleHQgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbnZhcyByZW5kZXJpbmcgY29udGV4dCBtdXN0IGJlIGluc3RhbmNlIG9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCEgKGZhY3RvcnkgY3JlYXRpbmcpJyk7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGxhYmVsIGVsZW1lbnQsIHdoaWNoIGlzIHJlYWR5IHRvIGJlIHJlbmRlcmVkIG9uIHRoZSBjYW52YXNcbiAqXG4gKiBAcmV0dXJucyB7VUlMYWJlbEVsZW1lbnR9XG4gKi9cbkNhbnZhc1VJRmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlTGFiZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxhYmVsID0gbmV3IFVJTGFiZWxFbGVtZW50KG5ldyBQb3NpdGlvbigwLCA1MCkpO1xuICAgIGxhYmVsLnNldFZpZXcobmV3IENhbnZhc1VJTGFiZWxWaWV3KHRoaXMuY29udGV4dCkpO1xuXG4gICAgcmV0dXJuIGxhYmVsO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGltYWdlIGVsZW1lbnQsIHdoaWNoIGlzIHJlYWR5IHRvIGJlIHJlbmRlcmVkIG9uIHRoZSBjYW52YXNcbiAqXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWFnZVxuICovXG5DYW52YXNVSUZhY3RvcnkucHJvdG90eXBlLmNyZWF0ZUltYWdlID0gZnVuY3Rpb24gKGltYWdlKSB7XG4gICAgdmFyIGltYWdlRWxlbWVudCA9IG5ldyBVSUltYWdlRWxlbWVudChudWxsLCBudWxsLCBpbWFnZSk7XG4gICAgaW1hZ2VFbGVtZW50LnNldFZpZXcobmV3IENhbnZhc1VJSW1hZ2VWaWV3KHRoaXMuY29udGV4dCkpO1xuXG4gICAgcmV0dXJuIGltYWdlRWxlbWVudDtcbn07IiwiLyoqXG4gKiBWaWV3IG9mIGFuIGltYWdlIGVsZW1lbnQgb24gdGhlIGNhbnZhc1xuICpcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzVUlJbWFnZVZpZXcoY29udGV4dCkge1xuICAgIENhbnZhc1VJRWxlbWVudFZpZXcuY2FsbCh0aGlzLCBjb250ZXh0KTtcbn1cblxuQ2FudmFzVUlJbWFnZVZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7IiwiLyoqXG4gKlxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW52YXNVSUxhYmVsVmlldyhjb250ZXh0KSB7XG4gICAgQ2FudmFzVUlFbGVtZW50Vmlldy5jYWxsKHRoaXMsIGNvbnRleHQpO1xufVxuXG5DYW52YXNVSUxhYmVsVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtVSUVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuQ2FudmFzVUlMYWJlbFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgdmFyIGZvbnRTaXplID0gZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KCk7XG5cbiAgICAvLyBUT0RPOiBjb2xvciBzdHlsZXNcblxuXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSBmb250U2l6ZSArIFwicHggQXJpYWxcIjtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCIjMDAwMDAwXCI7XG4gICAgdGhpcy5jb250ZXh0LnRleHRCYXNlbGluZSA9ICdoYW5naW5nJztcblxuICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChcbiAgICAgICAgZWxlbWVudC5nZXRUZXh0KCksXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRYKCksXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCksXG4gICAgICAgIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKClcbiAgICApO1xufTsiLCIvKipcbiAqIEJhc2UgdmlldyBmb3Igc2VsZWN0ZWQgZWxlbWVudFxuICpcbiAqIEBwYXJhbSBjb250ZXh0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzVUlTZWxlY3RlZFZpZXcoY29udGV4dCkge1xuICAgIGlmICghY29udGV4dCBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW52YXMgVUkgRWxlbWVudCBWaWV3IGVycm9yISBDb250ZXh0IGRvZXMgbm90IGhhdmUgdHlwZSBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQhJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH1cbiAgICAgKi9cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xufVxuXG5DYW52YXNVSVNlbGVjdGVkVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcblxuQ2FudmFzVUlTZWxlY3RlZFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cbiAgICB2YXIgaWNvblJlc2l6ZVdpZHRoID0gMTU7XG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSBpY29uUmVzaXplV2lkdGggKyBcInB4IEFyaWFsXCI7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiIzJlNmRhNFwiO1xuICAgIHRoaXMuY29udGV4dC50ZXh0QmFzZWxpbmUgPSAnYm90dG9tJztcblxuICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChcbiAgICAgICAgJ1xcdTIxZjInLFxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpICsgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSAtIGljb25SZXNpemVXaWR0aCxcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFkoKSArIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldEhlaWdodCgpLFxuICAgICAgICBpY29uUmVzaXplV2lkdGhcbiAgICApO1xuXG4gICAgLy90aGlzLuKHmFxuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IFwiIzJlNmRhNFwiO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VSZWN0KFxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpLFxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WSgpLFxuICAgICAgICBlbGVtZW50LmdldFNpemUoKS5nZXRXaWR0aCgpLFxuICAgICAgICBlbGVtZW50LmdldFNpemUoKS5nZXRIZWlnaHQoKVxuICAgICk7XG59OyIsIi8qKlxuICogUG9zaXRpb24gaW4gMkQgc3BhY2VcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0geFxuICogQHBhcmFtIHtudW1iZXJ9IHlcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBQb3NpdGlvbih4LCB5KSB7XG4gICAgdGhpcy54ID0gK3ggfHwgMDtcbiAgICB0aGlzLnkgPSAreSB8fCAwO1xufVxuXG4vKipcbiAqXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5Qb3NpdGlvbi5wcm90b3R5cGUuZ2V0WCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLng7XG59O1xuXG4vKipcbiAqXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5Qb3NpdGlvbi5wcm90b3R5cGUuZ2V0WSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnk7XG59O1xuXG4vKipcbiAqIENoYW5nZXMgcG9zaXRpb25zIG9mIGFuIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YVhcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YVlcbiAqIEByZXR1cm4gUG9zaXRpb25cbiAqL1xuUG9zaXRpb24ucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbihkZWx0YVgsIGRlbHRhWSkge1xuICAgIHZhciBuZXdYUG9zID0gdGhpcy54ICsgZGVsdGFYO1xuICAgIHZhciBuZXdZUG9zID0gdGhpcy55ICsgZGVsdGFZO1xuXG4gICAgcmV0dXJuIG5ldyBQb3NpdGlvbihuZXdYUG9zLCBuZXdZUG9zKTtcbn07IiwiZnVuY3Rpb24gUmVzb3VyY2VMb2FkZXIoKSB7XG4gICAgXG59IiwiLyoqXG4gKiBTaXplIG9mIHRoZSByZWN0YW5nbGUgc3Vycm91bmRpbmcgdGhlIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMud2lkdGggPSArd2lkdGggfHwgU2l6ZS5kZWZhdWx0V2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSAraGVpZ2h0IHx8IFNpemUuZGVmYXVsdEhlaWdodDtcbn1cblxuU2l6ZS5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy53aWR0aDtcbn07XG5cblNpemUucHJvdG90eXBlLmdldEhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmhlaWdodDtcbn07XG5cblxuU2l6ZS5wcm90b3R5cGUucmVzaXplQnkgPSBmdW5jdGlvbiAoZGVsdGFXaWR0aCwgZGVsdGFIZWlnaHQpIHtcbiAgICB0aGlzLndpZHRoICs9IGRlbHRhV2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgKz0gZGVsdGFIZWlnaHQ7XG5cbiAgICBpZiAodGhpcy53aWR0aCA8IFNpemUubWluV2lkdGgpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IFNpemUubWluV2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVpZ2h0IDwgU2l6ZS5taW5IZWlnaHQpIHtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBTaXplLm1pbkhlaWdodDtcbiAgICB9XG59O1xuXG4vKipcbiAqIEluY3JlYXNlcyB0aGUgc2l6ZSBieSBtdWx0aXBsaWVyXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpcGxpZXJcbiAqIEByZXR1cm5zIHtTaXplfVxuICovXG5TaXplLnByb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uKG11bHRpcGxpZXIpIHtcbiAgICByZXR1cm4gbmV3IFNpemUodGhpcy53aWR0aCAqIG11bHRpcGxpZXIsIHRoaXMuaGVpZ2h0ICogbXVsdGlwbGllcik7XG59O1xuXG4vKipcbiAqIE1pbmltYWwgd2lkdGhcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cblNpemUubWluV2lkdGggPSA0MDtcblxuLyoqXG4gKiBNaW5pbWFsIGhlaWdodFxuICogQHR5cGUge251bWJlcn1cbiAqL1xuU2l6ZS5taW5IZWlnaHQgPSA0MDtcblxuLyoqXG4gKiBjb25zdCBmb3IgZGVmYXVsdCB3aWR0aFxuICogQHR5cGUge251bWJlcn1cbiAqL1xuU2l6ZS5kZWZhdWx0V2lkdGggPSA1MDtcblxuLyoqXG4gKiBjb25zdCBmb3IgZGVmYXVsdCBoZWlnaHRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cblNpemUuZGVmYXVsdEhlaWdodCA9IDUwOyIsIi8qKlxuICogSXQgaXMgcHVycG9zZWQgZm9yIHJlbWVtYmVyaW5nIHNvbWUgZGF0YS5cbiAqIEZ1bmN0aW9uYWwgZGVjbGFyYXRpb24gaXMgdXNlZCBmb3IgaXRzIHZpc2liaWxpdHkgb25seS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gU3RvcmFnZSgpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhpcyBpcyBub3QgZm9yIGNyZWF0aW5nIG9iamVjdHMhXCIpO1xufVxuXG5TdG9yYWdlLl9jb250ZW50ID0ge307XG5cbi8qKlxuICogUmVtZW1iZXJzIGFueSB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqL1xuU3RvcmFnZS5yZW1lbWJlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgU3RvcmFnZS5fY29udGVudFtrZXldID0gdmFsdWU7XG59O1xuXG4vKipcbiAqIEFsbG93cyB5b3UgdG8gZ2V0IHdoYXQgeW91IHdhbnQgYnV0IG9ubHkgaWYgeW91IHJlbWVtYmVyIHRoaXMgZWFybGllclxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxuICovXG5TdG9yYWdlLmdldCA9IGZ1bmN0aW9uIChrZXksIGNvbnRlbnQpIHtcbiAgICB2YXIgc29tZXRoaW5nWW91V2FudCA9IFN0b3JhZ2UuX2NvbnRlbnRba2V5XTtcblxuICAgIGlmICh0eXBlb2Ygc29tZXRoaW5nWW91V2FudCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJXZSBoYXZlIG5vdGhpbmcgdG8gcmV0dXJuIHVzaW5nIGtleTogXCIgKyBrZXkpO1xuICAgIH1cblxuICAgIHJldHVybiBzb21ldGhpbmdZb3VXYW50O1xufTtcbiIsIi8qKlxuICogQ29sbGVjdGlvbiBmb3IgVUkgZWxlbWVudHMuXG4gKlxuICogSXQgaXMgcHVycG9zZWQgZm9yIGtlZXBpbmcgdWkgZWxlbWVudHMgd2l0aCBjb3JyZWN0IG9yZGVyXG4gKiBBbHNvIHN1cHBvcnRzIHNlbGVjdGlvbiByZW1lbWJlcmluZ1xuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBVSUNvbGxlY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdsZW5ndGgnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5lbGVtZW50cy5sZW5ndGhcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbi8qKlxuICogUHVzaGVzIGVsZW1lbnQgdG8gdGhlIHRvcCBsYXllciBvZiB0aGUgY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSB7VUlFbGVtZW50fSBlbGVtZW50XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIGlmICggISAoZWxlbWVudCBpbnN0YW5jZW9mIFVJRWxlbWVudCkgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VsZW1lbnQgaW4gVUlDb2xsZWN0aW9uIG11c3QgaGF2ZSBVSUVsZW1lbnQgdHlwZScpO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudHMucHVzaChlbGVtZW50KTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhcnJheSB3aXRoIGFsbCBlbGVtZW50cyBpbiBpdFxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cztcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBlbGVtZW50IHdpdGggcGFzc2VkIGluZGV4IGZyb20gdGhlIGNvbGxlY3Rpb24gYW5kIHJldHVybnMgaXRcbiAqXG4gKiBAcmV0dXJuIHtVSUVsZW1lbnR9XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcbiAgICB9XG4gICAgaWYgKGluZGV4ID09IHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICB0aGlzLmRlc2VsZWN0KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLnNwbGljZShpbmRleCwgMSlbMF07XG59O1xuXG4vKipcbiAqIFN3YXBzIHBsYWNlcyBvZiB0d28gZWxlbWVudHMgaW4gdGhlIGNvbGxlY3Rpb25cbiAqXG4gKiBAcGFyYW0gaW5kZXgxXG4gKiBAcGFyYW0gaW5kZXgyXG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuc3dhcCA9IGZ1bmN0aW9uIChpbmRleDEsIGluZGV4Mikge1xuICAgIGlmICghdGhpcy5oYXMoaW5kZXgxKSB8fCAhdGhpcy5oYXMoaW5kZXgyKSkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xuICAgIH1cblxuICAgIHZhciB0ZW1wID0gdGhpcy5lbGVtZW50c1tpbmRleDFdO1xuICAgIHRoaXMuZWxlbWVudHNbaW5kZXgxXSAgPSB0aGlzLmVsZW1lbnRzW2luZGV4Ml07XG4gICAgdGhpcy5lbGVtZW50c1tpbmRleDJdID0gdGVtcDtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgaW5kZXggZXhpc3RzIGluIGNvbGxlY3Rpb25cbiAqXG4gKiBAcGFyYW0gaW5kZXhcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIHJldHVybiBpbmRleCA+PSAwIHx8IGluZGV4IDwgdGhpcy5sZW5ndGg7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gaW5kZXhcbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tpbmRleF07XG59O1xuXG4vKipcbiAqIEZvcmdldHMgd2hpY2ggZWxlbWVudCB3YXMgc2VsZWN0ZWRcbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5kZXNlbGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBpbmRleFxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xufTtcblxuLyoqXG4gKiBTZWxlY3RzIHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhlIGNvbGxlY3Rpb25cbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3RMYXN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMubGVuZ3RoID8gdGhpcy5sZW5ndGggLSAxIDogLTE7XG59O1xuXG4vKipcbiAqIFJldHVybnMgc2VsZWN0ZWQgZWxlbWVudFxuICpcbiAqIEByZXR1cm5zIHtVSUVsZW1lbnR8bnVsbH1cbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXRTZWxlY3RlZEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCAhPSAtMSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1t0aGlzLnNlbGVjdGVkSW5kZXhdXG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGluZGV4IG9mIHNlbGVjdGVkIGVsZW1lbnRcbiAqIElmIG5vbmUsIHJldHVybnMgLTFcbiAqXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldFNlbGVjdGVkSW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJbmRleDtcbn07XG5cbi8qKlxuICogRmV0Y2hlcyBlbGVtZW50IGJ5IHBhc3NlZCBvZmZzZXRcbiAqXG4gKiBAcGFyYW0gb2Zmc2V0WFxuICogQHBhcmFtIG9mZnNldFlcbiAqIEByZXR1cm5zIHtVSUVsZW1lbnR8bnVsbH1cbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5mZXRjaEVsZW1lbnRCeU9mZnNldCA9IGZ1bmN0aW9uIChvZmZzZXRYLCBvZmZzZXRZKSB7XG4gICAgdmFyIG1hdGNoZWRFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGlmIChlbC5pc09mZnNldEluKG9mZnNldFgsIG9mZnNldFkpKSB7XG4gICAgICAgICAgICBtYXRjaGVkRWxlbWVudCA9IGVsO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hdGNoZWRFbGVtZW50O1xufTtcblxuLyoqXG4gKiBGZXRjaGVzIGluZGV4IGJ5IHBhc3NlZCBvZmZzZXRcbiAqXG4gKiBAcGFyYW0gb2Zmc2V0WFxuICogQHBhcmFtIG9mZnNldFlcbiAqIEByZXR1cm5zIHsqfVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmZldGNoSW5kZXhCeU9mZnNldCA9IGZ1bmN0aW9uIChvZmZzZXRYLCBvZmZzZXRZKSB7XG4gICAgdmFyIG1hdGNoZWRJbmRleCA9IG51bGw7XG4gICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGVsLmlzT2Zmc2V0SW4ob2Zmc2V0WCwgb2Zmc2V0WSkpIHtcbiAgICAgICAgICAgIG1hdGNoZWRJbmRleCA9IGluZGV4O1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hdGNoZWRJbmRleDtcbn07IiwiLyoqXG4gKiBTb21lIGVsZW1lbnQgb2YgdXNlciBpbnRlcmZhY2VcbiAqXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufHVuZGVmaW5lZH0gcG9zaXRpb25cbiAqIEBwYXJhbSB7U2l6ZXx1bmRlZmluZWR9IHNpemVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBVSUVsZW1lbnQocG9zaXRpb24sIHNpemUpXG57XG4gICAgaWYgKCAhIChwb3NpdGlvbiBpbnN0YW5jZW9mIFBvc2l0aW9uKSApIHtcbiAgICAgICAgcG9zaXRpb24gPSBuZXcgUG9zaXRpb24oKTtcbiAgICB9XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuXG4gICAgaWYgKCAhIChzaXplIGluc3RhbmNlb2YgUG9zaXRpb24pKSB7XG4gICAgICAgIHNpemUgPSBuZXcgU2l6ZSgpO1xuICAgIH1cbiAgICB0aGlzLnNpemUgPSBzaXplO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHZpZXcgb2YgdGhlIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge1VJRWxlbWVudFZpZXd9IHZpZXdcbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5zZXRWaWV3ID0gZnVuY3Rpb24odmlldykge1xuICAgIGlmICggISAodmlldyBpbnN0YW5jZW9mIFVJRWxlbWVudFZpZXcpICkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdWaWV3IG11c3QgaGF2ZSBVSUVsZW1lbnRWaWV3IHR5cGUhJyk7XG4gICAgfVxuICAgIHRoaXMudmlldyA9IHZpZXc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgY3VycmVudCB2aWV3IG9mIHRoZSBlbGVtZW50XG4gKlxuICogQHJldHVybnMge1VJRWxlbWVudFZpZXd8dW5kZWZpbmVkfVxuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLmdldFZpZXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldztcbn07XG5cbi8qKlxuICogUmVuZGVycyB0aGUgZWxlbWVudCB1c2luZyBpdHMgdmlld1xuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMudmlldykge1xuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ1ZpZXcgaXMgbm90IHNldCEnKTtcbiAgICB9XG5cbiAgICB0aGlzLnZpZXcucmVuZGVyKHRoaXMpO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtQb3NpdGlvbn0gcG9zaXRpb25cbiAqIEByZXR1cm5zIHtVSUVsZW1lbnR9XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUubW92ZVRvID0gZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgICBpZiAoIXBvc2l0aW9uIGluc3RhbmNlb2YgUG9zaXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbmV3IHBvc2l0aW9uIG11c3QgaGF2ZSBQb3NpdGlvbiB0eXBlIScpXG4gICAgfVxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJucyBwb3NpdGlvbiBvZiBhbiBlbGVtZW50XG4gKlxuICogQHJldHVybnMge1Bvc2l0aW9ufVxuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb247XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIHNpemUgb2YgdGhlIGVsZW1lbnRcbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJuIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50XG4gKlxuICogQHJldHVybnMge1NpemV9XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zaXplO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBwYXNzZWQgb2Zmc2V0IG1hdGNoZXMgZWxlbWVudCBwb3NpdGlvblxuICpcbiAqIEBwYXJhbSBjbGllbnRYXG4gKiBAcGFyYW0gY2xpZW50WVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUuaXNPZmZzZXRJbiA9IGZ1bmN0aW9uIChjbGllbnRYLCBjbGllbnRZKVxue1xuICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgdmFyIGN1cnJlbnRTaXplID0gdGhpcy5nZXRTaXplKCk7XG5cbiAgICBpZiAoY3VycmVudFBvc2l0aW9uLmdldFgoKSA+IGNsaWVudFggfHwgY3VycmVudFBvc2l0aW9uLmdldFgoKSArIGN1cnJlbnRTaXplLmdldFdpZHRoKCkgPCBjbGllbnRYKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGN1cnJlbnRQb3NpdGlvbi5nZXRZKCkgPiBjbGllbnRZIHx8IGN1cnJlbnRQb3NpdGlvbi5nZXRZKCkgKyBjdXJyZW50U2l6ZS5nZXRIZWlnaHQoKSA8IGNsaWVudFkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IGhvdyBmYXIgaXMgcGFzc2VkIG9mZnNldCBmcm9tIHBvaW50ICgwLCAwKVxuICpcbiAqIEBwYXJhbSBjbGllbnRYXG4gKiBAcGFyYW0gY2xpZW50WVxuICogQHJldHVybnMge3t0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyfX1cbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRDbGlja09mZnNldCA9IGZ1bmN0aW9uIChjbGllbnRYLCBjbGllbnRZKSB7XG4gICAgdmFyIHBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogY2xpZW50WCAtIHBvc2l0aW9uLmdldFgoKSxcbiAgICAgICAgbGVmdDogY2xpZW50WSAtIHBvc2l0aW9uLmdldFkoKVxuICAgIH1cbn07IiwiLyoqXG4gKiBPYmplY3QsIHdoaWNoIGRlZmluZXMgaG93IHRvIHJlbmRlciBzcGVjaWZpYyBVSUVsZW1lbnRcbiAqIFRoaXMgb2JqZWN0IGtub3dzIGV2ZXJ5dGhpbmcgYWJvdXQgYW4gb2JqZWN0IGl0IG5lZWRzIHRvIGRyYXcuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVJRWxlbWVudFZpZXcoKVxue1xuXG59XG4vKipcbiAqXG4gKiBAcGFyYW0gVUlFbGVtZW50XG4gKi9cblVJRWxlbWVudFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChVSUVsZW1lbnQpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1lvdSBzaG91bGQgbm90IGJlIHVzaW5nIGFuIGFic3RyYWN0IG9iamVjdCBmb3IgcmVuZGVyaW5nIScpO1xufTtcbiIsIi8qKlxuICpcbiAqIEBwYXJhbSB7UG9zaXRpb258bnVsbH0gcG9zaXRpb25cbiAqIEBwYXJhbSB7U2l6ZXxudWxsfSBzaXplXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWFnZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVJSW1hZ2VFbGVtZW50KHBvc2l0aW9uLCBzaXplLCBpbWFnZSlcbntcbiAgICBVSUVsZW1lbnQuY2FsbCh0aGlzLCBwb3NpdGlvbiwgc2l6ZSk7XG5cbiAgICBpZiAoICEgKGltYWdlIGluc3RhbmNlb2YgSW1hZ2UpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbWFnZSBtdXN0IGhhdmUgSW1hZ2UgdHlwZSFcIik7XG4gICAgfVxuXG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xufVxuXG5VSUltYWdlRWxlbWVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRWxlbWVudC5wcm90b3R5cGUpO1xuXG4vKipcbiAqXG4gKiBAcmV0dXJucyB7SW1hZ2V9XG4gKi9cblVJSW1hZ2VFbGVtZW50LnByb3RvdHlwZS5nZXRJbWFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZTtcbn07IiwiLyoqXG4gKiBDbGFzcyBmb3IgY3JlYXRpbmdcbiAqXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufG51bGx9IHBvc2l0aW9uXG4gKiBAcGFyYW0ge1NpemV8bnVsbH0gc2l6ZVxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqIEBwYXJhbSB7Kn0gc3R5bGVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBVSUxhYmVsRWxlbWVudChwb3NpdGlvbiwgc2l6ZSwgdGV4dCwgc3R5bGUpIHtcbiAgICBVSUVsZW1lbnQuYXBwbHkodGhpcywgW3Bvc2l0aW9uLCBzaXplXSk7XG5cbiAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgdGV4dCA9IFVJTGFiZWxFbGVtZW50LmRlZmF1bHRUZXh0O1xuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xufVxuXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRWxlbWVudC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIEdldHMgYSB0ZXh0IG9mIHRoZSBjdXJyZW50IFVJTGFiZWxFbGVtZW50XG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLmdldFRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGV4dDtcbn07XG5cbi8qKlxuICogU2V0cyBhIHRleHQgb2YgdGhlIGN1cnJlbnQgVUlMYWJlbEVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICovXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuc2V0VGV4dCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbn07XG5cblVJTGFiZWxFbGVtZW50LmRlZmF1bHRUZXh0ID0gXCLQktCy0LXQtNC40YLQtSDRgtC10LrRgdGCLi4uXCI7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gICAgd2luZG93LnN1cmZhY2UgPSBuZXcgQ2FudmFzU3VyZmFjZShjYW52YXMpO1xuXG4gICAgdmFyIGJ1dHRvbkFkZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuQWRkVGV4dCcpO1xuICAgIGJ1dHRvbkFkZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN1cmZhY2UucHVzaExhYmVsKCk7XG4gICAgICAgIHZhciBlbGVtZW5zID0gc3VyZmFjZS5nZXRFbGVtZW50cygpO1xuICAgICAgICBzdXJmYWNlLmdldEVsZW1lbnRzKCkuc2VsZWN0KGVsZW1lbnMubGVuZ3RoIC0gMSk7XG4gICAgICAgIHN1cmZhY2UucmVuZGVyKCk7XG4gICAgfSk7XG5cblxuXG5cbiAgICBzdXJmYWNlLnJlbmRlcigpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
