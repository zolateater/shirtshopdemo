describe('CanvasFactory', function() {

    /**
     *
     * @returns {CanvasUIFactory}
     */
    var getFactory = function () {
        return new CanvasUIFactory(document.createElement('canvas').getContext('2d'));
    };


    it("sets the right view for a label element", function() {
        var label = getFactory().createLabel();
        var view = label.getView();
        assert(view instanceof CanvasUILabelView);
    });

    it("sets the right view for an image element", function() {
        var img = getFactory().createImage(new Image());
        var view = img.getView();
        assert(view instanceof CanvasUIImageView);
    });
});
describe('CanvasSurfaceEventHandler', function() {

    var canvas = document.createElement('canvas');
    var canvasSurface = new CanvasSurface(canvas);

    it("calls attached handlers on select", function() {
        var handler = new CanvasSurfaceEventHandler(canvasSurface);
        var value = 0;
        var changeValue = function () {
            value++;
        };
        handler.addSelectEventHandler(changeValue);
        handler.triggerSelect();
        var valueHasChanged = value != 0;
        assert(valueHasChanged);
    });

    it("calls attached handlers on deselect", function() {
        var handler = new CanvasSurfaceEventHandler(canvasSurface);
        var value = 0;
        var changeValue = function () {
            value++;
        };
        handler.addDeselectEventHandler(changeValue);
        handler.triggerDeselect();
        var valueHasChanged = value != 0;
        assert(valueHasChanged);
    });

});
describe('Position', function() {

    it("saves its coordinates", function() {
        var pos = new Position(1, 2);
        assert(pos.getX() == 1);
        assert(pos.getY() == 2);
    });

    it("can be moved properly", function() {
        var pos = new Position(1, 2);
        assert(pos.move(1, 2).getX() == 2);
        assert(pos.move(1, 2).getY() == 4);
    });

    it("has default params", function() {
        var pos = new Position();
        assert(pos.getX() == 0);
        assert(pos.getY() == 0);
    });

    it("is an immutable object", function() {
        var pos = new Position();
        assert(pos.getX() == 0);
        assert(pos.getY() == 0);

        var otherPos = pos.move(1, 1);
        assert(pos.getX() == 0);
        assert(pos.getY() == 0);

        assert(otherPos.getX() == 1);
        assert(otherPos.getY() == 1);
    });
});
describe('ResourceLoader', function() {

    it("loads requested image", function (done) {
        var image = null;

        var loader = new ResourceLoader();

        loader.loadImage('/img/logoGrey.jpg', function () {
            image = this;
        });

        setTimeout(function () {
            assert(image instanceof Image);
            done();
        }, 300);
    });

    it("loads requested text", function (done) {
        var text = '';

        var loader = new ResourceLoader();

        loader.loadText('/index.html', function (responseText) {
            text = responseText;
        });

        setTimeout(function () {
            assert(text.length != 0);
            done();
        }, 500);
    });

});
describe('ResourcePreparer', function() {

    var getMock = function () {
        return {
            loadImage: function (src, callback) {
                var image = new Image();
                callback.bind(image)();
            },
            loadText: function (src, callback) {
                callback(src)
            },
            loadJsonObject: function (src, callback) {
                callback(src);
            }
        }
    };

    it("loads all objects you want and calls function you have passed as callback", function (done) {
        var isCallbackCalled = false;

        var resourcePreparer = new ResourcePreparer(getMock(), [
            { key: 'image', src: 'something.png', type: 'image'},
            { key: 'text', src: 'text', type: 'text'},
            { key: 'json', src: 'json', type: 'json'}
        ], function () {
            isCallbackCalled = true;
        });

        resourcePreparer.startLoading();

        assert(isCallbackCalled == true);
        done();
    });

    it("throws an exception if type is not passed", function () {
         var resourcePreparer = new ResourcePreparer(getMock(), [
             {key : 'someKey', src: 'somePath'}
         ], function() {});

        assert.throws(function () {
            resourcePreparer.startLoading();
        })
    });

    it("saves all loaded resources to the storage", function () {
        var resourcePreparer = new ResourcePreparer(getMock(), [
            { key: 'image', src: 'something.png', type: 'image'},
            { key: 'text', src: 'text', type: 'text'},
            { key: 'json', src: 'json', type: 'json'}
        ], function () {});

        resourcePreparer.startLoading();

        assert(Storage.get('image') instanceof Image);
        assert.equal(Storage.get('text'), 'text');
        assert.equal(Storage.get('json'), 'json');
    })
});
describe('Size', function() {

    it("saves its size", function() {
        var size = new Size(1, 2);
        assert(size.getWidth() == 1);
        assert(size.getHeight() == 2);
    });

    it("can be multiplied", function() {
        var size = new Size(1, 2);
        assert(size.multiply(2).getWidth() == 2);
        assert(size.multiply(2).getHeight() == 4);
    });

    it("has default params", function() {
        var size = new Size();
        assert(size.getWidth() == Size.defaultWidth);
        assert(size.getHeight() == Size.defaultHeight);
    });
});
describe('Storage', function() {

    it("remembers anything you will pass", function() {
        var text = 'Some text example';
        Storage.remember('text', text);
        assert(Storage.get('text') == text);
    });

    it("throws an exception if nothing passed", function () {
        assert.throws(function () {
            Storage.get('someValue');
        });
    });

    it("won't not allow you to create an instance", function () {
        assert.throws(function () {
            new Storage('someValue');
        });
    })
});
describe('UICollection', function() {

    it("allows to add elements and retrieve them", function() {
        var collection = new UICollection();
        collection.add(new UILabelElement(null, null, "text"));
        assert(collection.get(0).getText() == 'text');
    });

    it("adds elements to the end", function () {
        var collection = new UICollection();

        collection.add(new UILabelElement(null, null, "text 0"));
        collection.add(new UILabelElement(null, null, "text 1"));

        assert(collection.get(0).getText() == 'text 0');
        assert(collection.get(1).getText() == 'text 1');
    });

    it("has 'length' property which equals to added elements size", function () {
        var collection = new UICollection();

        assert(collection.length == 0);

        collection.add(new UILabelElement(null, null, "text 0"));
        assert(collection.length == 1);

        collection.add(new UILabelElement(null, null, "text 1"));
        assert(collection.length == 2);
    });

    it("allows to retrieve all elements as array in the right order", function () {
        var collection = new UICollection();

        collection.add(new UILabelElement(null, null, "text 0"));
        collection.add(new UILabelElement(null, null, "text 1"));

        assert(collection.get(0).getText() == 'text 0');
        assert(collection.get(1).getText() == 'text 1');

        var allElements = collection.getAll();

        assert(allElements[0].getText() == 'text 0');
        assert(allElements[1].getText() == 'text 1');
    });

    it("allows to remove an element from itself", function () {
        var collection = new UICollection();

        collection.add(new UILabelElement(null, null, "text 0"));
        collection.add(new UILabelElement(null, null, "text 1"));

    });

    it("allows to remove element", function () {
        var collection = new UICollection();

        var el1 = new UILabelElement(null, null, "text 0");
        var el2 = new UILabelElement(null, null, "text 1");

        collection.add(el1);
        collection.add(el2);

        collection.remove(0);
        assert(collection.length == 1);
        assert(collection.get(0).getText() == "text 1");
    });

    it("allows to swap elements", function () {
        var collection = new UICollection();

        var el1 = new UILabelElement(null, null, "text 0");
        var el2 = new UILabelElement(null, null, "text 1");

        collection.add(el1);
        collection.add(el2);

        collection.swap(0, 1);

        assert(collection.get(0).getText() == "text 1");
        assert(collection.get(1).getText() == "text 0");
    });

    it ("allows to select and remember it", function () {
        var collection = new UICollection();
        var el1 = new UILabelElement(null, null, "text 0");
        var el2 = new UILabelElement(null, null, "text 1");
        collection.add(el1);
        collection.add(el2);

        assert(collection.getSelectedIndex() == -1);

        collection.select(0);
        assert(collection.getSelectedIndex() == 0);
    });

    it("has nothing selected if selected element is removed", function () {
        var collection = new UICollection();
        var el1 = new UILabelElement(null, null, "text 0");
        var el2 = new UILabelElement(null, null, "text 1");
        collection.add(el1);
        collection.add(el2);
        assert(collection.getSelectedIndex() == -1);
        collection.select(0);
        assert(collection.getSelectedIndex() == 0);
        collection.remove(0);
        assert(collection.getSelectedElement() == null);
    });

    it("fetch element by position", function () {
        var collection = new UICollection();
        var el1 = new UILabelElement(new Position(10, 10), new Size(10, 10), "text 0");
        var el2 = new UILabelElement(new Position(15, 15), new Size(10, 10), "text 1");
        collection.add(el1);
        collection.add(el2);
        assert(collection.fetchElementByOffset(15, 15).getText() == "text 1");
        assert(collection.fetchElementByOffset(14, 14).getText() == "text 0");
        assert(collection.fetchElementByOffset(0, 0) == null);
    });

});
describe('UIElement', function() {

    it("has default position", function() {
        var element = new UIElement();
        assert(element.getPosition() instanceof Position);
    });

    it("has default size", function() {
        var element = new UIElement();
        assert(element.getSize() instanceof Size);
    });

    it("has no view by default", function() {
        var element = new UIElement();
        assert(element.getView() === undefined);
    });

    it("stores passed view", function() {
        var element = new UIElement();
        var exampleView = new UIElementView();
        element.setView(exampleView);
        assert(element.getView() instanceof  UIElementView);
    });

    it("can change position", function() {
        var element = new UIElement();
        assert(element.getPosition().getX() == 0);
        var position = new Position(1, 1);
        element.moveTo(position);
        assert(element.getPosition().getX() == 1);
    });

    it("can change size", function() {
        var element = new UIElement();
        assert(element.getSize().getWidth() == Size.defaultWidth);
        var newSize = new Size(1, 1);
        element.setSize(newSize);
        assert(element.getSize().getWidth() == 1);
    });

    it("knows that offset matches/doesn't matches its position and size", function() {
        var element = new UIElement();
        element.moveTo(new Position(0, 0));
        element.setSize(new Size(10, 10));
        assert(element.isOffsetIn(5, 5) == true);
        element.moveTo(new Position(10, 10));
        assert(element.isOffsetIn(5, 5) == false);
    });
});
describe('UIImageElement', function() {

    // document.createElement('canvas').getContext('2d')

    it("extends UIElement and has all of its methods", function() {
        var element = new UIImageElement(null, null, new Image());
        assert(element.getSize instanceof Function);
        assert(element.setSize instanceof Function);
        assert(element.moveTo instanceof Function);
        assert(element.getPosition instanceof Function);
        assert(element.moveTo instanceof Function);
        assert(element.setView instanceof Function);
        assert(element.getView instanceof Function);
    });

    it("can't be created without an image", function() {
        var exception = null;
        try {
            var element = new UIImageElement();
        }
        catch (e) {
            exception = e;
        }
        assert(exception != null);
    });

    it("can return an image constructed with", function() {
        var element = new UIImageElement(null, null, new Image());
        assert(element.getImage() instanceof Image);
    });


});
describe('UILabelElement', function() {

    it("extends UIElement and has all of its methods", function() {
        var element = new UILabelElement();
        assert(element.getSize instanceof Function);
        assert(element.setSize instanceof Function);
        assert(element.moveTo instanceof Function);
        assert(element.getPosition instanceof Function);
        assert(element.moveTo instanceof Function);
        assert(element.setView instanceof Function);
        assert(element.getView instanceof Function);
    });

    it("also has default size and position", function() {
        var element = new UILabelElement();
        assert(element.getSize() instanceof Size);
        assert(element.getPosition()instanceof Position);
    });

    it("has default text", function() {
        var element = new UILabelElement();
        assert(element.getText() == UILabelElement.defaultText);
    });

    it("stores text", function() {
        var element = new UILabelElement(null, null, "text");
        assert(element.getText() == "text");
        element.setText("other text");
        assert(element.getText() == "other text");
    });

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaXQvQ2FudmFzRmFjdG9yeS5qcyIsInVuaXQvQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5qcyIsInVuaXQvUG9zaXRpb24uanMiLCJ1bml0L1Jlc291cmNlTG9hZGVyLmpzIiwidW5pdC9SZXNvdXJjZVByZXBhcmVyLmpzIiwidW5pdC9TaXplLmpzIiwidW5pdC9TdG9yYWdlLmpzIiwidW5pdC9VSUNvbGxlY3Rpb24uanMiLCJ1bml0L1VJRWxlbWVudC5qcyIsInVuaXQvVUlJbWFnZUVsZW1lbnQuanMiLCJ1bml0L1VJTGFiZWxFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0ZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlc2NyaWJlKCdDYW52YXNGYWN0b3J5JywgZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtDYW52YXNVSUZhY3Rvcnl9XG4gICAgICovXG4gICAgdmFyIGdldEZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2FudmFzVUlGYWN0b3J5KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJykpO1xuICAgIH07XG5cblxuICAgIGl0KFwic2V0cyB0aGUgcmlnaHQgdmlldyBmb3IgYSBsYWJlbCBlbGVtZW50XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGFiZWwgPSBnZXRGYWN0b3J5KCkuY3JlYXRlTGFiZWwoKTtcbiAgICAgICAgdmFyIHZpZXcgPSBsYWJlbC5nZXRWaWV3KCk7XG4gICAgICAgIGFzc2VydCh2aWV3IGluc3RhbmNlb2YgQ2FudmFzVUlMYWJlbFZpZXcpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJzZXRzIHRoZSByaWdodCB2aWV3IGZvciBhbiBpbWFnZSBlbGVtZW50XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaW1nID0gZ2V0RmFjdG9yeSgpLmNyZWF0ZUltYWdlKG5ldyBJbWFnZSgpKTtcbiAgICAgICAgdmFyIHZpZXcgPSBpbWcuZ2V0VmlldygpO1xuICAgICAgICBhc3NlcnQodmlldyBpbnN0YW5jZW9mIENhbnZhc1VJSW1hZ2VWaWV3KTtcbiAgICB9KTtcbn0pOyIsImRlc2NyaWJlKCdDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdmFyIGNhbnZhc1N1cmZhY2UgPSBuZXcgQ2FudmFzU3VyZmFjZShjYW52YXMpO1xuXG4gICAgaXQoXCJjYWxscyBhdHRhY2hlZCBoYW5kbGVycyBvbiBzZWxlY3RcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gbmV3IENhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIoY2FudmFzU3VyZmFjZSk7XG4gICAgICAgIHZhciB2YWx1ZSA9IDA7XG4gICAgICAgIHZhciBjaGFuZ2VWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhbHVlKys7XG4gICAgICAgIH07XG4gICAgICAgIGhhbmRsZXIuYWRkU2VsZWN0RXZlbnRIYW5kbGVyKGNoYW5nZVZhbHVlKTtcbiAgICAgICAgaGFuZGxlci50cmlnZ2VyU2VsZWN0KCk7XG4gICAgICAgIHZhciB2YWx1ZUhhc0NoYW5nZWQgPSB2YWx1ZSAhPSAwO1xuICAgICAgICBhc3NlcnQodmFsdWVIYXNDaGFuZ2VkKTtcbiAgICB9KTtcblxuICAgIGl0KFwiY2FsbHMgYXR0YWNoZWQgaGFuZGxlcnMgb24gZGVzZWxlY3RcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gbmV3IENhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIoY2FudmFzU3VyZmFjZSk7XG4gICAgICAgIHZhciB2YWx1ZSA9IDA7XG4gICAgICAgIHZhciBjaGFuZ2VWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhbHVlKys7XG4gICAgICAgIH07XG4gICAgICAgIGhhbmRsZXIuYWRkRGVzZWxlY3RFdmVudEhhbmRsZXIoY2hhbmdlVmFsdWUpO1xuICAgICAgICBoYW5kbGVyLnRyaWdnZXJEZXNlbGVjdCgpO1xuICAgICAgICB2YXIgdmFsdWVIYXNDaGFuZ2VkID0gdmFsdWUgIT0gMDtcbiAgICAgICAgYXNzZXJ0KHZhbHVlSGFzQ2hhbmdlZCk7XG4gICAgfSk7XG5cbn0pOyIsImRlc2NyaWJlKCdQb3NpdGlvbicsIGZ1bmN0aW9uKCkge1xuXG4gICAgaXQoXCJzYXZlcyBpdHMgY29vcmRpbmF0ZXNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwb3MgPSBuZXcgUG9zaXRpb24oMSwgMik7XG4gICAgICAgIGFzc2VydChwb3MuZ2V0WCgpID09IDEpO1xuICAgICAgICBhc3NlcnQocG9zLmdldFkoKSA9PSAyKTtcbiAgICB9KTtcblxuICAgIGl0KFwiY2FuIGJlIG1vdmVkIHByb3Blcmx5XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcG9zID0gbmV3IFBvc2l0aW9uKDEsIDIpO1xuICAgICAgICBhc3NlcnQocG9zLm1vdmUoMSwgMikuZ2V0WCgpID09IDIpO1xuICAgICAgICBhc3NlcnQocG9zLm1vdmUoMSwgMikuZ2V0WSgpID09IDQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJoYXMgZGVmYXVsdCBwYXJhbXNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwb3MgPSBuZXcgUG9zaXRpb24oKTtcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRYKCkgPT0gMCk7XG4gICAgICAgIGFzc2VydChwb3MuZ2V0WSgpID09IDApO1xuICAgIH0pO1xuXG4gICAgaXQoXCJpcyBhbiBpbW11dGFibGUgb2JqZWN0XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcG9zID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgICAgIGFzc2VydChwb3MuZ2V0WCgpID09IDApO1xuICAgICAgICBhc3NlcnQocG9zLmdldFkoKSA9PSAwKTtcblxuICAgICAgICB2YXIgb3RoZXJQb3MgPSBwb3MubW92ZSgxLCAxKTtcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRYKCkgPT0gMCk7XG4gICAgICAgIGFzc2VydChwb3MuZ2V0WSgpID09IDApO1xuXG4gICAgICAgIGFzc2VydChvdGhlclBvcy5nZXRYKCkgPT0gMSk7XG4gICAgICAgIGFzc2VydChvdGhlclBvcy5nZXRZKCkgPT0gMSk7XG4gICAgfSk7XG59KTsiLCJkZXNjcmliZSgnUmVzb3VyY2VMb2FkZXInLCBmdW5jdGlvbigpIHtcblxuICAgIGl0KFwibG9hZHMgcmVxdWVzdGVkIGltYWdlXCIsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgIHZhciBpbWFnZSA9IG51bGw7XG5cbiAgICAgICAgdmFyIGxvYWRlciA9IG5ldyBSZXNvdXJjZUxvYWRlcigpO1xuXG4gICAgICAgIGxvYWRlci5sb2FkSW1hZ2UoJy9pbWcvbG9nb0dyZXkuanBnJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW1hZ2UgPSB0aGlzO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGFzc2VydChpbWFnZSBpbnN0YW5jZW9mIEltYWdlKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICB9KTtcblxuICAgIGl0KFwibG9hZHMgcmVxdWVzdGVkIHRleHRcIiwgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgdmFyIHRleHQgPSAnJztcblxuICAgICAgICB2YXIgbG9hZGVyID0gbmV3IFJlc291cmNlTG9hZGVyKCk7XG5cbiAgICAgICAgbG9hZGVyLmxvYWRUZXh0KCcvaW5kZXguaHRtbCcsIGZ1bmN0aW9uIChyZXNwb25zZVRleHQpIHtcbiAgICAgICAgICAgIHRleHQgPSByZXNwb25zZVRleHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYXNzZXJ0KHRleHQubGVuZ3RoICE9IDApO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCA1MDApO1xuICAgIH0pO1xuXG59KTsiLCJkZXNjcmliZSgnUmVzb3VyY2VQcmVwYXJlcicsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGdldE1vY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2FkSW1hZ2U6IGZ1bmN0aW9uIChzcmMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suYmluZChpbWFnZSkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsb2FkVGV4dDogZnVuY3Rpb24gKHNyYywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhzcmMpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbG9hZEpzb25PYmplY3Q6IGZ1bmN0aW9uIChzcmMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soc3JjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBpdChcImxvYWRzIGFsbCBvYmplY3RzIHlvdSB3YW50IGFuZCBjYWxscyBmdW5jdGlvbiB5b3UgaGF2ZSBwYXNzZWQgYXMgY2FsbGJhY2tcIiwgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgdmFyIGlzQ2FsbGJhY2tDYWxsZWQgPSBmYWxzZTtcblxuICAgICAgICB2YXIgcmVzb3VyY2VQcmVwYXJlciA9IG5ldyBSZXNvdXJjZVByZXBhcmVyKGdldE1vY2soKSwgW1xuICAgICAgICAgICAgeyBrZXk6ICdpbWFnZScsIHNyYzogJ3NvbWV0aGluZy5wbmcnLCB0eXBlOiAnaW1hZ2UnfSxcbiAgICAgICAgICAgIHsga2V5OiAndGV4dCcsIHNyYzogJ3RleHQnLCB0eXBlOiAndGV4dCd9LFxuICAgICAgICAgICAgeyBrZXk6ICdqc29uJywgc3JjOiAnanNvbicsIHR5cGU6ICdqc29uJ31cbiAgICAgICAgXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXNDYWxsYmFja0NhbGxlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc291cmNlUHJlcGFyZXIuc3RhcnRMb2FkaW5nKCk7XG5cbiAgICAgICAgYXNzZXJ0KGlzQ2FsbGJhY2tDYWxsZWQgPT0gdHJ1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICB9KTtcblxuICAgIGl0KFwidGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0eXBlIGlzIG5vdCBwYXNzZWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgdmFyIHJlc291cmNlUHJlcGFyZXIgPSBuZXcgUmVzb3VyY2VQcmVwYXJlcihnZXRNb2NrKCksIFtcbiAgICAgICAgICAgICB7a2V5IDogJ3NvbWVLZXknLCBzcmM6ICdzb21lUGF0aCd9XG4gICAgICAgICBdLCBmdW5jdGlvbigpIHt9KTtcblxuICAgICAgICBhc3NlcnQudGhyb3dzKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlc291cmNlUHJlcGFyZXIuc3RhcnRMb2FkaW5nKCk7XG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBpdChcInNhdmVzIGFsbCBsb2FkZWQgcmVzb3VyY2VzIHRvIHRoZSBzdG9yYWdlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlc291cmNlUHJlcGFyZXIgPSBuZXcgUmVzb3VyY2VQcmVwYXJlcihnZXRNb2NrKCksIFtcbiAgICAgICAgICAgIHsga2V5OiAnaW1hZ2UnLCBzcmM6ICdzb21ldGhpbmcucG5nJywgdHlwZTogJ2ltYWdlJ30sXG4gICAgICAgICAgICB7IGtleTogJ3RleHQnLCBzcmM6ICd0ZXh0JywgdHlwZTogJ3RleHQnfSxcbiAgICAgICAgICAgIHsga2V5OiAnanNvbicsIHNyYzogJ2pzb24nLCB0eXBlOiAnanNvbid9XG4gICAgICAgIF0sIGZ1bmN0aW9uICgpIHt9KTtcblxuICAgICAgICByZXNvdXJjZVByZXBhcmVyLnN0YXJ0TG9hZGluZygpO1xuXG4gICAgICAgIGFzc2VydChTdG9yYWdlLmdldCgnaW1hZ2UnKSBpbnN0YW5jZW9mIEltYWdlKTtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0b3JhZ2UuZ2V0KCd0ZXh0JyksICd0ZXh0Jyk7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdG9yYWdlLmdldCgnanNvbicpLCAnanNvbicpO1xuICAgIH0pXG59KTsiLCJkZXNjcmliZSgnU2l6ZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgaXQoXCJzYXZlcyBpdHMgc2l6ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNpemUgPSBuZXcgU2l6ZSgxLCAyKTtcbiAgICAgICAgYXNzZXJ0KHNpemUuZ2V0V2lkdGgoKSA9PSAxKTtcbiAgICAgICAgYXNzZXJ0KHNpemUuZ2V0SGVpZ2h0KCkgPT0gMik7XG4gICAgfSk7XG5cbiAgICBpdChcImNhbiBiZSBtdWx0aXBsaWVkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2l6ZSA9IG5ldyBTaXplKDEsIDIpO1xuICAgICAgICBhc3NlcnQoc2l6ZS5tdWx0aXBseSgyKS5nZXRXaWR0aCgpID09IDIpO1xuICAgICAgICBhc3NlcnQoc2l6ZS5tdWx0aXBseSgyKS5nZXRIZWlnaHQoKSA9PSA0KTtcbiAgICB9KTtcblxuICAgIGl0KFwiaGFzIGRlZmF1bHQgcGFyYW1zXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2l6ZSA9IG5ldyBTaXplKCk7XG4gICAgICAgIGFzc2VydChzaXplLmdldFdpZHRoKCkgPT0gU2l6ZS5kZWZhdWx0V2lkdGgpO1xuICAgICAgICBhc3NlcnQoc2l6ZS5nZXRIZWlnaHQoKSA9PSBTaXplLmRlZmF1bHRIZWlnaHQpO1xuICAgIH0pO1xufSk7IiwiZGVzY3JpYmUoJ1N0b3JhZ2UnLCBmdW5jdGlvbigpIHtcblxuICAgIGl0KFwicmVtZW1iZXJzIGFueXRoaW5nIHlvdSB3aWxsIHBhc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gJ1NvbWUgdGV4dCBleGFtcGxlJztcbiAgICAgICAgU3RvcmFnZS5yZW1lbWJlcigndGV4dCcsIHRleHQpO1xuICAgICAgICBhc3NlcnQoU3RvcmFnZS5nZXQoJ3RleHQnKSA9PSB0ZXh0KTtcbiAgICB9KTtcblxuICAgIGl0KFwidGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiBub3RoaW5nIHBhc3NlZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFzc2VydC50aHJvd3MoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgU3RvcmFnZS5nZXQoJ3NvbWVWYWx1ZScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KFwid29uJ3Qgbm90IGFsbG93IHlvdSB0byBjcmVhdGUgYW4gaW5zdGFuY2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBhc3NlcnQudGhyb3dzKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG5ldyBTdG9yYWdlKCdzb21lVmFsdWUnKTtcbiAgICAgICAgfSk7XG4gICAgfSlcbn0pOyIsImRlc2NyaWJlKCdVSUNvbGxlY3Rpb24nLCBmdW5jdGlvbigpIHtcblxuICAgIGl0KFwiYWxsb3dzIHRvIGFkZCBlbGVtZW50cyBhbmQgcmV0cmlldmUgdGhlbVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHRcIikpO1xuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXQoMCkuZ2V0VGV4dCgpID09ICd0ZXh0Jyk7XG4gICAgfSk7XG5cbiAgICBpdChcImFkZHMgZWxlbWVudHMgdG8gdGhlIGVuZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xuXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMFwiKSk7XG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMVwiKSk7XG5cbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0KDApLmdldFRleHQoKSA9PSAndGV4dCAwJyk7XG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldCgxKS5nZXRUZXh0KCkgPT0gJ3RleHQgMScpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJoYXMgJ2xlbmd0aCcgcHJvcGVydHkgd2hpY2ggZXF1YWxzIHRvIGFkZGVkIGVsZW1lbnRzIHNpemVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcblxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5sZW5ndGggPT0gMCk7XG5cbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAwXCIpKTtcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24ubGVuZ3RoID09IDEpO1xuXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMVwiKSk7XG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmxlbmd0aCA9PSAyKTtcbiAgICB9KTtcblxuICAgIGl0KFwiYWxsb3dzIHRvIHJldHJpZXZlIGFsbCBlbGVtZW50cyBhcyBhcnJheSBpbiB0aGUgcmlnaHQgb3JkZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcblxuICAgICAgICBjb2xsZWN0aW9uLmFkZChuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDBcIikpO1xuICAgICAgICBjb2xsZWN0aW9uLmFkZChuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDFcIikpO1xuXG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldCgwKS5nZXRUZXh0KCkgPT0gJ3RleHQgMCcpO1xuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXQoMSkuZ2V0VGV4dCgpID09ICd0ZXh0IDEnKTtcblxuICAgICAgICB2YXIgYWxsRWxlbWVudHMgPSBjb2xsZWN0aW9uLmdldEFsbCgpO1xuXG4gICAgICAgIGFzc2VydChhbGxFbGVtZW50c1swXS5nZXRUZXh0KCkgPT0gJ3RleHQgMCcpO1xuICAgICAgICBhc3NlcnQoYWxsRWxlbWVudHNbMV0uZ2V0VGV4dCgpID09ICd0ZXh0IDEnKTtcbiAgICB9KTtcblxuICAgIGl0KFwiYWxsb3dzIHRvIHJlbW92ZSBhbiBlbGVtZW50IGZyb20gaXRzZWxmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XG5cbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAwXCIpKTtcbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAxXCIpKTtcblxuICAgIH0pO1xuXG4gICAgaXQoXCJhbGxvd3MgdG8gcmVtb3ZlIGVsZW1lbnRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcblxuICAgICAgICB2YXIgZWwxID0gbmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAwXCIpO1xuICAgICAgICB2YXIgZWwyID0gbmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAxXCIpO1xuXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMSk7XG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMik7XG5cbiAgICAgICAgY29sbGVjdGlvbi5yZW1vdmUoMCk7XG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmxlbmd0aCA9PSAxKTtcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0KDApLmdldFRleHQoKSA9PSBcInRleHQgMVwiKTtcbiAgICB9KTtcblxuICAgIGl0KFwiYWxsb3dzIHRvIHN3YXAgZWxlbWVudHNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcblxuICAgICAgICB2YXIgZWwxID0gbmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAwXCIpO1xuICAgICAgICB2YXIgZWwyID0gbmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAxXCIpO1xuXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMSk7XG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMik7XG5cbiAgICAgICAgY29sbGVjdGlvbi5zd2FwKDAsIDEpO1xuXG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldCgwKS5nZXRUZXh0KCkgPT0gXCJ0ZXh0IDFcIik7XG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldCgxKS5nZXRUZXh0KCkgPT0gXCJ0ZXh0IDBcIik7XG4gICAgfSk7XG5cbiAgICBpdCAoXCJhbGxvd3MgdG8gc2VsZWN0IGFuZCByZW1lbWJlciBpdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xuICAgICAgICB2YXIgZWwxID0gbmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAwXCIpO1xuICAgICAgICB2YXIgZWwyID0gbmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAxXCIpO1xuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDEpO1xuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDIpO1xuXG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldFNlbGVjdGVkSW5kZXgoKSA9PSAtMSk7XG5cbiAgICAgICAgY29sbGVjdGlvbi5zZWxlY3QoMCk7XG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldFNlbGVjdGVkSW5kZXgoKSA9PSAwKTtcbiAgICB9KTtcblxuICAgIGl0KFwiaGFzIG5vdGhpbmcgc2VsZWN0ZWQgaWYgc2VsZWN0ZWQgZWxlbWVudCBpcyByZW1vdmVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XG4gICAgICAgIHZhciBlbDEgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDBcIik7XG4gICAgICAgIHZhciBlbDIgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDFcIik7XG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMSk7XG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMik7XG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldFNlbGVjdGVkSW5kZXgoKSA9PSAtMSk7XG4gICAgICAgIGNvbGxlY3Rpb24uc2VsZWN0KDApO1xuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXRTZWxlY3RlZEluZGV4KCkgPT0gMCk7XG4gICAgICAgIGNvbGxlY3Rpb24ucmVtb3ZlKDApO1xuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXRTZWxlY3RlZEVsZW1lbnQoKSA9PSBudWxsKTtcbiAgICB9KTtcblxuICAgIGl0KFwiZmV0Y2ggZWxlbWVudCBieSBwb3NpdGlvblwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xuICAgICAgICB2YXIgZWwxID0gbmV3IFVJTGFiZWxFbGVtZW50KG5ldyBQb3NpdGlvbigxMCwgMTApLCBuZXcgU2l6ZSgxMCwgMTApLCBcInRleHQgMFwiKTtcbiAgICAgICAgdmFyIGVsMiA9IG5ldyBVSUxhYmVsRWxlbWVudChuZXcgUG9zaXRpb24oMTUsIDE1KSwgbmV3IFNpemUoMTAsIDEwKSwgXCJ0ZXh0IDFcIik7XG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMSk7XG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMik7XG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmZldGNoRWxlbWVudEJ5T2Zmc2V0KDE1LCAxNSkuZ2V0VGV4dCgpID09IFwidGV4dCAxXCIpO1xuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5mZXRjaEVsZW1lbnRCeU9mZnNldCgxNCwgMTQpLmdldFRleHQoKSA9PSBcInRleHQgMFwiKTtcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZmV0Y2hFbGVtZW50QnlPZmZzZXQoMCwgMCkgPT0gbnVsbCk7XG4gICAgfSk7XG5cbn0pOyIsImRlc2NyaWJlKCdVSUVsZW1lbnQnLCBmdW5jdGlvbigpIHtcblxuICAgIGl0KFwiaGFzIGRlZmF1bHQgcG9zaXRpb25cIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJRWxlbWVudCgpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRQb3NpdGlvbigpIGluc3RhbmNlb2YgUG9zaXRpb24pO1xuICAgIH0pO1xuXG4gICAgaXQoXCJoYXMgZGVmYXVsdCBzaXplXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0U2l6ZSgpIGluc3RhbmNlb2YgU2l6ZSk7XG4gICAgfSk7XG5cbiAgICBpdChcImhhcyBubyB2aWV3IGJ5IGRlZmF1bHRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJRWxlbWVudCgpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRWaWV3KCkgPT09IHVuZGVmaW5lZCk7XG4gICAgfSk7XG5cbiAgICBpdChcInN0b3JlcyBwYXNzZWQgdmlld1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KCk7XG4gICAgICAgIHZhciBleGFtcGxlVmlldyA9IG5ldyBVSUVsZW1lbnRWaWV3KCk7XG4gICAgICAgIGVsZW1lbnQuc2V0VmlldyhleGFtcGxlVmlldyk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFZpZXcoKSBpbnN0YW5jZW9mICBVSUVsZW1lbnRWaWV3KTtcbiAgICB9KTtcblxuICAgIGl0KFwiY2FuIGNoYW5nZSBwb3NpdGlvblwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KCk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpID09IDApO1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBuZXcgUG9zaXRpb24oMSwgMSk7XG4gICAgICAgIGVsZW1lbnQubW92ZVRvKHBvc2l0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRYKCkgPT0gMSk7XG4gICAgfSk7XG5cbiAgICBpdChcImNhbiBjaGFuZ2Ugc2l6ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KCk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFNpemUoKS5nZXRXaWR0aCgpID09IFNpemUuZGVmYXVsdFdpZHRoKTtcbiAgICAgICAgdmFyIG5ld1NpemUgPSBuZXcgU2l6ZSgxLCAxKTtcbiAgICAgICAgZWxlbWVudC5zZXRTaXplKG5ld1NpemUpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSA9PSAxKTtcbiAgICB9KTtcblxuICAgIGl0KFwia25vd3MgdGhhdCBvZmZzZXQgbWF0Y2hlcy9kb2Vzbid0IG1hdGNoZXMgaXRzIHBvc2l0aW9uIGFuZCBzaXplXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcbiAgICAgICAgZWxlbWVudC5tb3ZlVG8obmV3IFBvc2l0aW9uKDAsIDApKTtcbiAgICAgICAgZWxlbWVudC5zZXRTaXplKG5ldyBTaXplKDEwLCAxMCkpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5pc09mZnNldEluKDUsIDUpID09IHRydWUpO1xuICAgICAgICBlbGVtZW50Lm1vdmVUbyhuZXcgUG9zaXRpb24oMTAsIDEwKSk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmlzT2Zmc2V0SW4oNSwgNSkgPT0gZmFsc2UpO1xuICAgIH0pO1xufSk7IiwiZGVzY3JpYmUoJ1VJSW1hZ2VFbGVtZW50JywgZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpXG5cbiAgICBpdChcImV4dGVuZHMgVUlFbGVtZW50IGFuZCBoYXMgYWxsIG9mIGl0cyBtZXRob2RzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUltYWdlRWxlbWVudChudWxsLCBudWxsLCBuZXcgSW1hZ2UoKSk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFNpemUgaW5zdGFuY2VvZiBGdW5jdGlvbik7XG4gICAgICAgIGFzc2VydChlbGVtZW50LnNldFNpemUgaW5zdGFuY2VvZiBGdW5jdGlvbik7XG4gICAgICAgIGFzc2VydChlbGVtZW50Lm1vdmVUbyBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0UG9zaXRpb24gaW5zdGFuY2VvZiBGdW5jdGlvbik7XG4gICAgICAgIGFzc2VydChlbGVtZW50Lm1vdmVUbyBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuc2V0VmlldyBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VmlldyBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcbiAgICB9KTtcblxuICAgIGl0KFwiY2FuJ3QgYmUgY3JlYXRlZCB3aXRob3V0IGFuIGltYWdlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZXhjZXB0aW9uID0gbnVsbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJSW1hZ2VFbGVtZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGV4Y2VwdGlvbiA9IGU7XG4gICAgICAgIH1cbiAgICAgICAgYXNzZXJ0KGV4Y2VwdGlvbiAhPSBudWxsKTtcbiAgICB9KTtcblxuICAgIGl0KFwiY2FuIHJldHVybiBhbiBpbWFnZSBjb25zdHJ1Y3RlZCB3aXRoXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUltYWdlRWxlbWVudChudWxsLCBudWxsLCBuZXcgSW1hZ2UoKSk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldEltYWdlKCkgaW5zdGFuY2VvZiBJbWFnZSk7XG4gICAgfSk7XG5cblxufSk7IiwiZGVzY3JpYmUoJ1VJTGFiZWxFbGVtZW50JywgZnVuY3Rpb24oKSB7XG5cbiAgICBpdChcImV4dGVuZHMgVUlFbGVtZW50IGFuZCBoYXMgYWxsIG9mIGl0cyBtZXRob2RzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUxhYmVsRWxlbWVudCgpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5zZXRTaXplIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5tb3ZlVG8gaW5zdGFuY2VvZiBGdW5jdGlvbik7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFBvc2l0aW9uIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5tb3ZlVG8gaW5zdGFuY2VvZiBGdW5jdGlvbik7XG4gICAgICAgIGFzc2VydChlbGVtZW50LnNldFZpZXcgaW5zdGFuY2VvZiBGdW5jdGlvbik7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFZpZXcgaW5zdGFuY2VvZiBGdW5jdGlvbik7XG4gICAgfSk7XG5cbiAgICBpdChcImFsc28gaGFzIGRlZmF1bHQgc2l6ZSBhbmQgcG9zaXRpb25cIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJTGFiZWxFbGVtZW50KCk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFNpemUoKSBpbnN0YW5jZW9mIFNpemUpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRQb3NpdGlvbigpaW5zdGFuY2VvZiBQb3NpdGlvbik7XG4gICAgfSk7XG5cbiAgICBpdChcImhhcyBkZWZhdWx0IHRleHRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJTGFiZWxFbGVtZW50KCk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFRleHQoKSA9PSBVSUxhYmVsRWxlbWVudC5kZWZhdWx0VGV4dCk7XG4gICAgfSk7XG5cbiAgICBpdChcInN0b3JlcyB0ZXh0XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHRcIik7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFRleHQoKSA9PSBcInRleHRcIik7XG4gICAgICAgIGVsZW1lbnQuc2V0VGV4dChcIm90aGVyIHRleHRcIik7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFRleHQoKSA9PSBcIm90aGVyIHRleHRcIik7XG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
